import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import { updateIsFinished, updateIsGenerating } from "../../reducers/createForm";
import { useEffect } from "react";
import { updateTrack } from "../../reducers/track";
import { updateCreatedStories } from "../../reducers/stories";

const IP = process.env.EXPO_PUBLIC_IP;
const port = process.env.EXPO_PUBLIC_PORT;

export default function WaitingStory() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const user = useSelector((state) => state.user.value);
  const { steps } = form;

  // A l'initialisation du composant on lance le fetch pour générer une histoire
  useEffect(() => {
    (async function () {
      try {
        const body = {
          token: user.token,
          storyType: steps[0].response,
          protagonist: steps[1].response,
          location: steps[2].response,
          effect: steps[3].response,
          duration: steps[4].response,
        };
        const response = await fetch(`http://${IP}:${port}/stories/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.result) {
          console.log("Data story: ", data.story);
          dispatch(updateIsGenerating());
          dispatch(
            updateTrack({
              track: { ...data.story },
              shouldPlayAutomatically: false,
            })
          );
          dispatch(updateCreatedStories(data.story));
          dispatch(updateIsFinished());
        }
      } catch (error) {
        console.log("Error happended while generating story", error);
      }
    })();
  }, []);

  return (
    <View style={styles.main}>
      <ActivityIndicator size={100} color={Colors.textSleepieYellow} />
      <Text style={styles.text}>Veuillez patienter, nous générons votre histoire...</Text>
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
