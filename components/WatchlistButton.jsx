import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { DeviceEventEmitter, Pressable, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import BookmarkAddedIcon from "../assets/icons/BookmarkAddedIcon";
import BookmarkAddIcon from "../assets/icons/BookmarkAddIcon";
import { clamp } from "../utils/clamp";

const WatchlistButton = ({ details, type }) => {
  const { id } = useLocalSearchParams();
  const [added, setAdded] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const getData = async () => {
    try {
      const raw = await AsyncStorage.getItem("watchlist");
      const saved = raw ? JSON.parse(raw) : [];

      setWatchlist(saved);
      setAdded(saved.some((item) => item.id === id));
    } catch (err) {
      console.error("Error reading with AsyncStorage: ", err);
      setWatchlist([]);
      setAdded(false);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("watchlist", JSON.stringify(value));
    } catch (err) {
      console.err("Error saving with AsyncStorage: ", err);
    }
  };

  useEffect(() => {
    const getWatchlist = async () => {
      await getData();
    };

    getWatchlist();

    const subscription = DeviceEventEmitter.addListener("watchlistChanged", getWatchlist);
    return () => subscription.remove();
  }, []);

  const handlePress = () => {
    if (!added) {
      const newWatchlist = [
        ...watchlist,
        {
          id,
          title: details.title || details.name,
          poster_path: details.poster_path,
          type
        },
      ];
      setWatchlist(newWatchlist);
      storeData(newWatchlist);
      setAdded(true);
      DeviceEventEmitter.emit("watchlistChanged");
    } else {
      const newWatchlist = watchlist.filter((item) => item.id !== id);
      setWatchlist(newWatchlist);
      storeData(newWatchlist);
      setAdded(false);
      DeviceEventEmitter.emit("watchlistChanged");
    }
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      {!added ? (
        <BookmarkAddIcon size={clamp(wp(7), 30, 45)} />
      ) : (
        <BookmarkAddedIcon size={clamp(wp(7), 30, 45)} />
      )}
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

export default WatchlistButton;
