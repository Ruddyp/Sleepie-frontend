import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Spacing } from "../KitUI/tokens";
import VoicePlayer from "../Player/VoicePlayer";

export default function Step1() {
  const form = useSelector((state) => state.createForm.value);
  const { currentStep, steps } = form;
  const intialValue = steps[currentStep - 1]?.response;

  // Dans le cas ou le user a deja rempli on utilise ce qu'il a rempli sinon on met null
  const [selectedVoice, setSelectedVoice] = useState(intialValue || null);

  const choices = [
    {
      voice: "Clément",
      url: "https://res.cloudinary.com/dzwgrfwif/video/upload/v1762250342/Clement_sample_hsvusq.mp3",
      icon: "👨",
    },
    {
      voice: "Emilie",
      url: "https://res.cloudinary.com/dzwgrfwif/video/upload/v1762250342/Emilie_sample_pzsugo.mp3",
      icon: "👩",
    },
    {
      voice: "Nicolas",
      url: "https://res.cloudinary.com/dzwgrfwif/video/upload/v1762250342/Nicolas_sample_sgmt1z.mp3",
      icon: "👨‍🦱",
    },
    {
      voice: "Sandra",
      url: "https://res.cloudinary.com/dzwgrfwif/video/upload/v1762251027/Sandra_sample_pysjgj.mp3",
      icon: "👩‍🦳",
    },
  ];

  return (
    <View style={styles.main}>
      {choices.map((choice, index) => (
        <VoicePlayer
          key={`${choice.voice}-${index}`}
          {...choice}
          _id={`${choice.voice}-${index}`}
          form={form}
          selectedVoice={selectedVoice}
          setSelectedVoice={setSelectedVoice}
          icon={choice.icon}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.lg,
  },
});
