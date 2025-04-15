
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const StepIndicator = ({ 
  steps, 
  currentStep,
  onStepClick 
}: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto px-4">
      {steps.map((label, index) => {
        const isCompleted = currentStep > index;
        const isCurrent = currentStep === index;
        
        return (
          <div key={label} className="flex flex-1 items-center">
            <div 
              className={cn(
                "flex flex-col items-center cursor-pointer",
                onStepClick ? "cursor-pointer" : "cursor-default"
              )}
              onClick={() => onStepClick && isCompleted && onStepClick(index)}
            >
              <div 
                className={cn(
                  "flex items-center justify-center rounded-full border-2 w-8 h-8", 
                  isCompleted 
                    ? "bg-hub-blue border-hub-blue text-white" 
                    : isCurrent 
                    ? "border-hub-blue text-hub-blue"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs font-medium hidden md:block", 
                  isCompleted 
                    ? "text-hub-blue"
                    : isCurrent 
                    ? "text-hub-blue"
                    : "text-gray-400"
                )}
              >
                {label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "h-[2px] flex-1 mx-2", 
                  currentStep > index 
                    ? "bg-hub-blue" 
                    : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
