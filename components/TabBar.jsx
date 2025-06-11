import { router, useSegments } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { clamp } from "../utils/clamp";
const { width: screenWidth } = Dimensions.get("window");

import MovieIcon from "../assets/icons/MovieIcon";
import ShowsIcon from "../assets/icons/ShowsIcon";
import WatchlistIcon from "../assets/icons/WatchlistIcon";

const TAB_ICONS = {
  movies: MovieIcon,
  shows: ShowsIcon,
  watchlist: WatchlistIcon,
};

const ICON_SIZE = screenWidth < 400 ? 24 : screenWidth < 600 ? 26 : 33;

export default function TabBar({
  state,
  descriptors,
  navigation,
}) {
  const segments = useSegments();

  return (
    <View style={styles.tabBar}>
      {state.routes
        .filter((route) =>
          ["movies", "shows", "watchlist"].includes(route.name)
        )
        .map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = state.index === index;
          const Icon = TAB_ICONS[route.name];

          const onPress = () => {
            const activeTab = route.name;
            const currentTab = segments[1];
            const isInTabIndex =
            currentTab === activeTab && segments.length === 2;
            if (currentTab === activeTab && !isInTabIndex) {
              router.replace(`/(tabs)/${activeTab}`);
            } else {
              navigation.navigate(activeTab);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tab]}
              activeOpacity={0.3}
            >
              {Icon && (
                <Icon
                  color={isFocused ? "white" : "#808080"}
                  size={ICON_SIZE}
                />
              )}

              <Text
                style={[
                  styles.label,
                  isFocused ? styles.tab_active : styles.tab_inactive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "gray",
    paddingVertical: 10,
  },
  tab: {
    borderRadius: 10,
    padding: "1%",
    alignItems: "center",
    gap: 7,
  },
  label: {
    fontSize: clamp(wp(2), 13, 20),
  },
  tab_active: {
    color: "white",
  },
  tab_inactive: {
    color: "#808080",
  },
});
