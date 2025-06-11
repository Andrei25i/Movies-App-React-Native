import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { clamp } from "../utils/clamp";
import CustomText from './CustomText';

const Overview = ({ details }) => {
  return (
    <CustomText weight='regular' style={styles.text}> {details.overview} </CustomText>
  )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "justify",
        fontSize: clamp(wp(2.5), 15, 25),
    }
})

export default Overview