import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import { useNavigation } from "@react-navigation/native";
import CreateStoryCard from "../components/KitUI/CreateStoryCard";
import { Colors, Spacing } from "../components/KitUI/tokens";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";

export default function Home() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const trackData = useSelector((state) => state.track.value);
  const stories = useSelector((state) => state.stories.value);
  const user = useSelector((state) => state.user.value);
  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;
  const navigation = useNavigation();
  const [storiesSleepie, setStoriesSleepie] = useState([]);

  useEffect(() => {
    fetch(`http://${IP}:${port}/stories/sleepiestories`)
      .then((response) => response.json())
      .then((data) => {
        setStoriesSleepie(data.stories);
      });
  }, []);

  storiesSleepie.sort((a, b) => b.listen_counter - a.listen_counter);
  const mostListenedStories = storiesSleepie.slice(0, 10);

  const recently_playedWithLike = user.recently_played.map((story) => {
    return {
      ...story,
      hasLiked: stories.likedStories.some((likeStory) => likeStory._id === story._id),
    };
  });

  const createdStoriesWithLike = stories.createdStories.map((story) => ({
    ...story,
    hasLiked: stories.likedStories.some((likeStory) => likeStory._id === story._id),
  }));

  const mostListenedStoriesWithLike = mostListenedStories.map((story) => ({
    ...story,
    hasLiked: stories.likedStories.some((likeStory) => likeStory._id === story._id),
  }));

  return (
    <LinearGradient
      colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <ScrollView>
        {/* ---- Card "Créer mon histoire" au-dessus, séparée ---- */}
        <View style={styles.createRow}>
          <CreateStoryCard onPress={() => navigation.navigate("create")} />
        </View>
        <View style={styles.carouselsContainer}>
          {user?.recently_played.length !== 0 && (
            <CategoryCarousel title="Mes dernières écoutes" data={recently_playedWithLike} />
          )}
          <CategoryCarousel title="Les + écoutées" data={mostListenedStoriesWithLike} />
          {stories.createdStories.length !== 0 && (
            <CategoryCarousel title="Mes histoires crées" data={createdStoriesWithLike} />
          )}
        </View>
      </ScrollView>
      {displayMiniPlayer && <MiniPlayer />}
      <PlayerModal />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  carouselsContainer: {
    gap: Spacing.md,
  },
});
