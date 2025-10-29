import { StyleSheet, Pressable } from "react-native";
import ChoiceCard from "./ChoiceCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../reducers/createForm";

export default function Step4() {
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
      title: "Sécurité et apaisement",
    },
    {
      title: "Lâcher-prise",
    },
    {
      title: "Réconciliation intérieure",
    },
    {
      title: "Sentiment d’émerveillement",
    },
  ];

  function handleChoice(title) {
    dispatch(updateStep({ currentStep: form.currentStep, response: title }));
    setSelectedCardTitle(title);
  }

  return (
    <>
      {choices.map((choice, index) => (
        // 2. Utiliser TouchableWithoutFeedback pour rendre la carte cliquable
        <Pressable key={index} onPress={() => handleChoice(choice.title)} style={styles.main}>
          {/* 4. Passer la prop isFocused : true si le titre correspond à l'état */}
          <ChoiceCard
            title={choice.title}
            subtitle={choice.subtitle}
            isFocused={selectedCardTitle === choice.title}
            icon={choice.icon}
          />
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
