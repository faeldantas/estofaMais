
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Interface para as props do componente Layout
 */
interface LayoutProps {
  children: ReactNode;  // Conteúdo a ser renderizado dentro do layout
}

/**
 * Componente Layout - Estrutura padrão para todas as páginas do site
 * 
 * Este componente encapsula a estrutura comum a todas as páginas:
 * - Barra de navegação no topo
 * - Conteúdo principal (fornecido como children)
 * - Rodapé no final
 * 
 * O layout usa flex-col para organizar os elementos verticalmente e
 * min-h-screen para garantir que mesmo páginas com pouco conteúdo
 * ocupem toda a altura da tela.
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegação fixa no topo */}
      <Navbar />
      
      {/* Conteúdo principal da página - recebe flex-grow para ocupar todo espaço disponível */}
      <main className="flex-grow">{children}</main>
      
      {/* Rodapé fixo na parte inferior */}
      <Footer />
    </div>
  );
};

export default Layout;
