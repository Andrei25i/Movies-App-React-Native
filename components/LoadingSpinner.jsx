import { ActivityIndicator, View } from "react-native";

export default function LoadingSpinner({ color = "white", size = 64, style }) {
  return (
    <View style={[{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }, style]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}