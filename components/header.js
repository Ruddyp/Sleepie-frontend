import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "./KitUI/tokens";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text></Text>
      </View>
      <View style={styles.imageContainer}>
        <Pressable
          onPress={() => navigation.navigate("home")}>
          <Image
            source={require('../assets/logo-Sleepie-blanc-transparent.png')}
            style={styles.image}
          />
        </Pressable>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("TabNavigator", { screen: "profil" })}>
        <Ionicons name="person-sharp" size={24} color="#fff" />
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
    justifyContent: "space-between",
    backgroundColor: Colors.bgPrimary[0],
    paddingHorizontal: 16,
    paddingTop: 50, // safe area pour iOS
    paddingBottom: 16,
  },
  image: {
    width: 150,
    height: 50,
  },
  imageContainer: {
    marginLeft: Spacing.xxl,
  },
});
