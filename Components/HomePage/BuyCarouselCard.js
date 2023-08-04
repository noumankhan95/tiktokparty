import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Carddata = [
  {
    id: 1,
    text: "TikTok Likes And Followers",
    imgSource:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
    navigateTo: "offer",
  },
  {
    id: 2,
    text: "Watch Ads And Get Free Coins For Each Video",
    imgSource:
      "https://as1.ftcdn.net/v2/jpg/02/93/87/24/1000_F_293872481_0kLUC4hq5uihSOFSpyLK4fXy8EVCzRZq.jpg",
    navigateTo: "Watch Ads",
  },
  {
    id: 3,
    text: "Buy Coins At Discount",
    imgSource:
      "https://www.shutterstock.com/image-photo/full-body-smiling-happy-fun-260nw-2174562505.jpg",
    navigateTo: "Purchase Coins",
  },
  // {
  //   id: 4,
  //   text: "sdfdsfsdfsdfwerefasfasdfasddas",
  //   imgSource:
  //     "https://www.photocase.com/photos/3523156-sad-young-woman-leaning-against-wall-looking-to-side-in-contemplation-photocase-stock-photo-large.jpeg",
  // },
];

export default function BuyCarouselCard() {
  return (
    <ScrollView
      style={{ flex: 0.6 }}
      contentContainerStyle={styles.CardContainer}
    >
      {Carddata.map((i) => (
        <CardItem {...i} key={i.id} />
      ))}
    </ScrollView>
  );
}

function CardItem(props) {
  const { navigate } = useNavigation();
  const onCardPress = () => {
    navigate(props.navigateTo, {
      props,
    });
  };
  return (
    <TouchableOpacity style={[styles.Card]} onPress={onCardPress}>
      <ImageBackground
        source={{ uri: props.imgSource }}
        style={{
          flex: 1,
          borderRadius: 5,
          overflow: "hidden",
          justifyContent: "space-evenly",
          padding: 10,
        }}
      >
        <View>
          <Text style={styles.cardHeaderText}>{props.text}</Text>
        </View>
        <View style={styles.description}>
          {/* <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity> */}
          <Ionicons name="arrow-forward" size={40} color={"white"} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  CardContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  Card: {
    height: 180,
    width: "90%",
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    justifyContent: "space-evenly",
    elevation: 4,
    marginVertical: 10,
  },

  cardHeader: {
    width: "100%",
  },
  cardHeaderText: { color: "white", fontSize: 25, fontWeight: "700" },
  priceContainerText: { marginHorizontal: 10, fontSize: 19 },
  buyButtonContainer: { width: "50%", alignItems: "flex-end" },
  buyButton: {
    backgroundColor: "black",
    borderRadius: 5,
    width: 80,
    padding: 10,
    marginRight: 23,
  },
  buyButtonText: { color: "white", textAlign: "center" },
  description: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
