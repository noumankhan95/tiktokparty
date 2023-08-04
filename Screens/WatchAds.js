import { View, Text, FlatList, StyleSheet } from "react-native";
import WatchAdItem from "../Components/WatchAds/WatchAdItem";
import { RewardedAd, TestIds } from "react-native-google-mobile-ads";
import { useEffect, useState } from "react";
const adUnitId = TestIds.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});
const data = [
  {
    id: 1,
    name: "Legacy of Discord",
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    text: "Earn Coins",
  },
  {
    id: 2,
    name: "Legacy of Discord",
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    text: "Earn Coins",
  },
  {
    id: 3,
    name: "Legacy of Discord",
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    text: "Earn Coins",
  },
  {
    id: 4,
    name: "Legacy of Discord",
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    text: "Earn Coins",
  },
  {
    id: 5,
    name: "Legacy of Discord",
    source: "https://i.ytimg.com/vi/10EV9rI3Xks/maxresdefault.jpg",
    text: "Earn Coins",
  },
];
export default function WatchAds() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContaier}>
        <Text style={styles.text}>Earn Coins Wactching Ads</Text>
        <Text style={[styles.text, { color: "orange" }]}>10 Coins</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WatchAdItem {...item} />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: { flex: 1 },
  textContaier: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 22,
  },
});
