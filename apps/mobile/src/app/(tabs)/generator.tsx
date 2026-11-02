import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { QRCode } from "@ttsalpha/qrcode/native";
import { toSVGString } from "@ttsalpha/qrcode/core";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";

import { useTheme } from "@/hooks/useTheme";
import Container from "@/components/layout/container";

// ==================================================
// TYPES
// ==================================================

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  description?: string;
};

type Category = {
  label: string;
  icon: IconName;
};

type FormValues = Record<string, string>;

type DotStyle = "square" | "circle" | "rounded";
type FrameStyle = "square" | "rounded" | "extra-rounded" | "circle";
type EyeStyle = "square" | "rounded" | "circle";
type CorrectionLevel = "L" | "M" | "Q" | "H";

type CustomTab = "Colors" | "Styles" | "Size" | "Logo";

// ==================================================
// CONSTANTS
// ==================================================

const QR_DEFAULTS = {
  foreground: "#000000",
  background: "#FFFFFF",
};

const categories: Category[] = [
  { label: "Link", icon: "link-outline" },
  { label: "Contact", icon: "person-outline" },
  { label: "Wi-Fi", icon: "wifi-outline" },
  { label: "Email", icon: "mail-outline" },
  { label: "Phone", icon: "call-outline" },
  { label: "SMS", icon: "chatbox-outline" },
  { label: "Text", icon: "text-outline" },
  { label: "PDF", icon: "document-outline" },
  { label: "Image", icon: "image-outline" },
  { label: "Location", icon: "map-outline" },
  { label: "Bitcoin", icon: "logo-bitcoin" },
  { label: "Event", icon: "calendar-outline" },
];

// ==================================================
// CATEGORY FIELDS
// ==================================================

const categoryFields: Record<string, Field[]> = {
  Link: [
    {
      name: "url",
      label: "Website URL",
      placeholder: "https://example.com",
      required: true,
      type: "url",
    },
  ],

  Contact: [
    {
      name: "firstName",
      label: "First name",
      placeholder: "John",
      required: true,
    },
    {
      name: "lastName",
      label: "Last name",
      placeholder: "Doe",
    },
    {
      name: "organization",
      label: "Organization",
      placeholder: "Company name",
    },
    {
      name: "phone",
      label: "Phone number",
      placeholder: "+91 9876543210",
      type: "tel",
    },
    {
      name: "email",
      label: "Email address",
      placeholder: "john@example.com",
      type: "email",
    },
    {
      name: "website",
      label: "Website",
      placeholder: "https://example.com",
      type: "url",
    },
    {
      name: "street",
      label: "Street address",
      placeholder: "Street and house number",
    },
    {
      name: "city",
      label: "City",
      placeholder: "Guwahati",
    },
    {
      name: "postalCode",
      label: "Postal code",
      placeholder: "781001",
    },
  ],

  "Wi-Fi": [
    {
      name: "ssid",
      label: "Network name (SSID)",
      placeholder: "My Wi-Fi",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Wi-Fi password",
      type: "password",
    },
    {
      name: "security",
      label: "Security",
      placeholder: "WPA",
    },
    {
      name: "hidden",
      label: "Hidden network (true / false)",
      placeholder: "false",
    },
  ],

  Email: [
    {
      name: "email",
      label: "Email address",
      placeholder: "hello@example.com",
      type: "email",
      required: true,
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Hello",
    },
    {
      name: "body",
      label: "Message",
      placeholder: "Write your message...",
      multiline: true,
    },
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
    {
      name: "message",
      label: "Message",
      placeholder: "Write your SMS...",
      multiline: true,
    },
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
      type: "url",
    },
  ],

  Image: [
    {
      name: "url",
      label: "Public image URL",
      placeholder: "https://example.com/photo.jpg",
      required: true,
      type: "url",
    },
  ],

  Location: [
    {
      name: "latitude",
      label: "Latitude",
      placeholder: "26.1445",
      type: "number",
      required: true,
    },
    {
      name: "longitude",
      label: "Longitude",
      placeholder: "91.7362",
      type: "number",
      required: true,
    },
    {
      name: "locationName",
      label: "Location name",
      placeholder: "Guwahati",
    },
  ],

  Bitcoin: [
    {
      name: "address",
      label: "Bitcoin address",
      placeholder: "Bitcoin address",
      required: true,
    },
    {
      name: "amount",
      label: "Amount (BTC)",
      placeholder: "0.001",
      type: "number",
    },
    {
      name: "label",
      label: "Payment label",
      placeholder: "Payment",
    },
    {
      name: "message",
      label: "Message",
      placeholder: "Payment message",
    },
  ],

  Event: [
    {
      name: "title",
      label: "Event title",
      placeholder: "My event",
      required: true,
    },
    {
      name: "location",
      label: "Location",
      placeholder: "Event venue",
    },
    {
      name: "start",
      label: "Start date and time",
      placeholder: "2026-12-20T10:00:00",
      required: true,
    },
    {
      name: "end",
      label: "End date and time",
      placeholder: "2026-12-20T12:00:00",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Event details...",
      multiline: true,
    },
  ],
};

// ==================================================
// COLOR PRESETS
// ==================================================

