// @ts-ignore

import { useMemo, useState } from "react";
import {
  Bitcoin,
  Calendar,
  Download,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  Link as LinkIcon,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  Text as TextIcon,
  User,
  Wifi,
  Copy,
} from "lucide-react";
import { QRCode, toDataURL, toSVGString } from "@ttsalpha/qrcode";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FormValues = Record<string, string>;
type DotStyle = "square" | "circle" | "rounded";
type FrameStyle = "square" | "rounded" | "extra-rounded" | "circle";
type EyeStyle = "square" | "rounded" | "circle";
type ECL = "L" | "M" | "Q" | "H";
type ExportFormat = "png" | "jpeg" | "svg";

const categories = [
  { label: "Link", icon: LinkIcon },
  { label: "Contact", icon: User },
  { label: "Wi-Fi", icon: Wifi },
  { label: "Email", icon: Mail },
  { label: "Phone", icon: Phone },
  { label: "SMS", icon: MessageSquare },
  { label: "Text", icon: TextIcon },
  { label: "PDF", icon: FileText },
  { label: "Image", icon: ImageIcon },
  { label: "Location", icon: MapPin },
  { label: "Bitcoin", icon: Bitcoin },
  { label: "Event", icon: Calendar },
];

const categoryFields: Record<
  string,
  {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    multiline?: boolean;
    description?: string;
  }[]
> = {
  Link: [{ name: "url", label: "Website URL", placeholder: "https://example.com", required: true }],
  Contact: [
    { name: "firstName", label: "First name", placeholder: "John", required: true },
    { name: "lastName", label: "Last name", placeholder: "Doe" },
    { name: "organization", label: "Organization", placeholder: "Company name" },
    { name: "phone", label: "Phone number", placeholder: "+91 9876543210", type: "tel" },
    { name: "email", label: "Email address", placeholder: "john@example.com", type: "email" },
    { name: "website", label: "Website", placeholder: "https://example.com" },
    { name: "street", label: "Street address", placeholder: "Street and house number" },
    { name: "city", label: "City", placeholder: "Guwahati" },
    { name: "postalCode", label: "Postal code", placeholder: "781001" },
  ],
  "Wi-Fi": [
    { name: "ssid", label: "Network name (SSID)", placeholder: "My Wi-Fi", required: true },
    { name: "password", label: "Password", placeholder: "Wi-Fi password", type: "password" },
    { name: "security", label: "Security (WPA / WEP / nopass)", placeholder: "WPA" },
    { name: "hidden", label: "Hidden network (true / false)", placeholder: "false" },
  ],
  Email: [
    {
      name: "email",
      label: "Email address",
      placeholder: "hello@example.com",
      type: "email",
      required: true,
    },
    { name: "subject", label: "Subject", placeholder: "Hello" },
    { name: "body", label: "Message", placeholder: "Write your message...", multiline: true },
  ],
  Phone: [
    {
      name: "phone",
      label: "Phone number",
      placeholder: "+91 9876543210",
      type: "tel",
      required: true,
    },
  ],
  SMS: [
    {
      name: "phone",
      label: "Phone number",
      placeholder: "+91 9876543210",
      type: "tel",
      required: true,
    },
    { name: "message", label: "Message", placeholder: "Write your SMS...", multiline: true },
  ],
  Text: [
    {
      name: "text",
      label: "Text content",
      placeholder: "Write anything...",
      multiline: true,
      required: true,
    },
  ],
  PDF: [
    {
      name: "url",
      label: "Public PDF URL",
      placeholder: "https://example.com/document.pdf",
      required: true,
    },
  ],
  Image: [
    {
      name: "url",
      label: "Public image URL",
      placeholder: "https://example.com/photo.jpg",
      required: true,
    },
  ],
  Location: [
    { name: "latitude", label: "Latitude", placeholder: "26.1445", type: "number", required: true },
    {
      name: "longitude",
      label: "Longitude",
      placeholder: "91.7362",
      type: "number",
      required: true,
    },
    { name: "locationName", label: "Location name", placeholder: "Guwahati" },
  ],
  Bitcoin: [
    { name: "address", label: "Bitcoin address", placeholder: "Bitcoin address", required: true },
    { name: "amount", label: "Amount (BTC)", placeholder: "0.001", type: "number" },
    { name: "label", label: "Payment label", placeholder: "Payment" },
    { name: "message", label: "Message", placeholder: "Payment message" },
  ],
  Event: [
    { name: "title", label: "Event title", placeholder: "My event", required: true },
    { name: "location", label: "Location", placeholder: "Event venue" },
    { name: "start", label: "Start date and time", type: "datetime-local", required: true },
    { name: "end", label: "End date and time", type: "datetime-local", required: true },
    { name: "description", label: "Description", placeholder: "Event details...", multiline: true },
  ],
};

