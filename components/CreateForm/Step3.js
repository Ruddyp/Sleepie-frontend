import { StyleSheet, Pressable, View } from "react-native";
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
  const intialValue = steps[currentStep - 1]?.response;

  // Dans le cas ou le user a deja rempli on utilise ce qu'il a rempli sinon on met null
  const [selectedCardTitle, setSelectedCardTitle] = useState(
    intialValue || null
  );

  // Définir les données des cartes
  const choices = [
    {
      title: "🌊 Près de la mer",
      subtitle: "L’air salé, le souffle du vent, les vagues régulières.",
    },
    {
      title: "🌲 Dans la nature",
      subtitle:
        "Forêts, montagnes, sentiers, lacs, plaines — des paysages vastes et vivants.",
    },
    {
      title: "🏡 À la campagne ou dans un village",
      subtitle:
        "La douceur d’un environnement calme, loin de l’agitation urbaine.",
    },
    {
      title: "✨ Dans un lieu imaginaire ",
      subtitle: "Un endroit inventé, magique, hors du temps.",
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
