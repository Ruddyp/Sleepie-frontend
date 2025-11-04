import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AudioCardSquare from "../components/KitUI/AudioCardSquare";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MiniPlayer from "../components/Player/MiniPlayer";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";

export default function Playlist() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title = "playlist", stories = [], origin } = route.params;
  const trackData = useSelector((state) => state.track.value);
  const storiesFromRedux = useSelector((state) => state.stories.value);
  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;

  const cardSize = Dimensions.get("window").width * 0.42;

  const handleBack = () => {
    if (origin) return navigation.navigate(origin);
    navigation.navigate("home");
  };
  const storiesWithLike = stories.map((story) => ({
    ...story,
    hasLiked: storiesFromRedux.likedStories.some((e) => e._id === story._id),
  }));

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={26} color={Colors.textTitle} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{stories.length} morceaux</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {storiesWithLike.map((story) => (
          <AudioCardSquare key={story._id} size={cardSize} {...story} />
        ))}
      </ScrollView>
      {displayMiniPlayer && <MiniPlayer />}
      <PlayerModal />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    paddingVertical: Spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xl,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
  },
  title: {
    color: Colors.textTitle,
    ...Typography.h2,
    fontFamily: Typography.fontHeading,
  },
  subtitle: {
    color: Colors.textSecondary,
    ...Typography.caption,
    marginTop: 2,
  },
});
