import { Text, View, StyleSheet } from "react-native";
import { BorderRadius, Colors, Spacing, Typography } from "../KitUI/tokens";
export default function ChoiceCard({ title, subtitle, isFocused }) {
  const focusStyle = isFocused
    ? {
        // Style de bordure pour l'état focus
        borderColor: Colors.white,
        borderWidth: 2,
      }
    : {};
  return (
    <View style={{ ...styles.main, ...focusStyle }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "85%",
    backgroundColor: Colors.bgTertiarySolid,
    borderRadius: BorderRadius.small,
    padding: Spacing.sm,
    borderWidth: 1, // Utiliser la même épaisseur que dans focusStyle
    borderColor: "transparent", // Bordure transparente par défaut
  },
  title: {
    ...Typography.h3,
    color: Colors.textBody,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
