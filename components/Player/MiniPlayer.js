import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState } from "../../reducers/modal";
import { likeStory } from "../../modules/databaseAction";

const events = [
  Event.RemotePlay,
  Event.RemotePause,
  Event.RemotePlayPause,
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

export default function MiniPlayer() {
  const dispatch = useDispatch();
  const playbackState = usePlaybackState();
  const playerState = playbackState.state;
  const activeTrack = useActiveTrack();

  const { title, artwork, artist, id } = activeTrack || {};
  const user = useSelector((state) => state.user.value);
  const trackData = useSelector((state) => state.track.value);
  const stories = useSelector((state) => state.stories.value);

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

  if (!activeTrack) return null;

  return (
    <LinearGradient
      colors={Colors.bgTertiary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <View style={styles.miniPlayerContainer}>
        <View style={styles.leftMiniPlayerContainer}>
          <TouchableOpacity onPress={() => handlePlay()} activeOpacity={0.8}>
            {isPlaying ? (
              <Ionicons name="pause" size={Spacing.xxxl} color={Colors.textTitle} />
            ) : (
              <Ionicons name="play" size={Spacing.xxxl} color={Colors.textTitle} />
            )}
          </TouchableOpacity>
          <Pressable
            onPress={() => dispatch(updateModalState(true))}
            style={styles.textIconMiniPlayerContainer}
          >
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
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{artist || "Auteur inconnu"}</Text>
            </View>
          </Pressable>
        </View>
        <View>
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
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
  },
  miniPlayerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftMiniPlayerContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  textIconMiniPlayerContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  artwork: {
    flex: 1,
    borderRadius: 8,
  },
  title: {
    ...Typography.body,
    fontSize: 18,
    color: Colors.textBody,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textBody,
  },
});
