
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Image, Scissors } from "lucide-react";

/**
 * Interface que define a estrutura de um material
 */
interface Material {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  color: string;
  type: string;
}

/**
 * AdminMaterials - Componente para gerenciamento de materiais pelo administrador
 * 
 * Permite:
 * - Adicionar novos materiais disponíveis para estofados
 * - Editar materiais existentes
 * - Excluir materiais
 * - Visualizar todos os materiais cadastrados em um grid
 * 
 * Substituição por API:
 * Em um ambiente de produção, todas as operações CRUD devem ser substituídas 
 * por chamadas à API:
 * 
 * - GET /api/materials - Obter todos os materiais
 * - GET /api/materials/:id - Obter um material específico
 * - POST /api/materials - Adicionar um novo material
 * - PUT /api/materials/:id - Atualizar um material existente
 * - DELETE /api/materials/:id - Excluir um material
 */
const AdminMaterials = () => {
  // Estado para armazenar a lista de materiais
  // Em produção, deve ser substituído por uma chamada à API
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      title: "Veludo Azul Royal",
      description: "Tecido de veludo premium, macio ao toque e resistente a manchas.",
      price: 89.90,
      imageUrl: "https://images.unsplash.com/photo-1568001518573-5cc143baf094",
      color: "Azul",
      type: "Veludo"
    },
    {
      id: 2,
      title: "Couro Sintético Bege",
      description: "Couro sintético resistente à água e rasgos, ideal para famílias com pets.",
      price: 120.50,
      imageUrl: "https://images.unsplash.com/photo-1585904306425-2aa8e7737029",
      color: "Bege",
      type: "Couro Sintético"
    },
    {
      id: 3,
      title: "Linho Natural",
      description: "Tecido em linho natural respirável, confortável em todas as estações.",
      price: 75.00,
      imageUrl: "https://images.unsplash.com/photo-1534889156217-d643df14f14a",
      color: "Bege Claro",
      type: "Linho"
    },
    {
      id: 4,
      title: "Chenille Verde Musgo",
      description: "Chenille de alta durabilidade com textura agradável e resistência a manchas.",
      price: 95.75,
      imageUrl: "https://images.unsplash.com/photo-1603912699214-92627f304eb6",
      color: "Verde",
      type: "Chenille"
    },
    {
      id: 5,
      title: "Suede Cinza",
      description: "Suede premium com tratamento anti-manchas e proteção UV.",
      price: 110.00,
      imageUrl: "https://images.unsplash.com/photo-1679011769382-b0ee4e3362b9",
      color: "Cinza",
      type: "Suede"
    },
  ]);

  // Estado para controlar o modal de visualização detalhada
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  // Material sendo visualizado
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);

  // Estado para controlar o modal de confirmação de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // ID do material a ser excluído
  const [materialToDelete, setMaterialToDelete] = useState<number | null>(null);
  
  // Estado para controlar o modal de edição/adição
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<Material>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    color: "",
    type: ""
  });

  // Estado para controlar se estamos editando ou adicionando um novo material
  const [isEditing, setIsEditing] = useState(false);
  // Hook para navegação
  const navigate = useNavigate();

  /**
   * Abre o modal de visualização detalhada de um material
   * @param material - Material a ser visualizado em detalhes
   * 
   * Em produção: pode ser necessário buscar dados adicionais da API
   * GET /api/materials/:id
   */
  const handleViewMaterial = (material: Material) => {
    setViewingMaterial(material);
    setIsViewDialogOpen(true);
  };

  /**
   * Manipula a abertura do modal de edição com os dados do material selecionado
   * @param material - Material a ser editado
   * 
   * Em produção: pode ser necessário buscar dados adicionais da API
   * GET /api/materials/:id
   */
  const handleEditMaterial = (material: Material) => {
    setFormData(material);
    setIsEditing(true);
    setIsEditDialogOpen(true);
  };

  /**
   * Abre o modal para adicionar um novo material com o formulário em branco
   */
  const handleAddMaterial = () => {
    setFormData({
      id: Math.max(0, ...materials.map(material => material.id)) + 1,
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      color: "",
      type: ""
    });
    setIsEditing(false);
    setIsEditDialogOpen(true);
  };

  /**
   * Manipula a exclusão de um material, abrindo o modal de confirmação
   * @param id - ID do material a ser excluído
   */
  const handleDeleteMaterial = (id: number) => {
    setMaterialToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirma a exclusão do material e atualiza o estado
   * 
   * Em produção: deve enviar uma requisição DELETE para a API
   * DELETE /api/materials/:id
   */
  const confirmDelete = () => {
    if (materialToDelete !== null) {
      setMaterials(prev => prev.filter(material => material.id !== materialToDelete));
      toast({
        title: "Material excluído",
        description: "O material foi removido com sucesso."
      });
      setIsDeleteDialogOpen(false);
      setMaterialToDelete(null);
    }
  };

  /**
   * Manipula alterações nos campos do formulário
   * @param field - Campo a ser atualizado
   * @param value - Novo valor do campo
   */
  const handleInputChange = (field: keyof Material, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Salva o material (novo ou editado) na lista
   * 
   * Em produção:
   * - Para edição: PUT /api/materials/:id
   * - Para criação: POST /api/materials
   */
  const handleSaveMaterial = () => {
    // Validações básicas de formulário
    if (!formData.title || !formData.type || !formData.imageUrl) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      // Atualiza material existente
      setMaterials(prev => 
        prev.map(material => material.id === formData.id ? formData : material)
      );
      toast({
        title: "Material atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    } else {
      // Adiciona novo material
      setMaterials(prev => [...prev, formData]);
      toast({
        title: "Material adicionado",
        description: "O novo material foi adicionado com sucesso."
      });
    }
    
    setIsEditDialogOpen(false);
  };

  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Materiais</h1>
          <p className="text-gray-500 mt-1">Adicione, edite ou remova materiais disponíveis para estofados</p>
        </div>
        <Button onClick={handleAddMaterial} className="flex items-center gap-2 bg-[#87b091] hover:bg-[#87b091]/80">
          <Plus size={16} />
          Adicionar Material
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {materials.map((material) => (
          <Card 
            key={material.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border-[#c4d4ab]"
            onClick={() => handleViewMaterial(material)}
          >
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <img 
                src={material.imageUrl} 
                alt={material.title} 
                className="w-full h-full object-cover"
                onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=Material"}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-7 w-7 bg-white rounded-full opacity-90 hover:opacity-100 border-[#87b091]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditMaterial(material);
                  }}
                >
                  <Pencil size={14} className="text-[#171430]" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-7 w-7 bg-white rounded-full opacity-90 hover:opacity-100 text-red-500 hover:text-red-600 border-[#87b091]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMaterial(material.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <CardContent className="p-2">
              <h3 className="font-medium text-sm truncate">{material.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-[#87b091]">{material.type}</span>
                <span className="text-xs font-medium">R$ {material.price.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para visualização detalhada do material */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#eff0d5] border-[#87b091]">
          <DialogHeader>
            <DialogTitle className="text-[#171430]">{viewingMaterial?.title}</DialogTitle>
          </DialogHeader>
          {viewingMaterial && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-md overflow-hidden aspect-square">
                <img 
                  src={viewingMaterial.imageUrl} 
                  alt={viewingMaterial.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Material"}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-[#171430]">{viewingMaterial.title}</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm font-medium">Tipo:</span>
                    <span className="text-sm ml-2">{viewingMaterial.type}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Cor:</span>
                    <span className="text-sm ml-2">{viewingMaterial.color}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Preço:</span>
                    <span className="text-sm ml-2">R$ {viewingMaterial.price.toFixed(2)} /m²</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium">Descrição:</span>
                  <p className="text-sm mt-1 text-gray-600">{viewingMaterial.description}</p>
                </div>
                <div className="mt-auto flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
                    onClick={() => handleEditMaterial(viewingMaterial)}
                  >
                    <Pencil size={16} className="mr-2" />
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleDeleteMaterial(viewingMaterial.id);
                    }}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para edição/adição de material */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#eff0d5] border-[#87b091]">
          <DialogHeader>
            <DialogTitle className="text-[#171430]">{isEditing ? "Editar Material" : "Adicionar Novo Material"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nome do Material</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Input 
                  id="type" 
                  value={formData.type} 
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  placeholder="Ex: Veludo, Couro, Linho"
                  className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Cor</Label>
                <Input 
                  id="color" 
                  value={formData.color} 
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$/m²)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                  step="0.01"
                  className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <div className="flex gap-3">
                <Input 
                  id="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  className="flex-1 border-[#c4d4ab] focus-visible:ring-[#87b091]"
                />
                {formData.imageUrl && (
                  <div className="h-10 w-10 overflow-hidden rounded border border-[#c4d4ab]">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Erro"}
                    />
                  </div>
                )}
              </div>
            </div>
            {formData.imageUrl && (
              <div className="bg-[#e0e0b6]/30 rounded p-2 mt-2">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <div className="h-40 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Erro+na+Imagem"}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveMaterial}
              className="bg-[#87b091] hover:bg-[#87b091]/80"
            >
              {isEditing ? "Salvar alterações" : "Adicionar material"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#eff0d5] border-[#87b091]">
          <DialogHeader>
            <DialogTitle className="text-[#171430]">Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">Tem certeza que deseja excluir este material? Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
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

      {/* Botão para voltar para dashboard */}
      <div className="mt-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
        >
          Voltar ao Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminMaterials;
