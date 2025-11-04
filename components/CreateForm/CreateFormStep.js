import { Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../KitUI/Button";
import { updateCurrentStep } from "../../reducers/createForm";
import { formStyles } from "./CreateFormStyle";
import Stepper from "./Stepper";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";

export default function CreateFormStep({ stepComponent, title, subtitle, nbSteps }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const playbackState = usePlaybackState();
  const playerState = playbackState.state;

  const { currentStep } = form;
  // Si on a aucune valeur dans le redux on disable le button next
  const disableButton = !form.steps[currentStep - 1];

  const isVoiceStep = currentStep === 1;
  const isPlaying = playerState === State.Playing;

  async function handleNext() {
    dispatch(updateCurrentStep(currentStep + 1));
    // Si on clique sur suivant et qu'une voix est entrain d'être jouée, on la remet a zéro et on l'arrête
    if (isVoiceStep && isPlaying) {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.pause();
    }
  }

  return (
    <View style={formStyles.fullScreenContainer}>
      <ScrollView contentContainerStyle={formStyles.scrollViewContent}>
        <Stepper nbSteps={nbSteps} currentStep={currentStep} />
        <View style={formStyles.mainFormContainerScrollable}>
          <View>
            <Text style={formStyles.title}>{title}</Text>
            <Text style={formStyles.subtitle}>{subtitle}</Text>
          </View>
          <View style={formStyles.formContainer}>{stepComponent}</View>
        </View>
        {/* Un espace pour compenser la barre fixe du bas */}
        <View style={formStyles.spacerForFixedButtons} />
      </ScrollView>
      <View style={formStyles.nextBackContainer}>
        <Button
          title="Précédent"
          size="medium"
          variant="primary"
          onPress={() => dispatch(updateCurrentStep(currentStep - 1))}
        />
        <Button
          title="Suivant"
          size="medium"
          variant="primary"
          onPress={() => handleNext()}
          disable={disableButton}
        />
      </View>
    </View>
  );
}
