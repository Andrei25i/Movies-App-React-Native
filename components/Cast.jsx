import { Image, ScrollView, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { clamp } from "../utils/clamp";
import CustomText from "./CustomText";

const Cast = ({ cast }) => {
  return (
    <ScrollView
        style={{ minHeight: 200, maxHeight: 300
          }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.actorsContainer}
    >
      {cast.map((actor, index) => {
        return (
          <View style={styles.actor} key={index}>
            {actor.profile_path ? (
              <Image
                style={styles.actorImg}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${actor?.profile_path}`,
                }}
              />
            ) : (
              <Image
                style={styles.actorImg}
                source={require("../assets/images/no-image.jpg")}
                alt=""
              />
            )}
            <CustomText weight="bold" style={styles.name}>
              {actor.name}
            </CustomText>
            <CustomText weight="medium" style={styles.character}>
              {actor.character}
            </CustomText>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actorsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 20,
  },
  actor: {
    minWidth: 100,
    maxWidth: 100,
    alignItems: "center",
  },
  actorImg: {
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: 50,
  },
  name: {
    fontSize: clamp(wp(5), 12, 15),
    textAlign: "center",
  },
  character: {
    fontSize: clamp(wp(5), 10, 13),
    textAlign: "center",
  },
});

export default Cast;
