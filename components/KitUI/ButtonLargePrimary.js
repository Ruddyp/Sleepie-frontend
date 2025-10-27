import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows, Sizes } from "./tokens";

export default function ButtonLargePrimary({ title, variant = "primary", size = "medium" }) {
  const buttonStyle = getButtonStyle(variant, size);

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.button, ...buttonStyle.button, ...buttonStyle.size }}
        activeOpacity={0.8}
      >
        <Text style={{ ...styles.text, ...buttonStyle.text }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.xxxl,
    ...Shadows.soft,
  },
  text: {
    fontSize: Typography.body.fontSize,
    fontFamily: Typography.fontBody,
    fontWeight: "500",
  },
});

function getButtonStyle(variant, size) {
  let button = {};
  let text = {};
  let sizeButton = {};

  if (variant === "secondary") {
    button = { backgroundColor: Colors.accentGlow };
    text = { color: Colors.textBody };
  }

  if (variant === "primary") {
    button = { backgroundColor: Colors.accentPrimarySolid };
    text = { color: Colors.textBody };
  }

  if (size === "small") {
    sizeButton = { height: Sizes.buttonSmall };
  }

  if (size === "medium") {
    sizeButton = { height: Sizes.buttonDefault };
  }

  if (size === "large") {
    sizeButton = { height: Sizes.buttonLarge };
  }

  return {
    button,
    text,
    size: sizeButton,
  };
}
