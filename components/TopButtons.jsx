import { StyleSheet, View } from "react-native";

const TopButtons = ({ children }) => {
  return (
    <View style={styles.buttonsHeader}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    backgroundColor: "#111",
    width: "100%",
    height: "9%",
  },
});

export default TopButtons;
