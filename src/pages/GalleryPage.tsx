
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

  // Placeholder gallery items - would be replaced with real data
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
    // Add more gallery items as needed
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
