
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, Users } from "lucide-react";

const AboutPage = () => {
  const timeline = [
    {
      year: "2005",
      title: "Fundação",
      description: "A EstofaMais foi fundada com o propósito de oferecer serviços de alta qualidade para reforma de estofados."
    },
    {
      year: "2010",
      title: "Expansão",
      description: "Ampliamos nossas instalações e começamos a atender todo o estado de São Paulo."
    },
    {
      year: "2015",
      title: "Novos Serviços",
      description: "Incluímos serviços especializados em estofamento automotivo e para barcos."
    },
    {
      year: "2020",
      title: "Reconhecimento",
      description: "Conquistamos o prêmio de melhor empresa de reforma de estofados da região."
    }
  ];

  const team = [
    {
      name: "Carlos Silva",
      role: "Fundador e Diretor",
      bio: "Com mais de 20 anos de experiência no ramo, Carlos fundou a EstofaMais com a visão de transformar o mercado de reformas de estofados.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      name: "Ana Ferreira",
      role: "Gerente de Produção",
      bio: "Responsável por garantir a qualidade e o cumprimento dos prazos em todos os projetos de reforma.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      name: "Pedro Santos",
      role: "Designer de Interiores",
      bio: "Ajuda os clientes a escolherem os melhores materiais e designs para seus estofados, trazendo elegância e conforto.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Trabalhamos para superar as expectativas dos nossos clientes, oferecendo um atendimento personalizado e de qualidade."
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Buscamos a excelência em todos os aspectos do nosso trabalho, desde o atendimento até a entrega final."
    },
    {
      icon: Calendar,
      title: "Pontualidade",
      description: "Valorizamos o tempo dos nossos clientes e nos comprometemos a cumprir os prazos estabelecidos."
    }
  ];

  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sobre a EstofaMais</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça nossa história, missão e os valores que guiam nosso trabalho todos os dias.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h2 className="text-2xl font-bold mb-6">Nossa História</h2>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-24 mr-8 text-center">
                      <div className="bg-blue-100 text-blue-600 py-2 px-4 rounded-full font-bold">
                        {item.year}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h2 className="text-2xl font-bold mb-6">Missão, Visão e Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Missão</h3>
                  <p className="text-gray-600">
                    Oferecer soluções de alta qualidade em reforma de estofados, proporcionando conforto, 
                    beleza e satisfação aos nossos clientes.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Visão</h3>
                  <p className="text-gray-600">
                    Ser referência nacional em reforma de estofados, reconhecidos pela excelência, 
                    inovação e compromisso com a satisfação dos clientes.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Valores</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Qualidade em tudo que fazemos</li>
                    <li>Comprometimento com prazos</li>
                    <li>Honestidade e transparência</li>
                    <li>Respeito aos clientes e colaboradores</li>
                    <li>Sustentabilidade</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Nossos Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Nossa Equipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-blue-600 mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
