
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EstofaMais</h3>
            <p className="text-gray-300 mb-4">
              Transformando seus estofados com qualidade e dedicação há mais de 15 anos.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-300 hover:text-white transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/orcamento" className="text-gray-300 hover:text-white transition-colors">
                  Orçamento
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contato@estofamais.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Rua das Reformas, 123 - São Paulo/SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EstofaMais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
