import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Card from "../Card/Card";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import useInput from "../../CustomHooks/useInput";
import { useCallback } from "react";
import { createNewCard } from "../../reducers/paymentslice";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function AddCard(props) {
  const { inputState, changeTextHandler } = useInput({
    initialState: { cardnumber: "", expmonth: "", expyear: "" },
  });
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [step, setstep] = useState(0);
  const forwardStep = useCallback((i = 1) => {
    setstep((p) => p + i);
  }, []);
  const cardAdding = useSelector((state) => state.payment.isloadingcard);
  const { cardnumber, expmonth, expyear } = inputState;
  console.log(inputState);
  const Addcard = useCallback(async () => {
    console.log("here");
    try {
      if (
        inputState.cardnumber.length < 16 ||
        !inputState.expmonth ||
        inputState.expmonth.length < 2 ||
        !inputState.expyear ||
        inputState.expyear.length < 2
      )
        return;

      const response = await dispatch(
        createNewCard({
          uid: user.uid,
          cardnumber: inputState.cardnumber,
          month: inputState.expmonth,
          year: inputState.expyear,
        })
      ).unwrap();
      forwardStep();
      console.log(inputState);
    } catch (e) {
      console.log(e);
      forwardStep(2);
    }
  }, [cardnumber, expmonth, expyear, user, forwardStep]);
  const showAccordingtoStep = useCallback(() => {
    switch (step) {
      case 0:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Add A Payment Method</Text>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => forwardStep()}
            >
              <FontAwesome5 name="wallet" size={30} color="black" />
              <Text>Add A Credit Card</Text>
            </TouchableOpacity>

            <Text>
              By Clicking on Next and Adding A Card You Agree to Our Terms of
              Services
            </Text>
          </View>
        );
      case 1:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Add A Card Or Debit Card</Text>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="wallet" size={30} color="black" />
              <TextInput
                style={styles.textInput}
                placeholder="Add Card Number"
                onChangeText={(text) => changeTextHandler("cardnumber", text)}
                keyboardType="numeric"
                maxLength={16}
              />
            </View>
            <View style={styles.iconContainer}>
              <TextInput
                style={styles.DatetextInput}
                placeholder="MM"
                onChangeText={(text) => changeTextHandler("expmonth", text)}
                maxLength={2}
                keyboardType="numeric"
              />
              <Text style={{ fontSize: 30 }}>/</Text>
              <TextInput
                style={styles.DatetextInput}
                placeholder="YY"
                onChangeText={(text) => changeTextHandler("expyear", text)}
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={styles.Buybutton} onPress={Addcard}>
              <Text style={styles.buyText}>Save</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <AntDesign
              name="check"
              size={64}
              color="black"
              style={{ alignSelf: "center" }}
            />
            <Text style={styles.text}>SuccessFully Added Card</Text>
            <TouchableOpacity
              style={styles.Buybutton}
              onPress={props.closeCard}
            >
              <Text style={styles.buyText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View
            style={[
              styles.container,
              { justifyContent: "space-evenly", alignItems: "center" },
            ]}
          >
            <MaterialIcons name="error" size={64} color="black" />
            <Text style={styles.text}>An Error Occured</Text>
          </View>
        );
    }
  }, [step]);

  return (
    <Card closeCard={props.closeCard}>
      {cardAdding && (
        <>
          <ActivityIndicator size={60} />
          <Text>Adding Your Card,This Might Take A Moment</Text>
        </>
      )}
      {!cardAdding && showAccordingtoStep()}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    // height: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "400",
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.6,
    borderColor: "gray",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  textInput: {
    width: "86%",
    height: "100%",
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
    fontSize: 22,
    textAlign: "auto",
    paddingLeft: 10,
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
    fontSize: 16,
    textAlign: "center",
  },
  Buybutton: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 5,
  },
  buyText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
