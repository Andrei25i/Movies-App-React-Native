import { useState } from "react";
import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const Trailer = ({ trailer }) => {
  const [playerReady, setPlayerReady] = useState(false);
  const { width: screenWidth } = useWindowDimensions();

  const containerPaddingHorizontal = 10;
  const maxWidth = 600;

  const availableWidth = screenWidth - containerPaddingHorizontal * 2;
  const videoWidth = Math.min(availableWidth, maxWidth);
  const videoHeight = (videoWidth * 9) / 16;

  return (
    <View>
      {!playerReady && (
        <ActivityIndicator
          color="white"
          size="large"
          style={{ alignSelf: "center", zIndex: 2 }}
        />
      )}

      <View style={{ width: videoWidth, alignSelf: "center" }}>
        <YoutubePlayer
          width={videoWidth}
          height={videoHeight}
          play={false}
          videoId={trailer.key}
          onReady={() => setPlayerReady(true)}
        />
      </View>
    </View>
  );
};

export default Trailer;
