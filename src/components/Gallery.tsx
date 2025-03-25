
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  materials: string;
  title: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique materials for filter options
  const allMaterials = Array.from(new Set(images.map(img => img.materials)));

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Handle material selection
  const handleMaterialChange = (value: string) => {
    setSelectedMaterial(value);
    console.log("Selected material:", value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMaterial("");
    setSearchTerm("");
  };

  // Filter images based on search term and selected material
  const filteredImages = images.filter(image => {
    const matchesSearch = searchTerm === "" || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.materials.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMaterial = selectedMaterial === "" || 
      image.materials.toLowerCase() === selectedMaterial.toLowerCase();
    
    return matchesSearch && matchesMaterial;
  });

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
          </Button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Material:</label>
                <Select 
                  value={selectedMaterial} 
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
                  Material utilizado: {selectedImage.materials}
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
