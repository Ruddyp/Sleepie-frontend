import { ScrollView, StyleSheet } from "react-native";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../components/KitUI/tokens";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";

export default function Favorites() {
  const storiesFromRedux = useSelector((state) => state.stories.value);
  const trackData = useSelector((state) => state.track.value);

  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;

  const createdStories = storiesFromRedux.createdStories.map((story) => ({
    ...story,
    hasLiked: storiesFromRedux.likedStories.some((e) => e._id === story._id),
  }));

  const likedStories = storiesFromRedux.likedStories.map((story) => ({
    ...story,
    hasLiked: true,
  }));

  const displayCreatedStories = createdStories.length !== 0;
  const displayLikedStories = likedStories.length !== 0;

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Carrousel 1 : sons/histoires créés par l’utilisateur */}
        {displayCreatedStories && <CategoryCarousel title="Mes créations" data={createdStories} />}

        {/* Carrousel 2 : sons/histoires likés */}
        {displayLikedStories && <CategoryCarousel title="Sons likés" data={likedStories} />}
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
    gap: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
});
