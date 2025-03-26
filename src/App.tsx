
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importação das páginas da aplicação
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";

/**
 * Criação do cliente de consulta para o React Query
 * Usado para gerenciar o estado de dados e requisições
 */
const queryClient = new QueryClient();

/**
 * Componente App - Componente raiz da aplicação
 * 
 * Este componente configura:
 * 1. Provedor de React Query para gerenciamento de estado e cache
 * 2. Provedor de tooltips para dicas contextuais
 * 3. Componentes Toaster para notificações toast
 * 4. Sistema de roteamento com react-router-dom
 * 
 * O roteamento mapeia URLs para os diferentes componentes de página,
 * permitindo navegação sem recarregar a página inteira.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rotas para as páginas principais do site */}
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/orcamento" element={<QuotePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          {/* Rota curinga que captura URLs inválidas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
