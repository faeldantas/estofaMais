
import { useState } from "react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
 * MaterialsPage - Página para visualização do catálogo de materiais
 * 
 * Permite:
 * - Visualizar todos os materiais disponíveis em um grid
 * - Filtrar materiais por tipo e cor
 * - Ver detalhes de cada material em um modal
 */
const MaterialsPage = () => {
  // Estado para armazenar a lista de materiais (dados mockados)
  const [materials] = useState<Material[]>([
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
  ]);

  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para armazenar o filtro de tipo de material
  const [typeFilter, setTypeFilter] = useState("all");
  // Estado para armazenar o filtro de cor
  const [colorFilter, setColorFilter] = useState("all");

  // Estado para controlar o modal de detalhes
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  // Estado para armazenar o material sendo visualizado
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  /**
   * Abre o modal com detalhes do material selecionado
   * @param material - Material selecionado para visualização
   */
  const handleOpenDetails = (material: Material) => {
    setSelectedMaterial(material);
    setIsDetailDialogOpen(true);
  };

  // Extrair todos os tipos únicos de materiais para o filtro
  const materialTypes = ["all", ...Array.from(new Set(materials.map(m => m.type)))];
  
  // Extrair todas as cores únicas para o filtro
  const materialColors = ["all", ...Array.from(new Set(materials.map(m => m.color)))];

  // Filtra os materiais com base nos critérios de pesquisa e filtros
  const filteredMaterials = materials.filter(material => {
    // Filtra por termo de busca no título ou descrição
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtra por tipo de material
    const matchesType = typeFilter === "all" || material.type === typeFilter;
    
    // Filtra por cor
    const matchesColor = colorFilter === "all" || material.color === colorFilter;
    
    // Retorna true apenas se o material atende a todos os critérios
    return matchesSearch && matchesType && matchesColor;
  });

  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Nossos Materiais</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça nossa seleção de tecidos e materiais premium para estofados. 
              Qualidade e durabilidade para transformar seus móveis.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar materiais..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "Todos os tipos" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={colorFilter} 
                    onValueChange={setColorFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cor" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialColors.map(color => (
                        <SelectItem key={color} value={color}>
                          {color === "all" ? "Todas as cores" : color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filteredMaterials.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Nenhum material encontrado</h3>
                <p className="text-gray-600">Tente uma pesquisa diferente ou remova os filtros aplicados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMaterials.map((material) => (
                  <div 
                    key={material.id} 
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleOpenDetails(material)}
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img 
                        src={material.imageUrl} 
                        alt={material.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=Material"}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">{material.title}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{material.type}</span>
                        <span className="text-xs font-medium">R$ {material.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dialog para visualização detalhada do material */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedMaterial?.title}</DialogTitle>
          </DialogHeader>
          {selectedMaterial && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-md overflow-hidden aspect-square">
                <img 
                  src={selectedMaterial.imageUrl} 
                  alt={selectedMaterial.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Material"}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{selectedMaterial.title}</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm font-medium">Tipo:</span>
                    <span className="text-sm ml-2">{selectedMaterial.type}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Cor:</span>
                    <span className="text-sm ml-2">{selectedMaterial.color}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Preço:</span>
                    <span className="text-sm ml-2">R$ {selectedMaterial.price.toFixed(2)} /m²</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium">Descrição:</span>
                  <p className="text-sm mt-1 text-gray-600">{selectedMaterial.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Para solicitar este material, inclua-o em seu pedido de orçamento 
                    ou entre em contato com nossa equipe.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MaterialsPage;
