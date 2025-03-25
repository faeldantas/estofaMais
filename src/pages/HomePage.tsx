
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Sofa, Car, Chair } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
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
      icon: Chair,
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforme seus Estofados com Qualidade e Estilo
            </h1>
            <p className="text-xl mb-8">
              Somos especialistas em dar vida nova a seus móveis favoritos com materiais de alta qualidade e técnicas modernas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/galeria">Ver Trabalhos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para reforma de diversos tipos de estofados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/servicos" className="text-blue-600 font-medium hover:underline">
                  Saiba mais
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Por que escolher a EstofaMais?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Profissionais Experientes</h3>
                    <p className="text-gray-600">Nossa equipe possui mais de 15 anos de experiência em reformas.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Materiais de Qualidade</h3>
                    <p className="text-gray-600">Utilizamos apenas os melhores tecidos e materiais para seus estofados.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Garantia de Satisfação</h3>
                    <p className="text-gray-600">Garantimos que você ficará satisfeito com o resultado final.</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-8">
                <Link to="/sobre">Conheça Nossa História</Link>
              </Button>
            </div>
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A satisfação de nossos clientes é nossa maior recompensa.
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar seus estofados?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato conosco hoje para um orçamento gratuito e sem compromisso.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/orcamento">Solicitar Orçamento</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
