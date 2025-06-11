import MovieIcon from "@/assets/icons/MovieIcon";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import LoadingSpinner from '../../../components/LoadingSpinner';
import Category from "../../../components/movies/Category";
import SearchBar from "../../../components/SearchBar";
import TrendingCarousel from "../../../components/TrendingCarousel";
import { options } from "../../../options";
import { clamp } from "../../../utils/clamp";
import { shuffleArray } from "../../../utils/shuffleArray";

const MoviesScreen = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [drama, setDrama] = useState([]);
  const [family, setFamily] = useState([]);
  const [horror, setHorror] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [sf, setSf] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [war, setWar] = useState([]);
  const [top_rated, setTop_rated] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const nowPlayingRes = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const nowPlayingData = await nowPlayingRes.json();
        setNowPlaying(shuffleArray(nowPlayingData.results));

        const trendingRes = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          options
        );
        const trendingData = await trendingRes.json();
        setTrending(trendingData.results);

        const actionRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=28",
          options
        );
        const actionData = await actionRes.json();
        setAction(shuffleArray(actionData.results));

        const adventureRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=12",
          options
        );
        const adventureData = await adventureRes.json();
        setAdventure(shuffleArray(adventureData.results));

        const animationRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=16",
          options
        );
        const animationData = await animationRes.json();
        setAnimation(shuffleArray(animationData.results));

        const comedyRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=35",
          options
        );
        const comedyData = await comedyRes.json();
        setComedy(shuffleArray(comedyData.results));

        const dramaRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=18",
          options
        );
        const dramaData = await dramaRes.json();
        setDrama(shuffleArray(dramaData.results));

        const familyRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=10751",
          options
        );
        const familyData = await familyRes.json();
        setFamily(shuffleArray(familyData.results));

        const horrorRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=27",
          options
        );
        const horrorData = await horrorRes.json();
        setHorror(shuffleArray(horrorData.results));

        const mysteryRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=9648",
          options
        );
        const mysteryData = await mysteryRes.json();
        setMystery(shuffleArray(mysteryData.results));

        const sfRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=878",
          options
        );
        const sfData = await sfRes.json();
        setSf(shuffleArray(sfData.results));

        const thrillerRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=53",
          options
        );
        const thrillerData = await thrillerRes.json();
        setThriller(shuffleArray(thrillerData.results));

        const warRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&with_genres=10752",
          options
        );
        const warData = await warRes.json();
        setWar(shuffleArray(warData.results));

        const topRatedRes = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          options
        );
        const topRatedData = await topRatedRes.json();
        setTop_rated(topRatedData.results);

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10 }}>
        <MovieIcon color="white" size={clamp(wp(10), 24, 45)} />
        <CustomText weight="bold" style={styles.title}> Movies </CustomText>
      </View>

      <SearchBar type="movies" />

      <TrendingCarousel type="movies" items={trending.slice(0, 5)} />

      <Category title={"Now In Theaters"} category={nowPlaying} />
      <Category title={"Trending"} category={trending} />
      <Category title={"Action"} category={action} />
      <Category title={"Adventure"} category={adventure} />
      <Category title={"Animation"} category={animation} />
      <Category title={"Comedy"} category={comedy} />
      <Category title={"Drama"} category={drama} />
      <Category title={"Family"} category={family} />
      <Category title={"Horror"} category={horror} />
      <Category title={"Mystery"} category={mystery} />
      <Category title={"Science Fiction"} category={sf} />
      <Category title={"Thriller"} category={thriller} />
      <Category title={"War"} category={war} />
      <Category title={"Top Rated"} category={top_rated} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#111", 
    padding: 10 
  },
    
  title: {
    fontSize: clamp(wp(5), 25, 35),
    color: "white",
    lineHeight: 25,
  },
});

export default MoviesScreen;
