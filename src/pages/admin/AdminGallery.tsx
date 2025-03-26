
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash, ArrowLeft } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Gallery, GalleryImage } from "@/components/Gallery";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

/**
 * Interface para o formulário de edição/adição de item na galeria
 */
interface GalleryItemForm {
  id?: number;
  title: string;
  category: string;
  materials: string;
  color: string;
  price: number;
  src: string;
  alt: string;
}

/**
 * AdminGallery - Componente para gerenciamento da galeria de trabalhos
 * 
 * Este componente:
 * 1. Lista os itens existentes na galeria com opções de edição e exclusão
 * 2. Permite adicionar novos itens à galeria
 * 3. Restringe o acesso apenas a usuários administradores
 */
const AdminGallery = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Estados para controlar os diálogos e formulários
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItemForm>({
    title: "",
    category: "sofas",
    materials: "",
    color: "",
    price: 0,
    src: "",
    alt: ""
  });
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Redireciona para a home se o usuário não for administrador
  if (!isAdmin) {
    navigate("/");
    toast({
      title: "Acesso restrito",
      description: "Você não tem permissão para acessar esta página.",
      variant: "destructive"
    });
    return null;
  }

  // Simulação de dados da galeria - em uma implementação real, isso viria de uma API/banco de dados
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([
    {
      id: 1,
      src: "https://i.pinimg.com/736x/a8/e1/ea/a8e1ea4b2a8ee4728d34da005563e28c.jpg",
      alt: "Sofá reformado",
      category: "sofas",
      materials: "Veludo azul",
      title: "Reforma de Sofá 3 Lugares",
      color: "Azul",
      price: 1850
    },
    {
      id: 2,
      src: "https://i.pinimg.com/736x/cd/cf/30/cdcf30541a308e158c1055242e423261.jpg",
      alt: "Cadeira de jantar reformada",
      category: "chairs",
      materials: "Linho bege",
      title: "Reforma de Cadeiras de Jantar",
      color: "Bege",
      price: 750
    },
    {
      id: 3,
      src: "https://i.pinimg.com/736x/a5/17/d2/a517d2c4b5b9f315533a20d8bdebeb69.jpg",
      alt: "Interior de carro reformado",
      category: "cars",
      materials: "Couro sintético preto",
      title: "Estofamento de Bancos Automotivos",
      color: "Preto",
      price: 2350
    },
  ]);

  /**
   * Função para abrir o diálogo de adição de novo item
   */
  const handleAddNew = () => {
    setCurrentItem({
      title: "",
      category: "sofas",
      materials: "",
      color: "",
      price: 0,
      src: "",
      alt: ""
    });
    setIsAddDialogOpen(true);
  };

  /**
   * Função para abrir o diálogo de edição de item existente
   */
  const handleEdit = (item: GalleryImage) => {
    setCurrentItem({ ...item });
    setIsEditDialogOpen(true);
  };

  /**
   * Função para abrir o diálogo de confirmação de exclusão
   */
  const handleDeleteConfirm = (id: number) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Função para salvar um novo item na galeria
   */
  const handleSaveNew = () => {
    // Validação simples
    if (!currentItem.title || !currentItem.src) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Cria um novo item com ID único
    const newItem: GalleryImage = {
      ...currentItem,
      id: Math.max(0, ...galleryItems.map(item => item.id)) + 1
    };

    // Adiciona o novo item à lista
    setGalleryItems([...galleryItems, newItem]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Item adicionado",
      description: "O item foi adicionado à galeria com sucesso."
    });
  };

  /**
   * Função para atualizar um item existente
   */
  const handleUpdateItem = () => {
    // Validação simples
    if (!currentItem.title || !currentItem.src) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Atualiza o item na lista
    setGalleryItems(galleryItems.map(item => 
      item.id === currentItem.id ? currentItem as GalleryImage : item
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Item atualizado",
      description: "O item foi atualizado com sucesso."
    });
  };

  /**
   * Função para excluir um item da galeria
   */
  const handleDeleteItem = () => {
    if (itemToDelete) {
      // Remove o item da lista
      setGalleryItems(galleryItems.filter(item => item.id !== itemToDelete));
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
      
      toast({
        title: "Item excluído",
        description: "O item foi removido da galeria."
      });
    }
  };

  /**
   * Função para atualizar um campo do formulário
   */
  const handleChange = (field: keyof GalleryItemForm, value: string | number) => {
    setCurrentItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Cabeçalho da página */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin")}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao painel
            </Button>
            <h1 className="text-3xl font-bold">Gerenciar Galeria</h1>
            <p className="text-gray-600 mt-2">
              Adicione, edite ou remova itens da galeria de trabalhos.
            </p>
          </div>
          
          <Button onClick={handleAddNew} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Novo Item
          </Button>
        </div>

        {/* Tabela de itens da galeria */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {galleryItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category === "sofas" && "Sofás"}
                    {item.category === "chairs" && "Cadeiras"}
                    {item.category === "cars" && "Automóveis"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteConfirm(item.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exibição da galeria */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Preview da Galeria</h2>
          <Gallery images={galleryItems} />
        </div>

        {/* Diálogo para adicionar novo item */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título*</Label>
                  <Input
                    id="title"
                    value={currentItem.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Ex: Reforma de Sofá 3 Lugares"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria*</Label>
                  <Select
                    value={currentItem.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sofas">Sofás</SelectItem>
                      <SelectItem value="chairs">Cadeiras</SelectItem>
                      <SelectItem value="cars">Automóveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materials">Materiais</Label>
                  <Input
                    id="materials"
                    value={currentItem.materials}
                    onChange={(e) => handleChange("materials", e.target.value)}
                    placeholder="Ex: Veludo azul"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    value={currentItem.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    placeholder="Ex: Azul"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentItem.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    placeholder="Ex: 1850"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="src">URL da Imagem*</Label>
                  <Input
                    id="src"
                    value={currentItem.src}
                    onChange={(e) => handleChange("src", e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt">Descrição da Imagem</Label>
                <Input
                  id="alt"
                  value={currentItem.alt}
                  onChange={(e) => handleChange("alt", e.target.value)}
                  placeholder="Ex: Sofá reformado com tecido azul"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNew}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo para editar item existente */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Editar Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Título*</Label>
                  <Input
                    id="edit-title"
                    value={currentItem.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categoria*</Label>
                  <Select
                    value={currentItem.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sofas">Sofás</SelectItem>
                      <SelectItem value="chairs">Cadeiras</SelectItem>
                      <SelectItem value="cars">Automóveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-materials">Materiais</Label>
                  <Input
                    id="edit-materials"
                    value={currentItem.materials}
                    onChange={(e) => handleChange("materials", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-color">Cor</Label>
                  <Input
                    id="edit-color"
                    value={currentItem.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Preço (R$)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentItem.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-src">URL da Imagem*</Label>
                  <Input
                    id="edit-src"
                    value={currentItem.src}
                    onChange={(e) => handleChange("src", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-alt">Descrição da Imagem</Label>
                <Input
                  id="edit-alt"
                  value={currentItem.alt}
                  onChange={(e) => handleChange("alt", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateItem}>Atualizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de confirmação de exclusão */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700">
                Tem certeza que deseja excluir este item da galeria? Esta ação não pode ser desfeita.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteItem}
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdminGallery;
