
import { Bell, HelpCircle, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Header = () => {
  const [notifications] = useState(2);

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-6 py-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 font-semibold text-lg text-hub-blue"
                >
                  <div className="rounded-md bg-hub-blue p-1">
                    <div className="h-6 w-6 text-white">LH</div>
                  </div>
                  <span>Liquidity Hub</span>
                </Link>
                <nav className="flex flex-col gap-3">
                  <Link
                    to="/"
                    className="text-sm font-medium hover:bg-gray-100 p-2 rounded-lg"
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium hover:bg-gray-100 p-2 rounded-lg"
                  >
                    Mis Facturas
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            to="/"
            className="hidden lg:flex items-center gap-2 font-semibold text-lg text-hub-blue"
          >
            <div className="rounded-md bg-hub-blue p-1">
              <div className="h-6 w-6 text-white flex items-center justify-center">LH</div>
            </div>
            <span>Liquidity Hub</span>
          </Link>
          <nav className="hidden lg:flex gap-6 ml-10">
            <Link
              to="/"
              className="text-sm font-medium hover:text-hub-blue transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-hub-blue transition-colors"
            >
              Mis Facturas
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-200"
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
