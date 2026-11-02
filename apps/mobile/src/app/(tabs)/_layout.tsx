import BottomTab from "@/components/layout/bottom-bar";
import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";
import { View } from "react-native";
export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      tabBar={(props) => <BottomTab {...props} />}
      screenOptions={{
        sceneStyle: { backgroundColor: theme.background },
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.background, borderTopWidth: 0, elevation: 0 },
      }}
    >
      <Tabs.Screen name="generator" options={{ title: "Generator" }} />
      <Tabs.Screen name="scanner" options={{ title: "Scanner" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="downloads" options={{ title: "Downloads" }} />
    </Tabs>
  );
}
