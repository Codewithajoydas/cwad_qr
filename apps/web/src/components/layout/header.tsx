import React, { useCallback, useState } from "react";
import { QrCode, Menu, X, ScanQrCode, StarPlus, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDeviceType } from "@/lib/getDeviceType";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type navigationType = {
  name: string;
  href: string;
  supportedDevices: string[];
  icon: LucideIcon;
};

const navigation: navigationType[] = [
  {
    name: "Generator",
    href: "/",
    supportedDevices: ["desktop", "tablet", "mobile"],
    icon: QrCode,
  },
  {
    name: "Scanner",
    href: "/scanner",
    supportedDevices: ["desktop", "tablet", "mobile"],
    icon: ScanQrCode,
  },
  {
    name: "Features",
    href: "/features",
    supportedDevices: ["desktop", "tablet", "mobile"],
    icon: StarPlus,
  },
  {
    name: "About",
    href: "/about",
    supportedDevices: ["desktop", "tablet", "mobile"],
    icon: Info,
  },
];
export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const deviceType = useCallback(() => getDeviceType(), []);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <QrCode size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">Cwad QR</span>
            <span className="text-[10px] leading-none text-muted-foreground">
              Create. Customize. Connect.
            </span>
          </div>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navigation
            .filter((item) => item.supportedDevices.includes(deviceType()))
            .map((item) => (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  backgroundColor: pathname === item.href ? "rgba(0, 0, 0, 0.04)" : "transparent",
                  color: pathname === item.href ? "black" : "#999",
                }}
                className="text-sm p-2 rounded-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground flex gap-2 active:scale-[1.02] transition-all duration-200 hover:shadow-sm"
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
        </nav>
        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* GitHub Icon - Inline SVG */}
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon">
                <Link
                  to="https://github.com/Codewithajoydas/cwad_qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
                  </svg>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
          {/* Create QR Button */}
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t bg-background md:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-4 py-4">
            {navigation
              .filter((item) => item.supportedDevices.includes(deviceType()))
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMenu}
                  style={{
                    backgroundColor: pathname === item.href ? "rgba(0, 0, 0, 0.1)" : "transparent",
                    color: pathname === item.href ? "black" : "#999",
                  }}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground flex gap-2"
                >
                  <item.icon size={20} className="mr-2 inline-block" />
                  {item.name}
                </Link>
              ))}
            <Separator className="my-3" />
          </nav>
        </div>
      )}
    </header>
  );
}
