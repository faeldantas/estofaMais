
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

/**
 * Interface que define os dados do usuário autenticado
 */
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"; // Papel do usuário: comum ou administrador
}

/**
 * Interface que define o formato de um usuário no "banco de dados" simulado
 */
interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

/**
 * Interface que define as propriedades e métodos disponíveis no contexto de autenticação
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

/**
 * Interface para as props do componente provedor do contexto
 */
interface AuthProviderProps {
  children: ReactNode;
}

// Criar o contexto de autenticação com valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para acessar o contexto de autenticação
 * Fornece um erro claro se usado fora do provedor
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  
  return context;
};

/**
 * Componente provedor do contexto de autenticação
 * Gerencia o estado de autenticação e fornece métodos para login, registro e logout
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Estado para armazenar os dados do usuário autenticado
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Efeito para carregar o usuário do localStorage na inicialização
  useEffect(() => {
    const storedUser = localStorage.getItem("estofamais:user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função auxiliar para simular um banco de dados de usuários
  const getUsersFromStorage = (): StoredUser[] => {
    const users = localStorage.getItem("estofamais:users");
    if (users) {
      return JSON.parse(users);
    }
    
    // Inicializa com um usuário admin padrão se não existir nenhum
    const defaultAdmin: StoredUser = {
      id: "admin-1",
      name: "Administrador",
      email: "admin@estofamais.com",
      password: "admin123",
      role: "admin"
    };
    
    localStorage.setItem("estofamais:users", JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  };

  /**
   * Função de login que verifica as credenciais e autentica o usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Promise que resolve para true se o login for bem-sucedido
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Omite a senha antes de armazenar no estado
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("estofamais:user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) de volta, ${foundUser.name}!`
      });
      
      return true;
    }
    
    toast({
      title: "Erro ao fazer login",
      description: "Email ou senha incorretos.",
      variant: "destructive"
    });
    
    return false;
  };

  /**
   * Função para registrar um novo usuário
   * @param name Nome do usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Promise que resolve para true se o registro for bem-sucedido
   */
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getUsersFromStorage();
    
    // Verifica se o email já está em uso
    if (users.some(u => u.email === email)) {
      toast({
        title: "Erro ao registrar",
        description: "Este email já está em uso.",
        variant: "destructive"
      });
      return false;
    }
    
    // Cria o novo usuário com papel de usuário comum
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user"
    };
    
    // Adiciona o novo usuário ao "banco de dados"
    users.push(newUser);
    localStorage.setItem("estofamais:users", JSON.stringify(users));
    
    // Autentica o usuário após o registro
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("estofamais:user", JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Conta criada com sucesso!",
      description: `Bem-vindo(a) à EstofaMais, ${name}!`
    });
    
    return true;
  };

  /**
   * Função para deslogar o usuário
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("estofamais:user");
    navigate("/");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso."
    });
  };

  // Calculamos se o usuário é administrador com base no papel
  const isAdmin = user?.role === "admin";

  // Valor do contexto que será disponibilizado para os componentes filhos
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
