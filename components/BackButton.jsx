import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import BackArrow from "../assets/icons/BackArrowIcon";
import { clamp } from "../utils/clamp";

const BackButton = () => {
  const router = useRouter();

  const prev = () => {
    setTimeout(() => {
      router.back();
    }, 100);
  };

  return (
    <Pressable
      onPress={prev}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <BackArrow size={clamp(wp(7), 30, 45)} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 8,
  },
  buttonPressed: {
    backgroundColor: "#222",
  },
});

export default BackButton;
