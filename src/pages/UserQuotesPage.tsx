
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, Image as ImageIcon } from "lucide-react";

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
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

/**
 * UserQuotesPage - Página para usuários visualizarem seus orçamentos
 * 
 * Esta página permite:
 * 1. Visualizar todos os orçamentos enviados pelo usuário
 * 2. Ver detalhes de cada orçamento
 * 3. Editar orçamentos que ainda não foram aprovados
 * 
 * Em um ambiente de produção, os dados mock devem ser substituídos por chamadas à API:
 * - GET /api/user/quotes - Para listar todos os orçamentos do usuário
 * - GET /api/quotes/:id - Para obter detalhes de um orçamento específico
 * - PUT /api/quotes/:id - Para atualizar um orçamento
 */
const UserQuotesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedQuote, setEditedQuote] = useState(null);
  
  // Dados mock para simulação - em produção seriam carregados da API
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
      name: "João Silva",
      email: "joao@exemplo.com",
      phone: "(11) 98765-4321",
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
      name: "João Silva",
      email: "joao@exemplo.com",
      phone: "(11) 98765-4321",
      service: "Reforma de Cadeiras",
      material: "Veludo",
      color: "Verde Escuro",
      description: "6 cadeiras de jantar com assentos danificados",
      date: "2025-03-20",
      status: "approved",
      images: []
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

  /**
   * Função para verificar se um orçamento pode ser editado
   * Orçamentos podem ser editados apenas se estiverem pendentes
   * @param {string} status - Status do orçamento
   * @returns {boolean} - Se o orçamento pode ser editado
   */
  const canEdit = (status) => {
    return status === 'pending';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Cabeçalho da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#171430]">Meus Orçamentos</h1>
          <p className="text-gray-600 mt-2">
            Visualize e gerencie seus pedidos de orçamento.
          </p>
        </div>

        {/* Tabela de orçamentos */}
        <Card className="border-[#c4d4ab] shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-[#eff0d5]">
                <TableRow>
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
                    <TableCell className="font-medium">{quote.service}</TableCell>
                    <TableCell>{quote.material}</TableCell>
                    <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-[#87b091] hover:bg-[#eff0d5] hover:text-[#171430]"
                          onClick={() => openQuoteDetails(quote)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {canEdit(quote.status) && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-[#87b091] hover:bg-[#eff0d5] hover:text-[#171430]"
                            onClick={() => openQuoteEdit(quote)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {quotes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Você ainda não possui orçamentos.
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
                  Visualize os detalhes do seu pedido de orçamento.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#87b091] text-lg">Informações do Serviço</h3>
                  
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

                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Status Atual</p>
                    <div>{renderStatusBadge(selectedQuote.status)}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[#87b091] text-lg">Descrição</h3>
                  <p className="text-gray-700 bg-[#eff0d5]/50 p-4 rounded-md border border-[#c4d4ab] min-h-[100px]">
                    {selectedQuote.description}
                  </p>
                </div>
              </div>

              {/* Seção de imagens */}
              {selectedQuote.images && selectedQuote.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-[#87b091] text-lg mb-4">
                    Imagens Anexadas
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

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={closeQuoteDetails}
                  className="border-[#c4d4ab] hover:bg-[#eff0d5]"
                >
                  Fechar
                </Button>
                {canEdit(selectedQuote.status) && (
                  <Button
                    className="bg-[#87b091] hover:bg-[#87b091]/80"
                    onClick={() => {
                      closeQuoteDetails();
                      openQuoteEdit(selectedQuote);
                    }}
                  >
                    Editar Orçamento
                  </Button>
                )}
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
                  Modifique os detalhes do seu pedido de orçamento.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
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
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Descrição</label>
                    <Textarea 
                      value={editedQuote.description}
                      onChange={(e) => setEditedQuote({...editedQuote, description: e.target.value})}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
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
      </div>
    </Layout>
  );
};

export default UserQuotesPage;
