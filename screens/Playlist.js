import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const CARD_SIZE = Math.floor((Dimensions.get("window").width - Spacing.xl * 2 - Spacing.lg) / 2);

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
      colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={26} color={Colors.textTitle} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subtitle}>{stories.length} morceaux</Text>
          </View>
          <View style={{ width: 26 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Spacing.xl,
            paddingBottom: Spacing.xl * 2,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: Spacing.lg,
            justifyContent: "space-between",
          }}
        >
          {storiesWithLike.map((story) => (
            <AudioCardSquare
              key={story._id}
              _id={story._id}
              title={story.title}
              image={story.image}
              author={story.author}
              url={story.url}
              hasLiked={story.hasLiked}
              size={CARD_SIZE}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      {displayMiniPlayer && <MiniPlayer />}
      <PlayerModal />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
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
