
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Componente NotFound - Página 404 para rotas não encontradas
 * 
 * Este componente:
 * 1. Exibe uma mensagem amigável quando o usuário tenta acessar uma URL inexistente
 * 2. Registra no console o caminho que causou o erro para fins de depuração
 * 3. Fornece um link para retornar à página inicial
 */
const NotFound = () => {
  // Obtém informações sobre a localização atual (URL) usando o hook do react-router
  const location = useLocation();

  // Efeito que registra a URL não encontrada no console
  // Útil para rastrear tentativas de acesso a páginas inexistentes
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Código do erro HTTP */}
        <h1 className="text-4xl font-bold mb-4">404</h1>
        
        {/* Mensagem explicativa */}
        <p className="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
        
        {/* Link para a página inicial */}
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
