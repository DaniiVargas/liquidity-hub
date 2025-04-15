
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import TooltipInfo from "@/components/ui/tooltip-info";
import { Download, Check, ArrowRight, Loader2 } from "lucide-react";

interface SimulationScreenProps {
  amount: number;
  onBack: () => void;
  onComplete: () => void;
}

const SimulationScreen = ({ amount, onBack, onComplete }: SimulationScreenProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  
  const serviceFee = amount * 0.03; // 3% service fee
  const amountToReceive = amount - serviceFee;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = () => {
    if (!termsAccepted) return;
    setShowAuthDialog(true);
  };

  const handleAuthCodeSubmit = () => {
    if (authCode.length !== 6) {
      setAuthError("El código debe tener 6 dígitos");
      return;
    }

    setIsSubmitting(true);
    setAuthError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAuthDialog(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-hub-dark mb-2">
          Simulación del anticipo
        </h1>
        <p className="text-gray-600">
          Revisa los detalles de la operación antes de confirmar
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-hub-dark mb-6">
            Resumen de tu operación
          </h3>
          
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-hub-light flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Recibirás</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(amountToReceive)}
                </p>
              </div>
              <ArrowRight className="h-8 w-8 text-hub-blue" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <p className="text-gray-600">Valor de la factura</p>
                <p className="font-medium">{formatCurrency(amount)}</p>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">Costo del servicio (3%)</p>
                  <TooltipInfo 
                    content={
                      <div>
                        <p>El costo del servicio es calculado como un porcentaje del valor total de la factura.</p>
                        <p className="mt-2">La tasa aplicada es del 3% sobre el monto total.</p>
                      </div>
                    }
                  />
                </div>
                <p className="font-medium text-red-600">-{formatCurrency(serviceFee)}</p>
              </div>
              
              <div className="flex justify-between items-center pt-3">
                <p className="font-medium">Total a recibir</p>
                <p className="font-bold text-xl text-green-600">{formatCurrency(amountToReceive)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            He leído y acepto los términos y condiciones del servicio
          </label>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-hub-blue"
        >
          <Download className="h-4 w-4" />
          Descargar contrato
        </Button>
      </div>
      
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Volver
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!termsAccepted}
          className="bg-hub-blue hover:bg-blue-700"
        >
          Aceptar y continuar
        </Button>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Autenticación requerida</DialogTitle>
            <DialogDescription>
              Por favor ingresa el código de verificación que hemos enviado a tu teléfono móvil registrado.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="space-y-4 w-full">
              <div>
                <label htmlFor="authCode" className="text-sm font-medium block mb-1">
                  Código de verificación
                </label>
                <input
                  id="authCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={authCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setAuthCode(value);
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ingresa el código de 6 dígitos"
                />
                {authError && <p className="text-sm text-red-500 mt-1">{authError}</p>}
              </div>
              
              <p className="text-sm text-gray-500">
                El código expira en 5:00 minutos. 
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-hub-blue"
                >
                  Reenviar código
                </Button>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAuthDialog(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAuthCodeSubmit}
              disabled={authCode.length !== 6 || isSubmitting}
              className="bg-hub-blue hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> 
                  Confirmar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimulationScreen;
