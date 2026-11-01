import { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Header from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Loader2, Home, ArrowLeft, SearchX } from "lucide-react";

// @ts-ignore
import "./styles.css";

const GenerateQRPage = lazy(() =>
  import("@/pages/GenerateQR").then((module) => ({
    default: module.GenerateQRPage,
  }))
);
const Scanner = lazy(() => import("@/pages/Scanner"));
const About = lazy(() => import("@/pages/About"));
const Features = lazy(() => import("@/pages/Features"));

function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Loading CWAD-QR...
        </p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Sorry, the page you're looking for doesn't exist,
          has been moved, or the URL is incorrect.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "QR Code Generator | CWAD-QR",
      "/scanner": "QR Code Scanner | CWAD-QR",
      "/features": "Features | CWAD-QR",
      "/about": "About Us | CWAD-QR",
    };
    document.title = titles[pathname] ?? "Page Not Found | CWAD-QR";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <TooltipProvider>
      <ScrollToTop />
      <PageTitle />
      <Header />
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<GenerateQRPage />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          {/* 404 - Catch all unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  );
}
