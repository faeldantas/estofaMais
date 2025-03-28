
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Heart, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  MoreVertical, 
  User,
  Send
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Interface para os comentários do blog
 */
interface Comment {
  id: number;
  userId: number;
  userName: string;
  content: string;
  date: string;
  isHidden: boolean;
}

/**
 * Interface para as props do componente BlogCommentSection
 */
interface BlogCommentSectionProps {
  postId: number;
  initialLikes?: number;
}

/**
 * BlogCommentSection - Componente para exibir e gerenciar comentários e curtidas em posts do blog
 * 
 * Este componente permite:
 * - Usuários autenticados podem curtir posts
 * - Usuários autenticados podem adicionar comentários
 * - Administradores podem ocultar/mostrar comentários inapropriados
 * 
 * Em um ambiente de produção, os dados mock devem ser substituídos por chamadas à API:
 * - GET /api/posts/:id/comments - Para carregar os comentários
 * - POST /api/posts/:id/comments - Para adicionar um comentário
 * - PUT /api/posts/:id/comments/:commentId - Para ocultar/mostrar um comentário
 * - POST /api/posts/:id/like - Para curtir um post
 * - DELETE /api/posts/:id/like - Para descurtir um post
 */
const BlogCommentSection = ({ postId, initialLikes = 0 }: BlogCommentSectionProps) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  
  // Estado para controlar se o usuário curtiu o post
  const [isLiked, setIsLiked] = useState(false);
  // Estado para armazenar o número de curtidas
  const [likesCount, setLikesCount] = useState(initialLikes);
  // Estado para armazenar o texto do novo comentário
  const [newComment, setNewComment] = useState("");
  // Estado para controlar se o diálogo de login está aberto
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  // Dados mock para os comentários - em produção seriam carregados da API
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userId: 1,
      userName: "Maria Silva",
      content: "Adorei este artigo! As dicas sobre a escolha de tecidos para estofados são muito úteis.",
      date: "2025-03-10T14:30:00",
      isHidden: false,
    },
    {
      id: 2,
      userId: 2,
      userName: "João Oliveira",
      content: "Muito interessante a explicação sobre durabilidade dos diferentes materiais.",
      date: "2025-03-11T09:15:00",
      isHidden: false,
    },
    {
      id: 3,
      userId: 3,
      userName: "Ana Pereira",
      content: "Este conteúdo tem sido muito útil para mim que estou reformando minha casa!",
      date: "2025-03-12T18:22:00",
      isHidden: true,
    },
  ]);

  /**
   * Manipula a ação de curtir/descurtir um post
   * Em produção, isso enviaria uma requisição à API
   */
  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true);
      return;
    }

    if (isLiked) {
      // Em produção: DELETE /api/posts/:id/like
      setLikesCount(prev => prev - 1);
    } else {
      // Em produção: POST /api/posts/:id/like
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  /**
   * Adiciona um novo comentário ao post
   * Em produção, isso enviaria um POST para a API
   */
  const handleAddComment = () => {
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true);
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Comentário vazio",
        description: "Escreva algo antes de enviar seu comentário.",
        variant: "destructive",
      });
      return;
    }

    // Em produção: POST /api/posts/:id/comments { content: newComment }
    const newCommentObject: Comment = {
      id: Math.max(0, ...comments.map(c => c.id)) + 1,
      userId: user?.id || 0,
      userName: user?.name || "Usuário",
      content: newComment,
      date: new Date().toISOString(),
      isHidden: false,
    };

    setComments(prev => [newCommentObject, ...prev]);
    setNewComment("");

    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso.",
    });
  };

  /**
   * Alterna a visibilidade de um comentário (apenas para administradores)
   * Em produção, isso enviaria um PUT para a API
   * @param commentId - ID do comentário a ser ocultado/mostrado
   */
  const toggleCommentVisibility = (commentId: number) => {
    // Em produção: PUT /api/posts/:id/comments/:commentId { isHidden: true/false }
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, isHidden: !comment.isHidden }
          : comment
      )
    );

    toast({
      title: "Visibilidade alterada",
      description: "A visibilidade do comentário foi atualizada.",
    });
  };

  /**
   * Formata a data para exibição no formato local
   * @param dateString - String de data ISO
   * @returns Data formatada para exibição
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 mt-10">
      {/* Seção de curtidas e contador de comentários */}
      <div className="flex items-center justify-between border-t border-b py-4">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span>{likesCount} curtidas</span>
          </button>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MessageSquare className="h-5 w-5" />
            <span>{comments.filter(c => !c.isHidden).length} comentários</span>
          </div>
        </div>
      </div>

      {/* Formulário para adicionar novo comentário */}
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="flex-grow space-y-2">
          <Textarea
            placeholder={isAuthenticated ? "Escreva seu comentário..." : "Faça login para comentar"}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            disabled={!isAuthenticated}
            className="min-h-[80px] resize-none"
          />
          
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!isAuthenticated || !newComment.trim()}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de comentários */}
      <div className="space-y-4 mt-6">
        <h3 className="text-xl font-medium">Comentários</h3>
        
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Seja o primeiro a comentar!</p>
        ) : (
          <div className="space-y-4">
            {comments.map(comment => (
              <Card 
                key={comment.id} 
                className={`${comment.isHidden ? 'bg-gray-50 opacity-70' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{comment.userName}</p>
                        <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>
                      </div>
                    </div>
                    
                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toggleCommentVisibility(comment.id)}
                            className="cursor-pointer"
                          >
                            {comment.isHidden ? (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Mostrar comentário
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Ocultar comentário
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  
                  <div className={`mt-3 ${comment.isHidden ? 'text-gray-400' : 'text-gray-700'}`}>
                    {comment.isHidden && isAdmin && (
                      <div className="mb-2 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded inline-block">
                        Comentário oculto (visível apenas para administradores)
                      </div>
                    )}
                    <p>{comment.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Diálogo de login */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Faça login para continuar</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Você precisa estar logado para curtir e comentar posts. Faça login ou crie uma conta.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLoginDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setIsLoginDialogOpen(false);
                // Redirecionar para a página de login
                window.location.href = "/login";
              }}
            >
              Fazer Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogCommentSection;
