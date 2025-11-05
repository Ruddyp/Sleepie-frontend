import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows, Sizes } from "../KitUI/tokens";
import TrackPlayer, {
  useTrackPlayerEvents,
  useActiveTrack,
  useProgress,
  Event,
  State,
  usePlaybackState,
} from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { formatSecondsToMinutes } from "../../modules/utils";
import { useSelector, useDispatch } from "react-redux";
import { likeStory } from "../../modules/databaseAction";
import SleepTimerModal from "./SleepTimerModal";
import { useState } from "react";

const events = [
  Event.RemotePlay,
  Event.RemotePause,
  Event.RemotePlayPause,
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];
const windowWidth = Dimensions.get("window").width;

export function Player() {
  const activeTrack = useActiveTrack();
  const { position, duration } = useProgress(100); // 100ms de rafraîchissement
  const playbackState = usePlaybackState();
  const playerState = playbackState.state;
  const { title, artwork, artist, id } = activeTrack || {};
  const user = useSelector((state) => state.user.value);
  const trackData = useSelector((state) => state.track.value);
  const stories = useSelector((state) => state.stories.value);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
  });

  const hasLiked = stories.likedStories.some((story) => story._id === id);
  const isPlaying = playerState === State.Playing;
  const isEnded = playerState === State.Ended;

  async function handlePlay() {
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

  // Gestion de -10 secondes sur la track
  async function handlePlayBack() {
    position - 10 >= 0 ? await TrackPlayer.seekTo(position - 10) : await TrackPlayer.seekTo(0);
  }
  // Gestion de +10 secondes sur la track
  async function handlePlayForward() {
    position + 10 <= duration
      ? await TrackPlayer.seekTo(position + 10)
      : await TrackPlayer.seekTo(duration);
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
          <LinearGradient
            colors={[Colors.bgTertiary[0], Colors.bgTertiary[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heartContainer}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => likeStory(trackData.track, user.token, dispatch)}
            >
              {hasLiked ? (
                <Ionicons name="heart" size={Spacing.xxxl} color={Colors.error} />
              ) : (
                <Ionicons name="heart-outline" size={Spacing.xxxl} color={Colors.textTitle} />
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{artist || "Auteur Inconnu"}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View>
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
          minimumTrackTintColor={Colors.accentPrimarySolid}
          maximumTrackTintColor={Colors.textTitle}
          thumbTintColor={Colors.textSleepieYellow}
        />
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{formatSecondsToMinutes(Math.round(position))}</Text>
          <Text style={styles.progressText}>
            {formatSecondsToMinutes(Math.round(duration - position))}
          </Text>
        </View>
      </View>

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

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.sleepTimerButton}
          activeOpacity={0.8}
          onPress={() => setIsOpen(true)}
        >
          <Ionicons name="timer" size={Spacing.xxl} color={Colors.textBody} />
          <Text style={styles.timerLabel}>Minuteur sommeil</Text>
        </TouchableOpacity>
      </View>
      <SleepTimerModal isOpen={isOpen} setIsOpen={setIsOpen} duration={duration} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: "100%",
    borderRadius: BorderRadius.large,
    padding: Spacing.xl,
    gap: Spacing.xl,
    ...Shadows.soft,
  },
  progressTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.textBody,
  },
  header: {
    alignItems: "center",
    gap: Spacing.xl,
  },
  cover: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.7,
    borderRadius: BorderRadius.medium,
  },
  artwork: {
    flex: 1,
    borderRadius: BorderRadius.medium,
  },
  heartContainer: {
    position: "absolute",
    bottom: Spacing.md,
    right: Spacing.md,
    borderRadius: BorderRadius.round,
    padding: Spacing.sm,
  },
  titleContainer: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textTitle,
    ...Typography.h2,
    fontFamily: Typography.fontHeading,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.textSecondary,
    ...Typography.body,
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
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.soft,
  },
  playIcon: {
    marginLeft: 2,
  },
  sleepTimerButton: {
    width: "50%",
    height: Sizes.buttonDefault,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.audioWave,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  timerLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
  },
});
