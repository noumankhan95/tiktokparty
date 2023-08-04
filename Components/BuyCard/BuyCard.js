import BuyWithCoins from "./buywithcoins";
import BuyWithCard from "./buywithCard";
export default function BuyCard(props) {
  return props.option === "coins" ? (
    <BuyWithCoins buyItem={props.buyItem} closeCard={props.closeCard} />
  ) : (
    <BuyWithCard buyItem={props.buyItem} closeCard={props.closeCard} />
  );
}
