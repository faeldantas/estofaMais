
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThumbsUp, Flag, MoreVertical, EyeOff, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Interface para o tipo de comentário
 */
interface Comment {
  id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  userLiked: boolean;
  hidden: boolean;
}

/**
 * Interface para as props do componente BlogCommentSection
 */
interface BlogCommentSectionProps {
  postId: number;
  initialLikes?: number; // Adicionada a prop initialLikes como opcional
}

/**
 * Componente BlogCommentSection - Seção de comentários para posts do blog
 * 
 * Este componente permite que usuários visualizem, adicionem e interajam com comentários
 * em posts do blog. Também inclui funcionalidades administrativas para moderar comentários.
 * 
 * @param {number} postId - ID do post do blog ao qual os comentários pertencem
 * @param {number} initialLikes - Número inicial de curtidas no post (opcional)
 */
const BlogCommentSection = ({ postId, initialLikes = 0 }: BlogCommentSectionProps) => {
  // Estado para armazenar o texto do novo comentário
  const [newComment, setNewComment] = useState("");
  
  // Estado para armazenar todos os comentários do post
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Acesso ao contexto de autenticação para verificar se o usuário está logado
  const { user, isAdmin } = useAuth();

  /**
   * Efeito para carregar comentários quando o componente é montado
   * ou quando o postId muda
   */
  useEffect(() => {
    // Simulação de carregamento de comentários de uma API
    // Em produção, substituir por chamada real à API
    // GET /api/blog/posts/{postId}/comments
    setTimeout(() => {
      const mockComments: Comment[] = [
        {
          id: 1,
          author: { id: 1, name: "João Silva", avatar: "" },
          content: "Excelente artigo! Muito informativo.",
          createdAt: new Date(2023, 8, 15),
          likes: 5,
          userLiked: false,
          hidden: false,
        },
        {
          id: 2,
          author: { id: 2, name: "Maria Oliveira", avatar: "" },
          content: "Gostei das dicas compartilhadas.",
          createdAt: new Date(2023, 8, 14),
          likes: 3,
          userLiked: true,
          hidden: false,
        },
        {
          id: 3,
          author: { id: 3, name: "Pedro Santos", avatar: "" },
          content: "Comentário inadequado que foi ocultado.",
          createdAt: new Date(2023, 8, 13),
          likes: 0,
          userLiked: false,
          hidden: true,
        }
      ];
      
      setComments(mockComments);
    }, 500);
  }, [postId]);

  /**
   * Função para enviar um novo comentário
   */
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    // Simulação de envio do comentário para a API
    // Em produção, substituir por chamada real à API
    // POST /api/blog/posts/{postId}/comments
    
    const newCommentObj: Comment = {
      id: Math.floor(Date.now()), // Corrigido para garantir que seja número
      author: { 
        id: user?.id || 0, 
        name: user?.name || "Usuário Anônimo" 
      },
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      userLiked: false,
      hidden: false
    };
    
    setComments(prevComments => [newCommentObj, ...prevComments]);
    setNewComment("");
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso!",
    });
  };

  /**
   * Função para alternar curtida em um comentário
   * @param {number} commentId - ID do comentário a ser curtido/descurtido
   */
  const handleToggleLike = (commentId: number) => {
    if (!user) {
      toast({
        title: "Faça login para curtir",
        description: "Você precisa estar logado para curtir comentários.",
        variant: "destructive",
      });
      return;
    }
    
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const newLikeStatus = !comment.userLiked;
          return {
            ...comment,
            userLiked: newLikeStatus,
            likes: comment.likes + (newLikeStatus ? 1 : -1)
          };
        }
        return comment;
      })
    );
    
    // Em produção, enviar para a API
    // POST /api/blog/comments/{commentId}/like
  };

  /**
   * Função para alternar visibilidade de um comentário (apenas para admins)
   * @param {number} commentId - ID do comentário a ter visibilidade alterada
   */
  const handleToggleVisibility = (commentId: number) => {
    if (!isAdmin) return;
    
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, hidden: !comment.hidden };
        }
        return comment;
      })
    );
    
    // Em produção, enviar para a API
    // PATCH /api/blog/comments/{commentId}/visibility
    
    toast({
      title: "Visibilidade alterada",
      description: "A visibilidade do comentário foi alterada com sucesso.",
    });
  };

  /**
   * Função para reportar um comentário
   * @param {number} commentId - ID do comentário a ser reportado
   */
  const handleReportComment = (commentId: number) => {
    // Em produção, enviar para a API
    // POST /api/blog/comments/{commentId}/report
    
    toast({
      title: "Comentário reportado",
      description: "Obrigado por reportar. Nossa equipe irá analisar o conteúdo.",
    });
  };

  // Resto do código continua igual
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Comentários</h2>
      
      {/* Formulário para adicionar novo comentário */}
      {user ? (
        <div className="space-y-4">
          <Textarea
            placeholder="Deixe seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
          >
            Publicar Comentário
          </Button>
        </div>
      ) : (
        <div className="bg-brand-cream/30 p-4 rounded-md text-center">
          <p className="mb-2">Faça login para deixar seu comentário</p>
          <Button asChild>
            <a href="/login">Fazer Login</a>
          </Button>
        </div>
      )}
      
      {/* Lista de comentários */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Ainda não há comentários neste post. Seja o primeiro a comentar!
          </p>
        ) : (
          comments.map(comment => (
            <div 
              key={comment.id} 
              className={`bg-white p-4 rounded-md shadow-sm ${comment.hidden ? 'opacity-60' : ''}`}
            >
              {/* Cabeçalho do comentário com avatar e nome do autor */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>
                      {comment.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{comment.author.name}</h4>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(comment.createdAt, { 
                        addSuffix: true,
                        locale: ptBR
                      })}
                      {comment.hidden && (
                        <span className="ml-2 text-amber-600">(Comentário oculto)</span>
                      )}
                    </p>
                  </div>
                </div>
                
                {/* Menu de opções do comentário */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => handleToggleVisibility(comment.id)}>
                        {comment.hidden ? (
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
                    )}
                    {!isAdmin && (
                      <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                        <Flag className="h-4 w-4 mr-2" />
                        Reportar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Conteúdo do comentário */}
              <div className="mt-2">
                <p className="text-gray-700">{comment.content}</p>
              </div>
              
              {/* Rodapé do comentário com botão de curtir */}
              <div className="mt-4 flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleToggleLike(comment.id)}
                  className={`flex items-center ${comment.userLiked ? 'text-brand-green' : ''}`}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{comment.likes}</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogCommentSection;
