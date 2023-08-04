import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import BuyCard from "../BuyCard/BuyCard";
import AddCard from "../AddCard/AddCard";
import { useCallback } from "react";
import { useSelector } from "react-redux";
const Carddata = [
  {
    id: 1,
    text: " Get 20,000 Coins for Only 120$,offer Available for limited time only",
    discount: "INFLUENCER PACK !!!",
    price: 120,
    item: "20000 coins",
    // was: "60$",
    // is: "48$",
  },
  {
    id: 2,
    text: " Get 100,000 Coins for Only 500$,offer Available for limited time only",
    discount: "EXTREME PACK !!!",
    price: 500,
    item: "100000 coins",
    // was: "30$",
    // is: "24$",
  },
  // {
  //   id: 3,
  //   text: " Get 15% Discount and Get 500 followers now",
  //   discount: "15%",
  //   was: "20$",
  //   is: "18$",
  // },
];
let i = 0;
export default function CarouselCard() {
  const [CardNumber, setCardNumber] = useState(Carddata[i]);
  const [buycard, setbuycard] = useState(false);
  const [addcard, setaddcard] = useState(false);
  const [buyItem, setbuyItem] = useState({ price: 0, item: "" });
  const creditCardExists = useSelector((state) => state.payment.cardExists);
  useEffect(() => {
    if (i > Carddata.length - 1) i = 0;
  }, [i]);
  const handleButtonClick = useCallback(() => {
    if (i > Carddata.length - 1) i = 0;
    setCardNumber(Carddata[i++]);
    console.log(i);
  }, [i]);
  useEffect(() => {
    const slider = setInterval(() => {
      if (i > Carddata.length - 1) i = 0;
      setCardNumber((p) => Carddata[i++]);
    }, 3000);
    return () => clearInterval(slider);
  }, [i]);
  const closeCard = useCallback(() => {
    setbuycard((p) => false);
    setaddcard((p) => false);
  }, []);
  const openCard = useCallback((price, item) => {
    setbuyItem((p) => ({ price, item }));
    if (creditCardExists) {
      setbuycard((p) => true);
    } else {
      setaddcard((p) => true);
    }
  }, []);
  return (
    <>
      {addcard && <AddCard closeCard={closeCard} />}
      {buycard && (
        <BuyCard option={"money"} buyItem={buyItem} closeCard={closeCard} />
      )}
      <View style={styles.CardContainer}>
        <CardItem {...CardNumber} openCard={openCard} />
        {
          <View style={styles.ButtonContainer}>
            {Carddata.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleButtonClick(item.id)}
                style={[
                  {
                    backgroundColor:
                      CardNumber.id === item.id ? "black" : "white",
                  },
                  styles.Button,
                ]}
                {...item}
              ></TouchableOpacity>
            ))}
          </View>
        }
      </View>
    </>
  );
}

function CardItem(props) {
  const { navigate } = useNavigation();
  const onCardPress = () => {
    navigate("offer");
  };
  return (
    <TouchableOpacity style={[styles.Card]} onPress={onCardPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>{props.discount}</Text>
      </View>
      <View style={styles.CardDescription}>
        <Text style={styles.CardDescriptionText}>{props.text}</Text>
      </View>
      <View style={styles.offerContainer}>
        <View style={styles.buyButtonContainer}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={props.openCard.bind(null, props.price, props.item)}
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  CardContainer: {
    flex: 0.8,
    alignItems: "center",
  },
  Card: {
    flex: 1,
    width: "80%",
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-evenly",
    elevation: 4,
    marginBottom: 4,
  },
  ButtonContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "center",
  },
  Button: {
    width: 20,

    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 20,
    height: 20,
  },
  ButtonText: {
    fontSize: 20,
  },
  cardHeader: {
    width: "100%",
  },
  cardHeaderText: {
    color: "rgba(100,123,22,1)",
    fontSize: 25,
    fontWeight: "500",
  },
  CardDescription: {},
  CardDescriptionText: {
    color: "rgba(100,55,100,0.5)",
    fontSize: 18,
    fontWeight: "300",
  },
  offerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
  },
  priceContainerText: { marginHorizontal: 3, fontSize: 19 },
  buyButtonContainer: { width: "50%", alignItems: "flex-end" },
  buyButton: {
    backgroundColor: "black",
    borderRadius: 5,
    width: 80,
    padding: 10,
    marginRight: 23,
  },
  buyButtonText: { color: "white", textAlign: "center" },
});
