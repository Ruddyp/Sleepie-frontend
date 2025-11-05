import { StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../components/KitUI/tokens";
import { useState, useEffect } from "react";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";
import FilterBar from "../components/KitUI/FilterBar";
import { filterDuration } from "../modules/filter";
import { capitalizeFirstLetter } from "../modules/utils";

export default function Discover() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const [storiesSleepie, setStoriesSleepie] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState({ key: "all", label: "Toutes" });
  const trackData = useSelector((state) => state.track.value);
  const storiesFromRedux = useSelector((state) => state.stories.value);
  const modal = useSelector((state) => state.modal.value);
  const displayMiniPlayer = !modal.modalState && trackData.track.url !== null;

  useEffect(() => {
    fetch(`http://${IP}:${port}/stories/sleepiestories`)
      .then((response) => response.json())
      .then((data) => {
        setStoriesSleepie(data.stories);
      });
  }, []);

  const labelArray = storiesSleepie.reduce((acc, story) => {
    // Parcourt les labels de chaque histoire
    for (const label of story.label) {
      const labelName = label.name;

      // Condition de filtre :
      // 1. Si la catégorie sélectionnée est 'all', on ajoute le label s'il n'est pas déjà là.
      // 2. Si une catégorie spécifique est sélectionnée, on ajoute SEULEMENT ce label s'il n'est pas déjà là.
      const shouldAddLabel =
        (selectedCategory === "all" && !acc.includes(labelName)) ||
        (selectedCategory !== "all" && labelName === selectedCategory && !acc.includes(labelName));

      if (shouldAddLabel) {
        acc.push(labelName);
      }
    }
    return acc;
  }, []);

  const categoryCarrouselToDisplay = labelArray.map((labelName, i) => {
    const stories = storiesSleepie
      .filter((story) => story.label.some((label) => label.name === labelName))
      .filter((story) => filterDuration(story, selectedDuration))
      .map((story) => ({
        ...story,
        hasLiked: storiesFromRedux.likedStories.some((e) => e._id === story._id),
      }));
    return <CategoryCarousel key={i} title={capitalizeFirstLetter(labelName)} data={stories} />;
  });

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />
        {categoryCarrouselToDisplay}
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
