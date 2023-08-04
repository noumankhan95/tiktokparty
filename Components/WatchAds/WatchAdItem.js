import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function WatchAdItem(props) {
  const { navigate } = useNavigation();
  return (
    <View style={styles.itemContainer}>
      <ImageBackground source={{ uri: props.source }} style={styles.imgStyle}>
        <View style={styles.overlay}>
          <View style={styles.name}>
            <Text style={styles.info}>{props.name}</Text>
          </View>
          <View style={styles.btninfoContainer}>
            <Text style={styles.info}>Earn 10 Coins</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigate("adscreen");
              }}
            >
              <Text style={styles.info}>Watch</Text>
              <Ionicons name="arrow-forward" color={"white"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 180,
    width: 380,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  imgStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "space-around",
    opacity: 0.89,
  },
  btninfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  info: {
    color: "white",
    fontSize: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    marginTop: 20,
    marginLeft: 10,
  },
});
