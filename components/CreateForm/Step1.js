import { StyleSheet, Pressable, View } from "react-native";
import ChoiceCard from "./ChoiceCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../reducers/createForm";
import { Spacing } from "../KitUI/tokens";

export default function Step1() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep, steps } = form;
  const intialValue = steps[currentStep - 1]?.response;

  // Dans le cas ou le user a deja rempli on utilise ce qu'il a rempli sinon on met null
  const [selectedCardTitle, setSelectedCardTitle] = useState(intialValue || null);

  // Définir les données des cartes
  const choices = [
    {
      title: "Voyage apaisant dans la nature",
      subtitle:
        "Une marche, une traversée en train ou en bateau, un déplacement calme dans un paysage réel et apaisant.",
    },
    {
      title: "Rencontre inspirante et humaine",
      subtitle:
        "Le protagoniste croise une personne bienveillante qui partage une histoire, une philosophie de vie, une sagesse.",
    },
    {
      title: "Retour à un lieu du passé",
      subtitle:
        "Le protagoniste revient dans un endroit chargé de souvenirs, redécouvre des émotions positives, se réconcilie avec lui-même.",
    },
    {
      title: "Quête de sens intérieur",
      subtitle:
        "Une histoire de reconnexion à soi, d’acceptation, de paix intérieure, à travers un voyage concret (retraite, bord de mer, montagne).",
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
