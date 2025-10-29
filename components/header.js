import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // pour les icônes
import { Colors, Typography } from "./KitUI/tokens";

export default function Header({ title, navigation, route, descriptors }) {

  return (
    <View style={styles.container}>
      <View>
        <Text></Text>
      </View>

      <Text style={styles.title} onPress={() => navigation.navigate("home")}>
        {title}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("TabNavigator", { screen: "profil" })}>
        <Ionicons name="person-sharp" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.bgPrimary[0],
    paddingHorizontal: 16,
    paddingTop: 50, // safe area pour iOS
    paddingBottom: 16,
  },
  title: {
    ...Typography.h3,
    color: Colors.textTitle,
    // fontSize: 18,
    // fontWeight: "bold",
  },
});
