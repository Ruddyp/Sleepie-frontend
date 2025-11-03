import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import { useNavigation } from "@react-navigation/native";
import CreateStoryCard from "../components/KitUI/CreateStoryCard";
import { Colors, Spacing } from "../components/KitUI/tokens";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";

const DATA_BEST = [
  {
    _id: "1",
    title: "Pluie d’été au chalet",
    url: "https://res.cloudinary.com/dzwgrfwif/raw/upload/v1761824548/k6r6qoaixs2c869ial43.mp3",
    image: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    author: {
      username: "Sleepie",
    },
  },
  {
    _id: "2",
    title: "Forêt boréale",
    url: "https://res.cloudinary.com/dzwgrfwif/raw/upload/v1761818727/to0dnr4wf4zjnyhsecy1.mp3",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    author: {
      username: "Sleepie",
    },
  },
  {
    _id: "3",
    title: "Vagues nocturnes",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    url: "https://res.cloudinary.com/dzwgrfwif/raw/upload/v1761824548/k6r6qoaixs2c869ial43.mp3",
    author: {
      username: "Sleepie",
    },
  },
  {
    _id: "4",
    title: "Pluie douce",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
    url: "https://res.cloudinary.com/dzwgrfwif/raw/upload/v1761818727/to0dnr4wf4zjnyhsecy1.mp3",
    author: {
      username: "Sleepie",
    },
  },
];

export default function Home() {
  const trackData = useSelector((state) => state.track.value);
  const stories = useSelector((state) => state.stories.value);
  console.log("created Stories:", stories.createdStories.length);
  console.log("Liked Stories:", stories.likedStories.length);
  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;
  const navigation = useNavigation();

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
          <CategoryCarousel title="Histoires apaisantes" data={DATA_BEST} />
          <CategoryCarousel title="Histoires calmes" data={DATA_BEST} />
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
