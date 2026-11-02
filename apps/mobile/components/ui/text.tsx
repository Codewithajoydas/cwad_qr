import { View, Text as RNText } from "react-native";
import type { TextStyle } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
export default function Text({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) {
  const theme = useTheme();
  return <RNText style={[{ color: theme.text }, style]}>{children}</RNText>;
}
