
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, X, FileCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onFileChange: (file: File | null) => void;
  className?: string;
}

const FileUpload = ({ 
  accept = "application/pdf,application/xml", 
  maxSize = 5242880, // 5MB
  onFileChange,
  className 
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;

    if (selectedFile.size > maxSize) {
      setError(`El archivo es demasiado grande. El tamaño máximo es ${maxSize / 1024 / 1024}MB.`);
      return;
    }

    const fileType = selectedFile.type;
    if (!accept.includes(fileType)) {
      setError("Formato de archivo no soportado. Por favor sube un archivo PDF o XML.");
      return;
    }

    setFile(selectedFile);
    onFileChange(selectedFile);

    // Simulate validation process
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const removeFile = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    setError(null);
    onFileChange(null);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg w-full p-6 text-center cursor-pointer transition-colors",
          error ? "border-red-400 bg-red-50" : file ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-hub-teal bg-white"
        )}
        onClick={() => !file && !loading && inputRef.current?.click()}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <Loader2 className="h-10 w-10 text-hub-blue animate-spin" />
            <p className="text-sm font-medium">Validando factura...</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center gap-2 p-4">
            <FileCheck className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-sm font-medium">Archivo cargado correctamente</p>
              <p className="text-xs text-gray-500 truncate max-w-xs">{file.name}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              <X className="h-4 w-4 mr-1" /> Eliminar archivo
            </Button>
          </div>
        ) : (
          <div className="py-8">
            <FileUp className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium">
              Arrastra y suelta tu factura aquí o haz clic para buscar
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Formatos soportados: PDF, XML (Máx. 5MB)
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
