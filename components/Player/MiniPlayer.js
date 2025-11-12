import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "../KitUI/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useActiveTrack, State } from "react-native-track-player";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState } from "../../reducers/modal";
import { likeStory } from "../../modules/databaseAction";
import { resetTrack, updatePlaybackState } from "../../reducers/track";

const windowWidth = Dimensions.get("window").width;

export default function MiniPlayer() {
  const dispatch = useDispatch();
  const activeTrack = useActiveTrack();
  const { title, artwork, artist, id } = activeTrack || {};
  const user = useSelector((state) => state.user.value);
  const trackData = useSelector((state) => state.track.value);
  const { playbackState } = trackData;
  const stories = useSelector((state) => state.stories.value);

  const pan = useRef(new Animated.ValueXY()).current;

  const hasLiked = stories.likedStories.some((story) => story._id === id);
  const isPlaying = playbackState === State.Playing;
  const isEnded = playbackState === State.Ended;
  const isPaused =
    playbackState === State.Paused || playbackState === State.Ready;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Seuil horizontal vs vertical
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 5
        );
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        const SWIPE_THRESHOLD = 150; // Distance minimale pour activer l'animation de swipe
        const DISAPPEAR_DURATION = 400; // Durée avant disparition
        const HORIZONTAL_DISTANCE = 400; // Distance à parcourir pour sortir complètement de l'écran

        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe vers la droite
          Animated.timing(pan, {
            toValue: { x: HORIZONTAL_DISTANCE, y: 0 }, // File à droite
            duration: DISAPPEAR_DURATION,
            easing: Easing.out(Easing.quad), // Commence rapidement, finit doucement
            useNativeDriver: false,
          }).start(() => dispatch(resetTrack()));
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Swipe vers la gauche
          Animated.timing(pan, {
            toValue: { x: -HORIZONTAL_DISTANCE, y: 0 }, // File à gauche
            duration: DISAPPEAR_DURATION,
            easing: Easing.out(Easing.quad), // Commence rapidement, finit doucement
            useNativeDriver: false,
          }).start(() => dispatch(resetTrack()));
        } else {
          // Annuler le geste et revenir à l'état initial
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  async function handlePlay() {
    if (isPlaying) {
      dispatch(updatePlaybackState(State.Paused));
    }
    if (isPaused || isEnded) {
      dispatch(updatePlaybackState(State.Playing));
    }
  }

  if (!activeTrack) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }],
      }}
      {...panResponder.panHandlers}
    >
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
                <Text style={styles.subtitle}>
                  {artist || "Auteur inconnu"}
                </Text>
              </View>
            </Pressable>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => likeStory(trackData.track, user.token, dispatch)}
            >
              {hasLiked ? (
                <Ionicons
                  name="heart"
                  size={Spacing.xxxl}
                  color={Colors.error}
                />
              ) : (
                <Ionicons
                  name="heart-outline"
                  size={Spacing.xxxl}
                  color={Colors.textTitle}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
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
    fontSize: windowWidth <= 360 ? 16 : 18,
    color: Colors.textBody,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textBody,
  },
});
