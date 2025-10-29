import { StyleSheet, Pressable } from "react-native";
import ChoiceCard from "./ChoiceCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../reducers/createForm";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "../KitUI/tokens";

export default function Step3() {
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
      title: "Balade forêstière",
      icon: <Ionicons name="leaf" size={Spacing.xxl} color={Colors.textBody} />,
    },
    {
      title: "Crique aux reflets azur",
      icon: <Ionicons name="boat" size={Spacing.xxl} color={Colors.textBody} />,
    },
    {
      title: "Village de pêcheur",
      icon: <Ionicons name="fish" size={Spacing.xxl} color={Colors.textBody} />,
    },
    {
      title: "Cîmes verdoyantes",
      icon: <Ionicons name="flower" size={Spacing.xxl} color={Colors.textBody} />,
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
