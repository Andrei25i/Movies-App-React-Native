import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomText from "../components/CustomText";
import { clamp } from "../utils/clamp";
import Hero from "./Hero";

const TrendingCarousel = ({ type, items }) => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const pan = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        setCurrent((prev) => (prev - 1 + items.length) % items.length);
      } else if (gestureState.dx < -50) {
        setCurrent((prev) => (prev + 1) % items.length);
      }
    },
  });

  useEffect(() => {
    if (!items || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [items, current]);

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.carouselContainer}>
      <CustomText weight="bold" style={styles.title}>
        Featured
      </CustomText>

      <View {...panResponder.panHandlers}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `${type}/[id]`,
              params: { id: items[current].id },
            })
          }
        >
          <Hero details={items[current]} />
        </TouchableOpacity>
      </View>

      <View style={styles.carouselDotsContainer}>
        {items.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrent(index);
            }}
            style={[
              styles.carouselDot,
              current === index && styles.carouselActiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: clamp(wp(5), 20, 30),
  },

  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: "5%",
    marginBottom: "10%"
  },

  carouselDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "2%",
    marginTop: "2nn%"
  },

  carouselDot: {
    width: clamp(wp(4), 15, 20),
    height: clamp(wp(4), 15, 20),
    borderRadius: "50%",
    backgroundColor: "white",
    marginHorizontal: 10,
  },

  carouselActiveDot: {
    backgroundColor: "#525252",
  },
});

export default TrendingCarousel;
