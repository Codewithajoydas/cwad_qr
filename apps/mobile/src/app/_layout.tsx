import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
