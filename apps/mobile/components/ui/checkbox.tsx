import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import Text from "@/components/ui/text";

export default function CheckBox() {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);
  return (
    <Pressable
      hitSlop={20}
      style={[
        {
          width: 30,
          height: 30,
          borderColor: theme.border,
          justifyContent: "center",
          alignItems: "center",
          
        },
        styles.checkBox,
      ]}
      onPress={() => setChecked(!checked)}
    >
      {checked && <Ionicons name="checkbox" size={18} color={theme.text} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    borderWidth: 2,
    borderRadius: 5,
  },
});
