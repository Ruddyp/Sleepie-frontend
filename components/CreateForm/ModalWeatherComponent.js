import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateParamWeather } from "../../reducers/createForm";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useState } from "react";
import Button from "../KitUI/Button";
import ChoiceCard from "./ChoiceCard";

const choices = [
  {
    title: "Ensoleillé",
    subtitle: "Ambiance chaude, .",
    icon: <Ionicons name="sunny" size={24} color="#FFD700" />,
  },
  {
    title: "Pluie",
    subtitle: "Ambiance pluvieuse.",
    icon: <Ionicons name="rainy" size={24} color="#00BFFF" />,
  },
  {
    title: "Venteux",
    subtitle: "Grand vents au sommet d'une montagne ou dans une prairie.",
    icon: <Ionicons name="leaf" size={24} color="#A9A9A9" />,
  },
];

const windowHeight = Dimensions.get("window").height;
export default function ModalWeatherComponent({ isWeatherOpen, setIsWeatherOpen }) {
  const form = useSelector((state) => state.createForm.value);
  const dispatch = useDispatch();
  const initialValue = form.otherparam?.weather || null;
  const [selectedCardTitle, setSelectedCardTitle] = useState(initialValue);

  const handleClick = () => {
    dispatch(updateParamWeather(selectedCardTitle));
    setIsWeatherOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isWeatherOpen}
      onRequestClose={() => setIsWeatherOpen(false)}
    >
      <LinearGradient
        colors={Colors.bgPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomSheet, { height: windowHeight }]}
      >
        <View style={styles.mainModalContainer}>
          <View style={styles.middleModalContainer}>
            <Text style={styles.titlemodal}>CHOIX DE LA METEO </Text>
            <View style={styles.choice}>
              {choices.map((choice, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedCardTitle(choice.title)}
                  style={styles.pressable}
                >
                  <ChoiceCard
                    title={choice.title}
                    subtitle={choice.subtitle}
                    isFocused={selectedCardTitle === choice.title}
                    icon={choice.icon}
                  />
                </Pressable>
              ))}
            </View>
            <Button
              disable={selectedCardTitle ? false : true}
              title="Sauvegarder"
              onPress={() => handleClick()}
            />
          </View>
          <View style={styles.bottomModalContainer}>
            <TouchableOpacity onPress={() => setIsWeatherOpen(false)}>
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
  choice: {
    gap: 10,
  },
  pressable: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
