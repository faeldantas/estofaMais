
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Camera, X } from "lucide-react";

const quoteFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  serviceType: z.string().min(1, { message: "Selecione um tipo de serviço" }),
  itemDescription: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  message: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const QuotePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      itemDescription: "",
      message: "",
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const currentImages = form.getValues("images") || [];
      const newImages = [...currentImages, ...files];
      
      // Limit to 3 images
      if (newImages.length > 3) {
        toast({
          title: "Limite de imagens",
          description: "Você pode enviar no máximo 3 imagens.",
          variant: "destructive"
        });
        return;
      }
      
      form.setValue("images", newImages);
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreview(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    form.setValue("images", newImages);
    
    // Update preview URLs
    const newPreview = [...imagePreview];
    URL.revokeObjectURL(newPreview[index]); // Clean up the URL
    newPreview.splice(index, 1);
    setImagePreview(newPreview);
  };

  const onSubmit = (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data submitted:", data);
      setIsSubmitting(false);
      setHasSubmitted(true);
      
      toast({
        title: "Orçamento solicitado com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      
      // Clean up preview URLs
      imagePreview.forEach(url => URL.revokeObjectURL(url));
      setImagePreview([]);
      
      form.reset();
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4">Solicite um Orçamento</h1>
              <p className="text-gray-600">
                Preencha o formulário abaixo para solicitar um orçamento personalizado para 
                a reforma do seu estofado. Nossa equipe entrará em contato em breve.
              </p>
            </div>

            {hasSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">Orçamento Enviado!</h2>
                <p className="text-green-600 mb-4">
                  Recebemos sua solicitação de orçamento. Nossa equipe analisará as informações 
                  e entrará em contato em até 24 horas úteis.
                </p>
                <Button onClick={() => setHasSubmitted(false)}>Solicitar Novo Orçamento</Button>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
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
                              <Input type="email" placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Serviço</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo de serviço" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sofa">Reforma de Sofá</SelectItem>
                                <SelectItem value="chair">Reforma de Cadeira</SelectItem>
                                <SelectItem value="car">Estofamento Automotivo</SelectItem>
                                <SelectItem value="other">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="itemDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição do Item</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva o item a ser reformado (tipo, tamanho, estado atual, etc.)" 
                              className="min-h-[100px]"
                              {...field} 
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
                          <FormLabel>Mensagem Adicional (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Informações adicionais, preferências, etc." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Informações adicionais que possam nos ajudar com o orçamento.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Fotos do Item (opcional)</FormLabel>
                      <FormDescription className="mb-2">
                        Envie até 3 fotos do item que deseja reformar. Isso nos ajudará a fornecer um orçamento mais preciso.
                      </FormDescription>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        {imagePreview.map((url, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={url} 
                              alt={`Preview ${index + 1}`} 
                              className="w-24 h-24 object-cover rounded-md border border-gray-200" 
                            />
                            <button 
                              type="button"
                              onClick={() => removeImage(index)} 
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        
                        {imagePreview.length < 3 && (
                          <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                            <Camera className="h-6 w-6 text-gray-400" />
                            <span className="mt-2 text-xs text-gray-500">Adicionar foto</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageUpload}
                              multiple={imagePreview.length < 2}
                            />
                          </label>
                        )}
                      </div>
                    </FormItem>

                    <div className="mt-6">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuotePage;
