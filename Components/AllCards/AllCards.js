import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { createnewDefault } from "../../reducers/paymentslice";
import Card from "../Card/Card";
import AddCard from "../AddCard/AddCard";
export default function AllCards() {
  const cards = useSelector((state) => state.payment.cards);
  const user = useSelector((state) => state.auth.user);
  const cardloading = useSelector((state) => state.payment.isloadingcard);
  const [showAddcard, setshowAddcard] = useState(false);
  if (cardloading)
    return (
      <Card dontshowclose={true}>
        <Text>Changing Your Default Card.Please Wait A Moment</Text>
        <ActivityIndicator size={60} style={{ marginVertical: 10 }} />
      </Card>
    );
  return (
    <View style={{ flex: 1 }}>
      {showAddcard && (
        <AddCard
          closeCard={() => {
            setshowAddcard((p) => false);
          }}
        />
      )}
      <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "300" }}>
        All Your Cards
      </Text>
      <View>
        {cards.map((d) => (
          <SingleCard {...d} uid={user.uid} key={d.id} />
        ))}
      </View>
      <Button
        title="Add new Card"
        color={"rgba(0,0,0,0.7)"}
        onPress={() => {
          setshowAddcard((p) => true);
        }}
      />
    </View>
  );
}
const SingleCard = (props) => {
  const dispatch = useDispatch();
  const defaultcard = useSelector((state) => state.payment.defaultCard);
  const setDefaultCard = useCallback(() => {
    if (defaultcard !== props.cardnum) {
      dispatch(
        createnewDefault({ cardnumber: props.cardnumber, uid: props.uid })
      );
    }
  }, [props]);

  console.log(defaultcard);

  const cnum = useCallback((num) => {
    const creditCard = num;
    const maskedCard = creditCard.toString().replace(/\d(?=\d{4})/g, "*");
    const formattedCard = maskedCard.replace(/(.{4})/g, "$1 ");

    return formattedCard;
  }, []);

  return (
    <View style={styles.cardcontainer}>
      <FontAwesome5 name={"wallet"} size={40} />
      <Text>{cnum(props.cardnumber)}</Text>
      <RadioButton
        value={props.cardnumber}
        status={defaultcard === props.cardnumber ? "checked" : "unchecked"}
        onPress={() => {
          setDefaultCard();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardcontainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    justifyContent: "space-between",
  },
});
