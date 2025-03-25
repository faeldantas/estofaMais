
import Layout from "@/components/Layout";
import ServiceItem from "@/components/ServiceItem";
import { Sofa, Chair, Car } from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Reforma de Sofás",
      description: "Renovamos completamente seus sofás, sejam eles de 2, 3 ou mais lugares. Trocamos espumas, molas, tecidos e estruturas danificadas para devolver o conforto e a beleza originais do seu móvel.",
      icon: Sofa,
      materials: ["Suede", "Couro", "Veludo", "Linho", "Chenille"],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          after: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]
    },
    {
      id: 2,
      title: "Reforma de Cadeiras",
      description: "Restauramos cadeiras de jantar, escritório, poltronas e banquetas. Recuperamos o conforto e a estética de suas cadeiras com materiais de alta qualidade e acabamento impecável.",
      icon: Chair,
      materials: ["Tecido Impermeável", "Couro Sintético", "Microfibra", "Couro Natural", "Tecidos Estampados"],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          after: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]
    },
    {
      id: 3,
      title: "Estofamento Automotivo",
      description: "Especializados em reforma de bancos de carros, motos e outros veículos. Trabalhamos com diferentes modelos e oferecemos opções de personalização para deixar seu veículo com sua identidade.",
      icon: Car,
      materials: ["Couro Automotivo", "Couro Ecológico", "Tecido Automotivo", "Alcântara", "Neoprene"],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          after: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]
    }
  ];

  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para reforma e restauração de diversos tipos de estofados, 
              utilizando materiais de alta qualidade e técnicas modernas.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Processo de Trabalho</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça como funciona nosso processo de reforma, do início ao fim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Orçamento</h3>
              <p className="text-gray-600">Avaliamos seu estofado e apresentamos as opções de materiais e serviços.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Retirada</h3>
              <p className="text-gray-600">Buscamos seu estofado em sua residência ou local indicado.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reforma</h3>
              <p className="text-gray-600">Realizamos a reforma completa conforme o combinado no orçamento.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega</h3>
              <p className="text-gray-600">Entregamos o estofado pronto e com garantia de serviço.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
