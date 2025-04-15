
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface TooltipInfoProps {
  content: React.ReactNode;
  className?: string;
}

const TooltipInfo = ({ content, className }: TooltipInfoProps) => (
  <Tooltip delayDuration={300}>
    <TooltipTrigger asChild>
      <HelpCircle className={`h-4 w-4 text-muted-foreground cursor-help ${className}`} />
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <div className="text-sm">{content}</div>
    </TooltipContent>
  </Tooltip>
);

export default TooltipInfo;
