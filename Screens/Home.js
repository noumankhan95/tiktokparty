import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  Platform,
  Linking,
} from "react-native";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Link,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import OfferScreen from "./OfferScreen";
import PurchaseCoins from "./PurchaseCoins";
import WatchAds from "./WatchAds";
import ProfileScreen from "./Profile";
import Auth from "./Auth";
import AdScreen from "./AdScreen";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logUserIn } from "../reducers/authslice";
import { signInWithCustomToken } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import Myorders from "./Myorders";
import MyCards from "./MyCards";
import { addCards } from "../reducers/paymentslice";
import { getOrders } from "../reducers/Orderslice";
import Card from "../Components/Card/Card";
import RNExitApp from "react-native-exit-app";
import HelpCenterScreen from "./HelpCenterScreen";
const Stack = createNativeStackNavigator();

const Home = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [checkUser, setcheckUser] = useState(true);
  console.log("User info" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [homeError, sethomeError] = useState(false);

  useEffect(() => {
    setcheckUser(true);
    const sub = auth.onAuthStateChanged(
      async (user) => {
        try {
          if (user) {
            const userref = doc(db, "users", user.uid);
            const oc = await getDoc(userref);
            const uinfo = { ...oc.data() };
            const userinfo = {
              ...uinfo,
              profilUrl: user.photoURL,
            };
            // dispatch(setloadingTrue());
            dispatch(logUserIn(userinfo));
            dispatch(
              addCards({
                cards: userinfo.cards || [],
                defaultCard: userinfo.defaultCard || "",
              })
            );
            // dispatch(setloadingFalse());

            dispatch(getOrders({ uid: user.uid }));
          } else {
            console.log("not signed in");
          }
        } catch (e) {
          console.log(e);
        } finally {
          setcheckUser(false);
        }
      },
      (e) => {
        // navigate("Auth", { error: "Please Try Again Later" });
        sethomeError((p) => true);
      }
    );
    return sub;
  }, []);
  const closeApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    } else {
      // For iOS, you can use Linking API to open home screen and close the app
      Linking.openURL("App-Prefs:root=General");
    }
  };

  if (homeError)
    return (
      <Card closeCard={closeApp}>
        <Text style={{ marginVertical: 10 }}>
          Something Went Wrong.Please Try Again Later
        </Text>
      </Card>
    );
  if (checkUser)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={40} color={"green"} />
      </View>
    );
  const UnAuthenticatedRoutes = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" component={Auth} />
      </Stack.Navigator>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated && (
            <Stack.Screen
              name="Auth"
              component={UnAuthenticatedRoutes}
              options={{ headerShown: false }}
            />
          )}
          {isAuthenticated && (
            <>
              <Stack.Screen
                name="home"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="adscreen"
                component={AdScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="offer" component={OfferScreen} />
              <Stack.Screen name="My Orders" component={Myorders} />
              <Stack.Screen name="My Cards" component={MyCards} />
              <Stack.Screen name="Help Center" component={HelpCenterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "black" },
        tabBarStyle: {
          height: 50,
        },
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="home"
              size={26}
              color={focused ? "orange" : color}
            />
          ),
          tabBarLabelStyle: { color: "black" },
        }}
      />
      <BottomTab.Screen
        name="Purchase Coins"
        component={PurchaseCoins}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-globe"
              size={26}
              color={focused ? "orange" : color}
            />
          ),
          tabBarLabelStyle: { color: "black" },
        }}
      />
      <BottomTab.Screen
        name="Watch Ads"
        component={WatchAds}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="reader"
              size={26}
              color={focused ? "orange" : color}
            />
          ),
          tabBarLabelStyle: { color: "black" },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="person"
              size={26}
              color={focused ? "orange" : color}
            />
          ),
          tabBarLabelStyle: { color: "black" },
          headerTitle: "Your Profile",
        }}
      />
    </BottomTab.Navigator>
  );
};
export default Home;
