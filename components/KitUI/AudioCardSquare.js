import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "./tokens";
import { useDispatch, useSelector } from "react-redux";
import { updateTrack } from "../../reducers/track";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { likeStory } from "../../modules/databaseAction";
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from "react-native-track-player";

export default function AudioCardSquare(props) {
  const { title, image, author, _id, url, size, hasLiked, configuration } = props;
  const dispatch = useDispatch();
  const activeTrack = useActiveTrack();
  const playbackState = usePlaybackState();
  const playerState = playbackState.state;
  const user = useSelector((state) => state.user.value);

  const isPlaying = activeTrack?.id === _id && playerState === State.Playing;
  const isPaused = activeTrack?.id === _id && playerState === State.Paused;
  const isEnded = activeTrack?.id === _id && playerState === State.Ended;

  async function handlePress() {
    dispatch(
      updateTrack({
        track: { _id, image, title, author: author, url, configuration },
        shouldPlayAutomatically: true,
      })
    );
    if (isPlaying) {
      await TrackPlayer.pause();
    }
    if (isPaused) {
      await TrackPlayer.play();
    }
    if (isEnded) {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    }
  }

  return (
    <TouchableOpacity
      style={[styles.card, { width: size }]}
      activeOpacity={0.8}
      onPress={() => handlePress()}
    >
      {/* IMAGE */}
      <View style={[styles.imageContainer, { width: size, height: size }]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* Bouton Play */}
        <LinearGradient
          colors={[Colors.accentPrimary[0], Colors.accentPrimary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.iconContainer, styles.playLeftSpace, Shadows.bold]}
          onPress={() => handlePause()}
        >
          {!isPlaying ? (
            <Ionicons name="play" size={Spacing.xxl} color={Colors.textTitle} />
          ) : (
            <Ionicons name="pause" size={Spacing.xxl} color={Colors.textTitle} />
          )}
        </LinearGradient>

        {/* Bouton Favori */}
        <LinearGradient
          colors={[Colors.bgTertiary[0], Colors.bgTertiary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.iconContainer, styles.likeRightSpace, Shadows.soft]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => likeStory(props, user.token, dispatch)}
          >
            {hasLiked ? (
              <Ionicons name="heart" size={Spacing.xxl} color={Colors.error} />
            ) : (
              <Ionicons name="heart-outline" size={Spacing.xxl} color={Colors.textTitle} />
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Texte sous l'image (fond transparent) */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {author.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    borderRadius: BorderRadius.large,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.accentPrimarySolid,
  },

  // FABs superposés
  iconContainer: {
    position: "absolute",
    bottom: Spacing.md,
    width: 46,
    height: 46,
    borderRadius: BorderRadius.round,
    alignItems: "center",
    justifyContent: "center",
  },
  playLeftSpace: {
    left: Spacing.md,
  },
  likeRightSpace: {
    right: Spacing.md,
  },
  info: {
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  title: {
    color: Colors.textTitle,
    ...Typography.body,
  },
  subtitle: {
    color: Colors.textBody,
    ...Typography.caption,
  },
});
