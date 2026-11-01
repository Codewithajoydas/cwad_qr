
import React, { useEffect, useState } from "react";

import {
  ArrowRight,
  QrCode,
  ScanLine,
  Palette,
  Camera,
  Zap,
  ShieldCheck,
  Smartphone,
  Globe,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  Contact,
  MapPin,
  CalendarDays,
  Bitcoin,
  FileText,
  Image,
  Type,
  CheckCircle2,
  Code2,
  Download,
  SlidersHorizontal,
  Sparkles,
  Monitor,
  Flashlight,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  Settings2,
  Eye,
  FileImage,
  Scan,
  CircleHelp,
  Lock,
  Layers,
  Copy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", label: "Overview", icon: Layers },
      { id: "generator", label: "QR Generator", icon: QrCode },
      { id: "content-types", label: "Content Types", icon: Type },
    ],
  },
  {
    title: "Customization",
    items: [
      { id: "colors", label: "Colors & Presets", icon: Palette },
      { id: "patterns", label: "Patterns & Shapes", icon: SlidersHorizontal },
      { id: "logo", label: "Logo Customization", icon: Image },
      { id: "advanced", label: "Advanced Settings", icon: Settings2 },
    ],
  },
  {
    title: "Export",
    items: [
      { id: "export", label: "Export Formats", icon: Download },
    ],
  },
  {
    title: "QR Scanner",
    items: [
      { id: "scanner", label: "Scanner Overview", icon: ScanLine },
      { id: "camera", label: "Camera Controls", icon: Camera },
      { id: "results", label: "Scan Results", icon: FileText },
    ],
  },
  {
    title: "More Information",
    items: [
      { id: "compatibility", label: "Compatibility", icon: Monitor },
      { id: "faq", label: "FAQ", icon: CircleHelp },
    ],
  },
];

const contentTypes = [
  {
    name: "Website URL",
    icon: Globe,
    description: "Encode website links, landing pages, and online resources.",
  },
  {
    name: "Contact",
    icon: Contact,
    description: "Share contact details through structured vCard information.",
  },
  {
    name: "Wi-Fi",
    icon: Wifi,
    description: "Share network names, passwords, and security settings.",
  },
  {
    name: "Email",
    icon: Mail,
    description: "Create email QR codes with recipient, subject, and message.",
  },
  {
    name: "Phone",
    icon: Phone,
    description: "Encode phone numbers for convenient access.",
  },
  {
    name: "SMS",
    icon: MessageSquare,
    description: "Create QR codes containing phone numbers and messages.",
  },
  {
    name: "Plain Text",
    icon: Type,
    description: "Convert ordinary text into a scannable QR code.",
  },
  {
    name: "PDF",
    icon: FileText,
    description: "Share publicly accessible PDF document URLs.",
  },
  {
    name: "Image",
    icon: Image,
    description: "Create QR codes pointing to online images.",
  },
  {
    name: "Location",
    icon: MapPin,
    description: "Share geographic coordinates and location information.",
  },
  {
    name: "Bitcoin",
    icon: Bitcoin,
    description: "Encode Bitcoin payment information.",
  },
  {
    name: "Event",
    icon: CalendarDays,
    description: "Share event titles, locations, dates, and descriptions.",
  },
];

const colorPresets = [
  { name: "Classic", color: "bg-slate-900" },
  { name: "Midnight", color: "bg-indigo-950" },
  { name: "Ocean", color: "bg-blue-600" },
  { name: "Forest", color: "bg-emerald-700" },
  { name: "Berry", color: "bg-fuchsia-700" },
  { name: "Sunset", color: "bg-orange-600" },
];

const generatorFeatures = [
  {
    icon: Zap,
    title: "Live Preview",
    description:
      "See your QR code update as you change the content and design settings.",
  },
  {
    icon: Palette,
    title: "Visual Customization",
    description:
      "Control colors, patterns, finder shapes, backgrounds, and margins.",
  },
  {
    icon: Image,
    title: "Center Logo",
    description:
      "Upload your own image and customize its size, shape, and clearance.",
  },
  {
    icon: Settings2,
    title: "Advanced Controls",
    description:
      "Configure QR size, version, error correction, and export settings.",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description:
      "Export QR codes as PNG, JPEG, or SVG files.",
  },
  {
    icon: Eye,
    title: "Instant Feedback",
    description:
      "Preview design changes before downloading your QR code.",
  },
];

