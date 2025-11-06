import { Text, View, StyleSheet } from "react-native";
import { BorderRadius, Colors, Spacing, Typography } from "../KitUI/tokens";
import { LinearGradient } from "expo-linear-gradient";
export default function Stepper({ nbSteps, currentStep, hideText = false }) {
  const progressPercentage = (currentStep * 100) / nbSteps;
  const styles = StyleSheet.create({
    main: {
      width: "100%",
      borderRadius: BorderRadius.small,
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.xs,
    },
    stepper: {
      width: "90%",
      height: 12,
      borderRadius: BorderRadius.small,
    },
    stepperProgress: {
      width: `${progressPercentage}%`,
      height: 12,
      borderRadius: BorderRadius.small,
    },
    title: {
      ...Typography.caption,
      color: Colors.textTitle,
      textAlign: "center",
    },
  });
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={Colors.bgTertiary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.stepper}
      >
        <LinearGradient
          colors={Colors.accentPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.stepperProgress}
        ></LinearGradient>
      </LinearGradient>
      {!hideText && <Text style={styles.title}>
        Etape {currentStep}/{nbSteps}{" "}
      </Text>}
    </View>
  );
}
