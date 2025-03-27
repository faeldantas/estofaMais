
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Interface que define a estrutura de um serviço
 */
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  materials: string[];
  beforeAfterImages: {
    before: string;
    after: string;
  }[];
}

/**
 * Interface do formulário para adicionar/editar serviços
 */
interface ServiceForm {
  id: number;
  title: string;
  description: string;
  icon: string;
  materials: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}

/**
 * AdminServices - Componente para gerenciamento de serviços pelo administrador
 * 
 * Permite:
 * - Adicionar novos serviços oferecidos pela empresa
 * - Editar serviços existentes
 * - Excluir serviços
 * - Visualizar todos os serviços cadastrados
 */
const AdminServices = () => {
  // Estado para armazenar a lista de serviços
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Reforma de Sofás",
      description: "Renovamos completamente seus sofás, sejam eles de 2, 3 ou mais lugares. Trocamos espumas, molas, tecidos e estruturas danificadas para devolver o conforto e a beleza originais do seu móvel.",
      icon: "Sofa",
      materials: ["Suede", "Couro", "Veludo", "Linho", "Chenille"],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          after: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]
    },
    {
      id: 2,
      title: "Reforma de Cadeiras",
      description: "Restauramos cadeiras de jantar, escritório, poltronas e banquetas. Recuperamos o conforto e a estética de suas cadeiras com materiais de alta qualidade e acabamento impecável.",
      icon: "Armchair",
      materials: ["Tecido Impermeável", "Couro Sintético", "Microfibra", "Couro Natural", "Tecidos Estampados"],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          after: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]
    },
    {
      id: 3,
      title: "Estofamento Automotivo",
      description: "Especializados em reforma de bancos de carros, motos e outros veículos. Trabalhamos com diferentes modelos e oferecemos opções de personalização para deixar seu veículo com sua identidade.",
      icon: "Car",
      materials: ["Couro Automotivo", "Couro Ecológico", "Tecido Automotivo", "Alcântara", "Neoprene"],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          after: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]
    }
  ]);

  // Estado para controlar o modal de confirmação de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // ID do item a ser excluído
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  // Estado para controlar o modal de edição/adição
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<ServiceForm>({
    id: 0,
    title: "",
    description: "",
    icon: "",
    materials: "",
    beforeImageUrl: "",
    afterImageUrl: ""
  });

  // Estado para controlar se estamos editando ou adicionando um novo serviço
  const [isEditing, setIsEditing] = useState(false);
  // Hook para navegação
  const navigate = useNavigate();

  /**
   * Manipula a abertura do modal de edição com os dados do serviço selecionado
   * @param service - Serviço a ser editado
   */
  const handleEditService = (service: Service) => {
    setFormData({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      materials: service.materials.join(", "),
      beforeImageUrl: service.beforeAfterImages[0]?.before || "",
      afterImageUrl: service.beforeAfterImages[0]?.after || ""
    });
    setIsEditing(true);
    setIsEditDialogOpen(true);
  };

  /**
   * Abre o modal para adicionar um novo serviço com o formulário em branco
   */
  const handleAddService = () => {
    setFormData({
      id: Math.max(0, ...services.map(service => service.id)) + 1,
      title: "",
      description: "",
      icon: "",
      materials: "",
      beforeImageUrl: "",
      afterImageUrl: ""
    });
    setIsEditing(false);
    setIsEditDialogOpen(true);
  };

  /**
   * Manipula a exclusão de um serviço, abrindo o modal de confirmação
   * @param id - ID do serviço a ser excluído
   */
  const handleDeleteService = (id: number) => {
    setServiceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirma a exclusão do serviço e atualiza o estado
   */
  const confirmDelete = () => {
    if (serviceToDelete !== null) {
      setServices(prev => prev.filter(service => service.id !== serviceToDelete));
      toast({
        title: "Serviço excluído",
        description: "O serviço foi removido com sucesso."
      });
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  /**
   * Manipula alterações nos campos do formulário
   * @param field - Campo a ser atualizado
   * @param value - Novo valor do campo
   */
  const handleInputChange = (field: keyof ServiceForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Salva o serviço (novo ou editado) na lista
   */
  const handleSaveService = () => {
    // Validações básicas de formulário
    if (!formData.title || !formData.description || !formData.icon) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Preparando o objeto de serviço atualizado
    const updatedService: Service = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      materials: formData.materials.split(",").map(item => item.trim()),
      beforeAfterImages: [
        {
          before: formData.beforeImageUrl,
          after: formData.afterImageUrl
        }
      ]
    };

    if (isEditing) {
      // Atualiza serviço existente
      setServices(prev => 
        prev.map(service => service.id === formData.id ? updatedService : service)
      );
      toast({
        title: "Serviço atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    } else {
      // Adiciona novo serviço
      setServices(prev => [...prev, updatedService]);
      toast({
        title: "Serviço adicionado",
        description: "O novo serviço foi adicionado com sucesso."
      });
    }
    
    setIsEditDialogOpen(false);
  };

  /**
   * Renderiza um ícone baseado no nome
   * @param iconName - Nome do ícone
   */
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Sofa":
        return "🛋️";
      case "Armchair":
        return "🪑";
      case "Car":
        return "🚗";
      default:
        return "📦";
    }
  };

  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Serviços</h1>
          <p className="text-gray-500 mt-1">Adicione, edite ou remova serviços oferecidos</p>
        </div>
        <Button onClick={handleAddService} className="flex items-center gap-2">
          <Plus size={16} />
          Adicionar Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleEditService(service)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-3 line-clamp-3">{service.description}</p>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Materiais:</p>
                <div className="flex flex-wrap gap-2">
                  {service.materials.map((material, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-50">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              {service.beforeAfterImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Antes</p>
                    <div className="h-20 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={service.beforeAfterImages[0].before}
                        alt="Antes"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Depois</p>
                    <div className="h-20 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={service.beforeAfterImages[0].after}
                        alt="Depois"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para edição/adição de serviço */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Serviço" : "Adicionar Novo Serviço"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Serviço</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Ícone</Label>
              <select
                id="icon"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.icon}
                onChange={(e) => handleInputChange("icon", e.target.value)}
              >
                <option value="">Selecione um ícone</option>
                <option value="Sofa">Sofá</option>
                <option value="Armchair">Cadeira</option>
                <option value="Car">Carro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">
                Materiais (separados por vírgula)
              </Label>
              <Input 
                id="materials" 
                value={formData.materials} 
                onChange={(e) => handleInputChange("materials", e.target.value)}
                placeholder="Ex: Veludo, Couro, Linho"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beforeImageUrl">Imagem Antes</Label>
                <Input 
                  id="beforeImageUrl" 
                  value={formData.beforeImageUrl} 
                  onChange={(e) => handleInputChange("beforeImageUrl", e.target.value)}
                  placeholder="URL da imagem 'antes'"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="afterImageUrl">Imagem Depois</Label>
                <Input 
                  id="afterImageUrl" 
                  value={formData.afterImageUrl} 
                  onChange={(e) => handleInputChange("afterImageUrl", e.target.value)}
                  placeholder="URL da imagem 'depois'"
                />
              </div>
            </div>
            {/* Preview das imagens */}
            {(formData.beforeImageUrl || formData.afterImageUrl) && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                {formData.beforeImageUrl && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preview - Antes</p>
                    <div className="h-24 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={formData.beforeImageUrl}
                        alt="Preview Antes"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Erro+na+Imagem"}
                      />
                    </div>
                  </div>
                )}
                {formData.afterImageUrl && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preview - Depois</p>
                    <div className="h-24 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={formData.afterImageUrl}
                        alt="Preview Depois"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Erro+na+Imagem"}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveService}>
              {isEditing ? "Salvar alterações" : "Adicionar serviço"}
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
          <p className="py-4">Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.</p>
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

export default AdminServices;
