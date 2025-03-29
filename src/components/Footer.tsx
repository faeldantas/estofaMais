
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

/**
 * Componente Footer - Rodapé do site
 * 
 * Este componente exibe:
 * - Informações sobre a empresa
 * - Links de navegação rápida
 * - Informações de contato
 * - Nota de copyright
 * 
 * O rodapé usa um fundo escuro com texto claro para destacar-se do resto do site,
 * indicando visualmente o final da página.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Grid de 3 colunas (responsivo) para organizar o conteúdo do rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primeira coluna: Informações sobre a empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">EstofaMais</h3>
            <p className="text-gray-300 mb-4">
              Transformando seus estofados com qualidade e dedicação há mais de 20 anos.
            </p>
            <div className="flex space-x-4">
              {/* Espaço reservado para ícones de mídias sociais */}
            </div>
          </div>

          {/* Segunda coluna: Links rápidos para navegação */}
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

          {/* Terceira coluna: Informações de contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              {/* Telefone com ícone */}
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(11) 99999-9999</span>
              </div>
              {/* Email com ícone */}
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contato@estofamais.com</span>
              </div>
              {/* Endereço com ícone */}
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Jardim de São José, 153 - Russas/CE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Área de copyright no rodapé */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EstofaMais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
