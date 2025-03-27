
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

/**
 * Esquema de validação do formulário de registro
 */
const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

/**
 * Tipo derivado do esquema de validação
 */
type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Componente RegisterPage - Página de cadastro de novos usuários
 * 
 * Este componente:
 * 1. Apresenta um formulário de cadastro com validação
 * 2. Integra-se ao contexto de autenticação para registrar novos usuários
 * 3. Redireciona o usuário após cadastro bem-sucedido
 * 4. Inclui link para login para usuários existentes
 * 
 * Substituição de dados mocados:
 * - O registro deve ser feito via API:
 *   POST /api/auth/register - Para registrar um novo usuário
 */
const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Configuração do formulário com React Hook Form e validação Zod
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Função que processa o envio do formulário
   * @param values Valores do formulário validados
   */
  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // TODO: Substituir por registro real via API
      // POST /api/auth/register com os dados do formulário
      const success = await register(
        values.name,
        values.email,
        values.password
      );
      
      if (success) {
        // Redireciona para a página inicial após o cadastro
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-brand-green-light/30">
          {/* Cabeçalho do formulário */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Criar Conta</h1>
            <p className="text-gray-600 mt-2">
              Cadastre-se para acessar nossos serviços
            </p>
          </div>

          {/* Formulário de cadastro */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Campo de nome */}
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

              {/* Campo de email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="seu@email.com" 
                        {...field}
                        className="border-brand-green-light focus-visible:ring-brand-green" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="******" 
                        {...field}
                        className="border-brand-green-light focus-visible:ring-brand-green" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de confirmação de senha */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="******" 
                        {...field}
                        className="border-brand-green-light focus-visible:ring-brand-green" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botão de envio */}
              <Button 
                type="submit" 
                className="w-full mt-6 bg-brand-green hover:bg-brand-green/90 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </form>
          </Form>

          {/* Link para login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Já possui uma conta?{" "}
              <Link to="/login" className="text-brand-green hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
