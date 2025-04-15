
import { useState } from "react";
import UploadScreen from "./UploadScreen";
import PreviewScreen from "./PreviewScreen";
import SimulationScreen from "./SimulationScreen";
import SuccessScreen from "./SuccessScreen";
import StepIndicator from "@/components/ui/step-indicator";

// Mock data
const mockInvoiceData = {
  invoiceNumber: "FE-A0012345",
  issueDate: "2025-04-01",
  dueDate: "2025-05-15",
  clientName: "Empresa Grande S.A.",
  amount: 5850000,
};

const InvoiceProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [invoiceData] = useState(mockInvoiceData);
  
  const steps = ["Subir factura", "Información", "Simulación", "Confirmación"];
  
  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setCurrentStep(1);
  };
  
  const handleGoToSimulation = () => {
    setCurrentStep(2);
  };
  
  const handleGoBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleCompleteProcess = () => {
    setCurrentStep(3);
  };
  
  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };
  
  return (
    <div>
      <StepIndicator 
        steps={steps} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      
      {currentStep === 0 && (
        <UploadScreen onNext={handleFileUpload} />
      )}
      
      {currentStep === 1 && (
        <PreviewScreen 
          invoiceData={invoiceData}
          onBack={handleGoBack}
          onNext={handleGoToSimulation}
        />
      )}
      
      {currentStep === 2 && (
        <SimulationScreen 
          amount={invoiceData.amount}
          onBack={handleGoBack}
          onComplete={handleCompleteProcess}
        />
      )}
      
      {currentStep === 3 && (
        <SuccessScreen />
      )}
    </div>
  );
};

export default InvoiceProcess;
