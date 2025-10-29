import { StyleSheet, Pressable, View } from "react-native";
import ChoiceCard from "./ChoiceCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../reducers/createForm";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "../KitUI/tokens";

export default function Step2() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep, steps } = form;

  // Dans le cas ou le user a deja rempli on utilise ce qu'il a rempli sinon on met null
  const [selectedCardTitle, setSelectedCardTitle] = useState(
    steps[currentStep - 1] !== undefined ? steps[currentStep - 1].response : null
  );
  console.log({ selectedCardTitle });

  // Définir les données des cartes
  const choices = [
    {
      title: "Un homme",
      icon: <Ionicons name="male" size={Spacing.xxl} color={"cornflowerblue"} />,
    },
    {
      title: "Une femme",
      icon: <Ionicons name="female" size={Spacing.xxl} color={"pink"} />,
    },
    {
      title: "Narrateur neutre",
      icon: <Ionicons name="person" size={Spacing.xxl} color={"darkgray"} />,
    },
  ];

  function handleChoice(title) {
    dispatch(updateStep({ currentStep: form.currentStep, response: title }));
    setSelectedCardTitle(title);
  }

  return (
    <View style={styles.main}>
      {choices.map((choice, index) => (
        // 2. Utiliser TouchableWithoutFeedback pour rendre la carte cliquable
        <Pressable key={index} onPress={() => handleChoice(choice.title)} style={styles.pressable}>
          {/* 4. Passer la prop isFocused : true si le titre correspond à l'état */}
          <ChoiceCard
            title={choice.title}
            subtitle={choice.subtitle}
            isFocused={selectedCardTitle === choice.title}
            icon={choice.icon}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    gap: Spacing.lg,
  },
  pressable: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
