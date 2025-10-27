import { StyleSheet, Text, View, Button } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login PAGE</Text>
      <Button
        title="GO TO HOME"
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </View>
  );
}
