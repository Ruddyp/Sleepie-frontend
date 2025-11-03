import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/KitUI/Button";
import Input from "../components/KitUI/Input";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../components/KitUI/tokens";

export default function KitScreen() {
  const [inputValue, setInputValue] = useState("");

  return (
    <LinearGradient
      colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <View style={styles.main}>
        <Button
          title="Button small secondary test"
          size="small"
          variant="secondary"
          onPress={() => console.log("TEST")}
        />
        <Button title="Button medium primary test" size="medium" variant="primary" />
        <Button title="Button large primary test" size="large" variant="primary" />
        <Input
          label="Mon champ de test"
          placeholder="Tape quelque chose..."
          value={inputValue}
          onChangeText={setInputValue}
          password
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 50,
    gap: 10,
  },
});
