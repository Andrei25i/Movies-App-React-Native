import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import StarIcon from '../assets/icons/StarIcon';
import { clamp } from '../utils/clamp';
import CustomText from './CustomText';

const Genres = ({ details }) => {
  return (
    <View style={styles.genres_rating}>
        <View style={styles.genresContainer}>
            <CustomText weight="bold" style={{ fontSize: clamp(wp(3), 20, 25) }}>
                Genres
            </CustomText>
            <View style={styles.genres}>
                {
                    details.genres && details.genres.map((genre, index) => {
                        return <View style={styles.highlighted} key={index}>
                            <CustomText weight='bold' style={{fontSize: clamp(wp(3), 10, 15)}}>{genre.name}</CustomText>
                        </View>
                    })
                }
            </View>
        </View>

        <View style={styles.stars}>
            <StarIcon size={30} />
            <CustomText style={{textAlign: "center"}}>
                <CustomText weight='bold'>{details.vote_average && details.vote_average.toFixed(1)}</CustomText><Text style={styles.darker}>/10{"\n"}</Text>
                <Text style={styles.darker}>{details.vote_count && details.vote_count} votes</Text> 
            </CustomText>
        </View>
    </View>            
  )
}

const styles = StyleSheet.create({
    genres_rating: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 15,
        alignItems: "center",
    
    },
    genresContainer: {
        alignItems: "center",
        gap: 16
    },
    genres: {
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: 200,
        justifyContent: "center",
        gap: 10
    },
    highlighted: {
        backgroundColor: "#525252",
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 5,
    },
    stars: {
        minWidth: 100,
        alignItems: "center",
        gap: 16
    },
    darker: {
        color: "#808080",
        fontSize: 10,
        fontFamily: "Poppins_700Bold",
    }
})

export default Genres