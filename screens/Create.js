import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";
import { useState } from "react";
import Button from "../components/KitUI/Button";

export default function Create() {
  const [formStep, setFormStep] = useState(0);
  const isInitialStep = formStep === 0 ? true : false;
  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      {isInitialStep && (
        <View style={styles.createContainer}>
          <View>
            <Text style={styles.title}>Créer mon histoire</Text>
            <Text style={styles.subtitle}>Personnalisée en 3 minutes</Text>
          </View>
          <Button
            title="Création de l'histoire"
            size="large"
            variant="primary"
            onPress={() => setFormStep(1)}
          />
        </View>
      )}
      {!isInitialStep && (
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.title}>Créer mon histoire</Text>
            <Text style={styles.subtitle}>Personnalisée en 3 minutes</Text>
          </View>
          <Button
            title="Création de l'histoire"
            size="large"
            variant="primary"
            onPress={() => setFormStep(1)}
          />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    color: Colors.textSleepieYellow,
    ...Typography.h1,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.textTitle,
    ...Typography.bodyMedium,
    textAlign: "center",
  },
  createContainer: {
    flex: 1,
    gap: Spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: Spacing.huge,
  },
});
