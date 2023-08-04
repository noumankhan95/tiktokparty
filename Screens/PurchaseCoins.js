import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import BuyCoinItem from "../Components/PurchaseCoins/BuyCoinItem";
import { useState } from "react";
import Card from "../Components/Card/Card";
import { FontAwesome5 } from "@expo/vector-icons";
import AddCard from "../Components/AddCard/AddCard";
import BuyCard from "../Components/BuyCard/BuyCard";
import { useSelector } from "react-redux";
import { useCallback } from "react";
// import { Button } from "react-native-paper";
const data = [
  {
    id: 1,
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    coins: 100,
    price: 0.99,
  },
  {
    id: 2,
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    price: 3.99,
    coins: 500,
  },
  {
    id: 3,
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    price: 12.99,
    coins: 2000,
  },
  {
    id: 4,
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    price: 29.99,
    coins: 5000,
  },
  // {
  //   id: 5,
  //   source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
  //   price: 700,
  // },
];
export default function PurchaseCoins() {
  const [showCard, setshowCard] = useState(false);
  const [addCard, setaddCard] = useState(false);
  const [cardData, setcardData] = useState(data[0]);
  const [buyCard, setbuyCard] = useState(false);
  const cardExists = useSelector((state) => state.payment.cardExists);
  const [buyItem, setbuyItem] = useState({ item: "", price: 0 });
  const closeCard = useCallback(() => {
    setshowCard((p) => false);
    setaddCard((p) => false);
    setbuyCard((p) => false);
  }, []);
  const openCard = useCallback((i) => {
    setcardData((p) => data[--i]);
    setshowCard((p) => true);
  }, []);
  const goToAddCard = useCallback(() => {
    setshowCard((p) => false);
    setbuyCard((p) => false);
    setaddCard((p) => true);
  }, []);
  const goToBuyCard = useCallback((item, price) => {
    setbuyItem((p) => ({ item: `${item} coins`, price }));
    setshowCard((p) => false);
    setaddCard((p) => false);
    setbuyCard((p) => true);
  }, []);
  return (
    <>
      {buyCard && <BuyCard closeCard={closeCard} buyItem={buyItem} />}
      {showCard && (
        <Card closeCard={closeCard}>
          {/* <Text>{cardData.id}</Text> */}
          <View style={styles.BuyCard}>
            <FontAwesome5 name="coins" size={60} color={"orange"} />
            <Text style={styles.coinsText}>Buy {cardData.coins} coins</Text>
          </View>
          <Text style={{ marginVertical: 15 }}>
            By Tapping Buy You Accept The Payments And Terms Of Service
          </Text>
          {
            <>
              {cardExists && (
                <TouchableOpacity
                  style={styles.Buybutton}
                  onPress={goToBuyCard.bind(
                    null,
                    cardData.coins,
                    cardData.price
                  )}
                >
                  <Text style={styles.buyText}>Buy</Text>
                </TouchableOpacity>
              )}
              {!cardExists && (
                <TouchableOpacity
                  style={styles.Buybutton}
                  onPress={goToAddCard}
                >
                  <Text style={styles.buyText}>Add Card</Text>
                </TouchableOpacity>
              )}
            </>
          }
        </Card>
      )}
      {addCard && <AddCard closeCard={closeCard} />}
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Purchase Coins</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BuyCoinItem {...item} openCard={openCard} />
            )}
            numColumns={2}
            style={{ flex: 1, padding: 2 }}
            contentContainerStyle={{ alignItems: "center", padding: 10 }}
          />
        </View>
        {/* <Button
          onPress={async () => {
            try {
              const res = await fetch("http://192.168.10.4:3000/data", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              console.log("gety", data);
            } catch (e) {
              console.log(e);
              console.log("gety", e);
            }
          }}
          title="Buy"
        /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 0.1,
  },
  listContainer: {
    flex: 0.9,
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  BuyCard: {
    width: "90%",
    borderWidth: 0.3,
    borderColor: "gray",
    alignSelf: "center",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 4,
  },
  coinsText: {
    fontSize: 20,
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
