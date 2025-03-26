
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery, GalleryImage } from "@/components/Gallery";

/**
 * GalleryPage - Componente principal da página de galeria de trabalhos
 * Exibe projetos anteriores filtráveis por categoria
 */
const GalleryPage = () => {
  // Estado para armazenar a categoria selecionada pelo usuário
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lista de categorias disponíveis para filtragem
  const categories = [
    { id: "all", name: "Todos" },
    { id: "sofas", name: "Sofás" },
    { id: "chairs", name: "Cadeiras" },
    { id: "cars", name: "Automóveis" },
  ];

  // Array de itens da galeria com propriedades detalhadas para demonstração de filtragem
  const galleryItems: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "Sofá reformado",
      category: "sofas",
      materials: "Veludo azul",
      title: "Reforma de Sofá 3 Lugares",
      color: "Azul",
      price: 1850
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      alt: "Cadeira de jantar reformada",
      category: "chairs",
      materials: "Linho bege",
      title: "Reforma de Cadeiras de Jantar",
      color: "Bege",
      price: 750
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Interior de carro reformado",
      category: "cars",
      materials: "Couro sintético preto",
      title: "Estofamento de Bancos Automotivos",
      color: "Preto",
      price: 2350
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      alt: "Sofá de canto reformado",
      category: "sofas",
      materials: "Suede marrom",
      title: "Reforma de Sofá de Canto",
      color: "Marrom",
      price: 2200
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      alt: "Poltrona reformada",
      category: "chairs",
      materials: "Veludo verde",
      title: "Restauração de Poltrona Vintage",
      color: "Verde",
      price: 950
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1",
      alt: "Interior de van reformado",
      category: "cars",
      materials: "Couro sintético branco",
      title: "Reforma Interior de Van",
      color: "Branco",
      price: 3250
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1519947486511-46149fa0a254",
      alt: "Sofá retrátil reformado",
      category: "sofas",
      materials: "Chenille cinza",
      title: "Reforma de Sofá Retrátil",
      color: "Cinza",
      price: 1950
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
      alt: "Cadeiras para área externa",
      category: "chairs",
      materials: "Tecido impermeável",
      title: "Reforma de Cadeiras para Jardim",
      color: "Azul",
      price: 600
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
      alt: "Interior de barco reformado",
      category: "cars",
      materials: "Couro náutico",
      title: "Reforma de Estofados Náuticos",
      color: "Branco",
      price: 4500
    }
  ];

  // Filtragem dos itens da galeria baseada na categoria selecionada
  // Se "all" estiver selecionado, mostra todos os itens
  // Caso contrário, filtra apenas os itens da categoria selecionada
  const filteredGalleryItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Cabeçalho da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossa Galeria</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira alguns dos nossos trabalhos mais recentes. Cada projeto reflete nosso compromisso 
              com a qualidade e atenção aos detalhes.
            </p>
          </div>

          {/* Componente de abas para filtrar por categoria */}
          <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full max-w-3xl mx-auto mb-10">
            <TabsList className="grid grid-cols-4 w-full">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Componente Gallery que recebe e exibe as imagens filtradas */}
          <Gallery images={filteredGalleryItems} />
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;
