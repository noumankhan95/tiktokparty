import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
export default function Card(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.closeIcon}>
          {!props.dontshowclose && props.dontshowclose !== true && (
            <Entypo
              name="cross"
              color={"black"}
              size={30}
              onPress={props.closeCard}
            />
          )}
        </View>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardContainer: {
    backgroundColor: "white",
    width: "90%",
    // minHeight: 200,
    // maxHeight: 500,
    paddingVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  closeIcon: {
    width: "100%",
    marginBottom: 15,
  },
});
