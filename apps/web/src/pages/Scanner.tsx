"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Camera, Flashlight, Copy, ExternalLink, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

function getQRDetails(data: string) {
  const value = data.trim();
  if (/^https?:\/\//i.test(value)) {
    return {
      type: "Website",
      description: "This QR code contains a website URL.",
      link: value,
    };
  }
  if (/^www\./i.test(value)) {
    return {
      type: "Website",
      description: "This QR code contains a website URL.",
      link: `https:${value}`,
    };
  }
  if (/^mailto:/i.test(value)) {
    return {
      type: "Email",
      description: "This QR code contains an email address.",
      link: value,
    };
  }
  if (/^tel:/i.test(value)) {
    return {
      type: "Phone",
      description: "This QR code contains a phone number.",
      link: value,
    };
  }
  if (/^WIFI:/i.test(value)) {
    const fields = value.slice(5).split(";");
    const wifi: Record<string, string> = {};
    fields.forEach((field) => {
      const separator = field.indexOf(":");
      if (separator !== -1) {
        wifi[field.slice(0, separator)] = field.slice(separator + 1);
      }
    });
    return {
      type: "Wi-Fi",
      description: "This QR code contains Wi-Fi connection details.",
      ssid: wifi.S || "Unknown",
      password: wifi.P || "Not provided",
      encryption: wifi.T || "Unknown",
    };
  }
  if (/^BEGIN:VCARD/i.test(value)) {
    return {
      type: "Contact",
      description: "This QR code contains contact information.",
    };
  }
  if (/^sms:/i.test(value)) {
    return {
      type: "SMS",
      description: "This QR code contains an SMS message.",
    };
  }
  if (/^geo:/i.test(value)) {
    return {
      type: "Location",
      description: "This QR code contains geographic coordinates.",
    };
  }
  return {
    type: "Plain Text",
    description: "This QR code contains ordinary text or other data.",
  };
}

