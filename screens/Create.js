import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Typography } from "../components/KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/KitUI/Button";
import { updateCurrentStep } from "../reducers/createForm";
import CreateFormStep from "../components/CreateForm/CreateFormStep";
import { formStyles } from "../components/CreateForm/CreateFormStyle";
import Step1 from "../components/CreateForm/Step1";
import Step2 from "../components/CreateForm/Step2";
import Step3 from "../components/CreateForm/Step3";
import Step4 from "../components/CreateForm/Step4";
import Step5 from "../components/CreateForm/Step5";
import Step6 from "../components/CreateForm/Step6";
import Step7 from "../components/CreateForm/Step7";
import WaitingStory from "../components/CreateForm/WaitingStory";
import { useEffect } from "react";
import { updateModalState } from "../reducers/modal";
import SubscribeModal from "../components/Create/SubscribeModal";
import SuccessModal from "../components/Create/SuccessModal";

const steps = [
  {
    title: "Choix de la voix",
    subtitle: "Quel type de voix souhaitez-vous entendre ?",
    stepComponent: <Step1 />,
  },
  {
    title: "Type d’histoire",
    subtitle: "Quel type d’histoire souhaitez-vous vivre ?",
    stepComponent: <Step2 />,
  },
  {
    title: "Protagoniste",
    subtitle: "Qui souhaitez-vous suivre ?",
    stepComponent: <Step3 />,
  },
  {
    title: "Univers / Lieu",
    subtitle: "Où se déroule l’histoire ?",
    stepComponent: <Step4 />,
  },
  {
    title: "Effet recherché",
    subtitle: "Vers quel état souhaitez-vous être guidé ?",
    stepComponent: <Step5 />,
  },
  {
    title: "Durée",
    subtitle: "Quelle durée pour votre histoire ?",
    stepComponent: <Step6 />,
  },
  {
    title: "Configuration",
    subtitle: "Quelle durée pour votre histoire ?",
    stepComponent: <Step7 />,
  },
];

export default function Create({ navigation }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const modal = useSelector((state) => state.modal.value);
  const { currentStep, isGenerating, isFinished } = form;
  const isInitialStep = currentStep === 0;
  const isPartiallyFilled = form.steps.length > 0;
  const displayModal = modal.modalState && isFinished;

  useEffect(() => {
    if (isFinished) {
      // On vient set a true pour quand on va naviguer sur la home afficher direct la modal en pleine ecran avec le player
      dispatch(updateModalState(true));
    }
  }, [isFinished]);

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
            title={!isPartiallyFilled ? "Création de l'histoire" : "Reprendre mon histoire"}
            size="large"
            variant="primary"
            onPress={() => dispatch(updateCurrentStep(1))}
          />
        </View>
      )}
      {!isInitialStep && !isGenerating && !isFinished && (
        <CreateFormStep {...steps[currentStep - 1]} nbSteps={steps.length} />
      )}
      {isGenerating && !isFinished && <WaitingStory />}
      <SuccessModal navigation={navigation} displayModal={displayModal} />
      <SubscribeModal navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  text: {
    ...Typography.body,
    color: Colors.textBody,
    textAlign: "center",
  },
});
