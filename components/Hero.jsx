import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { clamp } from "../utils/clamp";
import { formatTime } from "../utils/formatTime";
import CustomText from "./CustomText";
const { width: screenWidth } = Dimensions.get("window");

const Hero = ({type, details, ageRating }) => {
  let title = details.title || details.name;
  let releaseYear = details.release_date && details.release_date.slice(0, 4) || details.first_air_date && details.first_air_date.slice(0, 4);
  let runtime = formatTime(details.runtime);

  if (type === "shows" && !runtime) {
    if (details.number_of_seasons > 1)
      runtime = details.number_of_seasons + " seasons";
    else
      runtime = details.number_of_seasons + " season";
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <View style={styles.hero}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w1280/${details?.backdrop_path}`,
        }}
        style={styles.img}
        alt="Backdrop"
        onLoadEnd={() => setImageLoaded(true)}
      />

      {imageLoaded && (
        <View style={styles.title}>
          <CustomText weight="bold" style={[styles.titleText, styles.shadow]}>{title}</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <CustomText weight="medium" style={[styles.infoText, styles.shadow]}>{releaseYear}</CustomText>
            <CustomText weight="medium" style={[styles.infoText, styles.shadow]}>{runtime}</CustomText>
            {ageRating ? (
              <View style={styles.ageTextBox}>
                <CustomText weight="bold" style={styles.infoText}>{ageRating}</CustomText>
              </View>
            ) : undefined}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    position: "relative",
    alignSelf: "center",
    width: wp(95),
    maxWidth: 600,
    height: hp(30),
    maxHeight: screenWidth < 800 ? 200 : 300
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingVertical: 15,
    paddingHorizontal: 30,
    gap: 5,
  },

  titleText: {  
    textAlign: "left",
    fontSize: clamp(wp(4), 18, 30),
  },

  infoText: {
    fontSize: clamp(wp(2), 10, 15),
  },

  ageTextBox: {
    backgroundColor: "#525252",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 5,
  },

  shadow: {
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 12,
  }
});

export default Hero;
