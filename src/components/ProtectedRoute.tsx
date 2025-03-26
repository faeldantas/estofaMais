
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

/**
 * Interface para as props do componente ProtectedRoute
 */
interface ProtectedRouteProps {
  children: ReactNode;       // Componente filho a ser renderizado se autenticado
  adminOnly?: boolean;       // Se true, restringe acesso apenas a administradores
}

/**
 * Componente ProtectedRoute - Protege rotas que requerem autenticação
 * 
 * Este componente:
 * 1. Verifica se o usuário está autenticado
 * 2. Opcionalmente, verifica se o usuário tem papel de administrador
 * 3. Redireciona para a página de login se não atender aos requisitos
 * 4. Exibe uma notificação informando o motivo do redirecionamento
 */
const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    toast({
      title: "Acesso restrito",
      description: "Faça login para acessar esta página.",
      variant: "destructive"
    });
    return <Navigate to="/login" replace />;
  }

  // Se a rota for apenas para admin e o usuário não for admin, redireciona para a home
  if (adminOnly && !isAdmin) {
    toast({
      title: "Acesso negado",
      description: "Você não tem permissão para acessar esta página.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  // Se passar por todas as verificações, renderiza o componente filho
  return <>{children}</>;
};

export default ProtectedRoute;
