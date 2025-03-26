
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Filter, Palette, DollarSign, Shirt } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

/**
 * Interface que define a estrutura de um item da galeria
 * Especifica todos os dados necessários para exibir e filtrar um projeto
 */
export interface GalleryImage {
  id: number;           // Identificador único da imagem
  src: string;          // URL da imagem
  alt: string;          // Texto alternativo para acessibilidade
  category: string;     // Categoria (sofas, chairs, cars)
  materials: string;    // Materiais utilizados na reforma
  title: string;        // Título/nome do projeto
  color?: string;       // Cor principal (opcional)
  price?: number;       // Preço do serviço (opcional)
}

/**
 * Interface para as props do componente Gallery
 * Define quais dados o componente espera receber
 */
interface GalleryProps {
  images: GalleryImage[];  // Array de imagens a serem exibidas
}

/**
 * Componente Gallery - Exibe uma galeria de imagens com recursos avançados
 * 
 * Funcionalidades:
 * - Exibição de projetos em formato de grade
 * - Filtragem por texto (pesquisa)
 * - Filtragem por material, cor e faixa de preço
 * - Visualização detalhada de cada projeto em modal
 * - Interface responsiva e interativa
 */
export const Gallery = ({ images }: GalleryProps) => {
  // Estados para controlar a interface e filtragem
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);  // Imagem selecionada para visualização detalhada
  const [searchTerm, setSearchTerm] = useState("");                              // Termo de pesquisa
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");          // Material selecionado para filtro
  const [selectedColor, setSelectedColor] = useState<string>("");                // Cor selecionada para filtro
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);     // Faixa de preço para filtro
  const [showFilters, setShowFilters] = useState(false);                         // Controla a exibição do painel de filtros

  // Extrai valores únicos para as opções de filtro
  const allMaterials = Array.from(new Set(images.map(img => img.materials)));    // Lista de materiais únicos
  const allColors = Array.from(new Set(images.filter(img => img.color).map(img => img.color as string)));  // Lista de cores únicas
  
  // Encontra preços mínimo e máximo para o slider
  const prices = images.filter(img => img.price !== undefined).map(img => img.price as number);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

  /**
   * Abre o lightbox para mostrar detalhes da imagem
   * @param image Objeto da imagem selecionada para visualização
   */
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  /**
   * Fecha o lightbox
   */
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  /**
   * Manipula mudança no filtro de material
   * @param value Valor do material selecionado
   */
  const handleMaterialChange = (value: string) => {
    setSelectedMaterial(value === "all" ? "" : value);
  };

  /**
   * Manipula mudança no filtro de cor
   * @param value Valor da cor selecionada
   */
  const handleColorChange = (value: string) => {
    setSelectedColor(value === "all" ? "" : value);
  };

  /**
   * Manipula mudança na faixa de preço
   * @param value Array com valores mínimo e máximo de preço
   */
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  /**
   * Limpa todos os filtros aplicados
   * Restaura os estados para seus valores iniciais
   */
  const clearFilters = () => {
    setSelectedMaterial("");
    setSelectedColor("");
    setPriceRange([minPrice, maxPrice]);
    setSearchTerm("");
  };

  /**
   * Filtra imagens com base em todos os critérios selecionados
   * Aplica filtros de pesquisa, material, cor e preço
   */
  const filteredImages = images.filter(image => {
    // Corresponde ao termo de pesquisa (título ou material)
    const matchesSearch = searchTerm === "" || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.materials.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Corresponde ao material selecionado
    const matchesMaterial = selectedMaterial === "" || 
      image.materials.toLowerCase() === selectedMaterial.toLowerCase();
    
    // Corresponde à cor selecionada
    const matchesColor = selectedColor === "" || 
      (image.color && image.color.toLowerCase() === selectedColor.toLowerCase());
    
    // Corresponde à faixa de preço
    const matchesPrice = !image.price || 
      (image.price >= priceRange[0] && image.price <= priceRange[1]);
    
    // Retorna true apenas se todos os critérios forem atendidos
    return matchesSearch && matchesMaterial && matchesColor && matchesPrice;
  });

  /**
   * Formata preço como moeda brasileira (R$)
   * @param price Valor numérico a ser formatado
   * @returns String formatada como moeda brasileira
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <>
      {/* Barra de pesquisa e filtros */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Campo de pesquisa com ícone */}
          <div className="relative flex-1">
            <Input 
              placeholder="Pesquisar por nome ou material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          {/* Botão para mostrar/esconder filtros avançados */}
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filtros
            {/* Badge que indica filtros ativos */}
            {(selectedMaterial || selectedColor || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
              <Badge variant="secondary" className="ml-2">Ativos</Badge>
            )}
          </Button>
        </div>

        {/* Painel de filtros avançados (visível apenas quando showFilters é true) */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="space-y-4">
              {/* Grid para filtros de material e cor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Seletor de material */}
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Shirt className="h-4 w-4" /> Material:
                  </label>
                  <Select 
                    value={selectedMaterial || "all"} 
                    onValueChange={handleMaterialChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os materiais</SelectItem>
                      {allMaterials.map((material, index) => (
                        <SelectItem key={index} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Seletor de cor */}
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Cor:
                  </label>
                  <Select 
                    value={selectedColor || "all"} 
                    onValueChange={handleColorChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma cor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cores</SelectItem>
                      {allColors.map((color, index) => (
                        <SelectItem key={index} value={color}>
                          <div className="flex items-center gap-2">
                            {/* Amostra visual da cor */}
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: color.toLowerCase() }}
                            ></div>
                            {color}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Slider para faixa de preço */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Faixa de Preço: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <div className="px-2 pt-6 pb-2">
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceRangeChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Botão para limpar filtros */}
              <div className="flex justify-end">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de "nenhum resultado" quando não há imagens após filtro */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-500">Nenhum resultado encontrado. Tente ajustar seus critérios de busca.</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Mostrando {filteredImages.length} de {images.length} itens</p>
        )}
      </div>

      {/* Grid de cartões de imagem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => openLightbox(image)}
          >
            {/* Container da imagem com efeito hover */}
            <div className="relative h-64">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              {/* Overlay com efeito de fade-in no hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <p className="font-semibold text-lg">Ver detalhes</p>
              </div>
            </div>
            {/* Informações do item */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{image.title}</h3>
              <p className="text-gray-600">Material: {image.materials}</p>
              {/* Exibe cor se disponível */}
              {image.color && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-600">Cor:</span>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300" 
                      style={{ backgroundColor: image.color }}
                    ></div>
                    <span>{image.color}</span>
                  </div>
                </div>
              )}
              {/* Exibe preço se disponível */}
              {image.price && (
                <p className="text-gray-600 mt-1">Preço: {formatPrice(image.price)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Dialog para visualização detalhada da imagem selecionada */}
      <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-3xl">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>
                  <div className="space-y-2 mt-2">
                    <p>Material: {selectedImage.materials}</p>
                    {/* Exibe cor no modal se disponível */}
                    {selectedImage.color && (
                      <div className="flex items-center gap-2">
                        <span>Cor:</span>
                        <div className="flex items-center gap-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300" 
                            style={{ backgroundColor: selectedImage.color }}
                          ></div>
                          <span>{selectedImage.color}</span>
                        </div>
                      </div>
                    )}
                    {/* Exibe preço no modal se disponível */}
                    {selectedImage.price && (
                      <p>Preço: {formatPrice(selectedImage.price)}</p>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              {/* Imagem ampliada */}
              <div className="mt-4">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="w-full h-auto max-h-[70vh] object-contain rounded-md"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
