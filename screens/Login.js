import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Switch,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { BorderRadius, Colors, Sizes, Spacing, Typography } from "../components/KitUI/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

export default function Login({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <LinearGradient
        colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.main}
      >
        <View style={styles.optionsContainer}>
          <Pressable
            style={[
              styles.buttonLeft,
              { backgroundColor: isEnabled ? Colors.bgPrimarySolid : Colors.bgSleepieBlue2 },
            ]}
            onPress={() => setIsEnabled(false)}
          >
            <Text style={styles.textButton}>Créer</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonRight,
              { backgroundColor: !isEnabled ? Colors.bgPrimarySolid : Colors.bgSleepieBlue2 },
            ]}
            onPress={() => setIsEnabled(true)}
          >
            <Text style={styles.textButton}>Connexion</Text>
          </Pressable>
        </View>
        {!isEnabled ? (
          //affichage du SignUp
          <SignUp navigation={navigation} />
        ) : (
          //affichage du signIn
          <SignIn navigation={navigation} />
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
  },
  errorMessage: {
    color: Colors.textTitle,
    ...Typography.body,
    fontFamily: Typography.fontBody,
  },
  textToggle: {
    color: Colors.textTitle,
    fontFamily: Typography.fontHeading,
    ...Typography.h2,
  },
  buttonLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  buttonRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  optionsContainer: {
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.bgSleepieBlue2,
    flexDirection: "row",
    height: Sizes.buttonDefault,
    width: "70%",
    borderRadius: BorderRadius.xlarge,
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden",
    borderColor: Colors.textSecondary,
    borderWidth: 1,
  },
  textButton: {
    color: Colors.textTitle,
    fontFamily: Typography.fontHeading,
    ...Typography.h3,
  },
});
