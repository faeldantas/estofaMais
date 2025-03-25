
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

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

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
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
