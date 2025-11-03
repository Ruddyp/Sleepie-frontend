import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "./tokens";
import { useDispatch, useSelector } from "react-redux";
import { updateTrack } from "../../reducers/track";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AudioCardSquare({ title, image, author, _id, url, size, hasLiked }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;

  const likestory = async (storyId) => {
    const body = {
      token: user.token,
      storyId: storyId,
    };
    try {
      const response = await fetch(`http://${IP}:${port}/stories/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log("errorFromFetchlikeStory", error.message);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.card, { width: size }]}
      activeOpacity={0.8}
      onPress={() => {
        dispatch(
          updateTrack({
            track: { _id, image, title, author: author, url },
            shouldPlayAutomatically: true,
          })
        );
      }}
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
          style={[styles.iconContainer, styles.playLeftSpace, Shadows.soft]}
        >
          <Ionicons name="play" size={Spacing.xxl} color={Colors.textTitle} />
        </LinearGradient>

        {/* Bouton Favori */}
        <LinearGradient
          colors={[Colors.bgTertiary[0], Colors.bgTertiary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.iconContainer, styles.likeRightSpace, Shadows.soft]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => likestory(_id)}>
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
    color: Colors.textBody,
    ...Typography.body,
  },
});
