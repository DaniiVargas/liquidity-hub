
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessScreen = () => {
  return (
    <div className="max-w-md mx-auto text-center p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          ¡Solicitud enviada con éxito!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Tu solicitud de anticipo ha sido recibida y está siendo procesada. 
          Te notificaremos por correo electrónico cuando tengamos el resultado.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-700">
            Tiempo estimado de procesamiento: <span className="font-semibold">2 horas</span>
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/dashboard">
            <Button className="w-full bg-hub-blue hover:bg-blue-700">
              Ver mis facturas
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="w-full">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
