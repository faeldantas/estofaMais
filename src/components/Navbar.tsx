
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Componente Navbar - Barra de navegação principal do site
 * 
 * Funcionalidades:
 * - Navegação entre as principais páginas do site
 * - Design responsivo (adapta-se a telas pequenas)
 * - Menu móvel que pode ser expandido/recolhido em dispositivos pequenos
 * - Usa Link do react-router-dom para navegação sem recarregar a página
 */
const Navbar = () => {
  // Estado para controlar a visibilidade do menu móvel
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