function getFriendlyCameraName(camera: QrScanner.Camera, index: number) {
  const label = camera.label.toLowerCase();

  if (/\b(front|user|facetime|selfie)\b/i.test(label)) {
    return "Front Camera";
  }

  if (/\b(back|rear|environment|world)\b/i.test(label)) {
    return "Back Camera";
  }

  if (/\b(webcam|usb)\b/i.test(label)) {
    return "Webcam";
  }

  if (/\b(integrated|built-in|builtin)\b/i.test(label)) {
    return "Built-in Camera";
  }

  return `Other Camera ${index + 1}`;
}

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [hasFlash, setHasFlash] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const scanner = new QrScanner(
      videoRef.current,
      (scanResult) => {
        setResult(scanResult.data);
        setError("");
      },
      {
        preferredCamera: "environment",
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 10,
      },
    );
    scannerRef.current = scanner;
    return () => {
      scanner.destroy();
      scannerRef.current = null;
    };
  }, []);

  const startScanning = async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      setError("");
      await scanner.start();
      setIsScanning(true);

      const availableCameras = await QrScanner.listCameras(true);
      setCameras(availableCameras);

      const activeTrack = videoRef.current?.srcObject;
      const activeDeviceId =
        activeTrack instanceof MediaStream
          ? activeTrack.getVideoTracks()[0]?.getSettings().deviceId
          : undefined;
      if (activeDeviceId) {
        setSelectedCamera(activeDeviceId);
      } else {
        setSelectedCamera(availableCameras[0]?.id ?? "");
      }

      const flashAvailable = await scanner.hasFlash();
      setHasFlash(flashAvailable);
      setIsFlashOn(scanner.isFlashOn());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to access camera.");
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      if (scanner.isFlashOn()) {
        await scanner.turnFlashOff();
      }
      scanner.stop();
      setIsScanning(false);
      setIsFlashOn(false);
      setHasFlash(false);
    } catch {
      scanner.stop();
      setIsScanning(false);
      setIsFlashOn(false);
    }
  };

  const handleCameraChange = async (cameraId: string) => {
    const scanner = scannerRef.current;
    if (!scanner || !cameraId) return;
    try {
      setError("");
      if (scanner.isFlashOn()) {
        await scanner.turnFlashOff();
        setIsFlashOn(false);
      }
      await scanner.setCamera(cameraId);
      setSelectedCamera(cameraId);

      const flashAvailable = await scanner.hasFlash();
      setHasFlash(flashAvailable);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to switch camera.");
    }
  };

  const handleFlashToggle = async () => {
    const scanner = scannerRef.current;
    if (!scanner || !hasFlash) return;
    try {
      setError("");
      await scanner.toggleFlash();
      setIsFlashOn(scanner.isFlashOn());
    } catch {
      setError("Unable to turn flashlight on. This camera may not support it.");
      setIsFlashOn(false);
    }
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy QR result.");
    }
  };

  const clearResult = () => {
    setResult("");
    setError("");
  };
  const qrDetails = result ? getQRDetails(result) : null;
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">QR Code Scanner</h1>
        <p className="text-muted-foreground">
          Scan QR codes using your camera and view their complete details.
        </p>
      </div>
      {/* Scanner Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Camera Scanner</CardTitle>
            <Badge variant={isScanning ? "default" : "secondary"}>
              {isScanning ? "Scanning" : "Stopped"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Camera Preview */}
          <div className="relative overflow-hidden rounded-xl bg-black">
            <video
              onClick={() => (videoRef ? null : startScanning)}
              ref={videoRef}
              className="lg:aspect-video sm:aspect-video aspect-square w-full object-cover"
              muted
              playsInline
            />
            {!isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 text-white">
                <Camera className="h-12 w-12" />
                <p className="text-sm">Camera is currently stopped</p>
              </div>
            )}
          </div>
          {/* Scanner Controls */}
          <div className="flex flex-row flex-wrap items-center gap-3 w-full">
            {!isScanning ? (
              <Button onClick={startScanning}>
                <Camera className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            ) : (
              <Button variant="destructive" onClick={stopScanning}>
                Stop Scanning
              </Button>
            )}
            {/* Camera Selection */}
            {isScanning && cameras.length > 1 && (
              <div className="sm:w-64">
                <Select
                  value={selectedCamera}
                  onValueChange={(value) => handleCameraChange(value ?? "")}
                >
                  <SelectTrigger>
                    <Camera className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select Camera">
                      {(() => {
                        const index = cameras.findIndex((camera) => camera.id === selectedCamera);

                        return index !== -1
                          ? getFriendlyCameraName(cameras[index], index)
                          : "Select Camera";
                      })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {cameras.map((camera, index) => (
                      <SelectItem key={camera.id} value={camera.id}>
                        {getFriendlyCameraName(camera, index)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Flashlight */}
            {isScanning && hasFlash && (
              <Button variant={isFlashOn ? "default" : "outline"} onClick={handleFlashToggle}>
                <Flashlight className="mr-2 h-4 w-4" />
                {isFlashOn ? "Flashlight On" : "Flashlight Off"}
              </Button>
            )}
            {/* Refresh */}
            {result && (
              <Button variant="outline" onClick={clearResult}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear Result
              </Button>
            )}
          </div>
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
      {/* QR Result Details */}
      {result && qrDetails && (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle>QR Code Details</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Information extracted from your scanned QR code.
                </p>
              </div>
              <Badge variant="outline">{qrDetails.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type */}
            <div className="rounded-lg bg-muted/50 p-5 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Content Type</p>
              <h2 className="text-2xl font-semibold">{qrDetails.type}</h2>
              <p className="text-sm text-muted-foreground">{qrDetails.description}</p>
            </div>
            {/* Website */}
            {"link" in qrDetails && qrDetails.type === "Website" && (
              <div className="space-y-3">
                <h3 className="font-semibold">Website URL</h3>
                <div className="rounded-lg border p-4">
                  <p className="break-all text-sm">{qrDetails.link}</p>
                </div>
                <Button
                  onClick={() => window.open(qrDetails.link, "_blank", "noopener,noreferrer")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Website
                </Button>
              </div>
            )}
            {/* Email / Phone */}
            {"link" in qrDetails && qrDetails.type !== "Website" && (
              <div className="space-y-3">
                <h3 className="font-semibold">{qrDetails.type} Information</h3>
                <div className="rounded-lg border p-4">
                  <p className="break-all text-sm">{qrDetails.link}</p>
                </div>
              </div>
            )}
            {/* Wi-Fi */}
            {"ssid" in qrDetails && (
              <div className="space-y-4">
                <h3 className="font-semibold">Wi-Fi Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Network Name (SSID)</p>
                    <p className="mt-2 font-medium break-all">{qrDetails.ssid}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Password</p>
                    <p className="mt-2 font-medium break-all">{qrDetails.password}</p>
                  </div>
                  <div className="rounded-lg border p-4 sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Encryption</p>
                    <p className="mt-2 font-medium">{qrDetails.encryption}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Contact / SMS / Location / Text */}
            {qrDetails.type !== "Website" &&
              qrDetails.type !== "Wi-Fi" &&
              !("link" in qrDetails) && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Scanned Content</h3>
                  <div className="min-h-40 max-h-96 overflow-y-auto rounded-lg border bg-muted/20 p-5">
                    <p className="whitespace-pre-wrap break-all text-sm leading-7">{result}</p>
                  </div>
                </div>
              )}
            {/* Raw QR Data */}
            <div className="space-y-3">
              <h3 className="font-semibold">Raw QR Data</h3>
              <div className="min-h-32 max-h-72 overflow-y-auto rounded-lg border bg-muted/20 p-5">
                <p className="whitespace-pre-wrap break-all text-sm leading-7">{result}</p>
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={copyResult}>
                {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {isCopied ? "Copied" : "Copy Result"}
              </Button>
              <Button variant="outline" onClick={clearResult}>
                Clear Result
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Empty Result State */}
      {!result && (
        <Card>
          <CardContent className="flex min-h-40 flex-col items-center justify-center gap-2 text-center">
            <Camera className="h-10 w-10 text-muted-foreground" />
            <h3 className="font-semibold">No QR Code Scanned</h3>
            <p className="text-sm text-muted-foreground">
              Start your camera and point it towards a QR code.
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
