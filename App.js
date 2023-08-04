import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { Provider } from "react-redux";
import store from "./reducers/reducerstore";
import Home from "./Screens/Home";
import { StripeProvider } from "@stripe/stripe-react-native";
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { InterstitialAd } from "react-native-google-mobile-ads";
import { useState, useEffect } from "react";
// import { Button } from "react-native-paper";

export default function App() {

  return (
    <StripeProvider publishableKey="key">
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          <Home />
          <Button
            title="Show Interstitial"
            onPress={() => {
              // interstitial.show();
            }}
          />
        </SafeAreaView>
      </Provider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
