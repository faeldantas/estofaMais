
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
import BlogPostDetailWithComments from "./components/BlogPostDetailWithComments";
import MaterialsPage from "./pages/MaterialsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserQuotesPage from "./pages/UserQuotesPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminServices from "./pages/admin/AdminServices";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminQuotes from "./pages/admin/AdminQuotes";

// Componentes para autenticação e proteção de rotas
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * Criação do cliente de consulta para o React Query
 * Usado para gerenciar o estado de dados e requisições
 * 
 * Em um ambiente de produção, você pode configurar opções adicionais, como:
 * - defaultOptions para configurar tempos de cache
 * - queryCache para manipular erros globalmente
 * 
 * const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 5 * 60 * 1000, // 5 minutos
 *       retry: 1,
 *     },
 *   },
 * });
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
 * 5. Provedor de autenticação para gerenciar login/logout e permissões
 * 
 * O roteamento mapeia URLs para os diferentes componentes de página,
 * permitindo navegação sem recarregar a página inteira.
 * 
 * Em um ambiente de produção, as rotas podem ser protegidas com middleware 
 * de autenticação no backend, além da proteção no frontend.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/materiais" element={<MaterialsPage />} />
            <Route path="/orcamento" element={<QuotePage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostDetailWithComments />} />
            
            {/* Rotas de autenticação */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
            
            {/* Rotas protegidas de usuário */}
            <Route path="/meus-orcamentos" element={
              <ProtectedRoute>
                <UserQuotesPage />
              </ProtectedRoute>
            } />
            
            {/* Rotas protegidas de administrador */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/galeria" element={
              <ProtectedRoute adminOnly>
                <AdminGallery />
              </ProtectedRoute>
            } />
            <Route path="/admin/servicos" element={
              <ProtectedRoute adminOnly>
                <AdminServices />
              </ProtectedRoute>
            } />
            <Route path="/admin/materiais" element={
              <ProtectedRoute adminOnly>
                <AdminMaterials />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog" element={
              <ProtectedRoute adminOnly>
                <AdminBlog />
              </ProtectedRoute>
            } />
            <Route path="/admin/orcamentos" element={
              <ProtectedRoute adminOnly>
                <AdminQuotes />
              </ProtectedRoute>
            } />
            
            {/* Rota curinga que captura URLs inválidas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