const colorPresets = [
  {
    name: "Classic",
    foreground: "#000000",
    background: "#FFFFFF",
  },
  {
    name: "Midnight",
    foreground: "#FFFFFF",
    background: "#111827",
  },
  {
    name: "Ocean",
    foreground: "#0369A1",
    background: "#E0F2FE",
  },
  {
    name: "Forest",
    foreground: "#166534",
    background: "#DCFCE7",
  },
  {
    name: "Purple",
    foreground: "#7C3AED",
    background: "#F3E8FF",
  },
  {
    name: "Rose",
    foreground: "#BE123C",
    background: "#FFE4E6",
  },
];

// ==================================================
// HELPERS
// ==================================================

const escapeWifi = (value: string) =>
  value.replace(/([\\;,:"])/g, "\\$1");

const escapeVCard = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

const escapeIcs = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

const formatIcsDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
};

const encodeUrl = (url: string) => {
  const trimmed = url.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const isValidHex = (color: string) =>
  /^#[0-9A-F]{6}$/i.test(color);

const isValidColor = (color: string) =>
  color === "transparent" || isValidHex(color);

// ==================================================
// QR DATA GENERATOR
// ==================================================

function generateQRValue(
  category: string,
  values: FormValues
): string {
  switch (category) {
    case "Link":
    case "PDF":
    case "Image": {
      return encodeUrl(values.url || "");
    }

    case "Contact": {
      const firstName = values.firstName || "";
      const lastName = values.lastName || "";

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(lastName)};${escapeVCard(firstName)}`,
        `FN:${escapeVCard(`${firstName} ${lastName}`.trim())}`,
      ];

      if (values.organization) {
        lines.push(`ORG:${escapeVCard(values.organization)}`);
      }

      if (values.phone) {
        lines.push(`TEL;TYPE=CELL:${values.phone}`);
      }

      if (values.email) {
        lines.push(`EMAIL:${values.email}`);
      }

      if (values.website) {
        lines.push(`URL:${encodeUrl(values.website)}`);
      }

      if (values.street || values.city || values.postalCode) {
        lines.push(
          `ADR:;;${escapeVCard(values.street || "")};;;${escapeVCard(
            values.city || ""
          )};${escapeVCard(values.postalCode || "")}`
        );
      }

      lines.push("END:VCARD");

      return lines.join("\r\n");
    }

    case "Wi-Fi": {
      const security = (values.security || "WPA").toUpperCase();
      const hidden = values.hidden?.toLowerCase() === "true";

      if (security === "NOPASS") {
        return `WIFI:T:nopass;S:${escapeWifi(
          values.ssid || ""
        )};H:${hidden ? "true" : "false"};;`;
      }

      return `WIFI:T:${security};S:${escapeWifi(
        values.ssid || ""
      )};P:${escapeWifi(values.password || "")};H:${
        hidden ? "true" : "false"
      };;`;
    }

    case "Email": {
      const params: string[] = [];

      if (values.subject) {
        params.push(
          `subject=${encodeURIComponent(values.subject)}`
        );
      }

      if (values.body) {
        params.push(`body=${encodeURIComponent(values.body)}`);
      }

      return `mailto:${values.email}${
        params.length ? `?${params.join("&")}` : ""
      }`;
    }

    case "Phone": {
      return `tel:${values.phone || ""}`;
    }

    case "SMS": {
      return `SMSTO:${values.phone || ""}:${values.message || ""}`;
    }

    case "Text": {
      return values.text || "";
    }

    case "Location": {
      const lat = values.latitude;
      const lng = values.longitude;

      const name = values.locationName
        ? `(${encodeURIComponent(values.locationName)})`
        : "";

      return `geo:${lat},${lng}?q=${lat},${lng}${name}`;
    }

    case "Bitcoin": {
      const params: string[] = [];

      if (values.amount) {
        params.push(`amount=${encodeURIComponent(values.amount)}`);
      }

      if (values.label) {
        params.push(`label=${encodeURIComponent(values.label)}`);
      }

      if (values.message) {
        params.push(`message=${encodeURIComponent(values.message)}`);
      }

      return `bitcoin:${values.address}${
        params.length ? `?${params.join("&")}` : ""
      }`;
    }

    case "Event": {
      const start = formatIcsDate(values.start || "");
      const end = formatIcsDate(values.end || "");

      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `SUMMARY:${escapeIcs(values.title || "")}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
      ];

      if (values.location) {
        lines.push(`LOCATION:${escapeIcs(values.location)}`);
      }

      if (values.description) {
        lines.push(
          `DESCRIPTION:${escapeIcs(values.description)}`
        );
      }

      lines.push("END:VEVENT", "END:VCALENDAR");

      return lines.join("\r\n");
    }

    default:
      return "";
  }
}

// ==================================================
// REUSABLE SECTION TITLE
// ==================================================

function SectionTitle({
  title,
  description,
  color,
  descriptionColor,
}: {
  title: string;
  description?: string;
  color: string;
  descriptionColor: string;
}) {
  return (
    <View style={{ marginTop: 22, marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color,
        }}
      >
        {title}
      </Text>

      {description ? (
        <Text
          style={{
            fontSize: 12,
            color: descriptionColor,
            marginTop: 4,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}

// ==================================================
// MAIN GENERATOR
// ==================================================

export default function Generator() {
  const theme = useTheme();
  const qrRef = useRef<any>(null);

  // ------------------------------------------------
  // CATEGORY
  // ------------------------------------------------

  const [selectedCategory, setSelectedCategory] = useState("Link");
  const [openModal, setOpenModal] = useState(false);

  // ------------------------------------------------
  // FORM
  // ------------------------------------------------

  const [values, setValues] = useState<FormValues>({});
  const [formError, setFormError] = useState("");

  // ------------------------------------------------
  // QR DATA
  // ------------------------------------------------

  const [qrValue, setQrValue] = useState("");
  const [qrError, setQrError] = useState("");

  // ------------------------------------------------
  // CUSTOMIZATION TAB
  // ------------------------------------------------

  const [activeTab, setActiveTab] = useState<CustomTab>("Colors");

  // ------------------------------------------------
  // COLORS
  // QR colors intentionally remain independent
  // from the application theme.
  // ------------------------------------------------

  const [dotColor, setDotColor] = useState(
    QR_DEFAULTS.foreground
  );

  const [backgroundColor, setBackgroundColor] = useState(
    QR_DEFAULTS.background
  );

  const [frameColor, setFrameColor] = useState(
    QR_DEFAULTS.foreground
  );

  const [eyeColor, setEyeColor] = useState(
    QR_DEFAULTS.foreground
  );

  // ------------------------------------------------
  // STYLES
  // ------------------------------------------------

  const [dotStyle, setDotStyle] = useState<DotStyle>("square");
  const [frameStyle, setFrameStyle] =
    useState<FrameStyle>("square");
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>("square");

  // ------------------------------------------------
  // SIZE
  // ------------------------------------------------

  const [qrSize, setQrSize] = useState(260);
  const [qrMargin, setQrMargin] = useState(4);
  const [correction, setCorrection] =
    useState<CorrectionLevel>("M");
  const [qrVersion, setQrVersion] = useState(0);

  // ------------------------------------------------
  // LOGO
  // ------------------------------------------------

  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.25);
  const [logoMargin, setLogoMargin] = useState(2);
  const [logoRadius, setLogoRadius] = useState(0.3);
  const [hideDots, setHideDots] = useState(true);

  const fields = categoryFields[selectedCategory] || [];

  const colorsValid =
    isValidColor(dotColor) &&
    isValidColor(backgroundColor) &&
    isValidColor(frameColor) &&
    isValidColor(eyeColor);

  // ------------------------------------------------
  // UPDATE FORM
  // ------------------------------------------------

  const updateField = (name: string, value: string) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  // ------------------------------------------------
  // SELECT CATEGORY
  // ------------------------------------------------

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setValues({});
    setQrValue("");
    setQrError("");
    setFormError("");
    setOpenModal(true);
  };

  // ------------------------------------------------
  // VALIDATION
  // ------------------------------------------------

  const validateForm = (): boolean => {
    for (const field of fields) {
      const value = values[field.name]?.trim() || "";

      if (field.required && !value) {
        setFormError(`${field.label} is required.`);
        return false;
      }

      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        setFormError("Please enter a valid email address.");
        return false;
      }
    }

    if (
      ["Link", "PDF", "Image"].includes(selectedCategory) &&
      values.url
    ) {
      try {
        const url = new URL(encodeUrl(values.url));

        if (!["http:", "https:"].includes(url.protocol)) {
          setFormError("Please enter a valid HTTP or HTTPS URL.");
          return false;
        }
      } catch {
        setFormError("Please enter a valid URL.");
        return false;
      }
    }

    if (selectedCategory === "Contact" && values.website) {
      try {
        new URL(encodeUrl(values.website));
      } catch {
        setFormError("Please enter a valid contact website.");
        return false;
      }
    }

    if (selectedCategory === "Wi-Fi") {
      const security = (values.security || "WPA").toUpperCase();

      if (
        !["WPA", "WPA2", "WPA3", "WEP", "NOPASS"].includes(security)
      ) {
        setFormError(
          "Security must be WPA, WPA2, WPA3, WEP or NOPASS."
        );
        return false;
      }

      if (
        security !== "NOPASS" &&
        !values.password?.trim()
      ) {
        setFormError("Enter a Wi-Fi password or select NOPASS.");
        return false;
      }
    }

    if (selectedCategory === "Location") {
      const lat = Number(values.latitude);
      const lng = Number(values.longitude);

      if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
      ) {
        setFormError("Enter valid latitude and longitude.");
        return false;
      }
    }

    if (selectedCategory === "Bitcoin") {
      if (
        values.amount &&
        (!Number.isFinite(Number(values.amount)) ||
          Number(values.amount) <= 0)
      ) {
        setFormError("Enter a valid Bitcoin amount.");
        return false;
      }
    }

    if (selectedCategory === "Event") {
      const start = new Date(values.start || "");
      const end = new Date(values.end || "");

      if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime()) ||
        end <= start
      ) {
        setFormError(
          "End date must be later than start date."
        );
        return false;
      }
    }

    return true;
  };

  // ------------------------------------------------
  // GENERATE QR
  // ------------------------------------------------

  const handleGenerate = () => {
    if (!validateForm()) return;

    try {
      const result = generateQRValue(selectedCategory, values);

      if (!result.trim()) {
        setFormError("Please enter some information.");
        return;
      }

      if (result.length > 2900) {
        setFormError(
          "Your QR data is too large. Reduce the content."
        );
        return;
      }

      setQrValue(result);
      setQrError("");
      setOpenModal(false);
      setActiveTab("Colors");
    } catch {
      setFormError("Unable to generate QR code.");
    }
  };

  // ------------------------------------------------
  // QR PROPS
  // ------------------------------------------------

  const qrProps = useMemo(() => {
    const logo = logoUri
      ? {
          src: logoUri,
          size: logoSize,
          margin: logoMargin,
          radius: logoRadius,
          hideDots,
        }
      : undefined;

    return {
      value: qrValue,
      size: qrSize,
      margin: qrMargin,
      dotStyle,

      // Invalid HEX values fall back to safe colors.
      dotColor: isValidColor(dotColor)
        ? dotColor
        : QR_DEFAULTS.foreground,

      backgroundColor: isValidColor(backgroundColor)
        ? backgroundColor
        : QR_DEFAULTS.background,

      corner: {
        square: {
          style: frameStyle,
          color: isValidColor(frameColor)
            ? frameColor
            : QR_DEFAULTS.foreground,
        },
        dot: {
          style: eyeStyle,
          color: isValidColor(eyeColor)
            ? eyeColor
            : QR_DEFAULTS.foreground,
        },
      },

      logo,

      qr: {
        errorCorrectionLevel: correction,
        ...(qrVersion > 0 ? { version: qrVersion } : {}),
      },

      onError: (error: Error) => {
        setQrError(error.message);
      },
    };
  }, [
    qrValue,
    qrSize,
    qrMargin,
    dotStyle,
    dotColor,
    backgroundColor,
    frameStyle,
    frameColor,
    eyeStyle,
    eyeColor,
    logoUri,
    logoSize,
    logoMargin,
    logoRadius,
    hideDots,
    correction,
    qrVersion,
  ]);

  // ------------------------------------------------
  // GET PNG BASE64
  // ------------------------------------------------

  const getPNG = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!qrRef.current) {
        reject(new Error("QR code is not ready."));
        return;
      }

      qrRef.current.toDataURL((base64: string) => {
        if (!base64) {
          reject(new Error("Unable to export QR image."));
          return;
        }

        resolve(base64);
      });
    });
  };

  // ------------------------------------------------
  // SAVE PNG
  // ------------------------------------------------

  const savePNG = async () => {
    if (!colorsValid) {
      Alert.alert(
        "Invalid color",
        "Please correct all HEX color values before exporting."
      );
      return;
    }

    try {
      const base64 = await getPNG();

      const filename = `qrcode-${Date.now()}.png`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert(
        "QR Code saved",
        `PNG file saved successfully:\n${filename}`
      );

      return fileUri;
    } catch (error) {
      Alert.alert(
        "Export failed",
        error instanceof Error
          ? error.message
          : "Unable to save QR code."
      );

      return null;
    }
  };

  // ------------------------------------------------
  // SAVE SVG
  // ------------------------------------------------

  const saveSVG = async () => {
    if (!colorsValid) {
      Alert.alert(
        "Invalid color",
        "Please correct all HEX color values before exporting."
      );
      return;
    }

    try {
      const svg = toSVGString({
        value: qrValue,
        size: qrSize,
        margin: qrMargin,
        dotStyle,
        dotColor,
        backgroundColor,

        corner: {
          square: {
            style: frameStyle,
            color: frameColor,
          },
          dot: {
            style: eyeStyle,
            color: eyeColor,
          },
        },

        ...(logoUri
          ? {
              logo: {
                src: logoUri,
                size: logoSize,
                margin: logoMargin,
                radius: logoRadius,
                hideDots,
              },
            }
          : {}),

        qr: {
          errorCorrectionLevel: correction,
          ...(qrVersion > 0 ? { version: qrVersion } : {}),
        },
      });

      const filename = `qrcode-${Date.now()}.svg`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      await FileSystem.writeAsStringAsync(fileUri, svg);

      Alert.alert(
        "SVG saved",
        `File saved successfully:\n${filename}`
      );

      return fileUri;
    } catch (error) {
      Alert.alert(
        "SVG export failed",
        error instanceof Error
          ? error.message
          : "Unable to export SVG."
      );

      return null;
    }
  };

  // ------------------------------------------------
  // COPY QR IMAGE
  // ------------------------------------------------

  const copyQR = async () => {
    try {
      const base64 = await getPNG();

      await Clipboard.setImageAsync(base64);

      Alert.alert("Copied", "QR code image copied to clipboard.");
    } catch (error) {
      Alert.alert(
        "Copy failed",
        error instanceof Error
          ? error.message
          : "Unable to copy image."
      );
    }
  };

  // ------------------------------------------------
  // SHARE QR IMAGE
  // ------------------------------------------------

  const shareQR = async () => {
    try {
      const base64 = await getPNG();

      const filename = `qrcode-${Date.now()}.png`;
      const fileUri = `${FileSystem.cacheDirectory}${filename}`;

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert(
          "Unavailable",
          "Sharing is not supported on this device."
        );
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "image/png",
        dialogTitle: "Share QR Code",
        UTI: "public.png",
      });
    } catch (error) {
      Alert.alert(
        "Share failed",
        error instanceof Error
          ? error.message
          : "Unable to share QR code."
      );
    }
  };

  // ------------------------------------------------
  // LOGO PICKER
  // ------------------------------------------------

  const pickLogo = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow photo library access."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setLogoUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert("Error", "Unable to select image.");
    }
  };

  // ------------------------------------------------
  // RESET CUSTOMIZATION
  // ------------------------------------------------

  const resetCustomization = () => {
    setDotColor(QR_DEFAULTS.foreground);
    setBackgroundColor(QR_DEFAULTS.background);
    setFrameColor(QR_DEFAULTS.foreground);
    setEyeColor(QR_DEFAULTS.foreground);

    setDotStyle("square");
    setFrameStyle("square");
    setEyeStyle("square");

    setQrSize(260);
    setQrMargin(4);
    setCorrection("M");
    setQrVersion(0);

    setLogoUri(null);
    setLogoSize(0.25);
    setLogoMargin(2);
    setLogoRadius(0.3);
    setHideDots(true);
  };

  // ==================================================
  // REUSABLE CONTROLS
  // ==================================================

  const renderChips = <T extends string,>(
    options: T[],
    selected: T,
    onSelect: (value: T) => void
  ) => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {options.map((option) => {
        const active = selected === option;

        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            android_ripple={{
              color: theme.ripple,
            }}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 9,
              borderWidth: 1,
              borderColor: active
                ? theme.primary
                : theme.border,
              backgroundColor: active
                ? theme.buttonPrimary
                : theme.surfaceSecondary,
            }}
          >
            <Text
              style={{
                color: active
                  ? theme.buttonPrimaryText
                  : theme.text,
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const renderColorControl = (
    label: string,
    color: string,
    onChange: (value: string) => void
  ) => (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 8,
            backgroundColor: isValidColor(color)
              ? color
              : "transparent",
            borderWidth: 1,
            borderColor: theme.border,
          }}
        />

        <TextInput
          value={color}
          onChangeText={onChange}
          autoCapitalize="characters"
          maxLength={7}
          placeholder="#000000"
          placeholderTextColor={theme.inputPlaceholder}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: theme.inputBorder,
            borderRadius: 9,
            paddingHorizontal: 12,
            paddingVertical: 10,
            color: theme.inputText,
            backgroundColor: theme.inputBackground,
          }}
        />
      </View>

      {!isValidColor(color) ? (
        <Text
          style={{
            color: theme.error,
            fontSize: 11,
            marginTop: 5,
          }}
        >
          Enter a valid HEX color, e.g. #000000.
        </Text>
      ) : null}
    </View>
  );

  const renderNumberControl = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (value: number) => void
  ) => (
    <View style={{ marginBottom: 18 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 9,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            color: theme.primary,
            fontWeight: "700",
          }}
        >
          {value}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() =>
            onChange(Math.max(min, value - step))
          }
          android_ripple={{ color: theme.ripple }}
          style={{
            padding: 9,
            borderRadius: 8,
            backgroundColor: theme.surfaceSecondary,
          }}
        >
          <Ionicons
            name="remove"
            size={19}
            color={theme.icon}
          />
        </Pressable>

        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 5,
              backgroundColor: theme.border,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 5,
                width: `${
                  ((value - min) / (max - min)) * 100
                }%`,
                backgroundColor: theme.primary,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: theme.textSecondary,
              }}
            >
              {min}
            </Text>

            <Text
              style={{
                fontSize: 10,
                color: theme.textSecondary,
              }}
            >
              {max}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() =>
            onChange(Math.min(max, value + step))
          }
          android_ripple={{ color: theme.ripple }}
          style={{
            padding: 9,
            borderRadius: 8,
            backgroundColor: theme.surfaceSecondary,
          }}
        >
          <Ionicons
            name="add"
            size={19}
            color={theme.icon}
          />
        </Pressable>
      </View>
    </View>
  );

  const renderSectionTitle = (
    title: string,
    description?: string
  ) => (
    <SectionTitle
      title={title}
      description={description}
      color={theme.text}
      descriptionColor={theme.textSecondary}
    />
  );

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <Container>
      <View style={{ flex: 1 }}>
        {/* ==========================================
            CATEGORY SELECTOR
        ========================================== */}

        <View style={{ paddingTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Ionicons
              name="qr-code-outline"
              size={19}
              color={theme.iconSecondary}
            />

            <Text
              style={{
                color: theme.text,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              QR Category
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                paddingBottom: 12,
              }}
            >
              {categories.map((item) => {
                const active =
                  selectedCategory === item.label;

                return (
                  <Pressable
                    key={item.label}
                    onPress={() =>
                      selectCategory(item.label)
                    }
                    android_ripple={{
                      color: theme.ripple,
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 7,
                      paddingHorizontal: 13,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: active
                        ? theme.primary
                        : theme.border,
                      backgroundColor: active
                        ? theme.buttonPrimary
                        : theme.surface,
                    }}
                  >
                    <Ionicons
                      name={item.icon}
                      size={17}
                      color={
                        active
                          ? theme.buttonPrimaryText
                          : theme.iconSecondary
                      }
                    />

                    <Text
                      style={{
                        color: active
                          ? theme.buttonPrimaryText
                          : theme.text,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* ==========================================
            FIXED QR PREVIEW
        ========================================== */}

        <View
          style={{
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 16,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  color: theme.text,
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Live QR Preview
              </Text>

              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: 11,
                  marginTop: 3,
                }}
              >
                {selectedCategory} ·{" "}
                {qrValue
                  ? "Ready to scan"
                  : "Waiting for content"}
              </Text>
            </View>

            {qrValue ? (
              <Pressable
                onPress={resetCustomization}
                hitSlop={10}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name="refresh-outline"
                  size={20}
                  color={theme.icon}
                />
              </Pressable>
            ) : null}
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: 195,
              backgroundColor: theme.backgroundSecondary,
              borderRadius: 12,
              padding: 5,
              overflow: "hidden",
            }}
          >
            {qrValue ? (
              <View
                style={{
                  width: 190,
                  height: 190,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: qrSize,
                    height: qrSize,
                    transform: [{ scale: 190 / qrSize }],
                  }}
                >
                  <QRCode
                    ref={qrRef}
                    {...qrProps}
                    size={qrSize}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Ionicons
                  name="qr-code-outline"
                  size={55}
                  color={theme.iconSecondary}
                />

                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Select a category and enter your data
                </Text>
              </View>
            )}
          </View>

          {qrError ? (
            <Text
              style={{
                color: theme.error,
                fontSize: 12,
                marginTop: 8,
              }}
            >
              {qrError}
            </Text>
          ) : null}

          {/* EXPORT BUTTONS */}

          {qrValue ? (
            <View
              style={{
                flexDirection: "row",
                gap: 7,
                marginTop: 12,
              }}
            >
              {[
                {
                  label: "PNG",
                  icon: "download-outline" as const,
                  action: savePNG,
                },
                {
                  label: "SVG",
                  icon: "code-outline" as const,
                  action: saveSVG,
                },
                {
                  label: "Copy",
                  icon: "copy-outline" as const,
                  action: copyQR,
                },
                {
                  label: "Share",
                  icon: "share-social-outline" as const,
                  action: shareQR,
                },
              ].map((item) => (
                <Pressable
                  key={item.label}
                  onPress={item.action}
                  android_ripple={{
                    color: theme.rippleStrong,
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    paddingVertical: 10,
                    borderRadius: 9,
                    backgroundColor: theme.buttonPrimary,
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={15}
                    color={theme.buttonPrimaryText}
                  />

                  <Text
                    style={{
                      color: theme.buttonPrimaryText,
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Pressable
              onPress={() => setOpenModal(true)}
              android_ripple={{
                color: theme.rippleStrong,
              }}
              style={{
                marginTop: 10,
                padding: 12,
                backgroundColor: theme.buttonPrimary,
                borderRadius: 9,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.buttonPrimaryText,
                  fontWeight: "700",
                }}
              >
                Create QR Code
              </Text>
            </Pressable>
          )}
        </View>

        {/* ==========================================
            CUSTOMIZATION
        ========================================== */}

        {qrValue ? (
          <View style={{ flex: 1, minHeight: 0 }}>
            {/* CUSTOMIZATION HEADER */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={theme.icon}
                />

                <Text
                  style={{
                    color: theme.text,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Customize
                </Text>
              </View>

              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: 11,
                }}
              >
                Live editing
              </Text>
            </View>

            {/* CUSTOM TAB BAR */}

            <View
              style={{
                flexDirection: "row",
                padding: 4,
                borderRadius: 12,
                backgroundColor: theme.surfaceSecondary,
                borderWidth: 1,
                borderColor: theme.border,
                marginBottom: 12,
              }}
            >
              {[
                {
                  label: "Colors" as const,
                  icon: "color-palette-outline" as const,
                },
                {
                  label: "Styles" as const,
                  icon: "shapes-outline" as const,
                },
                {
                  label: "Size" as const,
                  icon: "scan-outline" as const,
                },
                {
                  label: "Logo" as const,
                  icon: "image-outline" as const,
                },
              ].map((tab) => {
                const active = activeTab === tab.label;

                return (
                  <Pressable
                    key={tab.label}
                    onPress={() => setActiveTab(tab.label)}
                    android_ripple={{
                      color: theme.ripple,
                    }}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      paddingVertical: 10,
                      borderRadius: 9,
                      backgroundColor: active
                        ? theme.buttonPrimary
                        : "transparent",
                    }}
                  >
                    <Ionicons
                      name={tab.icon}
                      size={18}
                      color={
                        active
                          ? theme.buttonPrimaryText
                          : theme.iconSecondary
                      }
                    />

                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: active
                          ? theme.buttonPrimaryText
                          : theme.textSecondary,
                      }}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* SCROLLABLE CUSTOMIZATION PANEL */}

            <ScrollView
              key={activeTab}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: 35,
              }}
            >
              {/* ==================================
                  COLORS TAB
              ================================== */}

              {activeTab === "Colors" ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 13,
                    padding: 14,
                    backgroundColor: theme.surface,
                  }}
                >
                  {renderSectionTitle("Color presets")}

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 9,
                    }}
                  >
                    {colorPresets.map((preset) => (
                      <Pressable
                        key={preset.name}
                        onPress={() => {
                          setDotColor(preset.foreground);
                          setFrameColor(preset.foreground);
                          setEyeColor(preset.foreground);
                          setBackgroundColor(preset.background);
                        }}
                        style={{
                          width: "30%",
                          borderWidth: 1,
                          borderColor: theme.border,
                          borderRadius: 9,
                          overflow: "hidden",
                        }}
                      >
                        <View
                          style={{
                            height: 28,
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: preset.foreground,
                            }}
                          />

                          <View
                            style={{
                              flex: 1,
                              backgroundColor: preset.background,
                            }}
                          />
                        </View>

                        <Text
                          style={{
                            color: theme.text,
                            fontSize: 11,
                            textAlign: "center",
                            padding: 7,
                          }}
                        >
                          {preset.name}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  {renderSectionTitle("Custom colors")}

                  {renderColorControl(
                    "QR foreground",
                    dotColor,
                    setDotColor
                  )}

                  {renderColorControl(
                    "QR background",
                    backgroundColor,
                    setBackgroundColor
                  )}

                  {renderColorControl(
                    "Corner frame",
                    frameColor,
                    setFrameColor
                  )}

                  {renderColorControl(
                    "Corner eye",
                    eyeColor,
                    setEyeColor
                  )}

                  <Pressable
                    onPress={() =>
                      setBackgroundColor(
                        backgroundColor === "transparent"
                          ? QR_DEFAULTS.background
                          : "transparent"
                      )
                    }
                    style={{
                      padding: 13,
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 9,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: theme.text,
                        fontWeight: "600",
                      }}
                    >
                      Transparent background
                    </Text>

                    <Ionicons
                      name={
                        backgroundColor === "transparent"
                          ? "checkbox"
                          : "square-outline"
                      }
                      size={20}
                      color={theme.icon}
                    />
                  </Pressable>

                  {!colorsValid ? (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      Fix invalid color values before exporting.
                    </Text>
                  ) : null}
                </View>
              ) : null}

              {/* ==================================
                  STYLES TAB
              ================================== */}

              {activeTab === "Styles" ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 13,
                    padding: 14,
                    backgroundColor: theme.surface,
                  }}
                >
                  {renderSectionTitle(
                    "Dot shape",
                    "Change individual QR modules."
                  )}

                  {renderChips<DotStyle>(
                    ["square", "rounded", "circle"],
                    dotStyle,
                    setDotStyle
                  )}

                  {renderSectionTitle(
                    "Corner frame",
                    "Customize outer QR position markers."
                  )}

                  {renderChips<FrameStyle>(
                    [
                      "square",
                      "rounded",
                      "extra-rounded",
                      "circle",
                    ],
                    frameStyle,
                    setFrameStyle
                  )}

                  {renderSectionTitle(
                    "Corner eye",
                    "Customize inner position markers."
                  )}

                  {renderChips<EyeStyle>(
                    ["square", "rounded", "circle"],
                    eyeStyle,
                    setEyeStyle
                  )}

                  {renderSectionTitle(
                    "Error correction",
                    "Higher correction can help when QR modules are damaged."
                  )}

                  {renderChips<CorrectionLevel>(
                    ["L", "M", "Q", "H"],
                    correction,
                    setCorrection
                  )}
                </View>
              ) : null}

              {/* ==================================
                  SIZE TAB
              ================================== */}

              {activeTab === "Size" ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 13,
                    padding: 14,
                    backgroundColor: theme.surface,
                  }}
                >
                  {renderSectionTitle(
                    "QR dimensions",
                    "Adjust QR image dimensions."
                  )}

                  {renderNumberControl(
                    "QR size (px)",
                    qrSize,
                    128,
                    512,
                    16,
                    setQrSize
                  )}

                  {renderNumberControl(
                    "QR margin",
                    qrMargin,
                    0,
                    20,
                    1,
                    setQrMargin
                  )}

                  {renderSectionTitle(
                    "QR version",
                    "0 means automatic version selection."
                  )}

                  {renderNumberControl(
                    "Version",
                    qrVersion,
                    0,
                    40,
                    1,
                    setQrVersion
                  )}
                </View>
              ) : null}

              {/* ==================================
                  LOGO TAB
              ================================== */}

              {activeTab === "Logo" ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 13,
                    padding: 14,
                    backgroundColor: theme.surface,
                  }}
                >
                  {renderSectionTitle(
                    "Center logo",
                    "Add your brand logo to the QR code."
                  )}

                  {logoUri ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 15,
                      }}
                    >
                      <Image
                        source={{ uri: logoUri }}
                        style={{
                          width: 65,
                          height: 65,
                          borderRadius: 10,
                        }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: theme.text,
                            fontWeight: "600",
                          }}
                        >
                          Logo selected
                        </Text>

                        <Text
                          style={{
                            color: theme.textSecondary,
                            fontSize: 11,
                            marginTop: 4,
                          }}
                        >
                          Preview updates automatically.
                        </Text>
                      </View>

                      <Pressable
                        onPress={() => setLogoUri(null)}
                        hitSlop={10}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={21}
                          color={theme.error}
                        />
                      </Pressable>
                    </View>
                  ) : null}

                  <Pressable
                    onPress={pickLogo}
                    android_ripple={{
                      color: theme.ripple,
                    }}
                    style={{
                      padding: 18,
                      borderWidth: 1,
                      borderStyle: "dashed",
                      borderColor: theme.borderStrong,
                      borderRadius: 11,
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Ionicons
                      name="cloud-upload-outline"
                      size={30}
                      color={theme.icon}
                    />

                    <Text
                      style={{
                        color: theme.text,
                        fontWeight: "700",
                      }}
                    >
                      {logoUri ? "Change logo" : "Choose logo"}
                    </Text>
                  </Pressable>

                  {logoUri ? (
                    <>
                      {renderSectionTitle("Logo customization")}

                      {renderNumberControl(
                        "Logo size (%)",
                        Math.round(logoSize * 100),
                        10,
                        60,
                        5,
                        (value) => setLogoSize(value / 100)
                      )}

                      {renderNumberControl(
                        "Logo margin",
                        logoMargin,
                        0,
                        10,
                        1,
                        setLogoMargin
                      )}

                      {renderNumberControl(
                        "Logo corner radius (%)",
                        Math.round(logoRadius * 100),
                        0,
                        100,
                        10,
                        (value) => setLogoRadius(value / 100)
                      )}

                      <Pressable
                        onPress={() =>
                          setHideDots((previous) => !previous)
                        }
                        style={{
                          paddingVertical: 14,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: theme.text,
                            fontWeight: "600",
                          }}
                        >
                          Hide dots behind logo
                        </Text>

                        <Ionicons
                          name={
                            hideDots
                              ? "checkbox"
                              : "square-outline"
                          }
                          size={21}
                          color={theme.icon}
                        />
                      </Pressable>
                    </>
                  ) : null}
                </View>
              ) : null}

              {/* RESET */}

              <Pressable
                onPress={resetCustomization}
                android_ripple={{
                  color: theme.ripple,
                }}
                style={{
                  padding: 14,
                  marginTop: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: theme.border,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  Reset all customization
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        ) : null}
      </View>

      {/* ==========================================
          CATEGORY FORM MODAL
      ========================================== */}

      <Modal
        visible={openModal}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => setOpenModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{
            flex: 1,
            backgroundColor: theme.background,
          }}
        >
          <View style={{ flex: 1, padding: 16 }}>
            {/* MODAL HEADER */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 14,
                borderBottomWidth: 1,
                borderColor: theme.border,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 19,
                    fontWeight: "700",
                  }}
                >
                  Generate QR Code
                </Text>

                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Category: {selectedCategory}
                </Text>
              </View>

              <Pressable
                hitSlop={15}
                onPress={() => setOpenModal(false)}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color={theme.iconSecondary}
                />
              </Pressable>
            </View>

            {/* DYNAMIC FORM */}

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 30,
              }}
            >
              {fields.map((field) => (
                <View
                  key={field.name}
                  style={{ marginTop: 18 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.text,
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      {field.label}
                    </Text>

                    {field.required ? (
                      <Text style={{ color: theme.error }}>
                        *
                      </Text>
                    ) : null}
                  </View>

                  <TextInput
                    value={values[field.name] || ""}
                    onChangeText={(value) =>
                      updateField(field.name, value)
                    }
                    placeholder={field.placeholder}
                    placeholderTextColor={
                      theme.inputPlaceholder
                    }
                    keyboardType={
                      field.type === "email"
                        ? "email-address"
                        : field.type === "tel"
                          ? "phone-pad"
                          : field.type === "number"
                            ? "decimal-pad"
                            : field.type === "url"
                              ? "url"
                              : "default"
                    }
                    secureTextEntry={
                      field.type === "password"
                    }
                    autoCapitalize={
                      field.type === "email" ||
                      field.type === "url"
                        ? "none"
                        : "sentences"
                    }
                    multiline={field.multiline}
                    textAlignVertical={
                      field.multiline ? "top" : "center"
                    }
                    style={{
                      minHeight: field.multiline ? 110 : 52,
                      paddingHorizontal: 13,
                      paddingVertical: 12,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: theme.inputBorder,
                      color: theme.inputText,
                      backgroundColor: theme.inputBackground,
                      fontSize: 14,
                    }}
                  />

                  {field.description ? (
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: 11,
                        marginTop: 5,
                      }}
                    >
                      {field.description}
                    </Text>
                  ) : null}
                </View>
              ))}

              {/* FORM ERROR */}

              {formError ? (
                <View
                  style={{
                    backgroundColor: theme.errorBackground,
                    padding: 12,
                    borderRadius: 9,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: theme.error,
                  }}
                >
                  <Text
                    style={{
                      color: theme.error,
                      fontSize: 13,
                    }}
                  >
                    {formError}
                  </Text>
                </View>
              ) : null}

              {/* GENERATE BUTTON */}

              <Pressable
                onPress={handleGenerate}
                android_ripple={{
                  color: theme.rippleStrong,
                }}
                style={{
                  backgroundColor: theme.buttonPrimary,
                  padding: 16,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 24,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 9,
                }}
              >
                <Ionicons
                  name="qr-code-outline"
                  size={20}
                  color={theme.buttonPrimaryText}
                />

                <Text
                  style={{
                    color: theme.buttonPrimaryText,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Generate QR Code
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
}