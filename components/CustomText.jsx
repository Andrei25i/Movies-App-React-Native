import { StyleSheet, Text } from "react-native";

export default function CustomText({
  weight = "regular",
  color = "white",
  style,
  children,
  ...props
}) {
  return (
    <Text
      {...props}
      style={[styles[weight] || styles.regular, style, (color = { color })]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Poppins_400Regular",
  },

  medium: {
    fontFamily: "Poppins_500Medium",
  },

  bold: {
    fontFamily: "Poppins_700Bold",
  },
});
