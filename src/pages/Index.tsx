
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sofa, Armchair, Car, Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Componente Index - Página inicial
 * 
 * Esta é a primeira página que os usuários veem ao acessar o site.
 * Apresenta uma visão geral da empresa, serviços, e chamadas para ação.
 * 
 * Substituição de dados mocados:
 * - Os destaques devem ser carregados de uma API:
 *   GET /api/highlights - Para obter destaques da home
 * - As estatísticas devem ser carregadas de uma API:
 *   GET /api/stats - Para obter números e métricas
 * - Os depoimentos devem ser carregados de uma API:
 *   GET /api/testimonials - Para obter avaliações de clientes
 */
const Index = () => {
  // TODO: Substituir por chamada à API - GET /api/highlights
  const services = [
    {
      id: 1,
      icon: Sofa,
      title: "Reforma de Sofás",
      description: "Renovação completa de sofás com materiais de alta qualidade"
    },
    {
      id: 2,
      icon: Armchair,
      title: "Reforma de Cadeiras",
      description: "Restauração de cadeiras de jantar, escritório e poltronas"
    },
    {
      id: 3,
      icon: Car,
      title: "Estofamento Automotivo",
      description: "Renovação de bancos de carros e interiores de veículos"
    }
  ];

  // TODO: Substituir por chamada à API - GET /api/stats
  const stats = [
    { value: "3500+", label: "Projetos Concluídos" },
    { value: "15+", label: "Anos de Experiência" },
    { value: "98%", label: "Clientes Satisfeitos" }
  ];

  // TODO: Substituir por chamada à API - GET /api/testimonials
  const testimonials = [
    {
      id: 1,
      quote: "Fiquei impressionado com a qualidade e atenção aos detalhes. Meu sofá parece novo novamente!",
      author: "Maria S.",
      location: "São Paulo, SP"
    },
    {
      id: 2,
      quote: "Excelente atendimento e o resultado final superou minhas expectativas. Recomendo a todos!",
      author: "João P.",
      location: "Campinas, SP"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-brand-green to-brand-green-light overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Transforme Seus Estofados com Qualidade e Estilo
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Especialistas em reforma de sofás, cadeiras e estofamento automotivo.
              Materiais de qualidade e acabamento impecável.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="bg-white text-brand-green hover:bg-brand-cream">
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
                <Link to="/galeria">Explorar Galeria</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-cream/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para a renovação dos seus estofados, combinando expertise técnica, 
              materiais de alta qualidade e atendimento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white p-8 rounded-lg shadow-md border border-brand-green-light/20 hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${0.2 * service.id}s` }}
              >
                <div className="bg-brand-green-light/20 p-4 inline-block rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to="/servicos" 
                  className="text-brand-green font-medium flex items-center hover:underline"
                >
                  Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-brand-green-lighter mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Funcionamos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso processo é simples e eficiente, garantindo que você tenha uma experiência tranquila do início ao fim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-brand-green-light/30 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-2">Orçamento</h3>
              <p className="text-gray-600">Avaliamos o seu estofado e preparamos um orçamento detalhado.</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-brand-green-light/30 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-2">Aprovação</h3>
              <p className="text-gray-600">Após aprovação, agendamos a retirada do seu estofado.</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-brand-green-light/30 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-2">Produção</h3>
              <p className="text-gray-600">Realizamos a reforma com materiais de alta qualidade.</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-brand-green-light/30 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green font-bold text-xl">4</div>
              <h3 className="text-xl font-semibold mb-2">Entrega</h3>
              <p className="text-gray-600">Entregamos seu estofado renovado em sua casa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-brand-cream/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A satisfação dos nossos clientes é nosso maior orgulho. Veja o que eles têm a dizer sobre nossos serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-8 rounded-lg shadow-md border border-brand-green-light/20 animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-brand-green-light fill-brand-green-light" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-brand-green rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-brand-green hover:bg-brand-green/90 text-white">
              <Link to="/galeria">Ver Todos os Projetos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Transformar Seus Estofados?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato hoje mesmo para um orçamento gratuito e comece a renovação dos seus estofados.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-brand-green hover:bg-brand-cream">
              <Link to="/orcamento">Solicitar Orçamento</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
