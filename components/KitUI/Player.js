import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "./tokens";
import TrackPlayer, {
  useTrackPlayerEvents,
  useActiveTrack,
  useProgress,
  Event,
  State,
} from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged];

export function Player({ track }) {
  const { id, url, title, description, date, artwork, artist } = track;
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
  const [progress, setProgress] = useState(35);

  async function handlePlay() {
    const shouldChangeTrack = !activeTrack || activeTrack.id !== id || playerState === State.Ended;
    if (shouldChangeTrack) {
      console.log("Action: Changement de piste / Ajout initial");
      // Réinitialise le lecteur et ajoute la nouvelle piste
      await TrackPlayer.reset();
      await TrackPlayer.add([track]);
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
              uri: artwork,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{artist}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      {/* <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(position * 100) / duration}%` }]} />
          <View style={[styles.progressThumb, { left: `${(position * 100) / duration}%` }]} />
        </View>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{Math.round(position)}s</Text>
          <Text style={styles.timeText}>{Math.round(duration)}s</Text>
        </View>
      </View> */}
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} activeOpacity={0.8}>
          <Text style={styles.controlIcon}>⏪</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => handlePlay()}
          activeOpacity={0.8}
        >
          <Text style={styles.playIcon}>{isPlaying ? "⏸" : "▶"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} activeOpacity={0.8}>
          <Text style={styles.controlIcon}>⏩</Text>
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
  progressSection: {
    gap: Spacing.md,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 4,
    position: "relative",
  },
  progressFill: {
    position: "absolute",
    height: 8,
    backgroundColor: Colors.accentPrimarySolid,
    borderRadius: 4,
  },
  progressThumb: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    top: -4,
    transform: [{ translateX: -8 }],
    ...Shadows.focus,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: Colors.textBody,
    fontSize: Typography.caption.fontSize,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xxl,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.accentGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  controlIcon: {
    color: Colors.textBody,
    fontSize: 20,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.accentPrimarySolid,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.soft,
  },
  playIcon: {
    color: Colors.white,
    fontSize: 24,
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
