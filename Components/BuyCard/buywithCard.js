import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "../Card/Card";
import { useCallback } from "react";
import { AddCoins } from "../../reducers/authslice";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { CreateOrder } from "../../reducers/Orderslice";
import { useConfirmPayment, CardField } from "@stripe/stripe-react-native";
export default function BuyWithCard(props) {
  const user = useSelector((state) => state.auth.user);
  const isloading = useSelector((state) => state.auth.isloading);
  const [step, setstep] = useState(0);
  const [scardn, setscardn] = useState("");
  const [ccnum, setcc] = useState("");
  const [cvcerror, setcvcerror] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const forwardStep = useCallback((i = 1) => {
    setstep((p) => p + i);
  }, []);
  const creditCards = useSelector((state) => state.payment.cards);
  let cardExists = useSelector((state) => state.payment.cardExists);
  const dcard = useSelector((state) => state.payment.defaultCard);
  let cardnum = [];
  const dispatch = useDispatch();
  const [cardDetails, setcardDetails] = useState(false);
  const [cardDisable, setcardDisable] = useState(false);
  const cnum = useCallback(() => {
    let i = 0;
    for (const char of creditCards[0].cardnumber) {
      if (i === 4 || i === 9 || i === 13) {
        cardnum.push(" ");
      } else if (i < creditCards[0].cardnumber.length - 4) {
        cardnum.push("*");
      } else {
        cardnum.push(char);
      }
      i++;
    }
    setscardn((p) => cardnum);
  }, []);

  useEffect(() => {
    if (cardExists) cnum();
  }, []);
  const buyItem = props.buyItem;
  const updateCvcHandler = useCallback((text) => {
    setcc(text);
  }, []);
  const getFetchstrtoken = useCallback(async () => {
    try {
      console.log("sending", isloading);
      const res = await fetch(
        "https://us-central1-tiktoksmapp-3c650.cloudfunctions.net/stripeEndpoint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: buyItem.price }),
        }
      );
      if (!res.ok)
        return Alert.alert("Internal Server Error", "Please Try Again");
      const { client_secret, error } = await res.json();
      if (error) console.log("error in here", error);
      return { client_secret, error };
    } catch (e) {
      console.log("here", e);
    }
  }, [buyItem, isloading]);

  const buyWithCardHandler = useCallback(async () => {
    try {
      setcardDisable((p) => true);
      if (!cardDetails)
        return Alert.alert(
          "Error",
          "Please Enter Correct And Complete Details"
        );
      const { client_secret, error } = await getFetchstrtoken();
      if (error) {
        console.log("error:<", error);
        forwardStep(2);
        return;
      }
      const { paymentIntent, error: er } = await confirmPayment(client_secret, {
        paymentMethodType: "Card",
        paymentMethodData: { accountNumber: "", cvc: "" },
      });

      // console.log("er", er);
      if (er) {
        Alert.alert(
          "Internal Error",
          // "Please Make Sure You Have Enough Funds."
          er.message
        );
        console.log("er", er);
        forwardStep(2);
        return;
      }
      console.log("done", paymentIntent);

      if (paymentIntent) {
        console.log("done", paymentIntent);
        const result = await dispatch(
          AddCoins({ uid: user.uid, coins: buyItem.item })
        ).unwrap();
        console.log("before Placing Order", {
          item: buyItem.item,
          price: buyItem.price,
        });
        await dispatch(
          CreateOrder({
            item: { item: buyItem.item, price: buyItem.price },
            email: user.email,
            uid: user.uid,
          })
        ).unwrap();
        forwardStep();
      }

      setcc("");
    } catch (e) {
      console.log("this error" + e);
      forwardStep(2);
    } finally {
      setcardDisable((p) => false);
    }
  }, [ccnum, buyItem, cvcerror, cardDetails, cardDisable]);
  console.log("loading", loading);
  const showAccordingtoStepForCardBuyWithCard = useCallback(() => {
    switch (step) {
      case 0:
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
              {/* <FontAwesome5 name="wallet" size={30} color="black" />
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: 22,
                  letterSpacing: 3.5,
                  marginLeft: 30,
                }}
              >
                {scardn}
              </Text> */}
              <CardField
                postalCodeEnabled={false}
                onCardChange={(details) => {
                  console.log(details);
                  if (details.complete) setcardDetails(details);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                placeholders={{ number: "4242 4242 4242 4242" }}
              />
            </TouchableOpacity>
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
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {props.buyItem && props.buyItem.item}
              </Text>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                ${props.buyItem && props.buyItem.price}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
                marginVertical: 5,
              }}
            >
              <View style={{ backgroundColor: "red" }}>
                {/* <CardField
                  postalCodeEnabled={false}
                  onCardChange={(details) => {
                    console.log(details);
                  }}
                  style={{
                    borderBottomWidth: 0.6,

                    marginVertical: 10,
                    padding: 10,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                /> */}
                {/* <TextInput
                  placeholder="Enter CVC"
                  style={{
                    borderBottomWidth: 0.6,
                    borderBottomColor: "grey",
                    marginVertical: 10,
                    padding: 10,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                  maxLength={3}
                  keyboardType="numeric"
                  onChangeText={updateCvcHandler}
                />
                {cvcerror && <Text style={{ color: "red" }}>{cvcerror}</Text>} */}
              </View>

              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                TOTAL ${props.buyItem && props.buyItem.price}
              </Text>
            </View>

            <Text>
              This is Buy Card By Clicking on Next and Adding A Card You Agree
              to Our Terms of Services
            </Text>
            <TouchableOpacity
              style={[
                styles.Buybutton,
                (loading || cardDisable) && {
                  backgroundColor: "rgba(128,128,128,0.4)",
                },
              ]}
              onPress={buyWithCardHandler}
              disabled={!!loading || !!cardDisable}
            >
              <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
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
            <Text
              style={[
                styles.text,
                { fontSize: 17, marginVertical: 5, color: "red" },
              ]}
            >
              We Couldnt Complete Your Transaction .Please Make Sure You Enter
              Correct Details And Have Sufficient Funds
            </Text>
          </View>
        );
    }
  }, [
    step,
    buyItem,
    scardn,
    ccnum,
    cvcerror,
    loading,
    cardDetails,
    cardDisable,
  ]);

  return (
    <Card closeCard={props.closeCard} dontshowclose={isloading ? true : false}>
      {(isloading || loading) && (
        <ActivityIndicator
          size={60}
          style={{
            flex: 1,
            alignSelf: "center",
            padding: 20,
            marginVertical: 10,
          }}
        />
      )}
      {!isloading && showAccordingtoStepForCardBuyWithCard()}
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
    // backgroundColor: "red",
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
