import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import { generationError, generationSuccess } from "../../reducers/createForm";
import { useEffect, useState } from "react";
import {
  updateShouldPlayAutomatically,
  updateTrack,
} from "../../reducers/track";
import { updateCreatedStories } from "../../reducers/stories";
import Stepper from "./Stepper";
import { backendUrl } from "../../modules/utils";

export default function WaitingStory() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const user = useSelector((state) => state.user.value);
  const { steps, otherparam } = form;
  const [currentStepLoader, setCurrentStepLoader] = useState(0);
  const [stopLoader, setStopLoader] = useState(false);
  function normalizeVoice(v) {
    return String(v)
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "") // retire les accents
      .toLowerCase()
      .trim();
  }

  const nbStepsLoader = 30000;

  useEffect(() => {
    if (stopLoader) return; // ne lance pas l'interval si on doit stopper

    const intervalId = setInterval(() => {
      setCurrentStepLoader((prev) => {
        const next = prev + 1000;

        // arrêt automatique si on atteint la fin
        if (next >= nbStepsLoader - 1000) {
          clearInterval(intervalId);
        }

        return next;
      });
    }, 1000);

    // cleanup si le composant se démonte (ex : modale fermée)
    return () => clearInterval(intervalId);
  }, [stopLoader]);

  // A l'initialisation du composant on lance le fetch pour générer une histoire
  useEffect(() => {
    (async function () {
      try {
        const body = {
          token: user.token,
          voice: normalizeVoice(steps[0].response),
          storyType: steps[1].response,
          protagonist: steps[2].response,
          location: steps[3].response,
          effect: steps[4].response,
          duration: steps[5].response,
          otherParam: otherparam,
        };
        const response = await fetch(`${backendUrl}/stories/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.result) {
          setStopLoader(true);
          dispatch(updateCreatedStories(data.story));
          dispatch(updateTrack({ ...data.story }));
          dispatch(updateShouldPlayAutomatically(false));
          dispatch(generationSuccess());
        }
      } catch (error) {
        console.log("Error happended while generating story", error);
        dispatch(generationError());
      }
    })();
  }, []);

  return (
    <View style={styles.main}>
      <ActivityIndicator size={100} color={Colors.textSleepieYellow} />
      <Text style={styles.text}>
        Veuillez patienter, nous générons votre histoire...
      </Text>
      <Stepper
        nbSteps={nbStepsLoader}
        currentStep={currentStepLoader}
        hideText={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...Typography.h3,
    color: Colors.textBody,
    textAlign: "center",
    padding: Spacing.huge,
  },
});
