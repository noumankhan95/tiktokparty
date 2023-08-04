import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HelpCenterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContaier}>
        <Text style={styles.text}>For Any Queries Please Reach Us At </Text>
        <Text style={[styles.text, { color: "orange" }]}>
          tiktoksmapp@gmail.com
        </Text>
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 40,
  },
  text: {
    fontSize: 22,
  },
});
