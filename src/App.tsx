
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/orcamento" element={<QuotePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
