import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Sizes,
} from "../KitUI/tokens";
import { State } from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaybackState, updateSeekTo } from "../../reducers/track";
export default function PlayerControls({ duration, position }) {
  const trackData = useSelector((state) => state.track.value);
  const { playbackState } = trackData;
  const dispatch = useDispatch();

  const isPlaying = playbackState === State.Playing;
  const isEnded = playbackState === State.Ended;
  const isPaused = playbackState === State.Paused;

  // Gestion du bouton play/pause
  async function handlePlay() {
    if (isPlaying) {
      dispatch(updatePlaybackState(State.Paused));
    }
    if (isPaused || isEnded) {
      dispatch(updatePlaybackState(State.Playing));
    }
  }

  // Gestion de -10 secondes sur la track
  function handlePlayBack() {
    const newPosition = position - 10 >= 0 ? position - 10 : 0;
    dispatch(updateSeekTo(newPosition));
  }

  // Gestion de +10 secondes sur la track
  function handlePlayForward() {
    const newPosition = position + 10 <= duration ? position + 10 : duration;
    dispatch(updateSeekTo(newPosition));
  }
  return (
    <>
      <TouchableOpacity
        style={styles.controlButton}
        activeOpacity={0.8}
        onPress={() => handlePlayBack()}
      >
        <Ionicons
          name="refresh"
          size={Spacing.xxl}
          color={Colors.textBody}
          style={{ transform: [{ scaleX: -1 }] }}
        />
        <Text style={styles.controlIcon}>-10s</Text>
      </TouchableOpacity>

      <LinearGradient
        colors={[Colors.accentPrimary[0], Colors.accentPrimary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.playButton}
      >
        <TouchableOpacity onPress={() => handlePlay()} activeOpacity={0.8}>
          <Text style={styles.playIcon}>
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
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity
        style={styles.controlButton}
        activeOpacity={0.8}
        onPress={() => handlePlayForward()}
      >
        <Ionicons name="refresh" size={Spacing.xxl} color={Colors.textBody} />
        <Text style={styles.controlIcon}>+10s</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  controlButton: {
    width: Sizes.buttonDefault,
    height: Sizes.buttonDefault,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.audioWave,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  controlIcon: {
    ...Typography.micro,
    color: Colors.textTitle,
  },
  playButton: {
    width: 78,
    height: 78,
    borderRadius: BorderRadius.round,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.soft,
  },
  playIcon: {
    marginLeft: 2,
  },
});
