
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCommentSection from "@/components/BlogCommentSection";

/**
 * Interface para estrutura de dados de um post de blog completo
 */
interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  category: string;
  likes: number;
}

/**
 * BlogPostDetailWithComments - Componente para exibir detalhes de um post de blog com comentários
 * 
 * Este componente:
 * - Carrega os detalhes de um post específico com base no ID da URL
 * - Exibe o conteúdo completo do post
 * - Permite interações como curtir e comentar através do BlogCommentSection
 * 
 * Em um ambiente de produção, o post deve ser carregado de uma API:
 * GET /api/posts/:id - Para obter os detalhes do post específico
 */
const BlogPostDetailWithComments = () => {
  // Obtém o ID do post da URL
  const { id } = useParams<{ id: string }>();
  
  // Estado para armazenar os dados do post
  const [post, setPost] = useState<BlogPost | null>(null);
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para carregar os dados do post ao montar o componente
  useEffect(() => {
    // Simulação de chamada à API para obter dados do post
    // Em produção, isso seria substituído por uma chamada real à API
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock de dados - em produção seria: await fetch(`/api/posts/${id}`)
        const postData: BlogPost = {
          id: Number(id),
          title: "Como escolher o tecido ideal para seu estofado",
          content: `
            <p class="mb-4">A escolha do tecido para seu estofado não é apenas uma questão estética, mas também de durabilidade e funcionalidade. Este guia ajudará você a tomar a melhor decisão baseada em suas necessidades específicas.</p>
            
            <h2 class="text-xl font-semibold mb-3 mt-6">Considerando o uso diário</h2>
            <p class="mb-4">Para famílias com crianças e animais de estimação, tecidos resistentes como microfibra, lona e couro sintético são excelentes opções devido à sua durabilidade e facilidade de limpeza. Estes materiais resistem a manchas e ao desgaste frequente.</p>
            
            <p class="mb-4">Se o móvel estará em uma área de baixo tráfego, você pode considerar opções mais delicadas como seda, linho ou veludo, que oferecem um visual sofisticado mas exigem maiores cuidados na manutenção.</p>
            
            <h2 class="text-xl font-semibold mb-3 mt-6">Cores e padrões</h2>
            <p class="mb-4">Cores neutras como bege, cinza e azul marinho são versáteis e combinam facilmente com outros elementos decorativos. Se preferir algo mais ousado, considere usar cores vibrantes em almofadas decorativas ao invés do estofado principal.</p>
            
            <p class="mb-4">Quanto aos padrões, lembre-se que estampas grandes funcionam melhor em espaços amplos, enquanto padrões menores e mais discretos são ideais para ambientes compactos.</p>
            
            <h2 class="text-xl font-semibold mb-3 mt-6">Manutenção e limpeza</h2>
            <p class="mb-4">Antes de finalizar sua escolha, verifique as instruções de limpeza do tecido. Alguns materiais podem ser limpos apenas a seco, enquanto outros permitem a limpeza com água e sabão neutro.</p>
            
            <p class="mb-4">Tecidos com tratamentos especiais contra manchas, como o Scotchgard, oferecem uma camada adicional de proteção e são excelentes para áreas de refeição e salas de estar com uso frequente.</p>
            
            <h2 class="text-xl font-semibold mb-3 mt-6">Fatores ambientais</h2>
            <p class="mb-4">Considere a exposição à luz solar, que pode causar desbotamento em certos tecidos. Para ambientes com muita iluminação natural, opte por materiais resistentes a raios UV ou considere a instalação de cortinas e persianas.</p>
            
            <p class="mb-4">Em regiões úmidas, evite materiais como seda e linho, que podem desenvolver mofo. Nestes casos, tecidos sintéticos ou com tratamento antimicrobiano são mais adequados.</p>
            
            <h2 class="text-xl font-semibold mb-3 mt-6">Conclusão</h2>
            <p class="mb-4">Ao escolher o tecido para seu estofado, equilibre estética, funcionalidade e praticidade. Um estofado bem escolhido não apenas embeleza o ambiente, mas também proporciona conforto e durabilidade por muitos anos.</p>
            
            <p>Na EstofaMais, oferecemos uma ampla variedade de tecidos de alta qualidade para todos os tipos de projetos. Entre em contato conosco para uma consulta personalizada!</p>
          `,
          excerpt: "Descubra como selecionar o melhor tecido para seus móveis considerando durabilidade, estilo e manutenção.",
          author: "Carlos Mendes",
          date: "2025-02-15T10:30:00",
          readTime: 6,
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNvZmF8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          category: "Dicas e Tendências",
          likes: 48
        };
        
        setPost(postData);
      } catch (error) {
        console.error("Erro ao carregar dados do post:", error);
        // Em produção, poderia adicionar tratamento de erro mais robusto
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  /**
   * Formata a data para exibição no formato local
   * @param dateString - String de data ISO
   * @returns Data formatada para exibição
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 font-playfair">
        {/* Botão para voltar */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Blog
            </Button>
          </Link>
        </div>

        {isLoading ? (
          // Estado de carregamento
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-1/3 rounded-lg" />
            <Skeleton className="h-96 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        ) : post ? (
          // Conteúdo do post quando carregado
          <div className="max-w-4xl mx-auto">
            {/* Categoria */}
            <div className="mb-3">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>
            
            {/* Título do post */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {/* Metadados do post (autor, data, tempo de leitura) */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min de leitura</span>
              </div>
            </div>
            
            {/* Imagem principal do post */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            {/* Conteúdo do post */}
            <div 
              className="prose prose-lg max-w-none mb-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Componente de comentários e curtidas */}
            <BlogCommentSection postId={post.id} initialLikes={post.likes} />
          </div>
        ) : (
          // Mensagem de erro caso o post não seja encontrado
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Post não encontrado</h2>
            <p className="text-gray-500 mb-6">O post que você está procurando não existe ou foi removido.</p>
            <Link to="/blog">
              <Button>Voltar para o Blog</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPostDetailWithComments;
