import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { clamp } from "react-native-reanimated";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import CollectionIcon from "../../assets/icons/CollectionIcon";
import CustomText from "../CustomText";

const Collection = ({ title, id }) => {
  const router = useRouter();

  const handlePress = () => {
    setTimeout(() => {
      router.push({ pathname: "movies/collection/[id]", params: { id } });
    }, 100);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.collectionCointainer,
        pressed && styles.collectionCointainerPressed,
      ]}
      onPress={handlePress}
    >
      <CustomText weight="bold" style={styles.collectionTitle}>
        Check The Entire {title}
      </CustomText>
      <CollectionIcon size={clamp(wp(5), 30, 40)} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  collectionCointainer: {
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "transparent"
  },

  collectionTitle: {
    textAlign: "center",
    fontSize: clamp(wp(4), 15, 25)
  },

  collectionCointainerPressed: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#333"
  },

});

export default Collection;
