import { useColorScheme } from "react-native";
import { theme } from "../constants/Theme";

export const useTheme = () => {
  const currentTheme = useColorScheme() === "dark" ? "dark" : "light";
  return theme[currentTheme];
};
