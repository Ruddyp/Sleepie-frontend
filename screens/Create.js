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
import SubscribeModal from "../components/Create/SubscribeModal";
import SuccessModal from "../components/Create/SuccessModal";
import ErrorModal from "../components/Create/ErrorModal";

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

export default function Create() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep, generationStatus } = form;
  const isInitialStep = currentStep === 0 && generationStatus === "initial";
  const isPartiallyFilled = form.steps.length > 0;

  function getFormContent() {
    if (isInitialStep)
      return (
        <View style={formStyles.createContainer}>
          <View>
            <Text style={formStyles.title}>Créer mon histoire</Text>
            <Text style={formStyles.subtitle}>Personnalisée en 3 minutes</Text>
          </View>
          <Button
            title={
              !isPartiallyFilled
                ? "Création de l'histoire"
                : "Reprendre mon histoire"
            }
            size="large"
            variant="primary"
            onPress={() => dispatch(updateCurrentStep(1))}
          />
        </View>
      );

    switch (generationStatus) {
      case "initial":
        return (
          <CreateFormStep {...steps[currentStep - 1]} nbSteps={steps.length} />
        );
      case "generating":
        return <WaitingStory />;
      case "success":
        return <SuccessModal />;
      case "error":
        return <ErrorModal />;
    }
  }
  const formContent = getFormContent();

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      {formContent}
      <SubscribeModal />
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
