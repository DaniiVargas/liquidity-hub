
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import TooltipInfo from "@/components/ui/tooltip-info";

interface UploadScreenProps {
  onNext: (file: File) => void;
}

const UploadScreen = ({ onNext }: UploadScreenProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleValidateClick = () => {
    if (file) {
      onNext(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-hub-dark mb-4">
          Recibe liquidez inmediata anticipando el pago de tus clientes
        </h1>
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-600">
            Sube tu factura electrónica y recibe el pago por adelantado
          </p>
          <TooltipInfo 
            content={
              <div>
                <p>
                  Nuestro servicio te permite recibir el pago de tus facturas antes de
                  su vencimiento a cambio de una pequeña comisión.
                </p>
                <p className="mt-2">
                  Subimos tu factura, validamos la información con RADIAN y te ofrecemos
                  un anticipo en minutos.
                </p>
              </div>
            } 
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Sube tu factura electrónica</h2>
          <FileUpload 
            onFileChange={setFile} 
          />
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleValidateClick}
            disabled={!file}
            className="bg-hub-blue hover:bg-blue-700"
          >
            Validar mi factura
          </Button>
        </div>
      </div>
      
      <div className="mt-8 bg-hub-light rounded-lg p-4 border-l-4 border-hub-blue">
        <h3 className="font-medium text-sm">¿Cómo funciona?</h3>
        <ul className="mt-2 text-sm space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="font-medium text-hub-blue">1.</span>
            <span>Sube tu factura electrónica (PDF o XML)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-hub-blue">2.</span> 
            <span>Validamos la información con RADIAN en tiempo real</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-hub-blue">3.</span>
            <span>Te mostramos el monto disponible para anticipar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-hub-blue">4.</span>
            <span>Recibes el pago en tu cuenta bancaria en menos de 24 horas</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadScreen;
