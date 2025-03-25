
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery, GalleryImage } from "@/components/Gallery";

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "sofas", name: "Sofás" },
    { id: "chairs", name: "Cadeiras" },
    { id: "cars", name: "Automóveis" },
  ];

  // Gallery items with expanded variety for better filtering demonstration
  const galleryItems: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "Sofá reformado",
      category: "sofas",
      materials: "Veludo azul",
      title: "Reforma de Sofá 3 Lugares"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      alt: "Cadeira de jantar reformada",
      category: "chairs",
      materials: "Linho bege",
      title: "Reforma de Cadeiras de Jantar"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Interior de carro reformado",
      category: "cars",
      materials: "Couro sintético preto",
      title: "Estofamento de Bancos Automotivos"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      alt: "Sofá de canto reformado",
      category: "sofas",
      materials: "Suede marrom",
      title: "Reforma de Sofá de Canto"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      alt: "Poltrona reformada",
      category: "chairs",
      materials: "Veludo verde",
      title: "Restauração de Poltrona Vintage"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1",
      alt: "Interior de van reformado",
      category: "cars",
      materials: "Couro sintético branco",
      title: "Reforma Interior de Van"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1519947486511-46149fa0a254",
      alt: "Sofá retrátil reformado",
      category: "sofas",
      materials: "Chenille cinza",
      title: "Reforma de Sofá Retrátil"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
      alt: "Cadeiras para área externa",
      category: "chairs",
      materials: "Tecido impermeável",
      title: "Reforma de Cadeiras para Jardim"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
      alt: "Interior de barco reformado",
      category: "cars",
      materials: "Couro náutico",
      title: "Reforma de Estofados Náuticos"
    }
  ];

  // Filter gallery items based on selected category
  const filteredGalleryItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossa Galeria</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira alguns dos nossos trabalhos mais recentes. Cada projeto reflete nosso compromisso 
              com a qualidade e atenção aos detalhes.
            </p>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full max-w-3xl mx-auto mb-10">
            <TabsList className="grid grid-cols-4 w-full">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Gallery images={filteredGalleryItems} />
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;
