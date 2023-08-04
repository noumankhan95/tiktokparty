import { View, Text, StyleSheet } from "react-native";
import UserHeader from "../Components/HomePage/UserHeader";
import CarouselCard from "../Components/HomePage/CarouselCard";
import BuyCarouselCard from "../Components/HomePage/BuyCarouselCard";
import { useEffect } from "react";
import { auth } from "../firebase";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <UserHeader />
      <Text style={styles.DailyOfferText}>VIP Offers</Text>
      <CarouselCard />
      <Text style={styles.DailyOfferText}>Buy TikTok Followers And Likes</Text>
      <BuyCarouselCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  DailyOfferText: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "600",
  },
});
