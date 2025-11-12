import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "../KitUI/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import TrackPlayer, { useActiveTrack, State } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTrack,
  updatePlaybackState,
  updateShouldPlayAutomatically,
  updateTrack,
} from "../../reducers/track";
import { updateStep } from "../../reducers/createForm";
import { voices } from "../../modules/constant";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function VoicePlayer({
  icon,
  voice,
  _id,
  url,
  form,
  selectedVoice,
  setSelectedVoice,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const activeTrack = useActiveTrack();
  const trackData = useSelector((state) => state.track.value);
  const { playbackState } = trackData;
  const { currentStep } = form;

  useFocusEffect(
    useCallback(() => {
      return async () => {
        const track = await TrackPlayer.getActiveTrack();
        // Si on quitte l'écran Create on reset le trackplayer pour enlever les sample de choix des voix
        // Et on met a jour le redux track avec null
        if (voices.includes(track?.title)) {
          dispatch(resetTrack());
        }
      };
    }, [navigation])
  );

  const isPlaying = activeTrack?.id === _id && playbackState === State.Playing;
  const isPaused =
    activeTrack?.id === _id &&
    (playbackState === State.Paused || playbackState === State.Ready);
  const isEnded = activeTrack?.id === _id && playbackState === State.Ended;

  function handlePlay() {
    // On met a jour le redux que si la voix choisi est différent dans le redux et on change la track
    if (activeTrack?.id !== _id) {
      dispatch(
        updateTrack({
          _id: _id,
          title: voice,
          author: { username: "Sleepie" },
          url: url,
        })
      );
      dispatch(updateShouldPlayAutomatically(true));
      dispatch(updateStep({ currentStep: currentStep, response: voice }));
      setSelectedVoice(voice);
    }

    if (isPlaying) {
      dispatch(updatePlaybackState(State.Paused));
    }
    if (isPaused || isEnded) {
      dispatch(updatePlaybackState(State.Playing));
    }
  }

  const focusedVoice = selectedVoice === voice;

  return (
    <LinearGradient
      colors={Colors.bgTertiary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.main,
        focusedVoice && {
          borderColor: Colors.textBody,
          borderWidth: 1.5,
          borderRadius: BorderRadius.large,
        },
      ]}
    >
      <Pressable onPress={() => handlePlay()}>
        <View style={styles.miniPlayerContainer}>
          <View style={styles.playContainer}>
            {isPlaying ? (
              <Ionicons
                name="pause"
                size={Spacing.xxxl}
                color={Colors.textTitle}
              />
            ) : (
              <Ionicons
                name="play"
                size={Spacing.xxxl}
                color={Colors.textTitle}
              />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {icon} {voice}
            </Text>
          </View>
        </View>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
  },
  miniPlayerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    ...Typography.body,
    fontSize: 18,
    color: Colors.textBody,
  },
  playContainer: {
    width: "15%",
  },
  textContainer: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
});
