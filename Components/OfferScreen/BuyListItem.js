import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function BuyListItem(props) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.opencard}>
      <ImageBackground
        source={{ uri: props.source }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          overflow: "hidden",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 20, padding: 5 }}>
            {props.text}
          </Text>
        </View>
        <View style={styles.InfoContainer}>
          <Text style={styles.info}>{props.coins} coins</Text>
          <Ionicons name="arrow-forward-circle" color={"white"} size={40} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 180,
    height: 150,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 15,
  },
  info: {
    color: "orange",
    fontSize: 25,
  },
  InfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
