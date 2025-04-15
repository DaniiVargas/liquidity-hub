import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { 
  Download, 
  FileText, 
  ChevronDown, 
  Search, 
  SlidersHorizontal, 
  Eye,
  CalendarIcon,
  Building,
  ArrowRight
} from "lucide-react";

// Mock invoice data
const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "FE-A0012345",
    issueDate: "2025-04-01",
    dueDate: "2025-05-15",
    clientName: "Empresa Grande S.A.",
    amount: 5850000,
    status: "approved" as const,
    paymentDate: "2025-04-03"
  },
  {
    id: "2",
    invoiceNumber: "FE-A0012346",
    issueDate: "2025-04-05",
    dueDate: "2025-05-20",
    clientName: "Corporación Nacional Ltda.",
    amount: 7250000,
    status: "pending" as const,
    paymentDate: null
  },
  {
    id: "3",
    invoiceNumber: "FE-A0012347",
    issueDate: "2025-04-10",
    dueDate: "2025-05-25",
    clientName: "Empresa Grande S.A.",
    amount: 3450000,
    status: "processing" as const,
    paymentDate: null
  },
  {
    id: "4",
    invoiceNumber: "FE-A0012348",
    issueDate: "2025-04-12",
    dueDate: "2025-06-01",
    clientName: "Distribuidora Global S.A.S.",
    amount: 9250000,
    status: "rejected" as const,
    paymentDate: null
  },
  {
    id: "5",
    invoiceNumber: "FE-A0012349",
    issueDate: "2025-04-15",
    dueDate: "2025-06-15",
    clientName: "Corporación Nacional Ltda.",
    amount: 4150000,
    status: "approved" as const,
    paymentDate: "2025-04-16"
  }
];

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: "pending" | "approved" | "processing" | "rejected";
  paymentDate: string | null;
}

const InvoiceDashboard = () => {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="bg-green-100 text-green-700 py-1 px-2 rounded-full text-xs font-medium">Aprobado</span>;
      case "pending":
        return <span className="bg-yellow-100 text-yellow-700 py-1 px-2 rounded-full text-xs font-medium">Pendiente</span>;
      case "processing":
        return <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded-full text-xs font-medium">En proceso</span>;
      case "rejected":
        return <span className="bg-red-100 text-red-700 py-1 px-2 rounded-full text-xs font-medium">Rechazado</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mis Facturas</h1>
          <p className="text-gray-600">Gestiona y haz seguimiento a tus facturas anticipadas</p>
        </div>
        
        <Link to="/">
          <Button className="bg-hub-blue hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Nueva solicitud
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Facturas anticipadas</CardTitle>
          <CardDescription>
            Lista de todas tus facturas procesadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por factura o cliente..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuItem>Aprobados</DropdownMenuItem>
                  <DropdownMenuItem>Pendientes</DropdownMenuItem>
                  <DropdownMenuItem>En proceso</DropdownMenuItem>
                  <DropdownMenuItem>Rechazados</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factura</TableHead>
                  <TableHead className="hidden md:table-cell">Cliente</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead className="hidden lg:table-cell">Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                      No se encontraron facturas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-gray-500 md:hidden">{invoice.clientName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {invoice.clientName}
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatDate(invoice.dueDate)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Acciones</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedInvoice(invoice)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Descargar contrato
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalles de la factura</DialogTitle>
              <DialogDescription>
                Información detallada de la factura {selectedInvoice.invoiceNumber}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Estado:</span>
                  <div>{getStatusBadge(selectedInvoice.status)}</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Monto:</span>
                  <span className="font-medium">{formatCurrency(selectedInvoice.amount)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-hub-blue mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Número de factura</p>
                    <p className="font-medium">{selectedInvoice.invoiceNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 text-hub-blue mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-medium">{selectedInvoice.clientName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-4 w-4 text-hub-blue mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de emisión</p>
                    <p className="font-medium">{formatDate(selectedInvoice.issueDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-4 w-4 text-hub-blue mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de vencimiento</p>
                    <p className="font-medium">{formatDate(selectedInvoice.dueDate)}</p>
                  </div>
                </div>
                
                {selectedInvoice.status === "approved" && selectedInvoice.paymentDate && (
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha de desembolso</p>
                      <p className="font-medium text-green-600">{formatDate(selectedInvoice.paymentDate)}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar contrato
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InvoiceDashboard;
