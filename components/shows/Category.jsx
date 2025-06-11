import { FlatList, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { clamp } from "../../utils/clamp";
import Card from "../Card";
import CustomText from "../CustomText";

const Category = ({ title, category }) => {
  return (
    <View style={styles.category}>
      <CustomText weight="bold" style={styles.title}>{title}</CustomText>
      <FlatList
        contentContainerStyle={styles.cards}
        data={category}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <Card type="shows" item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    marginVertical: "4%",
    marginHorizontal: "3%",
  },

  title: {
    fontSize: clamp(wp(5), 20, 30),
    marginBottom: "3%",
  },

  cards: {
    flexDirection: "row",
    gap: 25,
  },
});

export default Category;
