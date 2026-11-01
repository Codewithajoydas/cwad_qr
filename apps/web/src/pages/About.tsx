
import React from "react";

import {
  ArrowRight,
  ArrowUpRight,
  QrCode,
  ScanLine,
  Palette,
  Camera,
  Zap,
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
  Layers,
  Download,
  SlidersHorizontal,
  Sparkles,
  Scan,
  RefreshCw,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const qrTypes = [
  {
    name: "Website URL",
    description: "Share websites, landing pages, and online resources.",
    icon: Globe,
  },
  {
    name: "Contact",
    description: "Share contact information using a QR code.",
    icon: Contact,
  },
  {
    name: "Wi-Fi",
    description: "Share network credentials without typing passwords.",
    icon: Wifi,
  },
  {
    name: "Email",
    description: "Create QR codes containing email addresses and messages.",
    icon: Mail,
  },
  {
    name: "Phone",
    description: "Make phone numbers accessible through QR scanning.",
    icon: Phone,
  },
  {
    name: "SMS",
    description: "Share a phone number with a predefined message.",
    icon: MessageSquare,
  },
  {
    name: "Plain Text",
    description: "Convert any supported text into a QR code.",
    icon: Type,
  },
  {
    name: "PDF",
    description: "Share publicly accessible PDF document links.",
    icon: FileText,
  },
  {
    name: "Image",
    description: "Create QR codes that point to online images.",
    icon: Image,
  },
  {
    name: "Location",
    description: "Share geographic coordinates and location information.",
    icon: MapPin,
  },
  {
    name: "Bitcoin",
    description: "Encode Bitcoin payment information.",
    icon: Bitcoin,
  },
  {
    name: "Event",
    description: "Share event details, dates, and locations.",
    icon: CalendarDays,
  },
];

const generatorFeatures = [
  {
    icon: Zap,
    title: "Live QR Preview",
    description:
      "See your QR code update as you change the content or customization settings.",
  },
  {
    icon: Palette,
    title: "Advanced Customization",
    description:
      "Personalize colors, patterns, finder shapes, backgrounds, and other visual properties.",
  },
  {
    icon: Image,
    title: "Custom Logo",
    description:
      "Upload a logo and position it in the center of your QR code with adjustable settings.",
  },
  {
    icon: SlidersHorizontal,
    title: "Advanced QR Settings",
    description:
      "Control output size, error correction, QR version, margins, and export quality.",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description:
      "Export your generated QR codes in PNG, JPEG, and SVG formats.",
  },
  {
    icon: Sparkles,
    title: "Design Presets",
    description:
      "Start with predefined color combinations such as Ocean, Forest, Sunset, and Midnight.",
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
      "Switch between available cameras, including front, rear, and external webcams.",
  },
  {
    icon: Zap,
    title: "Flashlight Support",
    description:
      "Use the flashlight when the selected camera and browser support it.",
  },
  {
    icon: ScanLine,
    title: "Automatic Detection",
    description:
      "Automatically detect and decode QR codes from the live camera feed.",
  },
  {
    icon: FileText,
    title: "Content Information",
    description:
      "Identify common QR content types and display the decoded information.",
  },
  {
    icon: Download,
    title: "Copy Results",
    description:
      "Copy scanned QR code information to your clipboard.",
  },
];

const technologies = [
  {
    name: "React",
    category: "Frontend",
    description: "Component-based user interface.",
  },
  {
    name: "TypeScript",
    category: "Language",
    description: "Type-safe application development.",
  },
  {
    name: "Vite",
    category: "Build Tool",
    description: "Fast development and production builds.",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    description: "Utility-first responsive styling.",
  },
  {
    name: "shadcn/ui",
    category: "Components",
    description: "Reusable interface components.",
  },
  {
    name: "Lucide React",
    category: "Icons",
    description: "Consistent interface iconography.",
  },
  {
    name: "@ttsalpha/qrcode",
    category: "QR Engine",
    description: "QR generation and customization.",
  },
  {
    name: "qr-scanner",
    category: "QR Scanner",
    description: "Camera-based QR code detection.",
  },
  {
    name: "Node.js",
    category: "Runtime",
    description: "JavaScript runtime for the API.",
  },
  {
    name: "Express",
    category: "Backend",
    description: "HTTP API framework.",
  },
];

const steps = [
  {
    number: "01",
    icon: Type,
    title: "Choose Your Content",
    description:
      "Select a QR code category and provide the information you want to share.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Customize Your Design",
    description:
      "Personalize your QR code with colors, shapes, logos, and advanced settings.",
  },
  {
    number: "03",
    icon: Download,
    title: "Export and Share",
    description:
      "Download your QR code in your preferred format and share it wherever you need.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(120,120,120,0.12),transparent_65%)]" />

        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">

            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              QR Generation & Scanning Platform
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              Create. Customize.
              <span className="block text-primary">
                Connect.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              A powerful QR code generator and scanner designed to make
              sharing information simple. Create personalized QR codes,
              customize every detail, and scan QR codes using your device
              camera — all through one platform.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <QrCode className="h-4 w-4" />
                Generate QR Code
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/scanner"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                <ScanLine className="h-4 w-4" />
                Scan QR Code
              </a>
            </div>

            {/* Hero Highlights */}
            <div className="mt-16 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">

              <div className="rounded-xl border bg-card/70 p-5">
                <QrCode className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">QR Generator</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generate QR codes for different content types.
                </p>
              </div>

              <div className="rounded-xl border bg-card/70 p-5">
                <Palette className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">Full Customization</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Design QR codes with personalized styles.
                </p>
              </div>

              <div className="rounded-xl border bg-card/70 p-5">
                <ScanLine className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">QR Scanner</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Decode QR codes using your camera.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Project */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>
            <Badge variant="secondary" className="mb-4">
              About the Project
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              One platform for all your QR code needs.
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-muted-foreground">
              <p>
                QR codes have become an important part of modern digital
                communication. From sharing website links and contact
                information to connecting people with Wi-Fi networks and
                online resources, they make information accessible with
                a simple scan.
              </p>

              <p>
                This project brings QR code generation and scanning
                together in one convenient application. Instead of using
                separate tools, users can create, customize, download,
                and scan QR codes from a single interface.
              </p>

              <p>
                The generator focuses on flexibility and visual control,
                allowing users to personalize their QR codes with
                different colors, shapes, logos, and export settings.
                The scanner provides a straightforward way to decode
                QR content using a device camera.
              </p>

              <p>
                The goal is to make QR code technology easier to use
                while providing the customization options needed for
                personal, educational, and professional projects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <Card className="col-span-2 bg-muted/30">
              <CardContent className="flex items-center gap-5 p-6 md:p-8">
                <div className="rounded-xl bg-primary/10 p-4">
                  <QrCode className="h-10 w-10 text-primary" />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    QR Generator
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create personalized QR codes for different purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-5 md:p-6">
                <Palette className="mb-4 h-8 w-8 text-primary" />
                <h3 className="font-semibold">Design Control</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Customize the appearance of your QR codes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-5 md:p-6">
                <ScanLine className="mb-4 h-8 w-8 text-primary" />
                <h3 className="font-semibold">QR Scanner</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Scan and understand encoded information.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Generator Features */}
      <section className="border-y bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              QR Generator
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              More than just generating QR codes.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Create QR codes that match your content and visual identity
              with flexible customization and export options.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {generatorFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Content Types */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary" className="mb-4">
            Supported Content Types
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            One QR code generator. Multiple possibilities.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Choose from different content categories and generate QR
            codes for the information you want to share.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {qrTypes.map((type) => {
            const Icon = type.icon;

            return (
              <Card
                key={type.name}
                className="transition-colors hover:bg-muted/40"
              >
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <h3 className="font-semibold">{type.name}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Customization Section */}
      <section className="border-y bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <Badge variant="secondary" className="mb-4">
                Design & Customization
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Make every QR code look the way you want.
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                A QR code does not have to look ordinary. Customize
                its visual appearance to match your brand, project,
                or personal preference while keeping the encoded
                information intact.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Customize foreground and background colors.",
                  "Choose different QR dot and finder patterns.",
                  "Add a custom logo to the center.",
                  "Adjust margins and logo spacing.",
                  "Choose error correction levels.",
                  "Export in PNG, JPEG, and SVG formats.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6">{item}</p>
                  </div>
                ))}

              </div>
            </div>

            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customization Options</CardTitle>
                  <Badge variant="outline">Design Panel</Badge>
                </div>

                <CardDescription>
                  Examples of available design controls.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                <div>
                  <p className="mb-3 text-sm font-medium">Color Presets</p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "bg-slate-900",
                      "bg-blue-600",
                      "bg-emerald-600",
                      "bg-rose-600",
                      "bg-orange-500",
                      "bg-violet-600",
                    ].map((color) => (
                      <div
                        key={color}
                        className={`h-9 w-9 rounded-full ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <p className="mb-3 text-sm font-medium">QR Patterns</p>

                  <div className="grid grid-cols-3 gap-3">
                    {["Square", "Rounded", "Circle"].map((shape) => (
                      <div
                        key={shape}
                        className="rounded-lg border p-3 text-center"
                      >
                        <div className="mx-auto mb-2 grid h-9 w-9 grid-cols-3 gap-0.5">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className={`bg-foreground ${
                                shape === "Circle" ? "rounded-full" :
                                shape === "Rounded" ? "rounded-sm" : ""
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {shape}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-5">
                  <p className="mb-3 text-sm font-medium">
                    Export Formats
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">PNG</Badge>
                    <Badge variant="outline">JPEG</Badge>
                    <Badge variant="outline">SVG</Badge>
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div className="order-2 lg:order-1">
            <Card className="bg-muted/30">
              <CardContent className="p-6 md:p-8">

                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline">Scanner Interface</Badge>
                    <h3 className="mt-3 text-xl font-bold">
                      QR Code Scanner
                    </h3>
                  </div>

                  <div className="rounded-lg bg-primary/10 p-3">
                    <ScanLine className="h-7 w-7 text-primary" />
                  </div>
                </div>

                <div className="my-7 flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-background">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">
                      Camera Preview
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Point your camera towards a QR code.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border bg-background p-3">
                    <Camera className="mb-2 h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Camera Control</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Switch available cameras.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-background p-3">
                    <Zap className="mb-2 h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Flashlight</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      When supported by the device.
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="secondary" className="mb-4">
              QR Scanner
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Scan. Decode. Understand.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              The built-in scanner makes it easy to read QR codes
              directly through your device camera. Once a QR code
              is detected, the decoded content is displayed in
              an organized and readable format.
            </p>

            <div className="mt-8 space-y-5">
              {scannerFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="h-fit rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              Simple Workflow
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Create your QR code in three steps.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A straightforward process from entering your content
              to downloading your finished QR code.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <Card key={step.number}>
                  <CardContent className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-bold text-primary/30">
                        {step.number}
                      </span>

                      <div className="rounded-xl bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* Technology Stack */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Technology Stack
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Built with modern web technologies.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            The application uses a modern TypeScript-based
            technology stack for its frontend, QR processing,
            and API infrastructure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {technologies.map((technology) => (
            <Card key={technology.name} className="transition-colors hover:bg-muted/40">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Code2 className="h-6 w-6 text-primary" />
                  <Badge variant="outline">
                    {technology.category}
                  </Badge>
                </div>

                <h3 className="font-semibold">
                  {technology.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {technology.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="border-y bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              Our Approach
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Designed around simplicity and flexibility.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Card>
              <CardContent className="p-6">
                <Smartphone className="mb-5 h-7 w-7 text-primary" />
                <h3 className="font-semibold">Responsive Interface</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  An interface designed to adapt to different screen sizes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <SlidersHorizontal className="mb-5 h-7 w-7 text-primary" />
                <h3 className="font-semibold">Flexible Controls</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Multiple content and design settings for different needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Zap className="mb-5 h-7 w-7 text-primary" />
                <h3 className="font-semibold">Simple Workflow</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Generate, customize, scan, and access QR information easily.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Layers className="mb-5 h-7 w-7 text-primary" />
                <h3 className="font-semibold">Unified Platform</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  QR generation and scanning in one application.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-14 text-center md:px-12 md:py-20">

          <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,rgba(120,120,120,0.12),transparent_70%)]" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <QrCode className="h-7 w-7 text-primary" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Ready to create your first QR code?
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Start generating personalized QR codes, explore
              customization options, or scan an existing QR code.
              Everything you need is just a click away.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Generating
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/scanner"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                Open Scanner
                <Scan className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left">

          <div>
            <p className="font-semibold">CWAD QR</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create. Customize. Connect.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Built for a simpler way to share information.
          </p>

          <a
            href="https://github.com/Codewithajoydas/cwad_qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            View on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>

        </div>
      </footer>

    </main>
  );
}
