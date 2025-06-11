import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { DeviceEventEmitter, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import Card from '../../../components/Card';
import CustomText from "../../../components/CustomText";
import TopButtons from "../../../components/TopButtons";
import { clamp } from "../../../utils/clamp";

const WatchlistScreen = () => {
  const [watchlist, setWatchlist] = useState([]);

  const getData = async () => {
    try {
      const raw = await AsyncStorage.getItem("watchlist");
      const saved = raw ? JSON.parse(raw) : [];

      setWatchlist(saved);
    } catch (err) {
      console.error("Error reading with AsyncStorage: ", err);
      setWatchlist([]);
    }
  };

  const handleDelete = async () => {
    setWatchlist([]);
    await AsyncStorage.setItem("watchlist", JSON.stringify([]));
    DeviceEventEmitter.emit("watchlistChanged");
  }

  useEffect(() => {
    getData();

    const subscription = DeviceEventEmitter.addListener(
      "watchlistChanged",
      getData
    );

    return () => subscription.remove();
  }, []);

  let message = "";
  if (watchlist.length !== 0) message = `Watchlist`;
  else if (watchlist.length == 0) message = `No items in watchlist...`;
  else message = `No items in watchlist...`;

  return (
    <>
      <TopButtons>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <DeleteIcon size={clamp(wp(7), 30, 45)} />
        </Pressable>
      </TopButtons>

      <ScrollView
        style={{ backgroundColor: "#111" }}
        contentContainerStyle={{ paddingVertical: 70, paddingHorizontal: 10 }}
      >
        <CustomText weight="bold" style={styles.title}>
          {message}
        </CustomText>

        <View style={styles.container}>
          {watchlist.map((item, index) => 
            {
              if (item.type === "movies")
                return <Card type="movies" item={item} key={item.id} />
              else
                return <Card type="shows" item={item} key={item.id} />
            }
          )}
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
    marginVertical: 50,
    fontSize: clamp(wp(5), 20, 30),
  },

  button: {
    borderRadius: 50,
    padding: 8,
  },

  buttonPressed: {
    backgroundColor: "#222",
  },
});

export default WatchlistScreen;
