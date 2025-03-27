
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Sofa, Car, Armchair } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

/**
 * HomePage - Componente principal da página inicial
 * Exibe seções informativas sobre a empresa e seus serviços
 * 
 * Substituição de dados mocados:
 * - As informações de serviços devem ser carregadas de uma API:
 *   GET /api/services - Para obter a lista de serviços oferecidos
 * - Os depoimentos devem ser carregados de uma API:
 *   GET /api/testimonials - Para obter depoimentos de clientes
 */
const HomePage = () => {
  // Lista de serviços oferecidos com seus ícones e descrições
  // TODO: Substituir por chamada à API - GET /api/services
  const services = [
    {
      id: 1,
      title: "Sofás",
      description: "Renovamos o aspecto de seu sofá, mantendo o conforto que você ama.",
      icon: Sofa,
    },
    {
      id: 2,
      title: "Cadeiras",
      description: "Restauramos cadeiras de jantar, escritório e outros estilos.",
      icon: Armchair,
    },
    {
      id: 3,
      title: "Automóveis",
      description: "Especialistas em estofamento automotivo para todos os modelos.",
      icon: Car,
    },
  ];

  return (
    <Layout>
      {/* Hero Section - Banner principal com chamada para ação */}
      <section className="bg-gradient-to-r from-brand-green to-brand-green-light text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforme seus Estofados com Qualidade e Estilo
            </h1>
            <p className="text-xl mb-8">
              Somos especialistas em dar vida nova a seus móveis favoritos com materiais de alta qualidade e técnicas modernas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Botão de solicitar orçamento - com fundo branco */}
              <Button asChild size="lg" className="bg-white text-brand-green hover:bg-brand-cream">
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>
              {/* Botão de ver trabalhos - com fundo verde para melhor contraste */}
              <Button asChild size="lg" variant="outline" className="border-white text-white bg-brand-green hover:bg-white hover:text-brand-green">
                <Link to="/galeria">Ver Trabalhos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Visão geral dos serviços oferecidos */}
      <section className="py-16 bg-brand-cream/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para reforma de diversos tipos de estofados.
            </p>
          </div>

          {/* Grade de cards de serviços */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                {/* Ícone do serviço */}
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 bg-brand-green-light/30 text-brand-green rounded-full">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/servicos" className="text-brand-green font-medium hover:underline">
                  Saiba mais
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Seção de diferenciais da empresa */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Por que escolher a EstofaMais?</h2>
              {/* Lista de diferenciais numerados */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-green-light/30 text-brand-green rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Profissionais Experientes</h3>
                    <p className="text-gray-600">Nossa equipe possui mais de 15 anos de experiência em reformas.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-green-light/30 text-brand-green rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Materiais de Qualidade</h3>
                    <p className="text-gray-600">Utilizamos apenas os melhores tecidos e materiais para seus estofados.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-green-light/30 text-brand-green rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Garantia de Satisfação</h3>
                    <p className="text-gray-600">Garantimos que você ficará satisfeito com o resultado final.</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-8 bg-brand-green hover:bg-brand-green/90 text-white">
                <Link to="/sobre">Conheça Nossa História</Link>
              </Button>
            </div>
            {/* Imagem ilustrativa da seção */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Sala com sofá reformado" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Seção de depoimentos */}
      <section className="py-16 bg-brand-cream/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A satisfação de nossos clientes é nossa maior recompensa.
            </p>
          </div>

          {/* Carrossel de depoimentos */}
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {/* TODO: Substituir por chamada à API - GET /api/testimonials */}
              {[1, 2, 3].map((index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card>
                    <CardContent className="p-6">
                      <blockquote className="text-gray-600 italic mb-4">
                        "Fiquei impressionado com a qualidade do serviço e o cuidado com cada detalhe. Meu sofá parece novo novamente!"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                        <div>
                          <p className="font-semibold">Cliente {index}</p>
                          <p className="text-gray-500 text-sm">São Paulo, SP</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* CTA Section - Chamada para ação final */}
      <section className="py-16 bg-brand-green text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar seus estofados?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato conosco hoje para um orçamento gratuito e sem compromisso.
          </p>
          <Button asChild size="lg" className="bg-white text-brand-green hover:bg-brand-cream">
            <Link to="/orcamento">Solicitar Orçamento</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
