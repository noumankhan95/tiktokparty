import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../Card/Card";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { arrayUnion, doc, setDoc, Timestamp } from "firebase/firestore";
import { DeductCoins } from "../../reducers/authslice";
import { ActivityIndicator, Alert } from "react-native";
import { useCallback } from "react";
import { CreateOrder } from "../../reducers/Orderslice";
export default function BuyWithCoins(props) {
  const [step, setstep] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const [placingOrder, setisplacingOrder] = useState(false);
  const item = props.buyItem;
  const dispatch = useDispatch();
  const forwardStep = useCallback((i = 1) => {
    setstep((p) => p + i);
  }, []);
  const placeorderHandler = useCallback(async () => {
    if (user.coins >= item.price) {
      try {
        setisplacingOrder((p) => true);
        await dispatch(
          DeductCoins({ uid: user.uid, coins: item.price })
        ).unwrap();
        await dispatch(
          CreateOrder({ item, email: user.email, uid: user.uid })
        ).unwrap();

        forwardStep();
      } catch (e) {
        console.log(e);

        forwardStep(2);
      } finally {
        setisplacingOrder((p) => false);
      }
    } else {
      Alert.alert("Error", "Not Enough Coins");
    }
  }, []);

  const showAccordingtoStepForBuyWithCoins = useCallback(() => {
    switch (step) {
      case 0:
        return (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                borderBottomWidth: 0.8,
                borderBottomColor: "grey",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {props.buyItem && props.buyItem.item}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                PRICE:{props.buyItem && props.buyItem.price} coins
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                paddingHorizontal: 20,
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                TOTAL COINS {props.buyItem && props.buyItem.price}
              </Text>
            </View>
            <Text>
              Please Make Sure You Have The Required Amount of coins for the
              purchase
            </Text>
            <TouchableOpacity
              style={styles.Buybutton}
              onPress={placeorderHandler}
              // disabled={user.coins < props.buyItem.price}
            >
              <Text style={styles.buyText}>Place Order</Text>
            </TouchableOpacity>
            {user.coins < props.buyItem.price && (
              <Text>"You Dont Have Enough Coins To Place This Order"</Text>
            )}
          </View>
        );
      case 1:
        return (
          <View
            style={[
              styles.container,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <AntDesign name="check" size={64} color="black" />
            <Text style={styles.text}>Success</Text>
          </View>
        );
      case 2:
        return (
          <View
            style={[
              styles.container,
              { justifyContent: "space-evenly", alignItems: "center" },
            ]}
          >
            <MaterialIcons name="error" size={64} color="black" />
            <Text style={[styles.text, { color: "red" }]}>
              An Error Occured
            </Text>
          </View>
        );
    }
  }, [step]);

  return (
    <Card closeCard={props.closeCard}>
      {placingOrder ? (
        <>
          <Text>Placing Your Order Please Wait a Moment</Text>
          <ActivityIndicator size={70} style={{ marginTop: 10 }} />
        </>
      ) : (
        showAccordingtoStepForBuyWithCoins()
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    // height: "100%",
    paddingHorizontal: 4,
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 30,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 0.6,
    borderColor: "gray",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  textInput: {
    width: "86%",
    height: "100%",
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
    fontSize: 20,
  },
  DateContainer: {
    width: "100%",
    height: 40,
  },
  DatetextInput: {
    width: "20%",
    height: "100%",
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
    fontSize: 20,
  },
  Buybutton: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 5,
    marginVertical: 10,
  },
  buyText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
