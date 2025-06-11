import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import BackButton from "../../../../components/BackButton";
import Card from '../../../../components/Card';
import CustomText from "../../../../components/CustomText";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import SearchBar from "../../../../components/SearchBar";
import TopButtons from "../../../../components/TopButtons";
import { options } from "../../../../options";
import { clamp } from "../../../../utils/clamp";

const SearchScreen = () => {
  const { query } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        );
        const resultsData = await res.json();
        setResults(resultsData.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  let message = "";
  if (results.length !== 0 && query) message = `Results for "${query}"`;
  else if (results.length == 0 && query) message = `No results for "${query}"`;
  else message = `No results. Try Again...`;

  if (loading) return <LoadingSpinner />

  return (
    <>
      <TopButtons>
        <BackButton />
      </TopButtons>

      <ScrollView
        style={{ backgroundColor: "#111" }}
        contentContainerStyle={{ paddingVertical: 70, paddingHorizontal: 10 }}
      >
        <SearchBar type="shows" />
        
        <CustomText weight="bold" style={styles.title}>{message}</CustomText>

        <View style={styles.container}>
          {results.map((result) => {
            if (result.poster_path)
                return <Card type="shows" key={result.id} item={result} />;
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#111",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    gap: 30,
  },

  title: {
    alignSelf: "center",
    marginBottom: 50,
    fontSize: clamp(wp(5), 20, 30),
  },
});

export default SearchScreen;
