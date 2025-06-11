import ShowsIcon from "@/assets/icons/ShowsIcon";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LoadingSpinner from "../../../components/LoadingSpinner";
import SearchBar from "../../../components/SearchBar";
import Category from "../../../components/shows/Category";
import TrendingCarousel from "../../../components/TrendingCarousel";
import { options } from "../../../options";
import { clamp } from "../../../utils/clamp";
import { shuffleArray } from "../../../utils/shuffleArray";

const ShowsScreen = () => {
  const [top_rated, setTop_rated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [mystery, setMystery] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const topRatedRes = await fetch(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
          options
        );
        const topRatedData = await topRatedRes.json();
        setTop_rated(topRatedData.results);

        const trendingRes = await fetch(
          "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
          options
        );
        const trendingData = await trendingRes.json();
        setTrending(trendingData.results);

        const actionRes = await fetch(
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759",
          options
        );
        const actionData = await actionRes.json();
        setAction(shuffleArray(actionData.results));

        const animationRes = await fetch(
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16",
          options
        );
        const animationData = await animationRes.json();
        setAnimation(shuffleArray(animationData.results));

        const mysteryRes = await fetch(
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648",
          options
        );
        const mysteryData = await mysteryRes.json();
        setMystery(shuffleArray(mysteryData.results));

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10 }}>
        <ShowsIcon color="white" size={clamp(wp(10), 24, 45)} />
        <CustomText weight="bold" style={styles.title}>Shows</CustomText>
      </View>

      <SearchBar type="show" />

      <TrendingCarousel type="shows" items={trending.slice(0, 5)} />

      <Category title={"Top Rated"} category={top_rated} />
      <Category title={"Trending"} category={trending} />
      <Category title={"Action & Adventure"} category={action} />
      <Category title={"Animation"} category={animation} />
      <Category title={"Mystery"} category={mystery} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 10,
  },

  title: {
    fontSize: clamp(wp(5), 25, 35),
    color: "white",
    lineHeight: 25,
  },
});

export default ShowsScreen;
