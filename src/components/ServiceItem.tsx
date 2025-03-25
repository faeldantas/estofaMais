
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface BeforeAfterImage {
  before: string;
  after: string;
}

interface ServiceProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    materials: string[];
    beforeAfterImages: BeforeAfterImage[];
  };
}

const ServiceItem = ({ service }: ServiceProps) => {
  const Icon = service.icon;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" id={`service-${service.id}`}>
      <div>
        <div className="flex items-center mb-4">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold">{service.title}</h2>
        </div>
        <p className="text-gray-700 mb-6">{service.description}</p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Materiais Disponíveis:</h3>
          <div className="flex flex-wrap gap-2">
            {service.materials.map((material, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Antes e Depois:</h3>
        <div className="space-y-4">
          {service.beforeAfterImages.map((image, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-2">
                    <p className="text-center mb-2 text-sm font-medium">Antes</p>
                    <img 
                      src={image.before} 
                      alt={`Antes - ${service.title}`} 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-center mb-2 text-sm font-medium">Depois</p>
                    <img 
                      src={image.after} 
                      alt={`Depois - ${service.title}`} 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
