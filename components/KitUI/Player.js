import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows, Sizes } from "./tokens";
import TrackPlayer, {
  useTrackPlayerEvents,
  useActiveTrack,
  useProgress,
  Event,
  State,
} from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged];

export function Player({ track }) {
  const { _id, title, artwork, artist } = track;
  const { position, buffered, duration } = useProgress();
  const [playerState, setPlayerState] = useState(null);
  const activeTrack = useActiveTrack();

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  const isPlaying = playerState === State.Playing;

  async function handlePlay() {
    const shouldChangeTrack = !activeTrack || activeTrack.id !== _id || playerState === State.Ended;
    if (shouldChangeTrack) {
      console.log("Action: Changement de piste / Ajout initial");
      // Réinitialise le lecteur et ajoute la nouvelle piste
      await TrackPlayer.reset();
      // On décompose track et on ajoute un id: _id car le track player attend une cled id et non _id
      await TrackPlayer.add([{ ...track, id: _id }]);
      await TrackPlayer.play();
    } else {
      // 2. Contrôle Lecture/Pause de la piste courante
      if (isPlaying) {
        console.log("Action: Pause");
        await TrackPlayer.pause();
      } else {
        console.log("Action: Lecture");
        await TrackPlayer.play();
      }
    }
  }

  // Gestion de -10 secondes sur la track
  function handlePlayBack() {
    position - 10 >= 0 ? TrackPlayer.seekTo(position - 10) : TrackPlayer.seekTo(0);
  }
  // Gestion de +10 secondes sur la track
  function handlePlayForward() {
    position + 10 <= duration ? TrackPlayer.seekTo(position + 10) : TrackPlayer.seekTo(duration);
  }

  return (
    <LinearGradient
      colors={Colors.bgTertiary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Cover & Title */}
      <View style={styles.header}>
        <View style={styles.cover}>
          <Image
            style={styles.artwork}
            source={{
              uri:
                artwork ||
                "https://res.cloudinary.com/dr6rfk2nz/image/upload/v1761208190/cld-sample-5.jpg",
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{artist || "Paul Fernier"}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
        minimumTrackTintColor={Colors.accentPrimarySolid}
        maximumTrackTintColor={Colors.textTitle}
        thumbTintColor={Colors.textSleepieYellow}
      />

      {/* Controls */}
      <View style={styles.controls}>
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
                <Ionicons name="pause" size={Spacing.xxxl} color={Colors.textTitle} />
              ) : (
                <Ionicons name="play" size={Spacing.xxxl} color={Colors.textTitle} />
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
      </View>

      {/* Sleep Timer */}
      {/* <View style={styles.timerSection}>
        <View style={styles.timerHeader}>
        <Text style={styles.timerIcon}>⏱</Text>
        <Text style={styles.timerLabel}>Minuteur sommeil</Text>
        </View>
        
        <View style={styles.timerOptions}>
        {timerOptions.map((time) => (
            <TouchableOpacity
            key={time}
            style={[styles.timerButton, sleepTimer === time && styles.timerButtonActive]}
            onPress={() => setSleepTimer(time)}
            activeOpacity={0.8}
            >
            <Text
            style={[
                styles.timerButtonText,
                sleepTimer === time && styles.timerButtonTextActive,
                ]}
                >
                {time === "Fin" ? "Fin de piste" : `${time} min`}
                </Text>
                </TouchableOpacity>
                ))}
                </View>
                </View> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "80%",
    borderRadius: BorderRadius.large,
    padding: Spacing.xxxl,
    gap: Spacing.xxxl,
    ...Shadows.soft,
  },
  header: {
    alignItems: "center",
    gap: Spacing.lg,
  },
  cover: {
    width: 160,
    height: 160,
    borderRadius: BorderRadius.medium,
  },
  artwork: {
    flex: 1,
    borderRadius: BorderRadius.medium,
  },
  titleContainer: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textTitle,
    fontSize: Typography.h2.fontSize,
    lineHeight: Typography.h2.lineHeight,
    fontFamily: Typography.fontHeading,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xxl,
  },
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
    // backgroundColor: Colors.accentPrimarySolid,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.soft,
  },
  playIcon: {
    marginLeft: 2,
  },
  timerSection: {
    gap: Spacing.md,
  },
  timerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  timerIcon: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  timerLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
  },
  timerOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  timerButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.accentGlow,
  },
  timerButtonActive: {
    backgroundColor: Colors.accentPrimarySolid,
  },
  timerButtonText: {
    color: Colors.textBody,
    fontSize: Typography.caption.fontSize,
    fontWeight: "400",
  },
  timerButtonTextActive: {
    color: Colors.white,
    fontWeight: "500",
  },
});
