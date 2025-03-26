
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery, GalleryImage } from "@/components/Gallery";

/**
 * GalleryPage - Componente principal da página de galeria de trabalhos
 * Este componente gerencia a exibição e filtragem de projetos anteriores por categoria
 * 
 * Funcionalidades:
 * - Filtragem de projetos por categoria (Todos, Sofás, Cadeiras, Automóveis)
 * - Integração com o componente Gallery para exibição dos itens
 * - Layout responsivo usando o componente Layout para manter consistência
 */
const GalleryPage = () => {
  // Estado para armazenar a categoria selecionada pelo usuário
  // O valor padrão "all" mostra todos os itens inicialmente
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lista de categorias disponíveis para filtragem na interface
  // Cada categoria tem um id (usado internamente) e um nome (mostrado ao usuário)
  const categories = [
    { id: "all", name: "Todos" },      // Mostra todos os itens independente da categoria
    { id: "sofas", name: "Sofás" },    // Filtra apenas trabalhos relacionados a sofás
    { id: "chairs", name: "Cadeiras" }, // Filtra apenas trabalhos relacionados a cadeiras
    { id: "cars", name: "Automóveis" }, // Filtra apenas trabalhos relacionados a automóveis
  ];

  // Array de itens da galeria com propriedades detalhadas
  // Cada item representa um projeto realizado pela empresa
  const galleryItems: GalleryImage[] = [
    {
      id: 1,                           // Identificador único do item
      src: "https://i.pinimg.com/736x/a8/e1/ea/a8e1ea4b2a8ee4728d34da005563e28c.jpg", // URL da imagem
      alt: "Sofá reformado",           // Texto alternativo para acessibilidade
      category: "sofas",               // Categoria do item (usado para filtragem)
      materials: "Veludo azul",        // Material utilizado no projeto
      title: "Reforma de Sofá 3 Lugares", // Título descritivo do projeto
      color: "Azul",                   // Cor principal do projeto
      price: 1850                      // Preço do serviço em reais
    },
    {
      id: 2,
      src: "https://i.pinimg.com/736x/1f/4e/3c/1f4e3c05141d10ed5e69b14f743fadc2.jpg",
      alt: "Cadeira de jantar reformada",
      category: "chairs",
      materials: "Linho bege",
      title: "Reforma de Cadeiras de Jantar",
      color: "Bege",
      price: 750
    },
    {
      id: 3,
      src: "https://i.pinimg.com/736x/a5/17/d2/a517d2c4b5b9f315533a20d8bdebeb69.jpg",
      alt: "Interior de carro reformado",
      category: "cars",
      materials: "Couro sintético preto",
      title: "Estofamento de Bancos Automotivos",
      color: "Preto",
      price: 2350
    },
    {
      id: 4,
      src: "https://i.pinimg.com/736x/57/6d/38/576d38245dc567715fe5ea7e00cd5f8f.jpg",
      alt: "Sofá de canto reformado",
      category: "sofas",
      materials: "Suede marrom",
      title: "Reforma de Sofá de Canto",
      color: "Marrom",
      price: 2200
    },
    {
      id: 5,
      src: "https://i.pinimg.com/736x/85/58/13/85581307f7e25277f662595d0a2fc828.jpg",
      alt: "Poltrona reformada",
      category: "chairs",
      materials: "Veludo verde",
      title: "Restauração de Poltrona Vintage",
      color: "Verde",
      price: 950
    },
    {
      id: 6,
      src: "https://i.pinimg.com/736x/de/d5/9a/ded59af5dc1f80a155fe42ce046d42c1.jpg",
      alt: "Interior de van reformado",
      category: "cars",
      materials: "Couro sintético branco",
      title: "Reforma Interior de Van",
      color: "Branco",
      price: 3250
    },
    {
      id: 7,
      src: "https://i.pinimg.com/736x/69/29/70/692970b573b57d6a331d9104f600ffe3.jpg",
      alt: "Sofá retrátil reformado",
      category: "sofas",
      materials: "Chenille cinza",
      title: "Reforma de Sofá Retrátil",
      color: "Cinza",
      price: 1950
    },
    {
      id: 8,
      src: "https://i.pinimg.com/736x/16/f2/ac/16f2ac49a0e4f0fa23ffd68721368260.jpg",
      alt: "Cadeiras para área externa",
      category: "chairs",
      materials: "Tecido impermeável",
      title: "Reforma de Cadeiras para Jardim",
      color: "Azul",
      price: 600
    },
    {
      id: 9,
      src: "https://i.pinimg.com/736x/48/d3/e1/48d3e1ca27cd2d2f64a62f637d63ce27.jpg",
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
      <section className="py-12">
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
