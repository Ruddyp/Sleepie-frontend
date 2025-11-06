import { StyleSheet, View, Modal, Dimensions, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateParamCharacter } from "../../reducers/createForm";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useState } from "react";
import Button from "../KitUI/Button";
import Input from "../KitUI/Input";

const windowHeight = Dimensions.get("window").height;
export default function ModalCharacterComponent({ isCharacterNameOpen, setIsCharacterNameOpen }) {
  const form = useSelector((state) => state.createForm.value);
  const initialValue = form.otherparam?.characterName || "";
  const [characterName, setCharacterName] = useState(initialValue);
  const [errorInput, setErrorInput] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    const regex = /[a-zA-Z0-9-]/g;
    if (regex.test(characterName)) {
      dispatch(updateParamCharacter(characterName));
      setIsCharacterNameOpen(false);
    } else {
      setErrorInput("Seules les lettres, chiffres, espaces et tirets sont autorisés");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCharacterNameOpen}
      onRequestClose={() => setIsCharacterNameOpen(false)}
    >
      <LinearGradient
        colors={Colors.bgPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomSheet, { height: windowHeight }]}
      >
        <View style={styles.mainModalContainer}>
          <View style={styles.middleModalContainer}>
            <Text style={styles.titlemodal}>CHOIX DU PERSONNAGE</Text>
            <Input
              placeholder={form.otherparam?.characterName || "Nom de ton personnage"}
              value={characterName}
              onChangeText={(characterName) => setCharacterName(characterName)}
              secureTextEntry={false}
              maxLength={20}
              error={errorInput}
            ></Input>
            <Button
              disable={characterName ? false : true}
              title="Sauvegarder"
              onPress={() => handleClick()}
            />
          </View>
          <View style={styles.bottomModalContainer}>
            <TouchableOpacity onPress={() => setIsCharacterNameOpen(false)}>
              <Ionicons
                name="close-circle-outline"
                size={Spacing.maximale}
                color={Colors.textBody}
              />
            </TouchableOpacity>
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
    width: "90%",
    height: "80%",
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
    width: 300,
    backgroundColor: Colors.bgTertiarySolid,
    borderRadius: 10,
    padding: 20,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
