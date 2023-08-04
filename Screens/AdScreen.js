import { View, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { DeductCoins, AddCoins } from "../reducers/authslice";
import { Alert } from "react-native";
import { useCallback } from "react";
export default function AdScreen() {
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handlePlaybackStatusUpdate = useCallback((playbackStatus) => {
    const { durationMillis, positionMillis } = playbackStatus;

    // Check if the video has been playing for at least 10 seconds
    if (durationMillis && positionMillis >= 2000 && !hasWatchedVideo) {
      setHasWatchedVideo(true);
      console.log("User has watched video for at least 10 seconds.");
    }
  }, []);
  const backtoAdPageHandler = useCallback(() => {
    if (hasWatchedVideo) {
      dispatch(AddCoins({ uid: user.uid, coins: 10 }))
        .unwrap()
        .then((result) => {
          console.log("Going back");
          Alert.alert("You Have Been Rewarded 10 coins");
          goBack();
        })
        .catch((e) => {
          Alert.alert("You Have Been Rewarded 10 coins");
          goBack();
        });
    }
  }, [hasWatchedVideo, goBack]);
  return (
    <View style={styles.container}>
      {hasWatchedVideo && (
        <View
          style={{
            position: "absolute",
            zIndex: 400,
            top: 30,
            left: 4,
          }}
        >
          <Entypo
            name="circle-with-cross"
            size={34}
            color="black"
            onPress={backtoAdPageHandler}
          />
        </View>
      )}
      <Video
        source={require("../assets/ad2.mp4")}
        style={styles.video}
        shouldPlay
        rate={1.0}
        volume={1.0}
        isMuted={false}
        onError={(error) => console.log(error)}
        resizeMode="cover"
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    zIndex: 1,
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
