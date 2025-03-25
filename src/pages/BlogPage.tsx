
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Como escolher o melhor tecido para seu sofá",
    excerpt: "Guia completo sobre os diferentes tipos de tecidos e suas vantagens para reformar seu sofá.",
    date: "10 de junho de 2023",
    author: "Ana Ferreira",
    category: "Dicas",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: 2,
    title: "Cuidados essenciais para prolongar a vida do seu estofado",
    excerpt: "Aprenda como limpar e manter seus estofados em perfeito estado por muito mais tempo.",
    date: "22 de maio de 2023",
    author: "Carlos Silva",
    category: "Manutenção",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  {
    id: 3,
    title: "Tendências de estofados para 2023",
    excerpt: "Conheça as principais tendências em cores, tecidos e estilos para estofados neste ano.",
    date: "5 de abril de 2023",
    author: "Pedro Santos",
    category: "Tendências",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: 4,
    title: "Como avaliar se vale a pena reformar seu estofado",
    excerpt: "Dicas para decidir entre reformar ou comprar um novo estofado, considerando custo-benefício.",
    date: "18 de março de 2023",
    author: "Ana Ferreira",
    category: "Dicas",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: 5,
    title: "A importância de contratar profissionais qualificados para reforma",
    excerpt: "Por que é fundamental escolher uma empresa especializada para realizar a reforma do seu estofado.",
    date: "2 de fevereiro de 2023",
    author: "Carlos Silva",
    category: "Serviços",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  {
    id: 6,
    title: "Estofamento automotivo: dicas para personalizar seu veículo",
    excerpt: "Como transformar o interior do seu carro com estofamento personalizado e de qualidade.",
    date: "15 de janeiro de 2023",
    author: "Pedro Santos",
    category: "Automóveis",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  }
];

// Categories for filter
const categories = [
  { id: "all", name: "Todos" },
  { id: "dicas", name: "Dicas" },
  { id: "manutencao", name: "Manutenção" },
  { id: "tendencias", name: "Tendências" },
  { id: "servicos", name: "Serviços" },
  { id: "automoveis", name: "Automóveis" }
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter posts based on search term and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dicas, tendências e informações sobre reforma de estofados e design de interiores.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
              <div className="w-full md:w-3/4">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Pesquisar artigos..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h3 className="font-semibold mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
                <p className="text-gray-600">Tente uma pesquisa diferente ou selecione outra categoria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="text-sm text-blue-600 mb-1">{post.category}</div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between pt-2 text-sm text-gray-500">
                      <div>{post.date}</div>
                      <div>Por {post.author}</div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
