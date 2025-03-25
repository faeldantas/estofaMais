
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          <Link to="/" className="text-2xl font-bold text-primary">
            EstofaMais
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-2">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className="block text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={toggleMenu}
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
