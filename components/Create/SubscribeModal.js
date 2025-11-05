import { StyleSheet, Text, View, Modal } from "react-native";
import { BorderRadius, Colors, Spacing, Typography } from "../KitUI/tokens";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../KitUI/Button";

export default function SubscribeModal({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const user = useSelector((state) => state.user.value);

  useFocusEffect(
    useCallback(() => {
      getRole();
    }, [])
  );

  async function getRole() {
    const body = {
      token: user.token,
    };
    try {
      const response = await fetch(`http://${IP}:${port}/rights/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.result) {
        if (data.role === "user") return setIsOpen(true);
        if (data.role === "premium") return setIsOpen(false);
      }
    } catch (error) {
      console.log({ result: false, message: error.message });
    }
  }

  function handleNavigate(page) {
    setIsOpen(false);
    navigation.navigate("TabNavigator", { screen: page });
  }

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade">
      <View style={styles.mainContainer}>
        <View style={styles.subscribeContainer}>
          <Text style={styles.text}>Abonnez-vous pour accéder à la création d'histoire</Text>
          <View style={styles.buttonContainer}>
            <Button title="S'abonner" variant="primary" onPress={() => handleNavigate("profil")} />
            <Button title="Retour" variant="secondary" onPress={() => handleNavigate("home")} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.audioWave,
    alignItems: "center",
    justifyContent: "center",
  },
  subscribeContainer: {
    backgroundColor: Colors.bgSecondarySolid,
    width: "80%",
    height: "45%",
    borderRadius: BorderRadius.small,
    justifyContent: "space-around",
    alignItems: "center",
    padding: Spacing.xl,
  },
  text: {
    ...Typography.h4,
    color: Colors.textBody,
    textAlign: "center",
  },
  buttonContainer: {
    gap: Spacing.xl,
  },
});
