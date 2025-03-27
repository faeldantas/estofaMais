
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
 * Esquema de validação do formulário de login
 */
const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

/**
 * Tipo derivado do esquema de validação
 */
type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Componente LoginPage - Página de login de usuários
 * 
 * Este componente:
 * 1. Apresenta um formulário de login com validação
 * 2. Integra-se ao contexto de autenticação para validar credenciais
 * 3. Redireciona o usuário após login bem-sucedido
 * 4. Inclui link para cadastro de novos usuários
 * 
 * Substituição de dados mocados:
 * - A autenticação deve ser feita via API:
 *   POST /api/auth/login - Para autenticar o usuário
 */
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Configuração do formulário com React Hook Form e validação Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Função que processa o envio do formulário
   * @param values Valores do formulário validados
   */
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // TODO: Substituir pelo login real via API
      // POST /api/auth/login com os dados do formulário
      const success = await login(values.email, values.password);
      
      if (success) {
        // Redireciona para a página inicial após o login
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
            <h1 className="text-2xl font-bold">Entrar</h1>
            <p className="text-gray-600 mt-2">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Formulário de login */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Botão de envio */}
              <Button 
                type="submit" 
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>

          {/* Link para criar conta */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/registrar" className="text-brand-green hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
