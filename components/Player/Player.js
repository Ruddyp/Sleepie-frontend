import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from "../KitUI/tokens";
import { useActiveTrack } from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { likeStory } from "../../modules/databaseAction";
import { updateModalState } from "../../reducers/modal";
import PlayerSlider from "./PlayerSlider";
import PlayerControls from "./PlayerControls";
import PlayerSleepTimer from "./PlayerSleepTimer";

const windowWidth = Dimensions.get("window").width;

export function Player() {
  const activeTrack = useActiveTrack();
  const { title, artwork, artist, id } = activeTrack || {};
  const user = useSelector((state) => state.user.value);
  const stories = useSelector((state) => state.stories.value);
  const trackData = useSelector((state) => state.track.value);
  const dispatch = useDispatch();

  const hasLiked = stories.likedStories.some((story) => story._id === id);

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
          </LinearGradient>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{artist || "Auteur Inconnu"}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View>
        <PlayerSlider />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <PlayerControls />
      </View>

      {/* Sleep timer */}
      <View style={styles.controls}>
        <PlayerSleepTimer />
      </View>

      {/* Close player */}
      <View style={[styles.controls, { marginTop: Spacing.lg }]}>
        <TouchableOpacity onPress={() => dispatch(updateModalState(false))}>
          <Ionicons
            name="close-circle"
            size={Spacing.massive}
            color={Colors.textBody}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: "100%",
    borderRadius: BorderRadius.large,
    paddingVertical: Spacing.sm,
    justifyContent: "space-around",
    ...Shadows.soft,
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
});
