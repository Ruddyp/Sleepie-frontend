import { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import { useNavigation } from "@react-navigation/native";
import CreateStoryCard from "../components/Create/CreateStoryCard";
import { Colors, Spacing } from "../components/KitUI/tokens";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";
import FilterBar from "../components/KitUI/FilterBar";
import { filterDuration } from "../modules/filter";

export default function Home() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const trackData = useSelector((state) => state.track.value);
  const stories = useSelector((state) => state.stories.value);
  const user = useSelector((state) => state.user.value);
  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;
  const navigation = useNavigation();
  const [mostListenedStories, setMostListenedStories] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState({ key: "all", label: "Toutes" });

  useEffect(() => {
    fetch(`http://${IP}:${port}/stories/mostlistenedstories`)
      .then((response) => response.json())
      .then((data) => {
        setMostListenedStories(data.mostListenedStories);
      });
  }, []);

  const recently_playedWithLike = user.recently_played
    .map((story) => {
      return {
        ...story,
        hasLiked: stories.likedStories.some((likeStory) => likeStory._id === story._id),
      };
    })
    .filter((story) => filterDuration(story, selectedDuration));

  const createdStoriesWithLike = stories.createdStories
    .map((story) => ({
      ...story,
      hasLiked: stories.likedStories.some((likeStory) => likeStory._id === story._id),
    }))
    .filter((story) => filterDuration(story, selectedDuration));

  const mostListenedStoriesWithLike = mostListenedStories
    .map((story) => ({
      ...story,
      hasLiked: stories.likedStories.some((likeStory) => likeStory._id === story._id),
    }))
    .filter((story) => filterDuration(story, selectedDuration));

  const displayRecentlyPlayed = user?.recently_played.length !== 0;
  const displayCreatedStory = stories.createdStories.length !== 0;

  return (
    <LinearGradient
      colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <CreateStoryCard onPress={() => navigation.navigate("create")} />
        <FilterBar
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          hideCategory
        />
        {displayRecentlyPlayed && (
          <CategoryCarousel title="Mes dernières écoutes" data={recently_playedWithLike} />
        )}
        <CategoryCarousel title="Les + écoutées" data={mostListenedStoriesWithLike} />
        {displayCreatedStory && (
          <CategoryCarousel title="Mes histoires crées" data={createdStoriesWithLike} />
        )}
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
