import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/KitUI/Button";
import { resetCreateForm, updateCurrentStep } from "../reducers/createForm";
import CreateFormStep from "../components/CreateForm/CreateFormStep";
import { formStyles } from "../components/CreateForm/CreateFormStyle";
import Step1 from "../components/CreateForm/Step1";
import Step2 from "../components/CreateForm/Step2";
import Step3 from "../components/CreateForm/Step3";
import Step4 from "../components/CreateForm/Step4";
import Step5 from "../components/CreateForm/Step5";
import Step6 from "../components/CreateForm/Step6";
import WaitingStory from "../components/CreateForm/WaitingStory";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { updateModalState } from "../reducers/modal";
import { updateTrack } from "../reducers/track";

const steps = [
  {
    title: "Type d’histoire",
    subtitle: "Quel type d’histoire souhaitez-vous vivre ?",
    stepComponent: <Step1 />,
  },
  {
    title: "Protagoniste",
    subtitle: "Qui souhaitez-vous suivre ?",
    stepComponent: <Step2 />,
  },
  {
    title: "Univers / Lieu",
    subtitle: "Où se déroule l’histoire ?",
    stepComponent: <Step3 />,
  },
  {
    title: "Effet recherché",
    subtitle: "Vers quel état souhaitez-vous être guidé ?",
    stepComponent: <Step4 />,
  },
  {
    title: "Durée",
    subtitle: "Quelle durée pour votre histoire ?",
    stepComponent: <Step5 />,
  },
  {
    title: "Configuration",
    subtitle: "Quelle durée pour votre histoire ?",
    stepComponent: <Step6 />,
  },
];

export default function Create({ navigation }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const trackData = useSelector((state) => state.track.value);
  const modal = useSelector((state) => state.modal.value);
  const { currentStep, isGenerating, isFinished } = form;
  const isInitialStep = currentStep === 0;
  const isPartiallyFilled = form.steps.length > 0;
  const windowHeight = Dimensions.get("window").height;
  const displayModal = modal.modalState && isFinished;

  useEffect(() => {
    if (isFinished) {
      // On vient set a true pour quand on va naviguer sur la home afficher direct la modal en pleine ecran avec le player
      dispatch(updateModalState(true));
    }
  }, [isFinished]);

  function handleClose(type) {
    if (type === "start") {
      // Quand on appuie sur le bouton Ecoutez votre histoire on lance l'histoire automatiquement
      dispatch(updateTrack({ track: { ...trackData.track }, shouldPlayAutomatically: true }));
    }
    // On reset les params de create form
    dispatch(resetCreateForm());
    navigation.navigate("home");
  }
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
        <CreateFormStep {...steps[currentStep - 1]} />
      )}
      {isGenerating && !isFinished && <WaitingStory />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={displayModal}
        onRequestClose={() => handleClose()}
      >
        <LinearGradient
          colors={Colors.bgPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bottomSheet, { height: windowHeight }]}
        >
          <View style={styles.mainModalContainer}>
            <View>
              <Text></Text>
            </View>
            <View style={styles.middleModalContainer}>
              <Ionicons name="checkmark-circle" size={Spacing.maximale} color={Colors.success} />
              <View>
                <Text style={styles.text}>Votre histoire a bien été générée.</Text>
                <Text style={styles.text}>Retrouvez-la dans vos favoris.</Text>
              </View>

              <Button
                title={"Ecoutez votre histoire"}
                size="large"
                variant="primary"
                onPress={() => handleClose("start")}
              />
            </View>
            <View style={styles.bottomModalContainer}>
              <TouchableOpacity onPress={() => handleClose("close")}>
                <Ionicons
                  name="close-circle-outline"
                  size={Spacing.maximale}
                  color={Colors.textBody}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bottomModalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainModalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  middleModalContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.huge,
    paddingHorizontal: Spacing.lg,
  },
  text: {
    ...Typography.body,
    color: Colors.textBody,
    textAlign: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
});
