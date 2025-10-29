import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Switch, TouchableOpacity, Pressable } from "react-native";
import { BorderRadius, Colors, Spacing, Typography } from "../components/KitUI/tokens";
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
            onPress={() => setIsEnabled(false)}>
            <Text style={styles.textButton}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonRight,
              { backgroundColor: !isEnabled ? Colors.bgPrimarySolid : Colors.bgSleepieBlue2 }
            ]}
            onPress={() => setIsEnabled(true)}>
            <Text style={styles.textButton}>Sign In</Text>
          </Pressable>

        </View>
        {/* <View style={styles.switchContainer}>
          <Text style={styles.textToggle}>Sign Up</Text>
          <Switch
            trackColor={{ false: Colors.textTitle, true: Colors.textSecondary }}
            thumbColor={isEnabled ? Colors.textTitle : Colors.textSecondary}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled((previousState) => !previousState)}
            value={isEnabled}
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          />
          <Text style={styles.textToggle}>Sign In</Text>
        </View> */}
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
  // switchContainer: {
  //   width: "100%",
  //   height: "100",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 40,
  //   padding: 0,
  //   flexDirection: "row",
  //   marginTop: 20,
  // },
  textToggle: {
    color: Colors.textTitle,
    fontFamily: Typography.fontHeading,
    ...Typography.h2,
  },
  container: {
    padding: 30,
    justifyContent: "center",
    gap: 15,
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
    marginTop: Spacing.maximale,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.bgSleepieBlue2,
    flexDirection: "row",
    height: 70,
    width: "80%",
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
    ...Typography.h2,
  }
});
