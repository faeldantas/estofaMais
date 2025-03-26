
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Image, Trash, Package, Users, Home } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

/**
 * AdminDashboard - Painel de administração principal
 * 
 * Este componente:
 * 1. Apresenta uma interface de administração com abas para diferentes recursos
 * 2. Permite ao administrador gerenciar conteúdos do site
 * 3. Restringe o acesso apenas a usuários com papel de administrador
 */
const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("geral");

  // Redireciona para a home se o usuário não for administrador
  if (!isAdmin) {
    navigate("/");
    toast({
      title: "Acesso restrito",
      description: "Você não tem permissão para acessar esta página.",
      variant: "destructive"
    });
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Cabeçalho do painel */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo(a), {user?.name}. Gerencie o conteúdo do site aqui.
          </p>
        </div>

        {/* Links rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-20"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
            <span>Visualizar Site</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-20"
            onClick={() => navigate("/admin/galeria")}
          >
            <Image className="h-5 w-5" />
            <span>Gerenciar Galeria</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-20"
            onClick={() => navigate("/admin/servicos")}
          >
            <Package className="h-5 w-5" />
            <span>Gerenciar Serviços</span>
          </Button>
        </div>

        {/* Painel principal com abas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          </TabsList>

          {/* Aba de informações gerais */}
          <TabsContent value="geral" className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Informações do Site</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">Contato</h3>
                <p className="text-gray-600">contato@estofamais.com</p>
                <p className="text-gray-600">(11) 99999-9999</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
              </div>
              
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">Endereço</h3>
                <p className="text-gray-600">Rua das Flores, 123</p>
                <p className="text-gray-600">São Paulo, SP</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
              </div>
              
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">Redes Sociais</h3>
                <p className="text-gray-600">Instagram: @estofamais</p>
                <p className="text-gray-600">Facebook: /estofamais</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
              </div>
              
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">Horário de Funcionamento</h3>
                <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                <p className="text-gray-600">Sábado: 9h às 13h</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Aba de estatísticas */}
          <TabsContent value="estatisticas" className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Estatísticas do Site</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-700">Visitas</h3>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-gray-500">Últimos 30 dias</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-medium text-green-700">Orçamentos</h3>
                <p className="text-2xl font-bold">56</p>
                <p className="text-sm text-gray-500">Últimos 30 dias</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-md">
                <h3 className="font-medium text-purple-700">Usuários</h3>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-500">Total cadastrado</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Páginas mais visitadas</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Página
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visualizações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Página Inicial</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">632</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Galeria</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">421</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Serviços</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">287</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Orçamento</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">189</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Aba de usuários */}
          <TabsContent value="usuarios" className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Gerenciar Usuários</h2>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Perfil
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Administrador
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      admin@estofamais.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Admin
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      João Silva
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      joao@exemplo.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Usuário
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Maria Souza
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      maria@exemplo.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Usuário
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
