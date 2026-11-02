import { View, Text, StatusBar, useColorScheme } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import Animated, { FadeIn, FadeOut, ZoomIn } from "react-native-reanimated";
export default function Container({ children }: { children: React.ReactNode }) {
  const isDark = useColorScheme() === "dark";
  const theme = useTheme();
  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <Animated.View
          style={{ backgroundColor: theme.background, paddingInline: 15, flex: 1 }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          {children}
        </Animated.View>
      </SafeAreaView>
    </>
  );
}
