
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Interface que define a estrutura de um post do blog
 */
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

/**
 * AdminBlog - Componente para gerenciamento de posts do blog pelo administrador
 * 
 * Permite:
 * - Adicionar novos posts para o blog
 * - Editar posts existentes
 * - Excluir posts
 * - Visualizar todos os posts cadastrados
 * 
 * Substitução por API:
 * Em um ambiente de produção, todas as operações CRUD devem ser substituídas
 * por chamadas à API:
 * 
 * - GET /api/blog/posts - Obter todos os posts
 * - GET /api/blog/posts/:id - Obter um post específico
 * - POST /api/blog/posts - Adicionar um novo post
 * - PUT /api/blog/posts/:id - Atualizar um post existente
 * - DELETE /api/blog/posts/:id - Excluir um post
 */
const AdminBlog = () => {
  // Estado para armazenar a lista de posts
  // Em produção, deve ser substituído por uma chamada à API
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Como escolher o melhor tecido para seu sofá",
      excerpt: "Guia completo sobre os diferentes tipos de tecidos e suas vantagens para reformar seu sofá.",
      content: "Escolher o tecido certo para o seu sofá é uma decisão importante que afeta não apenas a aparência, mas também a durabilidade e o conforto do móvel. Neste artigo, vamos explorar os diferentes tipos de tecidos disponíveis no mercado, suas características, vantagens e desvantagens, para ajudá-lo a fazer a melhor escolha para o seu estofado.\n\nVeludo: O veludo é um tecido luxuoso e macio, conhecido por sua textura rica e aparência elegante. É uma ótima opção para sofás em ambientes mais formais ou para quem busca um toque de sofisticação na decoração. O veludo é durável e resistente a desgaste, mas requer cuidados especiais na limpeza e manutenção.\n\nLinho: O linho é uma fibra natural que oferece um visual leve e despojado. É altamente respirável, o que o torna uma excelente opção para climas quentes. No entanto, é mais suscetível a manchas e pode amassar facilmente, o que pode não ser ideal para famílias com crianças pequenas ou animais de estimação.\n\nCouro: O couro é um material clássico e atemporal, conhecido por sua durabilidade e facilidade de limpeza. Ele desenvolve uma pátina única com o tempo, tornando-se mais bonito à medida que envelhece. O couro é resistente a manchas e derramamentos, mas pode ser mais quente ao toque em climas quentes e requer condicionamento regular para evitar rachaduras.\n\nMicrofibra: A microfibra é um tecido sintético que imita a aparência e o toque de materiais naturais como camurça ou veludo. É extremamente durável, fácil de limpar e resistente a manchas, tornando-o uma escolha popular para famílias com crianças e animais de estimação. A microfibra também tende a ser mais acessível em comparação com tecidos naturais.\n\nChenille: O chenille é conhecido por sua textura macia e aconchegante. É um tecido durável que resiste bem ao desgaste diário, tornando-o uma boa opção para sofás de uso frequente. No entanto, pode ser mais difícil de limpar e pode desbotar se exposto à luz solar direta por longos períodos.\n\nAo escolher o tecido para o seu sofá, considere fatores como o estilo da sua decoração, o nível de uso do sofá, a presença de crianças e animais de estimação em casa, e suas preferências pessoais em termos de textura e aparência. Lembre-se também de considerar a facilidade de manutenção e limpeza, especialmente se o sofá será usado diariamente.\n\nEm nossa loja, oferecemos uma ampla variedade de tecidos para reforma de estofados, e nossa equipe está sempre disponível para ajudá-lo a fazer a melhor escolha para suas necessidades específicas.",
      date: "10 de junho de 2023",
      author: "Ana Ferreira",
      category: "Dicas",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    },
    {
      id: 2,
      title: "Cuidados essenciais para prolongar a vida do seu estofado",
      excerpt: "Aprenda como limpar e manter seus estofados em perfeito estado por muito mais tempo.",
      content: "Os estofados são peças fundamentais em qualquer ambiente doméstico, proporcionando conforto e estilo. Para garantir que durem por muitos anos em ótimas condições, é essencial adotar alguns cuidados básicos de manutenção. Neste artigo, compartilhamos dicas práticas para prolongar a vida útil do seu estofado e mantê-lo sempre com aparência de novo.\n\nLimpeza Regular: A primeira e mais importante dica é manter uma rotina de limpeza regular. Aspire seu estofado pelo menos uma vez por semana para remover poeira, pelos de animais e pequenas partículas que podem se acumular nas fibras do tecido. Use o bocal próprio para estofados do aspirador, que é mais suave e eficiente para essa tarefa.\n\nProteja da Luz Solar: A exposição prolongada à luz solar direta pode causar desbotamento nos tecidos. Sempre que possível, posicione seus móveis estofados longe de janelas com incidência direta de sol, ou utilize cortinas e persianas para filtrar a luz durante os períodos mais intensos do dia.\n\nRotação de Almofadas: Se o seu estofado possui almofadas removíveis, faça a rotação delas regularmente. Isso ajuda a distribuir o desgaste de forma mais uniforme, evitando que algumas áreas fiquem mais desgastadas que outras. Você pode alternar as almofadas do assento com as do encosto, ou inverter as posições entre direita e esquerda.\n\nLimpeza de Manchas: Acidentes acontecem, e quando ocorrerem, é importante agir rapidamente. Remova qualquer resíduo sólido com uma colher ou espátula, sem esfregar para não espalhar a mancha. Em seguida, blote (não esfregue) a área com um pano limpo e levemente umedecido. Para manchas específicas, consulte as recomendações do fabricante ou um profissional especializado.\n\nLimpeza Profissional Periódica: Mesmo com a manutenção regular, é recomendável fazer uma limpeza profissional a cada 12 a 18 meses, dependendo do uso. Profissionais especializados possuem equipamentos e produtos específicos que podem remover sujeira profunda sem danificar o tecido.\n\nEvite Sentar nos Braços: Os braços dos sofás não são projetados para suportar o peso corporal. Sentar-se neles pode deformar a estrutura interna e comprometer a integridade do móvel a longo prazo.\n\nCuidados com Animais de Estimação: Se você tem animais de estimação, considere usar mantas ou capas protetoras nas áreas onde eles costumam ficar. Treine seus pets para não subirem nos móveis ou forneça a eles seus próprios espaços confortáveis.\n\nUso de Protetores: Existem produtos específicos no mercado que criam uma camada protetora contra manchas e derramamentos. Consulte um especialista para recomendar o produto mais adequado para o tipo de tecido do seu estofado.\n\nAo seguir essas dicas simples, você pode prolongar significativamente a vida útil do seu estofado, mantendo sua beleza e conforto por muitos anos. Lembre-se que a prevenção é sempre o melhor caminho para preservar seus móveis em ótimo estado.",
      date: "22 de maio de 2023",
      author: "Carlos Silva",
      category: "Manutenção",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    },
    {
      id: 3,
      title: "Tendências de estofados para 2023",
      excerpt: "Conheça as principais tendências em cores, tecidos e estilos para estofados neste ano.",
      content: "O mundo do design de interiores está sempre em evolução, e os estofados não ficam para trás nessa constante renovação de tendências. Para 2023, observamos uma interessante mistura de conforto, sustentabilidade e ousadia nas propostas para sofás, poltronas e outros móveis estofados. Vamos explorar as principais tendências que prometem dominar o mercado este ano.\n\nCores Terrosas e Naturais: Em linha com o movimento de reconexão com a natureza, que ganhou força nos últimos anos, as cores terrosas estão em alta para estofados em 2023. Tons de marrom, terracota, verde-oliva e bege são escolhas populares, trazendo aconchego e serenidade para os ambientes. Essas cores funcionam bem tanto em peças principais, como sofás, quanto em itens menores, como poltronas e puffs.\n\nVeludo e Texturas Táteis: O veludo continua sendo um favorito, agora acompanhado por outros tecidos que convidam ao toque. Materiais com texturas interessantes, como bouclê, tweed e tecidos canelados, estão ganhando espaço, adicionando dimensão e interesse visual aos estofados. Essas texturas não apenas enriquecem a estética do ambiente, mas também proporcionam uma experiência sensorial agradável.\n\nFormas Curvas e Orgânicas: As linhas retas e angulares estão dando lugar a formas mais suaves e orgânicas. Sofás com contornos curvos, poltronas arredondadas e puffs em formatos irregulares são exemplos dessa tendência que remete ao design dos anos 70, revisitado com uma abordagem contemporânea. Essas peças trazem fluidez e dinamismo para os espaços.\n\nSustentabilidade e Materiais Conscientes: A preocupação ambiental está influenciando fortemente as escolhas de materiais para estofados. Tecidos feitos de fibras recicladas, algodão orgânico e outros materiais de baixo impacto ambiental estão em alta demanda. Além disso, a durabilidade se tornou um critério importante, com consumidores buscando peças de qualidade que durem por muitos anos, reduzindo o consumo e o descarte.\n\nModularidade e Flexibilidade: Em resposta às necessidades de espaços multifuncionais, especialmente em residências menores, móveis modulares e flexíveis estão ganhando popularidade. Sofás que podem ser reconfigurados, poltronas que se transformam em chaises e outros móveis adaptáveis permitem que os usuários ajustem seus espaços de acordo com diferentes necessidades ao longo do dia.\n\nEstilos Retrô Revisitados: Elementos de design das décadas de 60, 70 e 80 estão sendo reinterpretados com uma linguagem contemporânea. Vemos isso em detalhes como pés de metal dourado, estofados capitonês mais sutis e combinações de cores que remetem a essas épocas, trazendo um toque de nostalgia sem parecer datado.\n\nMix de Texturas e Padrões: A tendência de misturar diferentes texturas e padrões em um mesmo ambiente ou até mesmo em uma única peça está ganhando força. Um sofá liso pode ser combinado com almofadas estampadas, ou uma poltrona pode apresentar diferentes texturas em seu encosto e assento, criando composições ricas e personalizadas.\n\nEstofados Statement: Peças de destaque, que funcionam como verdadeiras obras de arte no ambiente, são uma tendência forte para quem deseja fazer uma declaração de estilo. Isso pode se manifestar através de cores vibrantes, formatos inusitados ou detalhes marcantes, como franjas, botões decorativos ou costuras aparentes.\n\nAo incorporar essas tendências em sua decoração, lembre-se de considerar seu estilo pessoal e as necessidades específicas do seu espaço. As tendências são referências inspiradoras, mas o mais importante é criar um ambiente que reflita sua personalidade e proporcione o conforto que você deseja no dia a dia.",
      date: "5 de abril de 2023",
      author: "Pedro Santos",
      category: "Tendências",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    }
  ]);

  // Estado para controlar o modal de visualização detalhada
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  // Post sendo visualizado
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);

  // Estado para controlar o modal de confirmação de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // ID do post a ser excluído
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  
  // Estado para controlar o modal de edição/adição
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<BlogPost>({
    id: 0,
    title: "",
    excerpt: "",
    content: "",
    date: "",
    author: "",
    category: "",
    image: ""
  });

  // Estado para controlar se estamos editando ou adicionando um novo post
  const [isEditing, setIsEditing] = useState(false);
  // Hook para navegação
  const navigate = useNavigate();

  /**
   * Gera a data formatada atual para novos posts
   * @returns String com a data atual no formato "DD de Mês de YYYY"
   */
  const getCurrentFormattedDate = () => {
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const now = new Date();
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${day} de ${month} de ${year}`;
  };

  /**
   * Abre o modal de visualização detalhada de um post
   * @param post - Post a ser visualizado em detalhes
   * 
   * Em produção: deve primeiro buscar os detalhes completos do post da API
   * GET /api/blog/posts/:id
   */
  const handleViewPost = (post: BlogPost) => {
    setViewingPost(post);
    setIsViewDialogOpen(true);
  };

  /**
   * Manipula a abertura do modal de edição com os dados do post selecionado
   * @param post - Post a ser editado
   * 
   * Em produção: pode ser necessário buscar dados adicionais da API
   * GET /api/blog/posts/:id
   */
  const handleEditPost = (post: BlogPost) => {
    setFormData(post);
    setIsEditing(true);
    setIsEditDialogOpen(true);
  };

  /**
   * Abre o modal para adicionar um novo post com o formulário em branco
   * 
   * Inicializa o formulário com valores padrão, incluindo a data atual formatada
   */
  const handleAddPost = () => {
    setFormData({
      id: Math.max(0, ...blogPosts.map(post => post.id)) + 1,
      title: "",
      excerpt: "",
      content: "",
      date: getCurrentFormattedDate(),
      author: "",
      category: "",
      image: ""
    });
    setIsEditing(false);
    setIsEditDialogOpen(true);
  };

  /**
   * Manipula a exclusão de um post, abrindo o modal de confirmação
   * @param id - ID do post a ser excluído
   */
  const handleDeletePost = (id: number) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirma a exclusão do post e atualiza o estado
   * 
   * Em produção: deve enviar uma requisição DELETE para a API
   * DELETE /api/blog/posts/:id
   */
  const confirmDelete = () => {
    if (postToDelete !== null) {
      setBlogPosts(prev => prev.filter(post => post.id !== postToDelete));
      toast({
        title: "Post excluído",
        description: "O post foi removido com sucesso."
      });
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  /**
   * Manipula alterações nos campos do formulário
   * @param field - Campo a ser atualizado
   * @param value - Novo valor do campo
   */
  const handleInputChange = (field: keyof BlogPost, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Salva o post (novo ou editado) na lista
   * 
   * Em produção:
   * - Para edição: PUT /api/blog/posts/:id
   * - Para criação: POST /api/blog/posts
   */
  const handleSavePost = () => {
    // Validações básicas de formulário
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      // Atualiza post existente
      setBlogPosts(prev => 
        prev.map(post => post.id === formData.id ? formData : post)
      );
      toast({
        title: "Post atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    } else {
      // Adiciona novo post
      setBlogPosts(prev => [...prev, formData]);
      toast({
        title: "Post adicionado",
        description: "O novo post foi adicionado com sucesso."
      });
    }
    
    setIsEditDialogOpen(false);
  };

  // Categorias disponíveis para os posts
  // Em produção: devem ser buscadas da API
  // GET /api/blog/categories
  const categories = [
    { id: "dicas", name: "Dicas" },
    { id: "manutencao", name: "Manutenção" },
    { id: "tendencias", name: "Tendências" },
    { id: "servicos", name: "Serviços" },
    { id: "automoveis", name: "Automóveis" }
  ];

  // Autores disponíveis
  // Em produção: devem ser buscados da API
  // GET /api/users?role=author
  const authors = [
    "Ana Ferreira",
    "Carlos Silva",
    "Pedro Santos",
    "Maria Oliveira",
    "João Almeida"
  ];

  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Blog</h1>
          <p className="text-gray-500 mt-1">Adicione, edite ou remova posts do blog</p>
        </div>
        <Button onClick={handleAddPost} className="flex items-center gap-2 bg-[#87b091] hover:bg-[#87b091]/80">
          <Plus size={16} />
          Novo Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow border-[#c4d4ab]">
            <div 
              className="h-48 overflow-hidden cursor-pointer"
              onClick={() => handleViewPost(post)}
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Blog+Post"}
              />
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-[#87b091] mb-1">{post.category}</div>
              <h3 
                className="text-lg font-semibold line-clamp-2 cursor-pointer hover:text-[#87b091] transition-colors"
                onClick={() => handleViewPost(post)}
              >
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 border-t border-[#e0e0b6]">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 px-2 hover:bg-[#eff0d5] hover:text-[#171430]"
                  onClick={() => handleViewPost(post)}
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 px-2 hover:bg-[#eff0d5] hover:text-[#171430]"
                  onClick={() => handleEditPost(post)}
                >
                  <Pencil size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dialog para visualização detalhada do post */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-[#eff0d5] border-[#87b091]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#171430]">{viewingPost?.title}</DialogTitle>
          </DialogHeader>
          {viewingPost && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Por {viewingPost.author}</span>
                <span>{viewingPost.date}</span>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={viewingPost.image} 
                  alt={viewingPost.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/800x450?text=Blog+Post"}
                />
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 bg-[#87b091]/20 text-[#87b091] rounded-full text-sm">
                  {viewingPost.category}
                </span>
              </div>
              
              <div className="text-gray-700">
                {viewingPost.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="pt-4 flex gap-2">
                <Button 
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditPost(viewingPost);
                  }}
                  className="bg-[#87b091] hover:bg-[#87b091]/80"
                >
                  <Pencil size={16} className="mr-2" />
                  Editar Post
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleDeletePost(viewingPost.id);
                  }}
                >
                  <Trash2 size={16} className="mr-2" />
                  Excluir Post
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para edição/adição de post */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-[#eff0d5] border-[#87b091]">
          <DialogHeader>
            <DialogTitle className="text-[#171430]">{isEditing ? "Editar Post" : "Novo Post"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger className="border-[#c4d4ab] focus:ring-[#87b091]">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#eff0d5] border-[#c4d4ab]">
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Select 
                  value={formData.author} 
                  onValueChange={(value) => handleInputChange("author", value)}
                >
                  <SelectTrigger className="border-[#c4d4ab] focus:ring-[#87b091]">
                    <SelectValue placeholder="Selecione o autor" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#eff0d5] border-[#c4d4ab]">
                    {authors.map(author => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea 
                id="excerpt" 
                value={formData.excerpt} 
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                placeholder="Breve resumo do artigo (exibido na listagem)"
                rows={2}
                className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea 
                id="content" 
                value={formData.content} 
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Conteúdo completo do artigo (use linhas em branco para separar parágrafos)"
                rows={10}
                className="font-mono text-sm border-[#c4d4ab] focus-visible:ring-[#87b091]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input 
                id="image" 
                value={formData.image} 
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="Link para a imagem de destaque do post"
                className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
              />
              {formData.image && (
                <div className="mt-2 aspect-video bg-gray-100 rounded overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/800x450?text=Erro+na+Imagem"}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data de Publicação</Label>
              <Input 
                id="date" 
                value={formData.date} 
                onChange={(e) => handleInputChange("date", e.target.value)}
                placeholder="Ex: 10 de junho de 2023"
                className="border-[#c4d4ab] focus-visible:ring-[#87b091]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSavePost}
              className="bg-[#87b091] hover:bg-[#87b091]/80"
            >
              {isEditing ? "Atualizar Post" : "Publicar Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#eff0d5] border-[#87b091]">
          <DialogHeader>
            <DialogTitle className="text-[#171430]">Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">Tem certeza que deseja excluir este post do blog? Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Botão para voltar para dashboard */}
      <div className="mt-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
        >
          Voltar ao Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminBlog;
