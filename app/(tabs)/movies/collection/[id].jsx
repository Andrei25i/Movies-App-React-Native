import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import BackButton from "../../../../components/BackButton";
import Card from '../../../../components/Card';
import CustomText from "../../../../components/CustomText";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import TopButtons from "../../../../components/TopButtons";
import { options } from "../../../../options";
import { clamp } from "../../../../utils/clamp";

const CollectionDetails = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchCollection = async () => {
      try {
        const collectionRes = await fetch(
          `https://api.themoviedb.org/3/collection/${id}?language=en-US`,
          options
        );
        const collectionData = await collectionRes.json();
        if (collectionData.success === false) {
          setLoading(false);
          return;
        }

        setDetails(collectionData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <TopButtons>
        <BackButton/>
      </TopButtons>

      <ScrollView
        style={{ backgroundColor: "#111" }}
        contentContainerStyle={{ paddingVertical: 70, paddingHorizontal: 10 }}
      >
        <CustomText weight="bold" color="white" style={styles.title}>
          {details.name}
        </CustomText>
        <View style={styles.container}>
          {details.parts &&
            details.parts.map((item, index) => (
              <Card type="movies" key={item.id} item={item} />
            ))}
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

export default CollectionDetails;
