import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Filter, Palette, DollarSign, Fabric } from "lucide-react";
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

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  materials: string;
  title: string;
  color?: string; // Add color property
  price?: number; // Add price property
}

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique materials and colors for filter options
  const allMaterials = Array.from(new Set(images.map(img => img.materials)));
  const allColors = Array.from(new Set(images.filter(img => img.color).map(img => img.color as string)));
  
  // Find min and max prices for the slider
  const prices = images.filter(img => img.price !== undefined).map(img => img.price as number);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Handle material selection
  const handleMaterialChange = (value: string) => {
    setSelectedMaterial(value === "all" ? "" : value);
  };

  // Handle color selection
  const handleColorChange = (value: string) => {
    setSelectedColor(value === "all" ? "" : value);
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMaterial("");
    setSelectedColor("");
    setPriceRange([minPrice, maxPrice]);
    setSearchTerm("");
  };

  // Filter images based on search term, selected material, color, and price range
  const filteredImages = images.filter(image => {
    const matchesSearch = searchTerm === "" || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.materials.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMaterial = selectedMaterial === "" || 
      image.materials.toLowerCase() === selectedMaterial.toLowerCase();
    
    const matchesColor = selectedColor === "" || 
      (image.color && image.color.toLowerCase() === selectedColor.toLowerCase());
    
    const matchesPrice = !image.price || 
      (image.price >= priceRange[0] && image.price <= priceRange[1]);
    
    return matchesSearch && matchesMaterial && matchesColor && matchesPrice;
  });

  // Format price as Brazilian currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input 
              placeholder="Pesquisar por nome ou material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filtros
            {(selectedMaterial || selectedColor || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
              <Badge variant="secondary" className="ml-2">Ativos</Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Fabric className="h-4 w-4" /> Material:
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

        {filteredImages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-500">Nenhum resultado encontrado. Tente ajustar seus critérios de busca.</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Mostrando {filteredImages.length} de {images.length} itens</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => openLightbox(image)}
          >
            <div className="relative h-64">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <p className="font-semibold text-lg">Ver detalhes</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{image.title}</h3>
              <p className="text-gray-600">Material: {image.materials}</p>
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
              {image.price && (
                <p className="text-gray-600 mt-1">Preço: {formatPrice(image.price)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-3xl">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>
                  <div className="space-y-2 mt-2">
                    <p>Material: {selectedImage.materials}</p>
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
                    {selectedImage.price && (
                      <p>Preço: {formatPrice(selectedImage.price)}</p>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
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
