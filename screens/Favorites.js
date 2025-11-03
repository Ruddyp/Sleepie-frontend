import { ScrollView } from "react-native";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../components/KitUI/tokens";
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

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView style={{ flex: 1, width: "100%", paddingTop: 50, gap: 20 }}>
        {/* Carrousel 1 : sons/histoires créés par l’utilisateur */}
        {createdStories.length !== 0 && (
          <CategoryCarousel title="Mes créations" data={createdStories} />
        )}

        {/* Carrousel 2 : sons/histoires likés */}
        {likedStories.length !== 0 && <CategoryCarousel title="Sons likés" data={likedStories} />}
      </ScrollView>
      {displayMiniPlayer && <MiniPlayer />}
      <PlayerModal />
    </LinearGradient>
  );
}