const scannerFeatures = [
  {
    icon: Camera,
    title: "Live Camera Scanning",
    description:
      "Scan QR codes directly using your device camera.",
  },
  {
    icon: RefreshCw,
    title: "Camera Switching",
    description:
      "Switch between available front, rear, and external cameras.",
  },
  {
    icon: Flashlight,
    title: "Flashlight",
    description:
      "Toggle the flashlight when supported by the active camera.",
  },
  {
    icon: Scan,
    title: "Automatic Detection",
    description:
      "Detect and decode QR codes from the live camera feed.",
  },
  {
    icon: FileText,
    title: "Content Classification",
    description:
      "Recognize common QR formats and display their decoded information.",
  },
  {
    icon: Download,
    title: "Copy Scanned Data",
    description:
      "Copy the decoded QR content to your clipboard.",
  },
];

const faqItems = [
  {
    question: "What is a QR code?",
    answer:
      "A QR code is a two-dimensional barcode that stores information in a pattern of black and white modules. A compatible camera or scanner can decode that information.",
  },
  {
    question: "Which types of QR codes can I generate?",
    answer:
      "The generator currently supports Website URL, Contact, Wi-Fi, Email, Phone, SMS, Plain Text, PDF, Image, Location, Bitcoin, and Event content types.",
  },
  {
    question: "Can I customize my QR code?",
    answer:
      "Yes. You can customize colors, dot patterns, finder patterns, backgrounds, margins, and center logos. You can also configure advanced QR settings.",
  },
  {
    question: "Which download formats are supported?",
    answer:
      "The generator supports PNG, JPEG, and SVG exports. PNG and JPEG are raster formats, while SVG is a scalable vector format.",
  },
  {
    question: "Why does the scanner need camera permission?",
    answer:
      "The scanner needs camera permission to access your device's video stream and detect QR codes. You must allow camera access in your browser.",
  },
  {
    question: "Can I switch between front and back cameras?",
    answer:
      "Yes, when your browser exposes multiple camera devices. Available camera names and switching support depend on your device and browser.",
  },
  {
    question: "Does the flashlight work on every device?",
    answer:
      "No. Flashlight support depends on the camera hardware and browser. The flashlight control is displayed only when the active camera reports support.",
  },
  {
    question: "Does the scanner work without HTTPS?",
    answer:
      "Camera access generally requires a secure context. Localhost is suitable for development; production websites should use HTTPS.",
  },
  {
    question: "Are generated QR codes stored online?",
    answer:
      "The current documented generator creates and exports QR codes in the web application. This project does not currently document a cloud-based QR storage service.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 space-y-3">
      <Badge variant="secondary">{eyebrow}</Badge>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>

      <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-5">
        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <h3 className="font-semibold">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Features() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Scroll to the selected section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(id);
    setMobileSidebarOpen(false);
  };

  // Highlight the currently visible section
  useEffect(() => {
    const sections = navigation.flatMap((group) =>
      group.items.map((item) => item.id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);

      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-10">
          <div>
            <Badge variant="outline" className="mb-3">
              Documentation
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Features & Capabilities
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore everything you can do with our QR code generator
              and scanner. Learn about content types, customization,
              scanning, and export capabilities.
            </p>
          </div>

          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:flex">
            <Layers className="h-8 w-8 text-primary" />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Toggle */}
      <div className="sticky top-0 z-40 border-b bg-background/95 p-3 backdrop-blur lg:hidden">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            On this page
          </span>

          {mobileSidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {mobileSidebarOpen && (
          <nav className="mt-3 max-h-[65vh] space-y-5 overflow-y-auto rounded-lg border bg-background p-4">
            {navigation.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </p>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Documentation Layout */}
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-12">

        <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-3">

              <div className="mb-6">
                <p className="text-sm font-semibold">
                  On this page
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Explore the documentation
                </p>
              </div>

              <nav className="space-y-6">
                {navigation.map((group) => (
                  <div key={group.title}>
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.title}
                    </p>

                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                              activeSection === item.id
                                ? "bg-primary/10 font-medium text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {activeSection === item.id && (
                              <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-primary" />
                            )}

                            <Icon className="h-4 w-4 shrink-0" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="mt-8 rounded-xl border bg-muted/30 p-4">
                <div className="mb-3 rounded-lg bg-primary/10 p-2.5 w-fit">
                  <QrCode className="h-5 w-5 text-primary" />
                </div>

                <h3 className="text-sm font-semibold">
                  Ready to get started?
                </h3>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Create a personalized QR code in just a few steps.
                </p>

                <a
                  href="/"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Generate QR
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 space-y-20">

            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Introduction"
                title="Everything you need to work with QR codes."
                description="A unified platform for creating, customizing, downloading, and scanning QR codes. Explore the capabilities available in the application."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="flex gap-4 p-5">
                    <div className="h-fit rounded-lg bg-primary/10 p-3">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">QR Generator</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Create QR codes for websites, contact details,
                        Wi-Fi, messages, events, and more.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex gap-4 p-5">
                    <div className="h-fit rounded-lg bg-primary/10 p-3">
                      <ScanLine className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">QR Scanner</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Scan QR codes using your device camera and
                        inspect the decoded information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-5 rounded-xl border bg-muted/20 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <h3 className="font-semibold">Designed for flexibility</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Choose from multiple QR content types, customize
                      the visual appearance, adjust technical settings,
                      and export the final result in your preferred
                      supported format.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Generator */}
            <section id="generator" className="scroll-mt-24">
              <SectionHeading
                eyebrow="01 — QR Generator"
                title="Create QR codes for different purposes."
                description="The generator transforms structured information and text into QR codes. Select a category, provide the required information, and preview the generated result."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {generatorFeatures.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>

              <div className="mt-6 rounded-xl border p-5">
                <h3 className="font-semibold">
                  How QR generation works
                </h3>

                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <Badge>1</Badge>
                    Choose a QR content category.
                  </li>
                  <li className="flex gap-3">
                    <Badge>2</Badge>
                    Enter the information you want to encode.
                  </li>
                  <li className="flex gap-3">
                    <Badge>3</Badge>
                    Customize the design and preview the QR code.
                  </li>
                  <li className="flex gap-3">
                    <Badge>4</Badge>
                    Export the QR code in a supported format.
                  </li>
                </ol>
              </div>
            </section>

            {/* Content Types */}
            <section id="content-types" className="scroll-mt-24">
              <SectionHeading
                eyebrow="02 — Content Types"
                title="Choose what your QR code contains."
                description="Different content categories help structure the information encoded in a QR code."
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {contentTypes.map((type) => {
                  const Icon = type.icon;

                  return (
                    <div
                      key={type.name}
                      className="flex gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/30"
                    >
                      <div className="h-fit rounded-lg bg-primary/10 p-2.5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">
                          {type.name}
                        </h3>

                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Colors */}
            <section id="colors" className="scroll-mt-24">
              <SectionHeading
                eyebrow="03 — Colors & Presets"
                title="Customize the colors of your QR code."
                description="Adjust the visual appearance with color presets or choose your own colors for different QR elements."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={Palette}
                  title="Custom Colors"
                  description="Set custom colors for the QR data modules, background, finder frames, and finder eyes."
                />

                <FeatureCard
                  icon={Sparkles}
                  title="Color Presets"
                  description="Use predefined combinations to quickly create a consistent visual style."
                />
              </div>

              <div className="mt-6 rounded-xl border p-5">
                <h3 className="mb-4 font-semibold">
                  Available Color Presets
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {colorPresets.map((preset) => (
                    <div
                      key={preset.name}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className={`h-8 w-8 rounded-full ${preset.color}`} />

                      <span className="text-sm font-medium">
                        {preset.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-dashed p-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Design tip: maintain sufficient contrast between
                  foreground and background colors. Always test a
                  customized QR code with a scanner before distributing it.
                </p>
              </div>
            </section>

            {/* Patterns */}
            <section id="patterns" className="scroll-mt-24">
              <SectionHeading
                eyebrow="04 — Patterns & Shapes"
                title="Control the visual structure."
                description="Change the appearance of data modules and finder patterns to create a distinct QR code design."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={QrCode}
                  title="Data Module Shapes"
                  description="Choose square, circle, or rounded module styles."
                />

                <FeatureCard
                  icon={Scan}
                  title="Finder Frame Shapes"
                  description="Customize the outer finder frames with square, rounded, extra-rounded, or circular shapes."
                />

                <FeatureCard
                  icon={Eye}
                  title="Finder Eye Shapes"
                  description="Customize the inner finder elements with square, rounded, or circular styles."
                />

                <FeatureCard
                  icon={SlidersHorizontal}
                  title="Margin Control"
                  description="Adjust the quiet-zone margin surrounding the QR code."
                />
              </div>
            </section>

            {/* Logo */}
            <section id="logo" className="scroll-mt-24">
              <SectionHeading
                eyebrow="05 — Logo Customization"
                title="Add your own logo."
                description="Place an uploaded image in the center of your QR code and adjust its presentation."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={Image}
                  title="Image Upload"
                  description="Upload an image to use as the center logo."
                />

                <FeatureCard
                  icon={SlidersHorizontal}
                  title="Logo Size"
                  description="Adjust the logo dimensions within the QR code."
                />

                <FeatureCard
                  icon={Layers}
                  title="Logo Clearance"
                  description="Configure the space around the logo."
                />

                <FeatureCard
                  icon={Palette}
                  title="Logo Appearance"
                  description="Adjust aspect ratio and corner radius."
                />
              </div>

              <div className="mt-5 rounded-xl border bg-muted/20 p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />

                  <p className="text-sm leading-7 text-muted-foreground">
                    A large logo can cover important QR modules and
                    make scanning difficult. Use a suitable error
                    correction level and test the final QR code with
                    multiple scanning devices.
                  </p>
                </div>
              </div>
            </section>

            {/* Advanced Settings */}
            <section id="advanced" className="scroll-mt-24">
              <SectionHeading
                eyebrow="06 — Advanced Settings"
                title="Fine-tune QR generation."
                description="Configure technical QR parameters to control output dimensions, encoding resilience, and export behavior."
              />

              <div className="overflow-hidden rounded-xl border">
                <div className="grid grid-cols-2 border-b bg-muted/40 p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>Setting</span>
                  <span>Options</span>
                </div>

                {[
                  ["QR Output Size", "128–2048 px"],
                  ["Error Correction", "L, M, Q, H"],
                  ["QR Version", "Automatic or 1–40"],
                  ["Margin", "0–20 modules"],
                  ["Export Scale", "1×–4×"],
                  ["JPEG Quality", "Adjustable"],
                ].map(([setting, options]) => (
                  <div
                    key={setting}
                    className="grid grid-cols-2 gap-3 border-b p-4 text-sm last:border-b-0"
                  >
                    <span className="font-medium">{setting}</span>
                    <span className="text-muted-foreground">{options}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border p-5">
                <h3 className="font-semibold">Error correction levels</h3>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  QR error correction helps a code remain readable
                  when part of its data is damaged or obscured.
                  Higher error correction can improve resilience,
                  but it may require a denser QR code for the same payload.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["L — Low", "M — Medium", "Q — Quartile", "H — High"].map(
                    (level) => (
                      <Badge key={level} variant="outline">
                        {level}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* Export */}
            <section id="export" className="scroll-mt-24">
              <SectionHeading
                eyebrow="07 — Export"
                title="Download your QR code."
                description="Choose the appropriate image format for your intended use."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-5">
                    <FileImage className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">PNG</h3>
                    <Badge className="mt-2">Raster</Badge>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Suitable for general digital use and transparent
                      backgrounds.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <Image className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">JPEG</h3>
                    <Badge className="mt-2">Raster</Badge>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Suitable for common image workflows with
                      configurable quality.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <Code2 className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">SVG</h3>
                    <Badge className="mt-2">Vector</Badge>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Scalable vector output that remains sharp at
                      different display sizes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-5 rounded-xl border p-5">
                <h3 className="font-semibold">Export options</h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Custom filename",
                    "Raster export scale",
                    "JPEG quality",
                    "Supported image formats",
                  ].map((option) => (
                    <div key={option} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Scanner */}
            <section id="scanner" className="scroll-mt-24">
              <SectionHeading
                eyebrow="08 — QR Scanner"
                title="Scan QR codes using your camera."
                description="The scanner uses the browser camera stream to detect and decode QR codes in real time."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {scannerFeatures.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>

              <div className="mt-6 rounded-xl border bg-muted/20 p-5">
                <h3 className="font-semibold">Scanning workflow</h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <Badge>01</Badge>
                    <p className="mt-2 text-sm font-medium">
                      Start Camera
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Allow camera permission.
                    </p>
                  </div>

                  <div>
                    <Badge>02</Badge>
                    <p className="mt-2 text-sm font-medium">
                      Detect QR Code
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Point the camera towards a QR code.
                    </p>
                  </div>

                  <div>
                    <Badge>03</Badge>
                    <p className="mt-2 text-sm font-medium">
                      View Result
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Inspect or copy decoded information.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Camera */}
            <section id="camera" className="scroll-mt-24">
              <SectionHeading
                eyebrow="09 — Camera Controls"
                title="Control your scanning camera."
                description="Camera controls depend on the available hardware and browser permissions."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={Camera}
                  title="Available Cameras"
                  description="List the cameras exposed by the browser after permission is granted."
                />

                <FeatureCard
                  icon={RefreshCw}
                  title="Camera Selection"
                  description="Select a different camera using its internal device identifier while displaying a friendly camera name."
                />

                <FeatureCard
                  icon={Flashlight}
                  title="Flashlight Control"
                  description="Turn the camera flashlight on or off when supported."
                />

                <FeatureCard
                  icon={Monitor}
                  title="External Webcams"
                  description="Use compatible desktop webcams and other camera devices."
                />
              </div>

              <div className="mt-5 rounded-xl border p-5">
                <div className="flex gap-3">
                  <Lock className="mt-1 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <h3 className="font-semibold">Camera privacy</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Camera access requires explicit browser permission.
                      Users can stop scanning to release the active camera.
                      Production camera access generally requires HTTPS.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Results */}
            <section id="results" className="scroll-mt-24">
              <SectionHeading
                eyebrow="10 — Scan Results"
                title="Understand the decoded QR information."
                description="After a successful scan, the application displays the decoded content and identifies common payload formats."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={FileText}
                  title="Decoded Content"
                  description="Display the actual information stored inside the scanned QR code."
                />

                <FeatureCard
                  icon={Code2}
                  title="Content Type"
                  description="Classify common payloads as Website, Email, Phone, Wi-Fi, Contact, SMS, Location, or Plain Text."
                />

                <FeatureCard
                  icon={Copy}
                  title="Copy Information"
                  description="Copy the scanned content to the clipboard."
                />

                <FeatureCard
                  icon={RefreshCw}
                  title="Clear Result"
                  description="Clear the current result and prepare the interface for another scan."
                />
              </div>
            </section>

            {/* Compatibility */}
            <section id="compatibility" className="scroll-mt-24">
              <SectionHeading
                eyebrow="11 — Compatibility"
                title="Designed for modern browsers."
                description="The web application uses browser technologies for QR generation and camera-based scanning."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={Monitor}
                  title="Desktop"
                  description="Use a compatible webcam to scan QR codes from a desktop browser."
                />

                <FeatureCard
                  icon={Smartphone}
                  title="Mobile"
                  description="Use compatible mobile cameras and switch between available cameras."
                />

                <FeatureCard
                  icon={Globe}
                  title="Browser Support"
                  description="Camera access and device features depend on the browser's implementation of media APIs."
                />

                <FeatureCard
                  icon={ShieldCheck}
                  title="Secure Context"
                  description="Use HTTPS in production or localhost during development for camera access."
                />
              </div>

              <div className="mt-5 rounded-xl border border-dashed p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  Note: Camera labels, flashlight availability, and
                  camera switching behavior vary across browsers and
                  devices. Not every hardware feature is available
                  everywhere.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <SectionHeading
                eyebrow="12 — Frequently Asked Questions"
                title="Common questions."
                description="Answers to common questions about generating, customizing, exporting, and scanning QR codes."
              />

              <Accordion className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>

                    <AccordionContent className="leading-7 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Bottom CTA */}
            <section className="scroll-mt-24">
              <div className="rounded-2xl border bg-muted/30 p-7 sm:p-10">
                <div className="max-w-2xl">
                  <Badge variant="outline">Get Started</Badge>

                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                    Ready to explore QR codes?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Start creating customized QR codes or use the
                    scanner to decode an existing QR code.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="/"
                      className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      Generate QR
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <a
                      href="/scanner"
                      className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
                    >
                      Open Scanner
                      <ScanLine className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
