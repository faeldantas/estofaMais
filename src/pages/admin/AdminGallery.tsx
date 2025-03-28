
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Image, Check } from "lucide-react";
import { GalleryImage } from "@/components/Gallery";

/**
 * Interface que define a estrutura do formulário de item da galeria
 * Todos os campos são obrigatórios para garantir dados completos
 */
interface GalleryItemForm {
  id: number;
  src: string;
  alt: string;
  category: string;
  materials: string;
  title: string;
  color: string;
  price: number;
}

/**
 * Interface para os orçamentos prontos
 */
interface ReadyQuote {
  id: number;
  service: string;
  images: string[];
  status: string;
}

/**
 * AdminGallery - Componente para gerenciamento de itens da galeria pelo administrador
 * 
 * Permite:
 * - Adicionar novos itens à galeria
 * - Editar itens existentes
 * - Excluir itens da galeria
 * - Visualizar todos os itens cadastrados
 * - Selecionar imagens de orçamentos marcados como "pronto"
 */
const AdminGallery = () => {
  // Estado para armazenar os itens da galeria
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "Sofá reformado",
      category: "sofas",
      materials: "Veludo azul",
      title: "Reforma de Sofá 3 Lugares",
      color: "Azul",
      price: 1850
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      alt: "Cadeira de jantar reformada",
      category: "chairs",
      materials: "Linho bege",
      title: "Reforma de Cadeiras de Jantar",
      color: "Bege",
      price: 750
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Interior de carro reformado",
      category: "cars",
      materials: "Couro sintético preto",
      title: "Estofamento de Bancos Automotivos",
      color: "Preto",
      price: 2200
    }
  ]);

  // Estado para armazenar orçamentos prontos
  const [readyQuotes, setReadyQuotes] = useState<ReadyQuote[]>([
    {
      id: 1,
      service: "Estofamento de Sofá",
      status: "ready",
      images: [
        "https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvZmF8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNvZmF8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
      ]
    },
    {
      id: 2,
      service: "Reforma de Cadeiras",
      status: "ready",
      images: [
        "https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
      ]
    }
  ]);

  // Estado para controlar o modal de confirmação de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // ID do item a ser excluído
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  // Estado para controlar o modal de edição/adição
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<GalleryItemForm>({
    id: 0,
    src: "",
    alt: "",
    category: "",
    materials: "",
    title: "",
    color: "",
    price: 0
  });

  // Estado para controlar se estamos editando ou adicionando um novo item
  const [isEditing, setIsEditing] = useState(false);
  // Estado para controlar o modal de seleção de imagens de orçamentos prontos
  const [isQuoteImagesOpen, setIsQuoteImagesOpen] = useState(false);
  // Estado para armazenar a imagem selecionada do orçamento
  const [selectedImage, setSelectedImage] = useState("");
  
  // Hook para navegação
  const navigate = useNavigate();

  /**
   * Manipula a abertura do modal de edição com os dados do item selecionado
   * @param item - Item da galeria a ser editado
   */
  const handleEditItem = (item: GalleryImage) => {
    // Garantimos que todos os campos obrigatórios estejam presentes
    setFormData({
      id: item.id,
      src: item.src,
      alt: item.alt,
      category: item.category,
      materials: item.materials,
      title: item.title,
      color: item.color || "",
      price: item.price || 0
    });
    setIsEditing(true);
    setIsEditDialogOpen(true);
  };

  /**
   * Abre o modal para adicionar um novo item com o formulário em branco
   */
  const handleAddItem = () => {
    // Formulário vazio para novo item
    setFormData({
      id: Math.max(0, ...galleryItems.map(item => item.id)) + 1,
      src: "",
      alt: "",
      category: "",
      materials: "",
      title: "",
      color: "",
      price: 0
    });
    setIsEditing(false);
    setIsEditDialogOpen(true);
  };

  /**
   * Manipula a exclusão de um item, abrindo o modal de confirmação
   * @param id - ID do item a ser excluído
   */
  const handleDeleteItem = (id: number) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirma a exclusão do item e atualiza o estado
   */
  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setGalleryItems(prev => prev.filter(item => item.id !== itemToDelete));
      toast({
        title: "Item excluído",
        description: "O item foi removido da galeria com sucesso."
      });
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  /**
   * Manipula alterações nos campos do formulário
   * @param field - Campo a ser atualizado
   * @param value - Novo valor do campo
   */
  const handleInputChange = (field: keyof GalleryItemForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Salva o item (novo ou editado) na galeria
   */
  const handleSaveItem = () => {
    // Validações básicas de formulário
    if (!formData.title || !formData.src || !formData.category) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      // Atualiza item existente
      setGalleryItems(prev => 
        prev.map(item => item.id === formData.id ? { ...formData } : item)
      );
      toast({
        title: "Item atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    } else {
      // Adiciona novo item
      setGalleryItems(prev => [...prev, { ...formData }]);
      toast({
        title: "Item adicionado",
        description: "O novo item foi adicionado à galeria."
      });
    }
    
    setIsEditDialogOpen(false);
  };

  /**
   * Abre o modal para selecionar imagens de orçamentos prontos
   */
  const openQuoteImagesModal = () => {
    setIsQuoteImagesOpen(true);
  };

  /**
   * Seleciona uma imagem do orçamento e atualiza o formulário
   * @param image - URL da imagem selecionada
   */
  const selectQuoteImage = (image: string) => {
    setSelectedImage(image);
  };

  /**
   * Confirma a seleção da imagem e atualiza o formulário
   */
  const confirmImageSelection = () => {
    if (selectedImage) {
      handleInputChange("src", selectedImage);
      setIsQuoteImagesOpen(false);
      setSelectedImage("");
      toast({
        title: "Imagem selecionada",
        description: "A imagem foi adicionada ao formulário."
      });
    } else {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Selecione uma imagem para continuar.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container py-10 max-w-5xl font-playfair">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Galeria</h1>
          <p className="text-gray-500 mt-1">Adicione, edite ou remova itens da galeria de projetos</p>
        </div>
        <Button onClick={handleAddItem} className="flex items-center gap-2">
          <Plus size={16} />
          Adicionar Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => handleEditItem(item)}
                >
                  <Pencil size={16} />
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 size={16} />
                  Excluir
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 capitalize">Categoria: {item.category}</p>
              <p className="text-sm text-gray-500">Material: {item.materials}</p>
              {item.price && <p className="text-sm font-medium mt-1">R$ {item.price.toLocaleString('pt-BR')}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para edição/adição de item */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Item" : "Adicionar Novo Item"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
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
                <Label htmlFor="color">Cor</Label>
                <Input 
                  id="color" 
                  value={formData.color} 
                  onChange={(e) => handleInputChange("color", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={formData.price.toString()} 
                  onChange={(e) => handleInputChange("price", Number(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">Materiais</Label>
              <Input 
                id="materials" 
                value={formData.materials} 
                onChange={(e) => handleInputChange("materials", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="src" className="flex justify-between">
                <span>URL da Imagem</span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={openQuoteImagesModal}
                  className="flex items-center gap-1 text-xs"
                >
                  <Image size={14} /> Usar imagem de orçamento pronto
                </Button>
              </Label>
              <div className="flex gap-2">
                <Input 
                  id="src" 
                  value={formData.src} 
                  onChange={(e) => handleInputChange("src", e.target.value)}
                  className="flex-1"
                />
                {formData.src && (
                  <div className="h-10 w-10 overflow-hidden rounded border">
                    <img 
                      src={formData.src} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Erro"}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Texto Alternativo (alt)</Label>
              <Input 
                id="alt" 
                value={formData.alt} 
                onChange={(e) => handleInputChange("alt", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveItem}>
              {isEditing ? "Salvar alterações" : "Adicionar item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">Tem certeza que deseja excluir este item da galeria? Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para seleção de imagens de orçamentos prontos */}
      <Dialog open={isQuoteImagesOpen} onOpenChange={setIsQuoteImagesOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Selecionar Imagem de Orçamento Pronto</DialogTitle>
          </DialogHeader>
          
          {readyQuotes.length > 0 ? (
            <div className="space-y-6 my-4">
              {readyQuotes.map((quote) => (
                <div key={quote.id} className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">{quote.service} (ID: {quote.id})</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {quote.images.map((image, index) => (
                      <div 
                        key={index}
                        className={`
                          relative aspect-square rounded-md overflow-hidden border
                          ${selectedImage === image ? 'ring-2 ring-primary' : 'hover:opacity-90'}
                          cursor-pointer
                        `}
                        onClick={() => selectQuoteImage(image)}
                      >
                        <img 
                          src={image} 
                          alt={`Imagem ${index + 1} do orçamento ${quote.id}`}
                          className="h-full w-full object-cover"
                        />
                        {selectedImage === image && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">Não há orçamentos marcados como "pronto" com imagens disponíveis.</p>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsQuoteImagesOpen(false);
                setSelectedImage("");
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={confirmImageSelection}
              disabled={!selectedImage}
            >
              Usar Imagem Selecionada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Botão para voltar para dashboard */}
      <div className="mt-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
        >
          Voltar ao Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminGallery;
