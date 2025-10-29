import { StyleSheet, Pressable } from "react-native";
import { Colors } from "../KitUI/tokens";
import ChoiceCard from "./ChoiceCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStep, updateStep } from "../../reducers/createForm";

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
      title: "Chinois",
      subtitle:
        "Une marche, une traversée en train ou en bateau, un déplacement calme dans un paysage réel et apaisant.",
    },
    {
      title: "Carrouf",
      subtitle:
        "Le protagoniste croise une personne bienveillante qui partage une histoire, une philosophie de vie, une sagesse.",
    },
    {
      title: "Boulangerie ??",
      subtitle:
        "Le protagoniste revient dans un endroit chargé de souvenirs, redécouvre des émotions positives, se réconcilie avec lui-même.",
    },
    {
      title: "Kebab",
      subtitle:
        "Une histoire de reconnexion à soi, d’acceptation, de paix intérieure, à travers un voyage concret (retraite, bord de mer, montagne).",
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
        <Pressable key={index} onPress={() => handleChoice(choice.title)}>
          {/* 4. Passer la prop isFocused : true si le titre correspond à l'état */}
          <ChoiceCard
            title={choice.title}
            subtitle={choice.subtitle}
            isFocused={selectedCardTitle === choice.title}
          />
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.bgTertiarySolid,
  },
});
