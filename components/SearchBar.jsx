import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SearchIcon from "../assets/icons/SearchIcon";
import { clamp } from "../utils/clamp";

const SearchBar = ({ type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  let searchPath;
  if (type === "movies")
    searchPath = `/(tabs)/movies/search/${encodeURIComponent(searchQuery)}`;
  else searchPath = `/(tabs)/shows/search/${encodeURIComponent(searchQuery)}`;

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push(searchPath);
    setSearchQuery('');
  };

  return (
    <View style={styles.search}>
      <SearchIcon size={20} />
      <TextInput
        style={styles.searchInput}
        placeholder={`${type === "movies" ? "Movie" : "Show"} name`}
        placeholderTextColor="#a2a2a2"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    padding: 15,
    width: "80%",
    maxWidth: 500,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 30,
    backgroundColor: "#333333",
    borderWidth: 2,
    borderColor: "#333333",
    borderRadius: 30,
  },

  searchInput: {
    width: "100%",
    height: 50,
    marginLeft: 15,
    fontSize: clamp(wp(4), 15, 20),
    color: "white",
  },
});

export default SearchBar;
