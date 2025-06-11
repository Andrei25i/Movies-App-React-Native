import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const MovieCard = ({ type, item }) => {
  const router = useRouter();

  const handlePress = () => {
    if (type === "movies") {
      router.push({ pathname: "/(tabs)/movies/[id]", params: { id: item.id } });
    } else if (type === "shows") {
      router.push({ pathname: "/(tabs)/shows/[id]", params: { id: item.id } });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        {item?.poster_path ? (
          <Image
            style={styles.cardImg}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            }}
          />
        ) : (
          <Image
            style={styles.cardImg}
            source={require("../assets/images/no-image.jpg")}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardImg: {
    width: screenWidth < 800 ? 120 : 180,
    height: screenWidth < 800 ? 180 : 250,
    borderRadius: 10,
  },
});

export default MovieCard;
