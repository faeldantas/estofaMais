
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
 * Props do componente MaterialSelector
 */
interface MaterialSelectorProps {
  onSelectMaterial: (material: Material) => void;
}

/**
 * MaterialSelector - Componente para seleção de materiais via modal
 * 
 * Permite:
 * - Abrir um modal com a listagem de materiais disponíveis
 * - Filtrar materiais por nome
 * - Selecionar um material para uso no formulário de orçamento
 */
const MaterialSelector = ({ onSelectMaterial }: MaterialSelectorProps) => {
  // Estado para controlar a abertura do modal
  const [isOpen, setIsOpen] = useState(false);
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState("");

  // Materiais disponíveis (dados mockados)
  const materials: Material[] = [
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
    {
      id: 6,
      title: "Couro Natural Marrom",
      description: "Couro legítimo de alta qualidade, durável e com acabamento premium.",
      price: 245.90,
      imageUrl: "https://images.unsplash.com/photo-1620812067859-29c4a5fabe82",
      color: "Marrom",
      type: "Couro Natural"
    },
    {
      id: 7,
      title: "Tecido Impermeável Cinza",
      description: "Tecido com tratamento impermeável, ideal para famílias com crianças.",
      price: 135.00,
      imageUrl: "https://images.unsplash.com/photo-1618160672147-4fe7f11fd8ed",
      color: "Cinza",
      type: "Tecido Impermeável"
    },
    {
      id: 8,
      title: "Microfibra Vermelha",
      description: "Tecido em microfibra macio e fácil de limpar, resistente ao desgaste diário.",
      price: 98.50,
      imageUrl: "https://images.unsplash.com/photo-1585766765925-b40475104d21",
      color: "Vermelho",
      type: "Microfibra"
    },
  ];

  // Filtra os materiais de acordo com o termo de pesquisa
  const filteredMaterials = materials.filter(
    material => material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               material.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
               material.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Manipula a seleção de um material
   * @param material - Material selecionado
   */
  const handleSelectMaterial = (material: Material) => {
    onSelectMaterial(material);
    setIsOpen(false);
    setSearchTerm(""); // Reset da pesquisa após seleção
  };

  return (
    <>
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="w-full bg-brand-green-light/30 hover:bg-brand-green-light/50 text-brand-dark border-brand-green"
      >
        Selecionar Material
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-brand-cream border-brand-green">
          <DialogHeader>
            <DialogTitle className="text-brand-dark text-xl">Selecione um Material</DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-dark" />
            <Input
              type="text"
              placeholder="Buscar por nome, tipo ou cor..."
              className="pl-10 border-brand-green focus-visible:ring-brand-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMaterials.map((material) => (
              <div 
                key={material.id} 
                className="bg-white rounded-lg overflow-hidden border hover:border-brand-green hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleSelectMaterial(material)}
              >
                <div className="aspect-square bg-brand-green-lighter/20 relative overflow-hidden">
                  <img 
                    src={material.imageUrl} 
                    alt={material.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=Material"}
                  />
                </div>
                <div className="p-3 bg-brand-cream">
                  <h3 className="font-medium text-sm truncate text-brand-dark">{material.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-brand-dark/70">{material.type}</span>
                    <span className="text-xs font-medium text-brand-green">R$ {material.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMaterials.length === 0 && (
            <div className="text-center p-10 bg-brand-green-lighter/20 rounded-lg">
              <p className="text-brand-dark">Nenhum material encontrado. Tente outra pesquisa.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MaterialSelector;
