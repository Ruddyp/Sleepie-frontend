import { StyleSheet, Pressable, View } from "react-native";
import ChoiceCard from "./ChoiceCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../reducers/createForm";
import { Spacing } from "../KitUI/tokens";

export default function Step5() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep, steps } = form;
  const intialValue = steps[currentStep - 1]?.response;

  // Dans le cas ou le user a deja rempli on utilise ce qu'il a rempli sinon on met null
  const [selectedCardTitle, setSelectedCardTitle] = useState(
    intialValue || null
  );

  // Définir les données des cartes
  const choices = [
    {
      title: "Réaliste",
      subtitle: "Une histoire simple et ancrée dans le réel.",
      icon: "🍵",
    },
    {
      title: "Méditative ",
      subtitle: "Une histoire centrée sur les sensations.",
      icon: "🧘‍♂️",
    },
    {
      title: "Introspective ",
      subtitle: "Une histoire intérieure, guidée par la pensée.",
      icon: "🌬",
    },
    {
      title: "Imaginaire",
      subtitle: "Glisser vers un univers apaisant et merveilleux.",
      icon: "🌌",
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
        <Pressable
          key={index}
          onPress={() => handleChoice(choice.title)}
          style={styles.pressable}
        >
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
