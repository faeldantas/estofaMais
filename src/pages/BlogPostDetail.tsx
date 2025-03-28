
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";

/**
 * Interface para representar um post do blog
 */
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

/**
 * Componente BlogPostDetail - Exibe detalhes completos de um post do blog
 * 
 * Este componente:
 * 1. Usa o parâmetro :id da URL para identificar qual post deve exibir
 * 2. Busca os dados do post específico (atualmente mockados)
 * 3. Renderiza o conteúdo completo do post em uma visualização formatada
 * 
 * Em produção:
 * - Este componente deve buscar os dados do post da API:
 *   GET /api/blog/posts/:id
 * - Incluir tratamento de erro para posts não encontrados
 * - Medir e registrar visualizações do post:
 *   POST /api/blog/posts/:id/view
 */
const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulação de busca do post da API
    // Em produção: substituir por fetch(`/api/blog/posts/${id}`)
    const fetchPost = () => {
      setLoading(true);
      
      // Mock de dados - substituir por chamada à API
      const mockPosts = [
        {
          id: 1,
          title: "Como escolher o melhor tecido para seu sofá",
          excerpt: "Guia completo sobre os diferentes tipos de tecidos e suas vantagens para reformar seu sofá.",
          content: "Escolher o tecido certo para o seu sofá é uma decisão importante que afeta não apenas a aparência, mas também a durabilidade e o conforto do móvel. Neste artigo, vamos explorar os diferentes tipos de tecidos disponíveis no mercado, suas características, vantagens e desvantagens, para ajudá-lo a fazer a melhor escolha para o seu estofado.\n\nVeludo: O veludo é um tecido luxuoso e macio, conhecido por sua textura rica e aparência elegante. É uma ótima opção para sofás em ambientes mais formais ou para quem busca um toque de sofisticação na decoração. O veludo é durável e resistente a desgaste, mas requer cuidados especiais na limpeza e manutenção.\n\nLinho: O linho é uma fibra natural que oferece um visual leve e despojado. É altamente respirável, o que o torna uma excelente opção para climas quentes. No entanto, é mais suscetível a manchas e pode amassar facilmente, o que pode não ser ideal para famílias com crianças pequenas ou animais de estimação.\n\nCouro: O couro é um material clássico e atemporal, conhecido por sua durabilidade e facilidade de limpeza. Ele desenvolve uma pátina única com o tempo, tornando-se mais bonito à medida que envelhece. O couro é resistente a manchas e derramamentos, mas pode ser mais quente ao toque em climas quentes e requer condicionamento regular para evitar rachaduras.\n\nMicrofibra: A microfibra é um tecido sintético que imita a aparência e o toque de materiais naturais como camurça ou veludo. É extremamente durável, fácil de limpar e resistente a manchas, tornando-o uma escolha popular para famílias com crianças e animais de estimação. A microfibra também tende a ser mais acessível em comparação com tecidos naturais.\n\nChenille: O chenille é conhecido por sua textura macia e aconchegante. É um tecido durável que resiste bem ao desgaste diário, tornando-o uma boa opção para sofás de uso frequente. No entanto, pode ser mais difícil de limpar e pode desbotar se exposto à luz solar direta por longos períodos.\n\nAo escolher o tecido para o seu sofá, considere fatores como o estilo da sua decoração, o nível de uso do sofá, a presença de crianças e animais de estimação em casa, e suas preferências pessoais em termos de textura e aparência. Lembre-se também de considerar a facilidade de manutenção e limpeza, especialmente se o sofá será usado diariamente.\n\nEm nossa loja, oferecemos uma ampla variedade de tecidos para reforma de estofados, e nossa equipe está sempre disponível para ajudá-lo a fazer a melhor escolha para suas necessidades específicas.",
          date: "10 de junho de 2023",
          author: "Ana Ferreira",
          category: "Dicas",
          image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        },
        {
          id: 2,
          title: "Cuidados essenciais para prolongar a vida do seu estofado",
          excerpt: "Aprenda como limpar e manter seus estofados em perfeito estado por muito mais tempo.",
          content: "Os estofados são peças fundamentais em qualquer ambiente doméstico, proporcionando conforto e estilo. Para garantir que durem por muitos anos em ótimas condições, é essencial adotar alguns cuidados básicos de manutenção. Neste artigo, compartilhamos dicas práticas para prolongar a vida útil do seu estofado e mantê-lo sempre com aparência de novo.\n\nLimpeza Regular: A primeira e mais importante dica é manter uma rotina de limpeza regular. Aspire seu estofado pelo menos uma vez por semana para remover poeira, pelos de animais e pequenas partículas que podem se acumular nas fibras do tecido. Use o bocal próprio para estofados do aspirador, que é mais suave e eficiente para essa tarefa.\n\nProteja da Luz Solar: A exposição prolongada à luz solar direta pode causar desbotamento nos tecidos. Sempre que possível, posicione seus móveis estofados longe de janelas com incidência direta de sol, ou utilize cortinas e persianas para filtrar a luz durante os períodos mais intensos do dia.\n\nRotação de Almofadas: Se o seu estofado possui almofadas removíveis, faça a rotação delas regularmente. Isso ajuda a distribuir o desgaste de forma mais uniforme, evitando que algumas áreas fiquem mais desgastadas que outras. Você pode alternar as almofadas do assento com as do encosto, ou inverter as posições entre direita e esquerda.\n\nLimpeza de Manchas: Acidentes acontecem, e quando ocorrerem, é importante agir rapidamente. Remova qualquer resíduo sólido com uma colher ou espátula, sem esfregar para não espalhar a mancha. Em seguida, blote (não esfregue) a área com um pano limpo e levemente umedecido. Para manchas específicas, consulte as recomendações do fabricante ou um profissional especializado.\n\nLimpeza Profissional Periódica: Mesmo com a manutenção regular, é recomendável fazer uma limpeza profissional a cada 12 a 18 meses, dependendo do uso. Profissionais especializados possuem equipamentos e produtos específicos que podem remover sujeira profunda sem danificar o tecido.\n\nEvite Sentar nos Braços: Os braços dos sofás não são projetados para suportar o peso corporal. Sentar-se neles pode deformar a estrutura interna e comprometer a integridade do móvel a longo prazo.\n\nCuidados com Animais de Estimação: Se você tem animais de estimação, considere usar mantas ou capas protetoras nas áreas onde eles costumam ficar. Treine seus pets para não subirem nos móveis ou forneça a eles seus próprios espaços confortáveis.\n\nUso de Protetores: Existem produtos específicos no mercado que criam uma camada protetora contra manchas e derramamentos. Consulte um especialista para recomendar o produto mais adequado para o tipo de tecido do seu estofado.\n\nAo seguir essas dicas simples, você pode prolongar significativamente a vida útil do seu estofado, mantendo sua beleza e conforto por muitos anos. Lembre-se que a prevenção é sempre o melhor caminho para preservar seus móveis em ótimo estado.",
          date: "22 de maio de 2023",
          author: "Carlos Silva",
          category: "Manutenção",
          image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
        },
        {
          id: 3,
          title: "Tendências de estofados para 2023",
          excerpt: "Conheça as principais tendências em cores, tecidos e estilos para estofados neste ano.",
          content: "O mundo do design de interiores está sempre em evolução, e os estofados não ficam para trás nessa constante renovação de tendências. Para 2023, observamos uma interessante mistura de conforto, sustentabilidade e ousadia nas propostas para sofás, poltronas e outros móveis estofados. Vamos explorar as principais tendências que prometem dominar o mercado este ano.\n\nCores Terrosas e Naturais: Em linha com o movimento de reconexão com a natureza, que ganhou força nos últimos anos, as cores terrosas estão em alta para estofados em 2023. Tons de marrom, terracota, verde-oliva e bege são escolhas populares, trazendo aconchego e serenidade para os ambientes. Essas cores funcionam bem tanto em peças principais, como sofás, quanto em itens menores, como poltronas e puffs.\n\nVeludo e Texturas Táteis: O veludo continua sendo um favorito, agora acompanhado por outros tecidos que convidam ao toque. Materiais com texturas interessantes, como bouclê, tweed e tecidos canelados, estão ganhando espaço, adicionando dimensão e interesse visual aos estofados. Essas texturas não apenas enriquecem a estética do ambiente, mas também proporcionam uma experiência sensorial agradável.\n\nFormas Curvas e Orgânicas: As linhas retas e angulares estão dando lugar a formas mais suaves e orgânicas. Sofás com contornos curvos, poltronas arredondadas e puffs em formatos irregulares são exemplos dessa tendência que remete ao design dos anos 70, revisitado com uma abordagem contemporânea. Essas peças trazem fluidez e dinamismo para os espaços.\n\nSustentabilidade e Materiais Conscientes: A preocupação ambiental está influenciando fortemente as escolhas de materiais para estofados. Tecidos feitos de fibras recicladas, algodão orgânico e outros materiais de baixo impacto ambiental estão em alta demanda. Além disso, a durabilidade se tornou um critério importante, com consumidores buscando peças de qualidade que durem por muitos anos, reduzindo o consumo e o descarte.\n\nModularidade e Flexibilidade: Em resposta às necessidades de espaços multifuncionais, especialmente em residências menores, móveis modulares e flexíveis estão ganhando popularidade. Sofás que podem ser reconfigurados, poltronas que se transformam em chaises e outros móveis adaptáveis permitem que os usuários ajustem seus espaços de acordo com diferentes necessidades ao longo do dia.\n\nEstilos Retrô Revisitados: Elementos de design das décadas de 60, 70 e 80 estão sendo reinterpretados com uma linguagem contemporânea. Vemos isso em detalhes como pés de metal dourado, estofados capitonês mais sutis e combinações de cores que remetem a essas épocas, trazendo um toque de nostalgia sem parecer datado.\n\nMix de Texturas e Padrões: A tendência de misturar diferentes texturas e padrões em um mesmo ambiente ou até mesmo em uma única peça está ganhando força. Um sofá liso pode ser combinado com almofadas estampadas, ou uma poltrona pode apresentar diferentes texturas em seu encosto e assento, criando composições ricas e personalizadas.\n\nEstofados Statement: Peças de destaque, que funcionam como verdadeiras obras de arte no ambiente, são uma tendência forte para quem deseja fazer uma declaração de estilo. Isso pode se manifestar através de cores vibrantes, formatos inusitados ou detalhes marcantes, como franjas, botões decorativos ou costuras aparentes.\n\nAo incorporar essas tendências em sua decoração, lembre-se de considerar seu estilo pessoal e as necessidades específicas do seu espaço. As tendências são referências inspiradoras, mas o mais importante é criar um ambiente que reflita sua personalidade e proporcione o conforto que você deseja no dia a dia.",
          date: "5 de abril de 2023",
          author: "Pedro Santos",
          category: "Tendências",
          image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
        },
        {
          id: 4,
          title: "Como avaliar se vale a pena reformar seu estofado",
          excerpt: "Dicas para decidir entre reformar ou comprar um novo estofado, considerando custo-benefício.",
          date: "18 de março de 2023",
          author: "Ana Ferreira",
          category: "Dicas",
          content: "Muitas vezes nos deparamos com a dúvida: vale mais a pena reformar o estofado antigo ou comprar um novo? Esta é uma decisão que envolve diversos fatores, desde questões financeiras até sentimentais. Neste artigo, vamos analisar pontos importantes que podem ajudar você a tomar a melhor decisão para o seu caso específico.\n\nAnálise da Estrutura: O primeiro e mais importante aspecto a ser avaliado é a estrutura do móvel. Uma boa estrutura de madeira pode durar décadas se bem cuidada. Verifique se há partes quebradas, se a madeira está íntegra e se as junções estão firmes. Pequenos reparos na estrutura são viáveis, mas se ela estiver comprometida, a reforma pode não ser vantajosa.\n\nValor Sentimental: Muitas vezes, um móvel tem valor afetivo e histórico que transcende seu valor material. Peças de família, móveis vintage ou aqueles que acompanharam momentos importantes da sua vida podem valer a reforma mesmo quando, do ponto de vista estritamente financeiro, um novo móvel seria mais econômico.\n\nEstilo e Design: Considere se o estilo do móvel ainda combina com a decoração atual ou pretendida para o ambiente. Móveis com design atemporal ou de época geralmente mantêm seu apelo estético ao longo dos anos e podem ganhar uma nova vida com uma reforma bem executada.\n\nCusto da Reforma x Custo do Novo: Faça um orçamento detalhado da reforma, incluindo todos os materiais e mão de obra. Compare este valor com o custo de um móvel novo de qualidade semelhante. Lembre-se que móveis novos de qualidade podem ser bastante caros, enquanto uma reforma bem feita pode proporcionar um resultado equivalente por um preço menor.\n\nSustentabilidade: A reforma é geralmente a opção mais sustentável, pois reduz o descarte de móveis e a demanda por novos recursos. Se a questão ambiental é importante para você, este pode ser um fator decisivo a favor da reforma.\n\nNecessidades Específicas: Avalie se o móvel atual, mesmo reformado, atenderá às suas necessidades específicas de conforto, tamanho e funcionalidade. Por exemplo, se você precisa de um sofá maior ou com configuração diferente, talvez a compra de um novo seja mais adequada.\n\nTempo de Uso Futuro: Considere por quanto tempo mais você pretende usar o móvel. Se for uma solução temporária ou para um imóvel que você não pretende permanecer por muito tempo, talvez não valha o investimento em uma reforma completa.\n\nQualidade do Móvel Original: Móveis antigos frequentemente eram fabricados com materiais e técnicas superiores aos atuais. Se o seu estofado é de excelente qualidade original, a reforma tende a ser vantajosa, pois resultará em um móvel que pode durar muito mais tempo que um novo de qualidade média.\n\nProfissional Qualificado: A qualidade do serviço de reforma é crucial para o resultado final. Busque referências de bons profissionais e veja exemplos de trabalhos anteriores antes de decidir. Um bom estofador pode transformar completamente o aspecto e o conforto do seu móvel.\n\nPossibilidade de Personalização: A reforma oferece uma oportunidade única de personalização. Você pode escolher exatamente o tecido, a densidade da espuma, o tipo de acabamento e outros detalhes que seria difícil encontrar em um móvel pronto. Esta flexibilidade permite criar um móvel que atenda perfeitamente ao seu gosto e necessidades.\n\nAo pesar todos estes fatores, você estará mais preparado para tomar uma decisão informada sobre reformar ou substituir seu estofado. Lembre-se que não existe uma resposta universal – a melhor escolha depende do seu contexto específico, prioridades e circunstâncias.",
          image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        },
        {
          id: 5,
          title: "A importância de contratar profissionais qualificados para reforma",
          excerpt: "Por que é fundamental escolher uma empresa especializada para realizar a reforma do seu estofado.",
          date: "2 de fevereiro de 2023",
          author: "Carlos Silva",
          category: "Serviços",
          content: "Quando decidimos reformar um estofado, seja por desgaste natural ou desejo de renovação, uma das decisões mais importantes é sobre quem executará o serviço. Embora possa ser tentador optar por alternativas mais econômicas ou mesmo tentar um projeto DIY, existem razões importantes para escolher profissionais qualificados para este trabalho. Neste artigo, exploramos por que vale a pena investir em especialistas para a reforma do seu estofado.\n\nConhecimento Técnico Especializado: Estofadores profissionais possuem conhecimento específico sobre diferentes tipos de materiais, técnicas de costura, densidade de espumas e estruturas de móveis. Este conhecimento técnico garante que o trabalho seja realizado com precisão e durabilidade. Eles sabem, por exemplo, qual tipo de tecido é mais adequado para cada uso e ambiente, e qual espuma oferecerá o melhor conforto para cada tipo de móvel.\n\nFerramentas e Equipamentos Adequados: O processo de reforma de estofados requer ferramentas específicas que muitas vezes não estão disponíveis para o consumidor comum. Profissionais investem em equipamentos de qualidade que permitem um trabalho preciso e eficiente, desde máquinas de costura industriais até compressores para grampeamento.\n\nAcesso a Materiais de Qualidade: Empresas especializadas têm acesso a fornecedores de materiais de primeira linha, muitas vezes com opções que não estão disponíveis no varejo. Isso significa melhor qualidade em tecidos, espumas, molas, correias e outros componentes essenciais para um estofado duradouro.\n\nGarantia de Serviço: Profissionais confiáveis oferecem garantia sobre o trabalho realizado, proporcionando tranquilidade caso surja algum problema após a conclusão da reforma. Esta garantia é um indicativo do compromisso do prestador com a qualidade do serviço.\n\nDiagnóstico Preciso: Um estofador experiente pode identificar problemas que não são imediatamente visíveis, como danos na estrutura interna do móvel ou problemas que afetarão a durabilidade do estofado a longo prazo. Este diagnóstico preciso evita surpresas desagradáveis e gastos adicionais no futuro.\n\nAcabamento Profissional: A diferença entre um trabalho amador e profissional é evidente no acabamento. Detalhes como costuras retas, padrões alinhados, cantos bem definidos e tensão uniforme do tecido são características de um serviço de qualidade que afetam não apenas a estética, mas também a durabilidade do estofado.\n\nEconomia de Tempo e Frustrações: Reformar um estofado é um processo complexo e demorado, especialmente sem experiência. Ao contratar um profissional, você economiza tempo e evita a frustração de resultados insatisfatórios ou problemas que surgem por falta de conhecimento técnico.\n\nValorização do Móvel: Uma reforma bem executada pode aumentar significativamente o valor do seu móvel, especialmente se for uma peça antiga ou de design diferenciado. O investimento em um serviço de qualidade se reflete na longevidade e no valor do estofado.\n\nPersonalização com Orientação Especializada: Profissionais podem oferecer orientações valiosas sobre opções de customização que funcionarão melhor para o seu móvel e estilo de vida. Eles conhecem as tendências atuais, mas também sabem o que funciona bem a longo prazo, ajudando você a fazer escolhas que não se arrependerá.\n\nSegurança e Conformidade: Estofados mal reformados podem representar riscos, como estruturas instáveis ou uso de materiais que não atendem às normas de segurança contra incêndio. Profissionais garantem que o trabalho seja realizado de acordo com os padrões de segurança vigentes.\n\nAo considerar a reforma de seus estofados, lembre-se que o barato pode sair caro. O investimento em profissionais qualificados não é apenas uma questão de estética, mas de segurança, durabilidade e valorização do seu patrimônio. Pesquise, peça recomendações e verifique o portfólio antes de escolher o profissional ou empresa para realizar este serviço importante.",
          image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
        },
        {
          id: 6,
          title: "Estofamento automotivo: dicas para personalizar seu veículo",
          excerpt: "Como transformar o interior do seu carro com estofamento personalizado e de qualidade.",
          date: "15 de janeiro de 2023",
          author: "Pedro Santos",
          category: "Automóveis",
          content: "O interior do seu veículo é onde você passa horas significativas da sua vida, seja no trânsito diário ou em viagens longas. Personalizar o estofamento do seu carro não apenas renova sua aparência, mas também pode aumentar o conforto, a funcionalidade e até mesmo o valor do veículo. Neste artigo, compartilhamos dicas valiosas para quem deseja investir na personalização do estofamento automotivo.\n\nAvaliação do Estado Atual: Antes de iniciar qualquer projeto de personalização, avalie cuidadosamente o estado atual do interior do seu veículo. Verifique se há danos estruturais nos bancos, se o estofamento original está desgastado ou manchado, e se os painéis de porta e outras superfícies estofadas precisam de atenção. Esta avaliação ajudará a determinar se você precisa de uma restauração completa ou apenas de atualizações estéticas.\n\nEscolha de Materiais: A seleção de materiais é crucial para o sucesso do seu projeto de personalização. As opções mais comuns incluem:\n\n- Couro natural: Oferece luxo, durabilidade e valorização do veículo, mas requer manutenção regular e pode ser mais quente em climas quentes.\n- Couro sintético (courvin): Uma alternativa mais acessível ao couro natural, com boa durabilidade e facilidade de limpeza, além de maior resistência à água e manchas.\n- Tecidos específicos para automotivos: Disponíveis em várias cores e padrões, são geralmente mais respiráveis e confortáveis em temperaturas extremas, além de mais acessíveis.\n- Alcantara ou microfibra: Materiais premium que oferecem uma sensação semelhante à camurça, muito utilizados em veículos esportivos por seu apelo tátil e aderência.\n\nConsideração sobre o Uso do Veículo: O tipo de uso que você faz do veículo deve influenciar suas escolhas de personalização. Se você tem crianças pequenas ou animais de estimação, materiais mais resistentes a manchas e de fácil limpeza são recomendados. Para veículos usados em trabalho, tecidos mais duráveis podem ser mais adequados, enquanto para carros de luxo ou coleção, o couro de alta qualidade ou acabamentos premium podem ser o foco.\n\nEstilo e Cor: A personalização é uma oportunidade para expressar seu estilo pessoal, mas é importante considerar alguns aspectos práticos:\n\n- Cores muito claras mostram sujeira mais facilmente e podem requerer limpeza mais frequente.\n- Cores escuras podem absorver mais calor em dias ensolarados.\n- Padrões muito chamativos podem cansar com o tempo ou dificultar a revenda do veículo.\n- Considere a harmonia com a cor externa e o estilo geral do veículo.\n\nDetalhes que Fazem a Diferença: Pequenos detalhes podem transformar completamente o interior do seu veículo:\n\n- Costuras contrastantes ou decorativas\n- Inserts em cores ou materiais diferentes\n- Logotipos bordados ou gravados\n- Padrões personalizados ou acabamentos em capitonê\n- Detalhes em ilhós, perfurações ou texturas diferenciadas\n\nErgonomia e Conforto: Além da estética, a personalização pode ser uma oportunidade para melhorar o conforto do seu veículo:\n\n- Considere espumas de densidade diferenciada para maior conforto\n- Avalie a possibilidade de adicionar suporte lombar ou laterais mais pronunciados\n- Para uso esportivo, bancos com maior contenção lateral podem ser adequados\n- Para viagens longas, materiais mais respiráveis aumentam o conforto\n\nInvestimento em Profissionais Qualificados: Este é possivelmente o ponto mais importante. Um estofamento automotivo de qualidade requer habilidades específicas e experiência. Profissionais qualificados garantem:\n\n- Desmontagem e montagem correta dos componentes, sem danificar o veículo\n- Modelagem precisa do novo estofamento, respeitando as curvas e formas originais\n- Acabamento profissional nas costuras e detalhes\n- Técnicas adequadas de fixação que garantem durabilidade\n- Conhecimento sobre os requisitos de segurança, como airbags laterais\n\nIntegração com Outros Elementos: Para um resultado harmonioso, considere outros elementos do interior do veículo:\n\n- Volante e manopla de câmbio podem ser revestidos com materiais complementares\n- Painéis de porta, console central e outras superfícies podem ser integrados ao design\n- Carpetes e forração do teto podem ser substituídos para completar a transformação\n\nManutenção e Cuidados: Invista também em produtos adequados para a manutenção do novo estofamento. Diferentes materiais requerem cuidados específicos, e o profissional que realizar o serviço deve orientar sobre os procedimentos corretos de limpeza e conservação.\n\nAo personalizar o estofamento do seu veículo, você não apenas renova sua aparência, mas cria um ambiente mais agradável e adequado às suas necessidades. Com as escolhas certas e profissionais qualificados, o resultado pode transformar completamente sua experiência ao dirigir, além de potencialmente aumentar o valor do seu automóvel.",
          image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
        }
      ];
      
      const foundPost = mockPosts.find(post => post.id === Number(id));
      
      if (foundPost) {
        // Simulação de um pequeno delay para mostrar o loading
        setTimeout(() => {
          setPost(foundPost);
          setLoading(false);
          
          // Em produção: registrar a visualização
          // fetch(`/api/blog/posts/${id}/view`, { method: 'POST' });
        }, 500);
      } else {
        setError("Post não encontrado");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  /**
   * Formata o conteúdo do post, quebrando em parágrafos
   * @param content - Conteúdo do post em texto bruto
   * @returns Array de parágrafos formatados
   */
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#87b091]">Carregando artigo...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Erro</h1>
            <p className="text-red-500 mb-6">{error}</p>
            <Button 
              onClick={() => navigate('/blog')}
              className="bg-[#87b091] hover:bg-[#87b091]/80"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar para o Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12 bg-brand-cream/50">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => navigate('/blog')}
            variant="outline"
            className="mb-8 border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430] flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o Blog
          </Button>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <span className="text-[#87b091] px-2 py-1 bg-[#87b091]/10 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          
          <div className="mb-8 rounded-xl overflow-hidden shadow-md">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover aspect-video"
              onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/800x450?text=Blog+Post"}
            />
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            {formatContent(post.content)}
          </div>
          
          <div className="mt-12 pt-8 border-t border-[#c4d4ab]">
            <h3 className="text-xl font-semibold mb-4">Compartilhe este artigo</h3>
            <div className="flex gap-3">
              {/* Botões de compartilhamento social - em produção, implementar funcionalidade de compartilhamento */}
              <Button 
                variant="outline" 
                className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
              >
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
              >
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="border-[#c4d4ab] text-[#171430] hover:bg-[#eff0d5] hover:text-[#171430]"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostDetail;
