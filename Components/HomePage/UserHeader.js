import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import useImageFbaseHandler from "../../CustomHooks/imageUploadfbase";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
export default function UserHeader() {
  const { getimgUrl, profile } = useImageFbaseHandler();
  const user = useSelector((state) => state.auth.user);
  const isloading = useSelector((state) => state.auth.isloading);
  const tisloading = useSelector((state) => state.auth);
  console.log("isloading", tisloading);
  useEffect(() => {
    getimgUrl()
      .then((r) => r)
      .catch((e) => e);
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: profile,
          }}
        />
        <View>
          {isloading ? (
            <ActivityIndicator style={{ marginLeft: 10 }} />
          ) : (
            <>
              <Text style={styles.username}>{user.email}</Text>
              <Text style={styles.username}>{user.username}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.yourCoinsContainer}>
        <TouchableOpacity style={styles.yourCoins}>
          <FontAwesome5 name="coins" size={24} color="orange" />
          <Text style={styles.yourCoinsText}>
            {isloading ? <ActivityIndicator /> : user.coins}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.2,
    alignItems: "center",
    paddingHorizontal: 10,
    // paddingVertical: 10,
    marginTop: 25,
  },
  imgContainer: {
    width: "40%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: "100%",
    width: "50%",
    borderRadius: 40,
    resizeMode: "cover",
  },
  yourCoinsContainer: {
    width: "60%",
  },
  yourCoins: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  yourCoinsText: { color: "white", fontSize: 19, textAlign: "left" },
  username: {
    color: "black",
    fontSize: 15,
    marginHorizontal: 4,
    fontWeight: "800",
  },
});
