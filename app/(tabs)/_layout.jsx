import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../../components/TabBar";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Tabs
          initialRouteName="movies"
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tabs.Screen name="movies" options={{ title: "Movies" }} />
          <Tabs.Screen name="shows" options={{ title: "Shows" }} />
          <Tabs.Screen name="watchlist" options={{ title: "Watchlist" }} />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});