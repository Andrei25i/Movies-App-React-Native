import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { clamp } from "../utils/clamp";
import CustomText from "./CustomText";

const Section = ({ title, children }) => {
  return (
    <View
      style={{ gap: 10, width: "100%", maxWidth: 600, alignSelf: "center" }}
    >
      {title && (
        <CustomText weight="bold" style={{ fontSize: clamp(wp(3), 20, 25) }}>
          {title}
        </CustomText>
      )}
      {children}
    </View>
  );
};

export default Section;
