import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
export default function Myorders() {
  const orders = useSelector((state) => state.order);
  console.log(orders);
  if (!orders.userOrders)
    return (
      <View style={styles.container}>
        <Text>You Havent Placed Any Orders Yet</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 30 }}>All My Orders</Text>
      <FlatList
        data={orders.userOrders}
        key={(item) => item.id}
        renderItem={({ item }) => <OrderItem {...item} />}
      />
    </View>
  );
}
const OrderItem = (props) => {
  console.log(props);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // to use 24-hour format
  };
  return (
    <View style={styles.orderItem}>
      <Text>{parseInt(props.id) + 1}.</Text>
      <View style={styles.inner}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50%",
          }}
        >
          <View style={{ width: "50%" }}>
            <FontAwesome5
              name={props.item.includes("coins") ? "coins" : "tiktok"}
              size={30}
              color={"orange"}
            />
          </View>
          <View style={{ width: "50%" }}>
            <Text style={styles.textdata}>{props.item}</Text>
          </View>
        </View>

        <View>
          <Text style={[styles.textdata, { color: "orange" }]}>
            {props.price} {props.item.includes("coins") ? "$" : "coins"}
          </Text>
          <Text>
            {new Date(props.time).toLocaleDateString("en-GB", options)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { padding: 4 },
  orderItem: {
    // backgroundColor: "red",
    width: "100%",
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 10,
    marginVertical: 7,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    // backgroundColor: "red",
    alignItems: "center",
  },
  textdata: { fontSize: 16, fontWeight: "700" },
});
