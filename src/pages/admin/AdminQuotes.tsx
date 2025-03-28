
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Phone, Mail, User, Calendar, FileText, Pencil, Image as ImageIcon } from "lucide-react";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

/**
 * AdminQuotes - Página de gerenciamento de orçamentos
 * 
 * Esta página permite:
 * 1. Visualizar todos os pedidos de orçamento enviados pelos usuários
 * 2. Ver detalhes de cada pedido com imagens anexadas
 * 3. Editar detalhes dos orçamentos
 * 4. Aprovar orçamentos ou rejeitá-los
 * 5. Entrar em contato com os usuários que solicitaram orçamentos
 * 
 * Substituição por API:
 * Em um ambiente de produção, os dados mock devem ser substituídos por chamadas à API:
 * 
 * - GET /api/quotes - Para listar todos os orçamentos
 * - GET /api/quotes/:id - Para obter detalhes de um orçamento específico
 * - PUT /api/quotes/:id - Para atualizar o status ou detalhes de um orçamento
 * - POST /api/quotes/:id/contact - Para registrar contato com o cliente
 */
const AdminQuotes = () => {
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedQuote, setEditedQuote] = useState(null);
  const [confirmDeleteImage, setConfirmDeleteImage] = useState(null);
  
  // Estado para armazenar os orçamentos - em produção seria carregado da API
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
      images: [
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29mYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      ]
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
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVmZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      ]
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
      images: []
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
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVmZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      ]
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
   * Função para abrir o diálogo de edição do orçamento
   * @param {Object} quote - Dados do orçamento a ser editado
   */
  const openQuoteEdit = (quote) => {
    setEditedQuote({...quote});
    setIsEditOpen(true);
  };

  /**
   * Função para fechar o diálogo de detalhes
   */
  const closeQuoteDetails = () => {
    setIsDetailsOpen(false);
    setSelectedQuote(null);
  };

  /**
   * Função para fechar o diálogo de edição
   */
  const closeQuoteEdit = () => {
    setIsEditOpen(false);
    setEditedQuote(null);
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
   * Função para salvar as alterações do orçamento
   * Em produção, isso enviaria uma requisição PUT para atualizar o orçamento no backend:
   * PUT /api/quotes/:id { ...editedQuote }
   */
  const saveQuoteChanges = () => {
    setQuotes(quotes.map(quote => 
      quote.id === editedQuote.id ? editedQuote : quote
    ));
    
    toast({
      title: "Orçamento atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
    
    closeQuoteEdit();
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
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#171430]">Gerenciar Orçamentos</h1>
            <p className="text-gray-600 mt-2">
              Visualize e gerencie os pedidos de orçamento recebidos.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-[#c4d4ab] hover:bg-[#eff0d5] text-[#171430] w-full md:w-auto"
            onClick={() => navigate("/admin")}
          >
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Resumo de estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#eff0d5]">
                <TableRow>
                  <TableHead className="text-[#171430]">Cliente</TableHead>
                  <TableHead className="text-[#171430]">Serviço</TableHead>
                  <TableHead className="text-[#171430] hidden md:table-cell">Material</TableHead>
                  <TableHead className="text-[#171430] hidden md:table-cell">Data</TableHead>
                  <TableHead className="text-[#171430]">Status</TableHead>
                  <TableHead className="text-right text-[#171430]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id} className="hover:bg-[#eff0d5]/50">
                    <TableCell className="font-medium">{quote.name}</TableCell>
                    <TableCell>{quote.service}</TableCell>
                    <TableCell className="hidden md:table-cell">{quote.material}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-[#87b091] hover:bg-[#eff0d5]"
                          onClick={() => openQuoteDetails(quote)}
                          title="Ver detalhes"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-[#87b091] hover:bg-[#eff0d5]"
                          onClick={() => openQuoteEdit(quote)}
                          title="Editar orçamento"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
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
            <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-[#171430]">
                  Detalhes do Orçamento #{selectedQuote.id}
                </DialogTitle>
                <DialogDescription>
                  Informações detalhadas do pedido de orçamento.
                </DialogDescription>
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

              {/* Seção de imagens */}
              {selectedQuote.images && selectedQuote.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-[#87b091] text-lg mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" /> Imagens Anexadas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedQuote.images.map((image, index) => (
                      <div 
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border border-[#c4d4ab] bg-[#eff0d5]/30"
                      >
                        <img 
                          src={image} 
                          alt={`Imagem ${index + 1} do orçamento`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] hover:bg-[#eff0d5] w-full sm:w-auto"
                    onClick={() => markAsContacted(selectedQuote.id)}
                  >
                    <Phone className="h-4 w-4 text-[#87b091]" />
                    <span>Marcar como Contatado</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] hover:bg-[#eff0d5] w-full sm:w-auto"
                    onClick={() => window.location.href = `mailto:${selectedQuote.email}`}
                  >
                    <Mail className="h-4 w-4 text-[#87b091]" />
                    <span>Enviar Email</span>
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] hover:bg-[#eff0d5] w-full sm:w-auto"
                    onClick={() => openQuoteEdit(selectedQuote)}
                  >
                    <Pencil className="h-4 w-4 text-[#87b091]" />
                    <span>Editar</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="gap-2 border-[#c4d4ab] bg-red-50 hover:bg-red-100 w-full sm:w-auto"
                    onClick={() => rejectQuote(selectedQuote.id)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Rejeitar</span>
                  </Button>
                  
                  <Button
                    className="gap-2 bg-[#87b091] hover:bg-[#87b091]/80 w-full sm:w-auto"
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

        {/* Diálogo de edição do orçamento */}
        {editedQuote && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-[#171430]">
                  Editar Orçamento #{editedQuote.id}
                </DialogTitle>
                <DialogDescription>
                  Modifique os detalhes do pedido de orçamento.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#87b091] text-lg">Informações do Cliente</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Nome</label>
                    <Input 
                      value={editedQuote.name} 
                      onChange={(e) => setEditedQuote({...editedQuote, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Email</label>
                    <Input 
                      value={editedQuote.email} 
                      onChange={(e) => setEditedQuote({...editedQuote, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Telefone</label>
                    <Input 
                      value={editedQuote.phone} 
                      onChange={(e) => setEditedQuote({...editedQuote, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[#87b091] text-lg">Detalhes do Pedido</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Serviço Solicitado</label>
                    <Select 
                      value={editedQuote.service} 
                      onValueChange={(value) => setEditedQuote({...editedQuote, service: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reestofamento de Sofá">Reestofamento de Sofá</SelectItem>
                        <SelectItem value="Fabricação de Puff">Fabricação de Puff</SelectItem>
                        <SelectItem value="Reforma de Cadeiras">Reforma de Cadeiras</SelectItem>
                        <SelectItem value="Reestofamento de Poltrona">Reestofamento de Poltrona</SelectItem>
                        <SelectItem value="Fabricação de Cabeceira">Fabricação de Cabeceira</SelectItem>
                        <SelectItem value="Fabricação de Cortinas">Fabricação de Cortinas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Material</label>
                    <Select 
                      value={editedQuote.material} 
                      onValueChange={(value) => setEditedQuote({...editedQuote, material: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Couro Sintético">Couro Sintético</SelectItem>
                        <SelectItem value="Couro Natural">Couro Natural</SelectItem>
                        <SelectItem value="Tecido">Tecido</SelectItem>
                        <SelectItem value="Veludo">Veludo</SelectItem>
                        <SelectItem value="Linho">Linho</SelectItem>
                        <SelectItem value="Algodão">Algodão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Cor</label>
                    <Input 
                      value={editedQuote.color} 
                      onChange={(e) => setEditedQuote({...editedQuote, color: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Status</label>
                    <Select 
                      value={editedQuote.status} 
                      onValueChange={(value) => setEditedQuote({...editedQuote, status: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="contacted">Contatado</SelectItem>
                        <SelectItem value="approved">Aprovado</SelectItem>
                        <SelectItem value="rejected">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="text-sm text-gray-500">Descrição</label>
                <Textarea 
                  value={editedQuote.description}
                  onChange={(e) => setEditedQuote({...editedQuote, description: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              {/* Seção de imagens */}
              {editedQuote.images && editedQuote.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-[#87b091] text-lg mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Imagens Anexadas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {editedQuote.images.map((image, index) => (
                      <div 
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border border-[#c4d4ab]"
                      >
                        <img 
                          src={image} 
                          alt={`Imagem ${index + 1} do orçamento`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500"
                          onClick={() => {
                            const newImages = [...editedQuote.images];
                            newImages.splice(index, 1);
                            setEditedQuote({...editedQuote, images: newImages});
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={closeQuoteEdit}
                  className="border-[#c4d4ab] hover:bg-[#eff0d5]"
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[#87b091] hover:bg-[#87b091]/80"
                  onClick={saveQuoteChanges}
                >
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Diálogo de confirmação para excluir imagem */}
        <AlertDialog 
          open={!!confirmDeleteImage}
          onOpenChange={(open) => !open && setConfirmDeleteImage(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esta imagem? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-[#c4d4ab] hover:bg-[#eff0d5] text-[#171430]">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  if (confirmDeleteImage) {
                    const { quoteId, imageIndex } = confirmDeleteImage;
                    setEditedQuote(prev => {
                      const newImages = [...prev.images];
                      newImages.splice(imageIndex, 1);
                      return { ...prev, images: newImages };
                    });
                    setConfirmDeleteImage(null);
                  }
                }}
              >
                Excluir Imagem
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default AdminQuotes;
