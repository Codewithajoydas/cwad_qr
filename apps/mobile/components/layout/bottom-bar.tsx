import { View, Pressable } from "react-native";
import React from "react";
import { BottomTabBarProps, BottomTabViewState } from "expo-router/build/layouts/TabsClient.js";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import {
  BottomTabDescriptor,
  BottomTabDescriptorMap,
  BottomTabViewRoute,
} from "expo-router/build/react-navigation/bottom-tabs/types.js";
type iconsName = React.ComponentProps<typeof Ionicons>["name"];
type iconTypes = {
  label: string;
  icon: iconsName;
};

type AnimatedButtonProps = {
  state: BottomTabViewState;
  index: number;
  descriptors: BottomTabDescriptorMap;
  navigateToTab: (routeKey: string) => void;
  route: BottomTabViewRoute;
  theme: any;
};
const AnimatedButton = ({
  state,
  index,
  descriptors,
  navigateToTab,
  theme,
  route,
}: AnimatedButtonProps) => {
  const scale = useSharedValue(1);
  const handlePressIn = () => {
    scale.value = withSpring(0.8);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const inactiveIcons: iconTypes[] = [
    {
      label: "generator",
      icon: "pulse-outline",
    },
    {
      label: "scanner",
      icon: "scan-circle-outline",
    },
    {
      label: "history",
      icon: "time-outline",
    },
    {
      label: "downloads",
      icon: "download-outline",
    },
  ];
  const activeIcons: iconTypes[] = [
    {
      label: "generator",
      icon: "pulse",
    },
    {
      label: "scanner",
      icon: "scan-circle",
    },
    {
      label: "history",
      icon: "time",
    },
    {
      label: "downloads",
      icon: "download",
    },
  ];
  return (
    <Pressable
      key={route.name}
      onPress={() => {
        handlePressIn();
        navigateToTab(route.key);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      onPressOut={() => handlePressOut()}
      style={[{ alignItems: "center" }]}
      hitSlop={12}
    >
      <Animated.View
        style={[
          {
            backgroundColor:
              state.index === index ? theme.surfaceElevated : theme.backgroundSecondary,
            paddingInline: 20,
            paddingBlock: 5,
            borderRadius: 100,
          },
          animatedStyle,
        ]}
      >
        <Ionicons
          name={state.index === index ? activeIcons[index].icon : inactiveIcons[index].icon}
          size={24}
          color={theme.text}
        />
      </Animated.View>
      <Text style={{ fontSize: 12 }}>{descriptors[route.key].options.title || route.name}</Text>
    </Pressable>
  );
};

export default function BottomTab({
  descriptors,
  insets,
  navigateToTab,
  state,
}: BottomTabBarProps) {
  const inset = insets.bottom;
  const theme = useTheme();
  const scale = useSharedValue(1);
  const handlePressIn = () => {
    scale.value = withSpring(0.8);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const inactiveIcons: iconTypes[] = [
    {
      label: "generator",
      icon: "pulse-outline",
    },
    {
      label: "scanner",
      icon: "scan-circle-outline",
    },
    {
      label: "history",
      icon: "time-outline",
    },
    {
      label: "downloads",
      icon: "download-outline",
    },
  ];
  const activeIcons: iconTypes[] = [
    {
      label: "generator",
      icon: "pulse",
    },
    {
      label: "scanner",
      icon: "scan-circle",
    },
    {
      label: "history",
      icon: "time",
    },
    {
      label: "downloads",
      icon: "download",
    },
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.backgroundSecondary,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: inset + 10,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderWidth: 1,
        borderColor: theme.border,
        borderBottomWidth: 0,
      }}
    >
      {state.routes.map((route, index) => {
        return (
          <AnimatedButton
            descriptors={descriptors}
            index={index}
            navigateToTab={navigateToTab}
            route={route}
            state={state}
            theme={theme}
            key={index}
          />
        );
      })}
    </View>
  );
}
