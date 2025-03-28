
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Componente Navbar - Barra de navegação principal do site
 * 
 * Funcionalidades:
 * - Navegação entre as principais páginas do site
 * - Menu de usuário com opções de login/logout
 * - Acesso ao painel administrativo para usuários com permissão
 * - Design responsivo (adapta-se a telas pequenas)
 */
const Navbar = () => {
  // Estado para controlar a visibilidade do menu móvel
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Obtém dados e funções de autenticação do contexto Auth
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Função para alternar o estado do menu móvel
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Array de itens do menu com nome e caminho da rota
  // Centraliza a configuração dos links de navegação
  const navItems = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Galeria", path: "/galeria" },
    { name: "Orçamento", path: "/orcamento" },
    { name: "Contato", path: "/contato" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo/Nome da empresa com link para a página inicial */}
          <Link to="/" className="text-2xl font-bold text-primary">
            EstofaMais
          </Link>

          {/* Menu de navegação para desktop (visível apenas em telas médias e maiores) */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Menu de usuário (login/logout) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline-block">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Link para meus orçamentos (visível para todos os usuários autenticados) */}
                  <DropdownMenuItem asChild>
                    <Link to="/meus-orcamentos" className="w-full cursor-pointer">
                      Meus Orçamentos
                    </Link>
                  </DropdownMenuItem>
                  
                  {/* Opções de administrador (visíveis apenas para admin) */}
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full cursor-pointer">
                          Painel de Administração
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/orcamentos" className="w-full cursor-pointer">
                          Gerenciar Orçamentos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/galeria" className="w-full cursor-pointer">
                          Gerenciar Galeria
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {/* Opção de logout */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-500 cursor-pointer focus:text-red-500" 
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Entrar</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Botão do menu móvel (visível apenas em telas pequenas) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Menu móvel expansível (visível apenas quando isMenuOpen é true e em telas pequenas) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-2">
            {/* Links de navegação para mobile */}
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className="block text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={toggleMenu} // Fecha o menu ao clicar em um link
                >
                  {item.name}
                </Link>
              </div>
            ))}
            
            {/* Divider */}
            <div className="border-t my-2"></div>
            
            {/* Opções de usuário para mobile */}
            {isAuthenticated ? (
              <>
                <div className="py-2 px-1 font-medium">{user?.name}</div>
                
                {/* Link para meus orçamentos em mobile */}
                <Link
                  to="/meus-orcamentos"
                  className="block text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Meus Orçamentos
                </Link>
                
                {isAdmin && (
                  <>
                    <Link
                      to="/admin"
                      className="block text-gray-700 hover:text-primary transition-colors py-2"
                      onClick={toggleMenu}
                    >
                      Painel de Administração
                    </Link>
                    <Link
                      to="/admin/orcamentos"
                      className="block text-gray-700 hover:text-primary transition-colors py-2"
                      onClick={toggleMenu}
                    >
                      Gerenciar Orçamentos
                    </Link>
                    <Link
                      to="/admin/galeria"
                      className="block text-gray-700 hover:text-primary transition-colors py-2"
                      onClick={toggleMenu}
                    >
                      Gerenciar Galeria
                    </Link>
                  </>
                )}
                
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block w-full text-left text-red-500 hover:text-red-700 transition-colors py-2"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
