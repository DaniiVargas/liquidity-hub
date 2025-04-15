
import React from "react";
import Header from "./Header";
import { TooltipProvider } from "@/components/ui/tooltip";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-white py-6">
          <div className="container px-4 lg:px-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Liquidity Hub. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
