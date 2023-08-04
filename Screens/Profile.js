import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Alert,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { logOut } from ".././reducers/authslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import useImageFbaseHandler from "../CustomHooks/imageUploadfbase";
import { useCallback } from "react";
import Card from "../Components/Card/Card";
const Options = [
  // {
  //   id: 1,
  //   text: "Add Card",
  //   icon: <FontAwesome5 name="cc-mastercard" color="black" size={40} />,
  // },
  {
    id: 2,
    text: "Help Center",
    icon: <Ionicons name="help" color={"black"} size={40} />,
  },
  {
    id: 3,
    text: "Invite Friends",
    icon: <AntDesign name="addusergroup" size={40} color="black" />,
  },
  {
    id: 4,
    text: "My Orders",
    icon: <Feather name="message-square" size={40} color="black" />,
  },
  {
    id: 5,
    text: "Logout",
    icon: <MaterialIcons name="logout" size={40} color="orange" />,
  },
];
export default function ProfileScreen({ navigation }) {
  const {
    uploadImgHandler,
    isimguploading,
    profile,
    isErroruploading,
    closeimgloadingpopup,
  } = useImageFbaseHandler();
  const user = useSelector((state) => state.auth.user);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const updateProfilePic = useCallback(async () => {
    try {
      if (!status.granted) requestPermission();
      if (status.granted) {
        const result = await ImagePicker.launchCameraAsync();
        const idx = result.assets[0].uri.indexOf("ImagePicker");
        const sliced = result.assets[0].uri.slice(idx);
        await uploadImgHandler(sliced, result.assets[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [status?.granted]);
  const closeTheCard = useCallback(() => {
    closeimgloadingpopup();
  }, []);
  return (
    <>
      {isimguploading && (
        <Card dontshowclose={true}>
          <Text>Updating Your Profile Picture This Might Take A While</Text>
          <ActivityIndicator size={60} style={{ marginVertical: 10 }} />
        </Card>
      )}
      {isErroruploading && (
        <Card closeCard={closeTheCard}>
          <Text style={{ color: "red", fontSize: 30, marginVertical: 20 }}>
            ERROR!
          </Text>
          <Text style={{ marginVertical: 20 }}>
            We Couldnt Complete Your Request.Please Ensure You Have An Active
            Internet Connection
          </Text>
          {/* <ActivityIndicator size={60} style={{ marginVertical: 10 }} /> */}
        </Card>
      )}
      <View style={styles.container}>
        <Text style={styles.profiletext}>Profile</Text>
        <View style={styles.userContainer}>
          <View style={styles.userimgContainer}>
            <Image
              source={{
                uri: profile,
              }}
              style={styles.userimg}
            />
            <MaterialCommunityIcons
              name="image-edit"
              size={25}
              color="black"
              style={{ position: "relative", top: -22, left: 50 }}
              onPress={updateProfilePic}
            />
          </View>
          <View>
            <Text>{user.email}</Text>
            {/* <Text>email</Text> */}
          </View>
        </View>
        <View style={styles.listItemContainer}>
          {Options.map((i) => (
            <OptionItem key={i.id} {...i} navigation={navigation.navigate} />
          ))}
        </View>
      </View>
    </>
  );
}
const OptionItem = (props) => {
  const { text } = props;
  const dispatch = useDispatch();
  const changeItemHandler = useCallback(() => {
    switch (text) {
      case "Logout":
        dispatch(logOut());
        break;
      case "My Orders":
        props.navigation("My Orders");
        break;
      case "Add Card":
        props.navigation("My Cards");
        break;
      case "Help Center":
        props.navigation("Help Center");
        break;
      case "Invite Friends":
        Share.share({ message: "Check Out Our Awesome App " })
          .then((r) => {
            if (r.action === Share.sharedAction) {
              console.log(r.action);
            } else if (r.action === Share.dismissedAction) {
              console.log(r.action, "Dismissed");
            }
          })
          .catch((e) => Alert.alert("Couldnt Complete This Action"));
        break;
      default:
        break;
    }
  }, [text]);
  return (
    <TouchableOpacity style={styles.listItem} onPress={changeItemHandler}>
      <View style={styles.iconTextContainer}>
        {props.icon}
        <Text
          style={[
            styles.iconText,
            props.text === "Logout" ? { color: "orange" } : {},
          ]}
        >
          {props.text}
        </Text>
      </View>
      <Ionicons
        name="arrow-forward"
        size={25}
        color={props.text === "Logout" ? "orange" : "black"}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  profiletext: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  userContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 0.5,
    padding: 15,
    borderRadius: 1,
    marginTop: 10,
    elevation: 1,
  },
  userimgContainer: {
    height: 70,
    width: 70,
  },
  userimg: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  listItemContainer: {
    marginVertical: 5,
    flexGrow: 1,
  },
  listItem: {
    width: "100%",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "50%",
  },
  iconText: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});
