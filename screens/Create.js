import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/KitUI/Button";
import { updateCurrentStep } from "../reducers/createForm";
import CreateFormStep from "../components/CreateForm/CreateFormStep";
import { formStyles } from "../components/CreateForm/CreateFormStyle";
import Step1 from "../components/CreateForm/Step1";
import Step2 from "../components/CreateForm/Step2";

const steps = [
  {
    title: "Type d’histoire",
    subtitle: "Quel type d’histoire souhaitez-vous vivre ?",
    stepComponent: <Step1 />,
  },
  {
    title: "On mange quoi?",
    subtitle: "Quel type de nourriture",
    stepComponent: <Step2 />,
  },
  {
    title: "Type d’histoire",
    subtitle: "Quel type d’histoire souhaitez-vous vivre ?",
    stepComponent: <Text>aefaefafaefaefaefaefaefaefae</Text>,
  },
];

export default function Create() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  console.log("Form", form);
  const { currentStep } = form;
  const isInitialStep = currentStep === 0;
  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      {isInitialStep && (
        <View style={formStyles.createContainer}>
          <View>
            <Text style={formStyles.title}>Créer mon histoire</Text>
            <Text style={formStyles.subtitle}>Personnalisée en 3 minutes</Text>
          </View>
          <Button
            title="Création de l'histoire"
            size="large"
            variant="primary"
            onPress={() => dispatch(updateCurrentStep(1))}
          />
        </View>
      )}
      {!isInitialStep && <CreateFormStep {...steps[currentStep - 1]} />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