function normalizeUrl(value: string) {
  const valueTrimmed = value.trim();
  if (!valueTrimmed) return "";
  return /^https?:\/\//i.test(valueTrimmed) ? valueTrimmed : `https://${valueTrimmed}`;
}
function isValidUrl(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    return ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".");
  } catch {
    return false;
  }
}
function escapeVCard(value = "") {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
function escapeWifi(value = "") {
  return value.replace(/[\\;,:"]/g, "\\$&");
}
function icsDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
}
function buildPayload(type: string, values: FormValues) {
  const v = (key: string) => (values[key] ?? "").trim();
  switch (type) {
    case "Link":
    case "PDF":
    case "Image":
      return normalizeUrl(v("url"));
    case "Contact": {
      const fullName = `${v("firstName")} ${v("lastName")}`.trim();
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(v("lastName"))};${escapeVCard(v("firstName"))};;;`,
        `FN:${escapeVCard(fullName)}`,
        v("organization") && `ORG:${escapeVCard(v("organization"))}`,
        v("phone") && `TEL;TYPE=CELL:${escapeVCard(v("phone"))}`,
        v("email") && `EMAIL:${escapeVCard(v("email"))}`,
        v("website") && `URL:${normalizeUrl(v("website"))}`,
        (v("street") || v("city") || v("postalCode")) &&
          `ADR:;;${escapeVCard(v("street"))};${escapeVCard(v("city"))};;;;${escapeVCard(v("postalCode"))}`,
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\n");
    }
    case "Wi-Fi": {
      const security = v("security") || "WPA";
      return `WIFI:T:${security};S:${escapeWifi(v("ssid"))};P:${escapeWifi(v("password"))};H:${v("hidden").toLowerCase() === "true" ? "true" : "false"};;`;
    }
    case "Email": {
      const params = new URLSearchParams();
      if (v("subject")) params.set("subject", v("subject"));
      if (v("body")) params.set("body", v("body"));
      return `mailto:${v("email")}${params.toString() ? `?${params}` : ""}`;
    }
    case "Phone":
      return `tel:${v("phone")}`;
    case "SMS":
      return `SMSTO:${v("phone")}:${v("message")}`;
    case "Text":
      return v("text");
    case "Location": {
      const query = v("locationName") ? `?q=${encodeURIComponent(v("locationName"))}` : "";
      return `geo:${Number(v("latitude"))},${Number(v("longitude"))}${query}`;
    }
    case "Bitcoin": {
      const params = new URLSearchParams();
      if (v("amount")) params.set("amount", v("amount"));
      if (v("label")) params.set("label", v("label"));
      if (v("message")) params.set("message", v("message"));
      return `bitcoin:${v("address")}${params.toString() ? `?${params}` : ""}`;
    }
    case "Event":
      return [
        "BEGIN:VEVENT",
        `SUMMARY:${v("title")}`,
        v("location") && `LOCATION:${v("location")}`,
        `DTSTART:${icsDate(v("start"))}`,
        `DTEND:${icsDate(v("end"))}`,
        v("description") && `DESCRIPTION:${v("description").replace(/\n/g, "\\n")}`,
        "END:VEVENT",
      ]
        .filter(Boolean)
        .join("\r\n");
    default:
      return "";
  }
}
function isPayloadValid(type: string, values: FormValues, payload: string) {
  const required = categoryFields[type] ?? [];
  if (required.some((field) => field.required && !values[field.name]?.trim())) return false;
  if (["Link", "PDF", "Image"].includes(type)) return isValidUrl(values.url ?? "");
  if (type === "Contact") return Boolean(values.firstName?.trim());
  if (type === "Email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? "");
  if (type === "Location") {
    const lat = Number(values.latitude),
      lng = Number(values.longitude);
    return (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }
  if (type === "Event") {
    const start = new Date(values.start ?? "").getTime(),
      end = new Date(values.end ?? "").getTime();
    return Number.isFinite(start) && Number.isFinite(end) && end > start;
  }
  return payload.trim().length > 0;
}

const presets = [
  { name: "Classic", dot: "#000000", bg: "#ffffff", frame: "#000000", eye: "#000000" },
  { name: "Midnight", dot: "#f8fafc", bg: "#0f172a", frame: "#38bdf8", eye: "#38bdf8" },
  { name: "Ocean", dot: "#075985", bg: "#ecfeff", frame: "#0e7490", eye: "#0e7490" },
  { name: "Forest", dot: "#14532d", bg: "#f0fdf4", frame: "#166534", eye: "#166534" },
  { name: "Berry", dot: "#701a75", bg: "#fdf4ff", frame: "#86198f", eye: "#86198f" },
  { name: "Sunset", dot: "#9a3412", bg: "#fff7ed", frame: "#c2410c", eye: "#ea580c" },
];

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function GenerateQRPage() {
  const [selectedType, setSelectedType] = useState("Link");
  const [formValues, setFormValues] = useState<FormValues>({});

  // QR appearance: every option below maps to a supported @ttsalpha/qrcode prop.
  const [dotColor, setDotColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [dotStyle, setDotStyle] = useState<DotStyle>("square");
  const [frameStyle, setFrameStyle] = useState<FrameStyle>("square");
  const [frameColor, setFrameColor] = useState("#000000");
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>("square");
  const [eyeColor, setEyeColor] = useState("#000000");
  const [qrSize, setQrSize] = useState(512);
  const [margin, setMargin] = useState(4);
  const [ecl, setEcl] = useState<ECL>("M");
  const [version, setVersion] = useState("auto");
  const [transparent, setTransparent] = useState(false);

  // Center logo controls.
  const [logoSrc, setLogoSrc] = useState("");
  const [logoSize, setLogoSize] = useState(0.3);
  const [logoMargin, setLogoMargin] = useState(1);
  const [logoRadius, setLogoRadius] = useState(0.15);
  const [logoAspectRatio, setLogoAspectRatio] = useState("auto");
  const [hideDots, setHideDots] = useState(true);

  // Export controls.
  const [downloadFormat, setDownloadFormat] = useState<ExportFormat>("png");
  const [exportScale, setExportScale] = useState(2);
  const [jpegQuality, setJpegQuality] = useState(0.92);
  const [filename, setFilename] = useState("my-qr-code");
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const payload = useMemo(() => buildPayload(selectedType, formValues), [selectedType, formValues]);
  const valid = useMemo(
    () => isPayloadValid(selectedType, formValues, payload),
    [selectedType, formValues, payload],
  );
  const logo = logoSrc
    ? {
        src: logoSrc,
        size: logoSize,
        margin: logoMargin,
        radius: logoRadius,
        hideDots,
        ...(logoAspectRatio === "auto" ? {} : { aspectRatio: Number(logoAspectRatio) }),
      }
    : undefined;

  const qrProps = {
    value: payload,
    size: qrSize,
    margin,
    dotStyle,
    dotColor,
    backgroundColor: transparent ? "transparent" : backgroundColor,
    corner: {
      square: { style: frameStyle, color: frameColor },
      dot: { style: eyeStyle, color: eyeColor },
    },
    logo,
    qr: {
      errorCorrectionLevel: ecl,
      ...(version === "auto" ? {} : { version: Number(version) }),
    },
    ariaLabel: `QR code for ${selectedType}`,
  };

  const updateField = (name: string, value: string) => {
    setFormValues((current) => ({ ...current, [name]: value }));
    setErrorMessage("");
  };
  const changeCategory = (category: string) => {
    setSelectedType(category);
    setFormValues({});
    setErrorMessage("");
  };
  const applyPreset = (preset: (typeof presets)[number]) => {
    setDotColor(preset.dot);
    setBackgroundColor(preset.bg);
    setFrameColor(preset.frame);
    setEyeColor(preset.eye);
    setTransparent(false);
  };
  const resetCustomization = () => {
    setDotColor("#000000");
    setBackgroundColor("#ffffff");
    setDotStyle("square");
    setFrameStyle("square");
    setFrameColor("#000000");
    setEyeStyle("square");
    setEyeColor("#000000");
    setQrSize(512);
    setMargin(4);
    setEcl("M");
    setVersion("auto");
    setTransparent(false);
    setLogoSrc("");
    setLogoSize(0.3);
    setLogoMargin(1);
    setLogoRadius(0.15);
    setLogoAspectRatio("auto");
    setHideDots(true);
    setDownloadFormat("png");
    setExportScale(2);
    setJpegQuality(0.92);
    setFilename("my-qr-code");
  };
  const handleLogoUpload = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please choose an image file for the logo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogoSrc(String(reader.result ?? ""));
    reader.onerror = () => setErrorMessage("Could not read the selected logo.");
    reader.readAsDataURL(file);
  };
  const handleDownload = async () => {
    if (!valid || isDownloading) return;
    setIsDownloading(true);
    setErrorMessage("");
    try {
      const safeName = (filename.trim() || "qr-code").replace(/[^a-z0-9-_]+/gi, "-");
      if (downloadFormat === "svg") {
        const svg = toSVGString(qrProps);
        downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${safeName}.svg`);
      } else {
        const dataUrl = await toDataURL(
          qrProps,
          downloadFormat === "jpeg"
            ? { format: "jpeg", quality: jpegQuality, scale: exportScale }
            : { format: "png", scale: exportScale },
        );
        const response = await fetch(dataUrl);
        downloadBlob(
          await response.blob(),
          `${safeName}.${downloadFormat === "jpeg" ? "jpg" : "png"}`,
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "QR download failed. Please try again.",
      );
    } finally {
      setIsDownloading(false);
    }
  };
  const copyPayload = async () => {
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      setErrorMessage("Clipboard access was unavailable in this browser.");
    }
  };

  const fields = categoryFields[selectedType] ?? [];

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 lg:flex-row">
      <aside className="lg:sticky lg:top-20  h-fit w-full shrink-0 self-start lg:w-[190px]">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <LayoutGrid size={18} /> Select category
        </div>
        <Separator className="mb-3" />
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-2">
          {categories.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              type="button"
              variant={selectedType === label ? "secondary" : "outline"}
              aria-pressed={selectedType === label}
              onClick={() => changeCategory(label)}
              className={`h-auto min-h-[68px] flex-col gap-2 whitespace-normal ${selectedType === label ? "border-primary bg-accent text-primary" : ""}`}
            >
              <Icon size={19} />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </aside>

      <main className="min-w-0 flex-1 space-y-5 lg:border-l lg:pl-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
          <div>
            <h1 className="text-xl font-bold">{selectedType} QR generator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create, customize, preview and export your QR code.
            </p>
          </div>
          <Badge variant={valid ? "default" : "secondary"}>
            {valid ? "Ready to generate" : "Waiting for input"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>QR content</CardTitle>
                <CardDescription>Enter the information you want to encode.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup className="gap-4">
                  {fields.map((field) => (
                    <Field key={field.name}>
                      <FieldLabel htmlFor={`${selectedType}-${field.name}`}>
                        {field.label}
                        {field.required ? " *" : ""}
                      </FieldLabel>
                      {field.multiline ? (
                        <Textarea
                          id={`${selectedType}-${field.name}`}
                          rows={4}
                          placeholder={field.placeholder}
                          value={formValues[field.name] ?? ""}
                          onChange={(event) => updateField(field.name, event.target.value)}
                        />
                      ) : (
                        <Input
                          id={`${selectedType}-${field.name}`}
                          type={field.type ?? "text"}
                          step={field.type === "number" ? "any" : undefined}
                          placeholder={field.placeholder}
                          value={formValues[field.name] ?? ""}
                          onChange={(event) => updateField(field.name, event.target.value)}
                        />
                      )}
                      {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                      )}
                    </Field>
                  ))}
                </FieldGroup>
                {selectedType === "Wi-Fi" && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    For an open network, set Security to nopass and leave Password empty.
                  </p>
                )}
                {selectedType === "Event" &&
                  formValues.start &&
                  formValues.end &&
                  new Date(formValues.end) <= new Date(formValues.start) && (
                    <p className="mt-2 text-sm text-destructive">
                      Event end time must be after the start time.
                    </p>
                  )}
                {selectedType === "Location" &&
                  formValues.latitude &&
                  formValues.longitude &&
                  !valid && (
                    <p className="mt-2 text-sm text-destructive">
                      Latitude must be -90 to 90 and longitude -180 to 180.
                    </p>
                  )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Full QR customization</CardTitle>
                  <CardDescription>
                    Fine-tune every option supported by the QR renderer.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={resetCustomization}
                  aria-label="Reset customization"
                >
                  <RotateCcw size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-4">
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="shapes">Shapes</TabsTrigger>
                    <TabsTrigger value="logo">Logo</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="mt-4 space-y-4">
                    <div>
                      <Label className="mb-2 block">Color presets</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {presets.map((preset) => (
                          <Button
                            key={preset.name}
                            type="button"
                            size="sm"
                            variant="outline"
                            className="justify-start gap-2"
                            onClick={() => applyPreset(preset)}
                          >
                            <span
                              className="h-5 w-5 rounded border"
                              style={{
                                background: preset.bg,
                                boxShadow: `inset 0 0 0 4px ${preset.dot}`,
                              }}
                            />
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Data / dots color</FieldLabel>
                        <div className="flex gap-2">
                          <Input
                            aria-label="Choose dot color"
                            type="color"
                            value={dotColor}
                            onChange={(e) => setDotColor(e.target.value)}
                            className="h-10 w-14 cursor-pointer p-1"
                          />
                          <Input
                            aria-label="Dot color hex"
                            value={dotColor}
                            onChange={(e) => setDotColor(e.target.value)}
                          />
                        </div>
                      </Field>
                      <Field>
                        <FieldLabel>Background color</FieldLabel>
                        <div className="flex gap-2">
                          <Input
                            aria-label="Choose background color"
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => {
                              setBackgroundColor(e.target.value);
                              setTransparent(false);
                            }}
                            className="h-10 w-14 cursor-pointer p-1"
                          />
                          <Input
                            aria-label="Background color hex"
                            value={backgroundColor}
                            onChange={(e) => {
                              setBackgroundColor(e.target.value);
                              setTransparent(false);
                            }}
                          />
                        </div>
                      </Field>
                      <Field>
                        <FieldLabel>Finder frame color</FieldLabel>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={frameColor}
                            onChange={(e) => setFrameColor(e.target.value)}
                            className="h-10 w-14 cursor-pointer p-1"
                          />
                          <Input
                            value={frameColor}
                            onChange={(e) => setFrameColor(e.target.value)}
                          />
                        </div>
                      </Field>
                      <Field>
                        <FieldLabel>Finder center / eye color</FieldLabel>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={eyeColor}
                            onChange={(e) => setEyeColor(e.target.value)}
                            className="h-10 w-14 cursor-pointer p-1"
                          />
                          <Input value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} />
                        </div>
                      </Field>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={transparent}
                        onCheckedChange={(checked) => setTransparent(checked === true)}
                      />
                      Transparent QR background
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Transparent backgrounds are supported by PNG and SVG. JPEG exports use a white
                      background because JPEG has no transparency.
                    </p>
                  </TabsContent>

                  <TabsContent value="shapes" className="mt-4 space-y-4">
                    <Field>
                      <FieldLabel>Data module / dot shape</FieldLabel>
                      <Select value={dotStyle} onValueChange={(v) => setDotStyle(v as DotStyle)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="circle">Circle</SelectItem>
                          <SelectItem value="rounded">Rounded / connected</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Finder outer frame shape</FieldLabel>
                      <Select
                        value={frameStyle}
                        onValueChange={(v) => setFrameStyle(v as FrameStyle)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="rounded">Rounded</SelectItem>
                          <SelectItem value="extra-rounded">Extra rounded</SelectItem>
                          <SelectItem value="circle">Circle</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Finder inner eye shape</FieldLabel>
                      <Select value={eyeStyle} onValueChange={(v) => setEyeStyle(v as EyeStyle)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="rounded">Rounded</SelectItem>
                          <SelectItem value="circle">Circle</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Quiet zone / margin: {margin} modules</FieldLabel>
                      <Slider
                        value={[margin]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={(v) =>
                          setMargin(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 4)
                        }
                      />
                      <FieldDescription>
                        Clear space around the QR code. Keep a margin for reliable scanning.
                      </FieldDescription>
                    </Field>
                  </TabsContent>

                  <TabsContent value="logo" className="mt-4 space-y-4">
                    <Field>
                      <FieldLabel>Center logo image</FieldLabel>
                      <div className="flex flex-wrap items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          className="min-w-0 flex-1"
                          onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                        />
                        {logoSrc && (
                          <Button type="button" variant="outline" onClick={() => setLogoSrc("")}>
                            Remove logo
                          </Button>
                        )}
                      </div>
                      <FieldDescription>
                        Upload a PNG, JPG, WebP or SVG image. The image is embedded in the QR code
                        preview.
                      </FieldDescription>
                    </Field>
                    {logoSrc && (
                      <div className="flex items-center gap-3 rounded-lg border p-3">
                        <img
                          src={logoSrc}
                          alt="Logo preview"
                          className="h-14 w-14 rounded border object-contain"
                        />
                        <span className="text-sm text-muted-foreground">Logo loaded</span>
                      </div>
                    )}
                    <Field>
                      <FieldLabel>Logo size: {Math.round(logoSize * 100)}%</FieldLabel>
                      <Slider
                        value={[logoSize]}
                        min={0.1}
                        max={0.7}
                        step={0.01}
                        onValueChange={(v) =>
                          setLogoSize(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 0.3)
                        }
                      />
                      <FieldDescription>
                        Maximum safe size is limited by error correction to help preserve scan
                        reliability.
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel>Logo aspect ratio</FieldLabel>
                      <Select
                        value={logoAspectRatio}
                        onValueChange={(value) => setLogoAspectRatio(value ?? "")}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Detect automatically</SelectItem>
                          <SelectItem value="1">1:1 — Square</SelectItem>
                          <SelectItem value="1.5">3:2 — Landscape</SelectItem>
                          <SelectItem value="2">2:1 — Wide</SelectItem>
                          <SelectItem value="0.6667">2:3 — Portrait</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Logo corner radius: {Math.round(logoRadius * 100)}%</FieldLabel>
                      <Slider
                        value={[logoRadius]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={(v) =>
                          setLogoRadius(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 0.15)
                        }
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Clearance around logo: {logoMargin} modules</FieldLabel>
                      <Slider
                        value={[logoMargin]}
                        min={0}
                        max={8}
                        step={1}
                        onValueChange={(v) =>
                          setLogoMargin(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 1)
                        }
                      />
                    </Field>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={hideDots}
                        onCheckedChange={(checked) => setHideDots(checked === true)}
                      />
                      Clear QR dots behind logo
                    </label>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-4 space-y-4">
                    <Field>
                      <FieldLabel>QR preview / output size: {qrSize}px</FieldLabel>
                      <Slider
                        value={[qrSize]}
                        min={128}
                        max={2048}
                        step={64}
                        onValueChange={(v) =>
                          setQrSize(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 512)
                        }
                      />
                      <FieldDescription>
                        SVG remains vector-based; this size is used for the viewBox and raster
                        exports.
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel>Error correction level</FieldLabel>
                      <Select value={ecl} onValueChange={(v) => setEcl(v as ECL)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">L — Low (~7%)</SelectItem>
                          <SelectItem value="M">M — Medium (~15%)</SelectItem>
                          <SelectItem value="Q">Q — Quartile (~25%)</SelectItem>
                          <SelectItem value="H">H — High (~30%)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Higher correction can recover more damage but creates a denser code. H is
                        generally preferable when using a logo.
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel>QR version</FieldLabel>
                      <Select value={version} onValueChange={(value) => setVersion(value ?? "")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Automatic (recommended)</SelectItem>
                          {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              Version {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Versions 1–40 control matrix capacity. A fixed version may fail if the
                        content does not fit.
                      </FieldDescription>
                    </Field>
                    <Separator />
                    <Field>
                      <FieldLabel>Export format</FieldLabel>
                      <Select
                        value={downloadFormat}
                        onValueChange={(v) => setDownloadFormat(v as ExportFormat)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG image</SelectItem>
                          <SelectItem value="jpeg">JPEG image</SelectItem>
                          <SelectItem value="svg">SVG vector</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    {downloadFormat !== "svg" && (
                      <>
                        <Field>
                          <FieldLabel>Export scale: {exportScale}×</FieldLabel>
                          <Slider
                            value={[exportScale]}
                            min={1}
                            max={4}
                            step={1}
                            onValueChange={(v) =>
                              setExportScale(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 2)
                            }
                          />
                          <FieldDescription>
                            Higher scale creates a larger raster file for print and high-density
                            displays.
                          </FieldDescription>
                        </Field>
                      </>
                    )}
                    {downloadFormat === "jpeg" && (
                      <Field>
                        <FieldLabel>JPEG quality: {Math.round(jpegQuality * 100)}%</FieldLabel>
                        <Slider
                          value={[jpegQuality]}
                          min={0.5}
                          max={1}
                          step={0.01}
                          onValueChange={(v) =>
                            setJpegQuality(setMargin(Array.isArray(v) ? (v[0] ?? 4) : v) ?? 0.92)
                          }
                        />
                      </Field>
                    )}
                    <Field>
                      <FieldLabel>Download filename</FieldLabel>
                      <Input
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="my-qr-code"
                      />
                    </Field>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="min-w-0 xl:sticky xl:top-5">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>Live QR preview</CardTitle>
                    <CardDescription>
                      Preview updates whenever you change content or design.
                    </CardDescription>
                  </div>
                  <Badge variant={valid ? "default" : "secondary"}>
                    {valid ? "Valid input" : "Incomplete"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div
                  data-qr-preview
                  className="flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-xl border p-5"
                  style={{
                    backgroundColor: transparent
                      ? "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50% / 16px 16px"
                      : backgroundColor,
                  }}
                >
                  {valid ? (
                    <QRCode {...qrProps} size={Math.min(qrSize, 320)} />
                  ) : (
                    <div className="max-w-[240px] text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <LayoutGrid className="text-muted-foreground" size={25} />
                      </div>
                      <p className="text-sm font-medium">Your QR code will appear here</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Complete the required fields to generate a preview.
                      </p>
                    </div>
                  )}
                </div>
                {valid && (
                  <div className="w-full space-y-2 rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-muted-foreground">Encoded content</p>
                      <Button type="button" size="sm" variant="ghost" onClick={copyPayload}>
                        <Copy size={14} className="mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="break-all text-xs">{payload}</p>
                  </div>
                )}
                <Separator />
                <div className="w-full space-y-3">
                  <Field>
                    <FieldLabel>Download format</FieldLabel>
                    <Select
                      value={downloadFormat}
                      onValueChange={(v) => setDownloadFormat(v as ExportFormat)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG image</SelectItem>
                        <SelectItem value="jpeg">JPEG image</SelectItem>
                        <SelectItem value="svg">SVG vector</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  {errorMessage && (
                    <p role="alert" className="text-sm text-destructive">
                      {errorMessage}
                    </p>
                  )}
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleDownload}
                    disabled={!valid || isDownloading}
                  >
                    <Download size={17} className="mr-2" />
                    {isDownloading
                      ? "Preparing download..."
                      : `Download ${downloadFormat.toUpperCase()}`}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Always scan the downloaded QR code with another device before printing or
                    publishing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </section>
  );
}
