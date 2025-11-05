import { View, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "./KitUI/tokens";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("home")}>
        <Image
          source={require("../assets/logo-Sleepie-blanc-transparent.png")}
          style={styles.image}
        />
      </Pressable>
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => navigation.navigate("TabNavigator", { screen: "profil" })}
      >
        <Ionicons name="person-sharp" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    justifyContent: "center",
    backgroundColor: Colors.bgPrimary[0],
    paddingVertical: Spacing.xl,
  },
  image: {
    width: 150,
    height: 50,
  },
  userContainer: {
    position: "absolute",
    right: 25,
    bottom: 27,
  },
});
