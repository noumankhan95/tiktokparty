import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import CarouselCard from "../Components/HomePage/CarouselCard";
import BuyListItem from "../Components/OfferScreen/BuyListItem";
import BuyCard from "../Components/BuyCard/BuyCard";
import AddCard from "../Components/AddCard/AddCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useCallback } from "react";
const OfferList = [
  {
    id: 1,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "1000 Followers",
    coins: 333,
  },
  {
    id: 2,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "2000 Followers",
    coins: 660,
  },
  {
    id: 3,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "3000 Followers",
    coins: 1320,
  },
  {
    id: 4,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "4000 Followers",
    coins: 1900,
  },
];
const LikesOfferList = [
  {
    id: 1,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "5000 Likes",
    coins: 25000,
  },
  {
    id: 2,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "10,000 Likes",
    coins: 49000,
  },

  {
    id: 3,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "20000 Likes",
    coins: 61000,
  },
  {
    id: 4,
    source:
      "https://seeklogo.com/images/T/tiktok-share-icon-black-logo-29FFD062A0-seeklogo.com.png",
    text: "50,000 Likes",
    coins: 75000,
  },
];
export default function OfferScreen() {
  const { params } = useRoute();
  const cardExists = useSelector((state) => state.payment.cardExists);
  console.log("cardexists", cardExists);

  const [buycard, setbuycard] = useState(false);
  const [addcard, setaddcard] = useState(false);
  const [buyItem, setbuyItem] = useState({ price: 0, item: "" });
  const user = useSelector((state) => state.auth.user);
  const openbuycard = useCallback((price, item) => {
    setaddcard((p) => false);
    setbuyItem((p) => ({ price, item }));
    setbuycard((p) => true);
  }, []);
  const openaddcard = useCallback(() => {
    setbuycard((p) => false);
    setaddcard((p) => true);
  }, []);
  const closeCard = useCallback(() => {
    setaddcard((p) => false);
    setbuycard((p) => false);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {addcard && <AddCard closeCard={closeCard} />}
      {buycard && (
        <BuyCard closeCard={closeCard} buyItem={buyItem} option="coins" />
      )}
      <FlatList
        data={[
          { type: "header", text: "Buy TikTok Followers" },
          { type: "offers", data: OfferList },
          { type: "header", text: "Buy TikTok Likes" },
          { type: "offers", data: LikesOfferList },
        ]}
        renderItem={({ item }) => {
          if (item.type === "header") {
            return <Text style={styles.buyText}>{item.text}</Text>;
          } else if (item.type === "offers") {
            return (
              <FlatList
                data={item.data}
                renderItem={({ item }) => (
                  <BuyListItem
                    {...item}
                    opencard={
                      cardExists
                        ? openbuycard.bind(null, item.coins, item.text)
                        : openaddcard
                    }
                    closeCard={closeCard}
                  />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{}}
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buyText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
});

{
  /* <ScrollView style={styles.container}>
      <Text>hello</Text>
      <CarouselCard />
      <Text>Buy TikTok Followers</Text>
      <View
        style={{
          flex: 0.6,
        }}
      >
        <FlatList
          data={OfferList}
          renderItem={({ item }) => <BuyListItem {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
      
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ width: "100%" }}
        />
      </View>
      <Text>Buy TikTok Likes</Text>
      <View
        style={{
          flex: 0.5,
        }}
      >
        <FlatList
          data={OfferList}
          renderItem={({ item }) => <BuyListItem {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ width: "100%" }}
        />
      </View>
    </ScrollView> */
}
