
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Phone, Mail, User, Calendar, FileText } from "lucide-react";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

/**
 * AdminQuotes - Página de gerenciamento de orçamentos
 * 
 * Esta página permite:
 * 1. Visualizar todos os pedidos de orçamento enviados pelos usuários
 * 2. Ver detalhes de cada pedido
 * 3. Aprovar orçamentos ou rejeitá-los
 * 4. Entrar em contato com os usuários que solicitaram orçamentos
 * 
 * Substituição por API:
 * Em um ambiente de produção, os dados mock devem ser substituídos por chamadas à API:
 * 
 * - GET /api/quotes - Para listar todos os orçamentos
 * - GET /api/quotes/:id - Para obter detalhes de um orçamento específico
 * - PUT /api/quotes/:id - Para atualizar o status de um orçamento (aprovar/rejeitar)
 * - POST /api/quotes/:id/contact - Para registrar contato com o cliente
 */
const AdminQuotes = () => {
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@exemplo.com",
      phone: "(11) 98765-4321",
      service: "Reestofamento de Sofá",
      material: "Couro Sintético",
      color: "Marrom",
      description: "Sofá de 3 lugares com desgaste nas almofadas e braços",
      date: "2025-03-15",
      status: "pending", // pending, approved, rejected, contacted
    },
    {
      id: 2,
      name: "Maria Souza",
      email: "maria@exemplo.com",
      phone: "(11) 91234-5678",
      service: "Fabricação de Puff",
      material: "Tecido",
      color: "Azul Marinho",
      description: "Puff redondo de 60cm de diâmetro para sala de estar",
      date: "2025-03-18",
      status: "contacted",
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      email: "carlos@exemplo.com",
      phone: "(11) 99876-5432",
      service: "Reforma de Cadeiras",
      material: "Veludo",
      color: "Verde Escuro",
      description: "6 cadeiras de jantar com assentos danificados",
      date: "2025-03-20",
      status: "approved",
    },
    {
      id: 4,
      name: "Ana Pereira",
      email: "ana@exemplo.com",
      phone: "(11) 98888-7777",
      service: "Reestofamento de Poltrona",
      material: "Linho",
      color: "Bege",
      description: "Poltrona antiga de família com necessidade de restauração completa",
      date: "2025-03-22",
      status: "rejected",
    },
  ]);

  /**
   * Função para abrir o diálogo de detalhes do orçamento
   * @param {Object} quote - Dados do orçamento selecionado
   */
  const openQuoteDetails = (quote) => {
    setSelectedQuote(quote);
    setIsDetailsOpen(true);
  };

  /**
   * Função para fechar o diálogo de detalhes
   */
  const closeQuoteDetails = () => {
    setIsDetailsOpen(false);
    setSelectedQuote(null);
  };

  /**
   * Função para aprovar um orçamento
   * @param {number} id - ID do orçamento a ser aprovado
   * 
   * Em produção, isso enviaria uma requisição PUT para atualizar o status no backend:
   * PUT /api/quotes/:id { status: 'approved' }
   */
  const approveQuote = (id) => {
    setQuotes(quotes.map(quote => 
      quote.id === id ? { ...quote, status: 'approved' } : quote
    ));
    
    toast({
      title: "Orçamento aprovado",
      description: "O orçamento foi aprovado com sucesso.",
    });
    
    closeQuoteDetails();
  };

  /**
   * Função para rejeitar um orçamento
   * @param {number} id - ID do orçamento a ser rejeitado
   * 
   * Em produção, isso enviaria uma requisição PUT para atualizar o status no backend:
   * PUT /api/quotes/:id { status: 'rejected' }
   */
  const rejectQuote = (id) => {
    setQuotes(quotes.map(quote => 
      quote.id === id ? { ...quote, status: 'rejected' } : quote
    ));
    
    toast({
      title: "Orçamento rejeitado",
      description: "O orçamento foi rejeitado.",
      variant: "destructive"
    });
    
    closeQuoteDetails();
  };

  /**
   * Função para registrar contato com o cliente
   * @param {number} id - ID do orçamento
   * 
   * Em produção, isso enviaria uma requisição PUT para atualizar o status no backend:
   * PUT /api/quotes/:id { status: 'contacted' }
   */
  const markAsContacted = (id) => {
    setQuotes(quotes.map(quote => 
      quote.id === id ? { ...quote, status: 'contacted' } : quote
    ));
    
    toast({
      title: "Cliente contatado",
      description: "O registro de contato foi salvo com sucesso.",
    });
    
    closeQuoteDetails();
  };

  /**
   * Função para renderizar o badge de status do orçamento
   * @param {string} status - Status atual do orçamento
   * @returns {JSX.Element} - Badge com estilo correspondente ao status
   */
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-[#e0e0b6] text-[#171430]">Pendente</Badge>;
      case 'contacted':
        return <Badge className="bg-[#c4d4ab] text-[#171430]">Contatado</Badge>;
      case 'approved':
        return <Badge className="bg-[#87b091] text-white">Aprovado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-200 text-red-800">Rejeitado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Cabeçalho da página */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#171430]">Gerenciar Orçamentos</h1>
            <p className="text-gray-600 mt-2">
              Visualize e gerencie os pedidos de orçamento recebidos.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-[#c4d4ab] hover:bg-[#eff0d5] text-[#171430]"
            onClick={() => navigate("/admin")}
          >
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Resumo de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-[#c4d4ab]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-[#171430]">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#171430]">{quotes.length}</p>
            </CardContent>
          </Card>
          
          <Card className="border-[#c4d4ab]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-[#171430]">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#171430]">
                {quotes.filter(q => q.status === 'pending').length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-[#c4d4ab]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-[#171430]">Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#87b091]">
                {quotes.filter(q => q.status === 'approved').length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-[#c4d4ab]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-[#171430]">Contatados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#c4d4ab]">
                {quotes.filter(q => q.status === 'contacted').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de orçamentos */}
        <Card className="border-[#c4d4ab] shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-[#eff0d5]">
                <TableRow>
                  <TableHead className="text-[#171430]">Cliente</TableHead>
                  <TableHead className="text-[#171430]">Serviço</TableHead>
                  <TableHead className="text-[#171430]">Material</TableHead>
                  <TableHead className="text-[#171430]">Data</TableHead>
                  <TableHead className="text-[#171430]">Status</TableHead>
                  <TableHead className="text-right text-[#171430]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id} className="hover:bg-[#eff0d5]/50">
                    <TableCell className="font-medium">{quote.name}</TableCell>
                    <TableCell>{quote.service}</TableCell>
                    <TableCell>{quote.material}</TableCell>
                    <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[#87b091] hover:bg-[#eff0d5] hover:text-[#171430]"
                        onClick={() => openQuoteDetails(quote)}
                      >
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {quotes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum orçamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Diálogo de detalhes do orçamento */}
        {selectedQuote && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-[#171430]">
                  Detalhes do Orçamento #{selectedQuote.id}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#87b091] text-lg flex items-center gap-2">
                    <User className="h-5 w-5" /> Informações do Cliente
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-medium">{selectedQuote.name}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedQuote.email}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium">{selectedQuote.phone}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[#87b091] text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" /> Detalhes do Pedido
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Serviço Solicitado</p>
                    <p className="font-medium">{selectedQuote.service}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Material</p>
                    <p className="font-medium">{selectedQuote.material}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Cor</p>
                    <p className="font-medium">{selectedQuote.color}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Data da Solicitação</p>
                    <p className="font-medium">{new Date(selectedQuote.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-[#87b091] text-lg mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Descrição
                </h3>
                <p className="text-gray-700 bg-[#eff0d5]/50 p-4 rounded-md border border-[#c4d4ab]">
                  {selectedQuote.description}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-[#87b091] text-lg mb-2">Status Atual</h3>
                <div className="bg-[#eff0d5]/50 p-4 rounded-md border border-[#c4d4ab] flex items-center justify-between">
                  <div>
                    {renderStatusBadge(selectedQuote.status)}
                    <p className="mt-2 text-sm text-gray-600">
                      {selectedQuote.status === 'pending' && 'Aguardando análise'}
                      {selectedQuote.status === 'contacted' && 'Cliente já foi contatado'}
                      {selectedQuote.status === 'approved' && 'Orçamento foi aprovado'}
                      {selectedQuote.status === 'rejected' && 'Orçamento foi rejeitado'}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex sm:justify-between flex-wrap gap-2 mt-6">
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] hover:bg-[#eff0d5]"
                    onClick={() => markAsContacted(selectedQuote.id)}
                  >
                    <Phone className="h-4 w-4 text-[#87b091]" />
                    <span>Marcar como Contatado</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] hover:bg-[#eff0d5]"
                    onClick={() => window.location.href = `mailto:${selectedQuote.email}`}
                  >
                    <Mail className="h-4 w-4 text-[#87b091]" />
                    <span>Enviar Email</span>
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] bg-red-50 hover:bg-red-100"
                    onClick={() => rejectQuote(selectedQuote.id)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Rejeitar</span>
                  </Button>
                  
                  <Button
                    className="gap-2 bg-[#87b091] hover:bg-[#87b091]/80"
                    onClick={() => approveQuote(selectedQuote.id)}
                  >
                    <Check className="h-4 w-4" />
                    <span>Aprovar</span>
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default AdminQuotes;
