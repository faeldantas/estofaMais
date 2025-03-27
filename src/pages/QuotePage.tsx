
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
import { Camera, X, HelpCircle, Trash2 } from "lucide-react";
import MaterialSelector from "@/components/MaterialSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

/**
 * Interface para o formulário de orçamento
 */
const quoteFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  serviceType: z.string().min(1, { message: "Selecione um tipo de serviço" }),
  itemDescription: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  message: z.string().optional(),
  priceRange: z.array(z.number()).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

/**
 * Tipo derivado do schema para uso no formulário
 */
type QuoteFormValues = z.infer<typeof quoteFormSchema>;

/**
 * Interface que define a estrutura de um material
 */
interface Material {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  color: string;
  type: string;
}

/**
 * QuotePage - Página de solicitação de orçamentos
 * 
 * Permite:
 * - Preencher um formulário com dados de contato e descrição do serviço
 * - Selecionar materiais via modal de seleção
 * - Enviar fotos do item a ser reformado
 * - Definir uma faixa de preço esperada
 */
const QuotePage = () => {
  // Estados para controle do formulário e submissão
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  
  // Estado para armazenar materiais selecionados
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  
  // Estado para o modal de preço
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  
  // Estado para o range de preço
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 2000]);

  // Inicialização do formulário com React Hook Form
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      itemDescription: "",
      message: "",
      priceRange: [500, 2000],
      images: [],
    },
  });

  /**
   * Manipula o upload de imagens
   * @param e - Evento de alteração do input de arquivo
   */
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

  /**
   * Remove uma imagem do formulário
   * @param index - Índice da imagem a ser removida
   */
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

  /**
   * Adiciona um material à lista de selecionados
   * @param material - Material selecionado
   */
  const handleAddMaterial = (material: Material) => {
    // Verifica se o material já foi selecionado
    if (!selectedMaterials.some(m => m.id === material.id)) {
      setSelectedMaterials(prev => [...prev, material]);
      toast({
        title: "Material adicionado",
        description: `${material.title} foi adicionado ao seu orçamento.`
      });
    } else {
      toast({
        title: "Material já selecionado",
        description: "Este material já foi adicionado ao seu orçamento.",
        variant: "destructive"
      });
    }
  };

  /**
   * Remove um material da lista de selecionados
   * @param id - ID do material a ser removido
   */
  const handleRemoveMaterial = (id: number) => {
    setSelectedMaterials(prev => prev.filter(material => material.id !== id));
  };

  /**
   * Atualiza o range de preço
   * @param values - Array com valores mínimo e máximo
   */
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    form.setValue("priceRange", values);
  };

  /**
   * Manipula o envio do formulário
   * @param data - Dados do formulário
   */
  const onSubmit = (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    // Adiciona os materiais selecionados aos dados do formulário
    const formDataWithMaterials = {
      ...data,
      selectedMaterials,
      priceRange
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data submitted:", formDataWithMaterials);
      setIsSubmitting(false);
      setHasSubmitted(true);
      
      toast({
        title: "Orçamento solicitado com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      
      // Clean up preview URLs
      imagePreview.forEach(url => URL.revokeObjectURL(url));
      setImagePreview([]);
      setSelectedMaterials([]);
      
      form.reset();
    }, 1500);
  };

  /**
   * Formata o valor do preço para exibição
   * @param value - Valor em reais
   * @returns String formatada
   */
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
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

                    {/* Seleção de materiais */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Materiais de Interesse
                        </label>
                        <MaterialSelector onSelectMaterial={handleAddMaterial} />
                      </div>
                      
                      {selectedMaterials.length > 0 ? (
                        <div className="border rounded-md p-3 bg-gray-50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {selectedMaterials.map((material) => (
                              <div 
                                key={material.id} 
                                className="flex items-center gap-2 bg-white p-2 rounded border"
                              >
                                <img 
                                  src={material.imageUrl} 
                                  alt={material.title} 
                                  className="w-8 h-8 object-cover rounded"
                                  onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=Material"}
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium truncate">{material.title}</p>
                                  <p className="text-xs text-gray-500">{material.type}</p>
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => handleRemoveMaterial(material.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center border rounded-md p-4 bg-gray-50 text-gray-500">
                          <p>Nenhum material selecionado. Clique em "Selecionar Material" para escolher.</p>
                        </div>
                      )}
                    </div>

                    {/* Faixa de preço */}
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Faixa de Preço Estimada</FormLabel>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-blue-600"
                              onClick={() => setIsPriceModalOpen(true)}
                            >
                              <HelpCircle size={16} className="mr-1" />
                              Ajuda
                            </Button>
                          </div>
                          <div className="pt-6 px-3">
                            <Slider
                              onValueChange={handlePriceRangeChange}
                              defaultValue={[500, 2000]}
                              min={100}
                              max={5000}
                              step={100}
                              minStepsBetweenThumbs={2}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span>{formatCurrency(priceRange[0])}</span>
                            <span>{formatCurrency(priceRange[1])}</span>
                          </div>
                          <FormDescription>
                            Selecione a faixa de preço que você espera investir na reforma.
                          </FormDescription>
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

      {/* Modal de ajuda para faixa de preço */}
      <Dialog open={isPriceModalOpen} onOpenChange={setIsPriceModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sobre a Faixa de Preço</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              A faixa de preço serve como uma referência para nossa equipe entender seu orçamento aproximado.
              Isso nos ajuda a sugerir materiais e opções que se encaixem dentro das suas expectativas.
            </p>
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Valores de referência:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-medium">R$ 100 - R$ 500:</span> Pequenos reparos e reformas simples</li>
                <li><span className="font-medium">R$ 500 - R$ 1.500:</span> Reformas parciais de sofás e cadeiras</li>
                <li><span className="font-medium">R$ 1.500 - R$ 3.000:</span> Reformas completas de sofás médios</li>
                <li><span className="font-medium">R$ 3.000 - R$ 5.000+:</span> Reformas completas de sofás grandes ou conjuntos</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              Lembre-se que esses valores são apenas referências e o orçamento final dependerá das características específicas do seu móvel, 
              dos materiais escolhidos e da complexidade do trabalho.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default QuotePage;
