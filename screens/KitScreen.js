import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/KitUI/Button";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Sizes,
} from "../components/KitUI/tokens";

export default function KitScreen() {
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
        <Button
          title="Button medium primary test"
          size="medium"
          variant="primary"
        />
        <Button
          title="Button large primary test"
          size="large"
          variant="primary"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    paddingTop: 50,
    gap: 10,
  },
});
