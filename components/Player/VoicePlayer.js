import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "../KitUI/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import TrackPlayer, {
  useTrackPlayerEvents,
  useActiveTrack,
  usePlaybackState,
  Event,
  State,
} from "react-native-track-player";
import { useDispatch } from "react-redux";
import { updateTrack } from "../../reducers/track";
import { updateStep } from "../../reducers/createForm";
import { voices } from "../../modules/constant";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const events = [
  Event.RemotePlay,
  Event.RemotePause,
  Event.RemotePlayPause,
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

export default function VoicePlayer({
  voice,
  gender,
  _id,
  url,
  form,
  selectedVoice,
  setSelectedVoice,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const playerState = playbackState.state;
  const activeTrack = useActiveTrack();
  const { id } = activeTrack || {};
  const { currentStep, steps } = form;

  useEffect(() => {
    // La fonction `addListener('blur', ...)` se déclenche lorsque l'écran
    // perd le focus (lorsque l'utilisateur navigue vers un autre écran).
    const unsubscribe = navigation.addListener("blur", async () => {
      console.log("L'utilisateur a quitté l'écran. Exécution du code de nettoyage.");
      const track = await TrackPlayer.getActiveTrack();
      // Si on quitte l'écran Create on reset le trackplayer pour enlever les sample de choix des voix
      // Et on met a jour le redux track avec null
      if (voices.includes(track?.title)) {
        await TrackPlayer.reset();
        dispatch(
          updateTrack({
            track: {
              _id: null,
              title: null,
              author: null,
              url: null,
            },
            shouldPlayAutomatically: false,
          })
        );
      }
    });

    // désabonne l'écouteur lorsque le composant est démonté.
    return unsubscribe;
  }, [navigation]);

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
  });

  const isPlaying = playerState === State.Playing;
  const isEnded = playerState === State.Ended;

  async function handlePlay() {
    // On met a jour le redux que si la voix choisi est différent dans le redux et on change la track
    if (steps[currentStep - 1]?.response !== voice || id !== _id) {
      setSelectedVoice(voice);
      dispatch(
        updateTrack({
          track: {
            _id: _id,
            title: voice,
            author: { username: "Sleepie" },
            url: url,
          },
          shouldPlayAutomatically: true,
        })
      );
      dispatch(updateStep({ currentStep: currentStep, response: voice }));
      return;
    }

    if (isEnded) {
      console.log("Action: Restart");
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    }

    if (isPlaying) {
      console.log("Action: Pause");
      await TrackPlayer.pause();
    } else {
      console.log("Action: Lecture");
      await TrackPlayer.play();
    }
  }

  const iconGender =
    gender === "male" ? (
      <Ionicons name="male" size={Spacing.xxxl} color={Colors.info} />
    ) : (
      <Ionicons name="female" size={Spacing.xxxl} color={"lightpink"} />
    );

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
            {isPlaying && id === _id ? (
              <Ionicons name="pause" size={Spacing.xxxl} color={Colors.textTitle} />
            ) : (
              <Ionicons name="play" size={Spacing.xxxl} color={Colors.textTitle} />
            )}
          </View>
          <View style={styles.textContainer}>
            {iconGender}
            <Text style={styles.title}>{voice}</Text>
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
    gap: Spacing.sm,
  },
});
