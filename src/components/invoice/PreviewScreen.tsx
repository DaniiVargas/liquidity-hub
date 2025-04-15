
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, Building, DollarSign } from "lucide-react";

interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  amount: number;
}

interface PreviewScreenProps {
  invoiceData: InvoiceData;
  onBack: () => void;
  onNext: () => void;
}

const PreviewScreen = ({ invoiceData, onBack, onNext }: PreviewScreenProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-hub-dark mb-2">
          Información de la factura
        </h1>
        <p className="text-gray-600">
          Verifica que la información de tu factura sea correcta antes de continuar
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-hub-light rounded-md p-3">
              <FileText className="h-6 w-6 text-hub-blue" />
            </div>
            <span className="text-sm bg-green-100 text-green-700 py-1 px-3 rounded-full font-medium">
              Factura validada
            </span>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <div className="mb-4 sm:mb-0 sm:flex-1">
                <h3 className="text-sm font-medium text-gray-500">Número de factura</h3>
                <p className="text-lg font-medium">{invoiceData.invoiceNumber}</p>
              </div>
              <div className="mb-4 sm:mb-0 sm:flex-1">
                <h3 className="text-sm font-medium text-gray-500">Monto</h3>
                <p className="text-lg font-medium">{formatCurrency(invoiceData.amount)}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <div className="mb-4 sm:mb-0 sm:flex-1 flex items-start gap-2">
                <CalendarIcon className="h-5 w-5 text-hub-blue shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de emisión</h3>
                  <p className="text-sm">{formatDate(invoiceData.issueDate)}</p>
                </div>
              </div>
              <div className="mb-4 sm:mb-0 sm:flex-1 flex items-start gap-2">
                <CalendarIcon className="h-5 w-5 text-hub-blue shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de vencimiento</h3>
                  <p className="text-sm">{formatDate(invoiceData.dueDate)}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-start gap-2">
                <Building className="h-5 w-5 text-hub-blue shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                  <p className="font-medium">{invoiceData.clientName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
            >
              Volver
            </Button>
            <Button 
              onClick={onNext}
              className="bg-hub-blue hover:bg-blue-700"
            >
              Solicitar anticipo sobre esta factura
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
