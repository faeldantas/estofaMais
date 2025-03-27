
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

/**
 * Esquema de validação do formulário de contato
 */
const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  subject: z.string().min(3, { message: "Assunto deve ter pelo menos 3 caracteres" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

/**
 * Tipo derivado do esquema para uso no formulário
 */
type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * ContactPage - Página de contato
 * Exibe informações de contato e formulário para envio de mensagens
 * 
 * Substituição de dados mocados:
 * - As informações de contato devem ser carregadas de uma API:
 *   GET /api/contact-info - Para obter os dados de contato da empresa
 * - O envio do formulário deve ser feito para uma API:
 *   POST /api/contact - Para enviar a mensagem de contato
 */
const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  /**
   * Função que processa o envio do formulário
   * @param data Valores do formulário validados
   */
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // TODO: Substituir por chamada à API - POST /api/contact
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form submitted:", data);
      setIsSubmitting(false);
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      
      form.reset();
    }, 1500);
  };

  // TODO: Substituir por chamada à API - GET /api/contact-info
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 99999-9999",
      description: "Seg-Sex, 8h às 18h",
    },
    {
      icon: Mail,
      title: "E-mail",
      info: "contato@estofamais.com",
      description: "Respondemos em até 24h",
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: "Rua das Reformas, 123",
      description: "São Paulo, SP, 01234-567",
    },
    {
      icon: Clock,
      title: "Horário de Funcionamento",
      info: "Segunda a Sexta",
      description: "8h às 18h",
    },
  ];

  return (
    <Layout>
      <section className="py-12 bg-brand-cream/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos prontos para atender suas dúvidas e solicitações. Entre em contato conosco por 
              um dos canais abaixo ou preencha o formulário.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-brand-green-light/20">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-green-light/30 text-brand-green rounded-full mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-800 font-medium">{item.info}</p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-brand-green-light/20">
                <h3 className="text-xl font-semibold mb-4">Nossa Localização</h3>
                <div className="aspect-video bg-gray-200 rounded-md">
                  {/* Map would go here - using a placeholder */}
                  {/* TODO: Integrar com API de mapas como Google Maps ou Mapbox */}
                  <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                    Mapa Interativo Aqui
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-brand-green-light/20">
              <h2 className="text-2xl font-semibold mb-6">Envie-nos uma mensagem</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Seu nome" 
                            {...field}
                            className="border-brand-green-light focus-visible:ring-brand-green" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="seu@email.com" 
                            {...field}
                            className="border-brand-green-light focus-visible:ring-brand-green" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Assunto da mensagem" 
                            {...field}
                            className="border-brand-green-light focus-visible:ring-brand-green" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite sua mensagem aqui..." 
                            className="min-h-[150px] border-brand-green-light focus-visible:ring-brand-green"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
