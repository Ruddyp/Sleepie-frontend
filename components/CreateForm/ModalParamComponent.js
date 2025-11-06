import { StyleSheet, View, Modal, Dimensions, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import ModalCharacterComponent from "./ModalCharacterComponent";
import ModalWeatherComponent from "./ModalWeatherComponent";
import { useState } from "react";

const windowHeight = Dimensions.get("window").height;
export default function ModalParamComponent({ isOpen, setIsOpen }) {
  const form = useSelector((state) => state.createForm.value);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isCharacterNameOpen, setIsCharacterNameOpen] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <LinearGradient
        colors={Colors.bgPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomSheet, { height: windowHeight }]}
      >
        <View style={styles.mainModalContainer}>
          <View style={styles.middleModalContainer}>
            <Text style={styles.titlemodal}>AUTRES PARAMETRES</Text>
            <TouchableOpacity onPress={() => setIsCharacterNameOpen(true)}>
              <View style={styles.optioncontainer}>
                <Text style={styles.titleparam}>CHOIX DU PERSONNAGE</Text>
                <Ionicons name="people" size={Spacing.xxl} color={Colors.textBody} />
                {form.otherparam.characterName && (
                  <Ionicons name="checkmark-circle" size={Spacing.xxl} color="green" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsWeatherOpen(true)}>
              <View style={styles.optioncontainer}>
                <Text style={styles.titleparam}>CHOIX DE LA METEO </Text>
                <Ionicons name="partly-sunny" size={Spacing.xxl} color={Colors.textBody} />
                {form.otherparam.weather && (
                  <Ionicons name="checkmark-circle" size={Spacing.xxl} color="green" />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomModalContainer}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons
                name="close-circle-outline"
                size={Spacing.maximale}
                color={Colors.textBody}
              />
            </TouchableOpacity>
          </View>
          <View>
            <ModalCharacterComponent
              isCharacterNameOpen={isCharacterNameOpen}
              setIsCharacterNameOpen={setIsCharacterNameOpen}
            />
            <ModalWeatherComponent
              isWeatherOpen={isWeatherOpen}
              setIsWeatherOpen={setIsWeatherOpen}
            />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bottomModalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainModalContainer: {
    width: "100%",
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  middleModalContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    paddingTop: 20,
    gap: 20,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  titlemodal: {
    color: Colors.textTitle,
    ...Typography.h2,
    paddingBottom: 30,
  },
  titleparam: {
    color: Colors.textTitle,
    ...Typography.body,
  },
  optioncontainer: {
    width: "85%",
    backgroundColor: Colors.bgTertiarySolid,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
