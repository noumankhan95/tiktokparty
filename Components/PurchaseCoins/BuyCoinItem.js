import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function BuyCoinItem(props) {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={props.openCard.bind(null, props.id)}
    >
      <Text style={styles.coinText}>{props.coins} Coins</Text>
      <FontAwesome5 name="coins" size={60} color={"orange"} />
      <View style={styles.buyButton}>
        <Text style={styles.buyButtonText}>${props.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 200,
    width: 180,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
  },
  buyButton: {
    backgroundColor: "black",
    width: "100%",
    padding: 10,
  },
  buyButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  coinText: {
    fontSize: 30,
  },
});
