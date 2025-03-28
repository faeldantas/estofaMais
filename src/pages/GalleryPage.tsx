
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery, GalleryImage } from "@/components/Gallery";

/**
 * GalleryPage - Componente principal da página de galeria de trabalhos
 * Este componente gerencia a exibição e filtragem de projetos anteriores por categoria
 * 
 * Substituição de dados mocados:
 * - Os itens da galeria devem ser carregados de uma API:
 *   GET /api/gallery - Para obter todos os itens da galeria
 *   GET /api/gallery?category=sofas - Para filtrar por categoria
 * - As categorias também podem ser carregadas dinamicamente:
 *   GET /api/gallery/categories - Para obter a lista de categorias disponíveis
 */
const GalleryPage = () => {
  // Estado para armazenar a categoria selecionada pelo usuário
  // O valor padrão "all" mostra todos os itens inicialmente
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lista de categorias disponíveis para filtragem na interface
  // TODO: Substituir por chamada à API - GET /api/gallery/categories
  const categories = [
    { id: "all", name: "Todos" },      // Mostra todos os itens independente da categoria
    { id: "sofas", name: "Sofás" },    // Filtra apenas trabalhos relacionados a sofás
    { id: "chairs", name: "Cadeiras" }, // Filtra apenas trabalhos relacionados a cadeiras
    { id: "cars", name: "Automóveis" }, // Filtra apenas trabalhos relacionados a automóveis
  ];

  // Array de itens da galeria com propriedades detalhadas
  // TODO: Substituir por chamada à API - GET /api/gallery ou GET /api/gallery?category={category}
  const galleryItems: GalleryImage[] = [
    {
      id: 1,                           // Identificador único do item
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", // URL da imagem
      alt: "Sofá reformado",           // Texto alternativo para acessibilidade
      category: "sofas",               // Categoria do item (usado para filtragem)
      materials: "Veludo azul",        // Material utilizado no projeto
      title: "Reforma de Sofá 3 Lugares", // Título descritivo do projeto
      color: "Azul",                   // Cor principal do projeto
      price: 1850                      // Preço do serviço em reais
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

  // Filtragem dos itens da galeria com base na categoria selecionada
  // Se "all" estiver selecionado, retorna todos os itens
  // Caso contrário, filtra apenas os itens da categoria específica
  const filteredGalleryItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <section className="py-12 font-playfair">
        <div className="container mx-auto px-4 md:px-6">
          {/* Cabeçalho da página com título e descrição */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossa Galeria</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira alguns dos nossos trabalhos mais recentes. Cada projeto reflete nosso compromisso 
              com a qualidade e atenção aos detalhes.
            </p>
          </div>

          {/* Componente de abas para filtrar projetos por categoria */}
          <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full max-w-3xl mx-auto mb-10">
            <TabsList className="grid grid-cols-4 w-full bg-brand-cream border border-brand-green-light/30">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-brand-green data-[state=active]:text-white"
                >
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
