import { View, Text, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native";
import { useState } from "react";

import AddCard from "../Components/AddCard/AddCard";
import AllCards from "../Components/AllCards/AllCards";
export default function MyCards() {
  const cards = useSelector((state) => state.payment);
  const [showAddcard, setshowAddcard] = useState(false);

  console.log(cards);
  if (!cards.cardExists)
    return (
      <View style={{ flex: 1 }}>
        {showAddcard && (
          <AddCard
            closeCard={() => {
              setshowAddcard((p) => false);
            }}
          />
        )}
        <Text style={{ marginVertical: 34 }}>
          You Dont Have Any Existing Cards
        </Text>
        <Button
          title="Add new Card"
          color={"rgba(0,0,0,0.7)"}
          onPress={() => {
            setshowAddcard((p) => true);
          }}
        />
      </View>
    );
  return (
    <View style={{ flex: 1 }}>
      <AllCards />
    </View>
  );
}

const styles = StyleSheet.create({});
