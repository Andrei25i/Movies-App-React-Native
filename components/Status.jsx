import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { clamp } from "../utils/clamp";
import CustomText from "./CustomText";

const Status = ({ details }) => {
  let release_date;
  if (details.release_date) release_date = details.release_date;
  else if (details.first_air_date) release_date = details.first_air_date
  else release_date = "TBD";

  return (
    <View style={styles.statusContainer}>
        <View style={styles.statusContainerView}>
          <CustomText weight="bold" style={{ fontSize: clamp(wp(3), 20, 25) }}>
            Status
          </CustomText>
          <View style={styles.highlighted}>
            <CustomText
              weight="bold"
              style={{ fontSize: clamp(wp(3), 10, 15) }}
            >
              {details.status}
            </CustomText>
          </View>
        </View>

        <View style={styles.statusContainerView}>
          <CustomText weight="bold" style={{ fontSize: clamp(wp(3), 20, 25) }}>
            Release Date
          </CustomText>
          <View style={styles.highlighted}>
            <CustomText
              weight="bold"
              style={{ fontSize: clamp(wp(3), 10, 15) }}
            >
              {release_date}
            </CustomText>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    gap: "20%",
    maxWidth: 600
  },

  statusContainerView: {
    alignItems: "center",
  },

  highlighted: {
    backgroundColor: "#525252",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
});

export default Status;
