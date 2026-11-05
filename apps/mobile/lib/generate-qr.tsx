import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  CornerOptions,
  DotStyle,
  NativeLogoOptions,
  QRCode,
  QROptions,
} from "@ttsalpha/qrcode/native";


type Props = {
  value: string;
  size: number;
  margin: number;
  dotStyle: DotStyle;
  dotColor: string;
  backgroundColor: string;
  corner: CornerOptions;
  logo: NativeLogoOptions;
  qr: QROptions;
};

export default function generateQR({
  value,
  size,
  margin,
  dotStyle,
  dotColor,
  backgroundColor,
  corner,
  logo,
  qr,
}: Props) {
  return (
    <QRCode
      value={value}
      size={size}
      margin={margin}
      dotStyle={dotStyle}
      dotColor={dotColor}
      backgroundColor={backgroundColor}
      corner={{
        
      }}
      logo={{

      }}
      qr={qr}
    />
  );
}
