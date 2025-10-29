import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows, Sizes } from "./tokens";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({ title, variant = "primary", size = "medium", onPress, disable }) {
  const buttonStyle = getButtonStyle(variant, size);
  if (disable) onPress = undefined;

  return (
    <LinearGradient
      colors={buttonStyle.color}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient]}
    >
      <TouchableOpacity
        style={{ ...styles.button, ...buttonStyle.button, ...buttonStyle.size }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={{ ...styles.text, ...buttonStyle.text }}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: BorderRadius.large,
    overflow: "hidden",
    ...Shadows.soft,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxxl,
    ...Shadows.soft,
  },
  text: {
    fontFamily: Typography.fontBody,
    fontWeight: "500",
  },
});

function getButtonStyle(variant, size) {
  let color = [];
  let text = {};
  let sizeButton = {};

  if (variant === "secondary") {
    color = [Colors.accentGlow, Colors.accentGlow];
    text = { color: Colors.textBody };
  }

  if (variant === "primary") {
    color = Colors.accentPrimary;
    text = { color: Colors.textBody };
  }

  if (size === "small") {
    sizeButton = { height: Sizes.buttonSmall };
    text = { ...text, fontSize: Typography.body.fontSize };
  }

  if (size === "medium") {
    sizeButton = { height: Sizes.buttonDefault };
    text = { ...text, fontSize: Typography.body.fontSize };
  }

  if (size === "large") {
    sizeButton = { height: Sizes.buttonLarge };
    text = { ...text, fontSize: Typography.h3.fontSize };
  }

  return {
    color,
    text,
    size: sizeButton,
  };
}
