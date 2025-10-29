import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../reducers/createForm";
import Slider from "@react-native-community/slider";
import { Colors, Spacing, Typography } from "../KitUI/tokens";

export default function Step5() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep, steps } = form;
  // Dans le cas ou le user a deja rempli on utilise ce qu'il a rempli sinon on met 5
  const [position, setPosition] = useState(
    steps[currentStep - 1] !== undefined ? steps[currentStep - 1].response : 5
  );

  useEffect(() => {
    dispatch(updateStep({ currentStep: form.currentStep, response: position }));
  }, [position]);

  return (
    <View style={styles.main}>
      <Slider
        minimumValue={5}
        maximumValue={30}
        value={position}
        onSlidingComplete={(value) => setPosition(value)}
        minimumTrackTintColor={Colors.accentPrimarySolid}
        maximumTrackTintColor={Colors.textTitle}
        thumbTintColor={Colors.textSleepieYellow}
        step={5}
        style={styles.slider}
        renderStepNumber
      />
      <Text style={styles.text}>{position}min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.huge,
  },
  slider: {
    width: "100%",
  },
  text: {
    ...Typography.body,
    color: Colors.textBody,
  },
});
