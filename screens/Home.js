import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import { useNavigation } from "@react-navigation/native";
import CreateStoryCard from "../components/KitUI/CreateStoryCard";
import { Colors } from "../components/KitUI/tokens";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";

const DATA_BEST = [
  {
    _id: "1",
    title: "Pluie d’été au chalet",
    duration: "24 min",
    voice: "Voix féminine",
    imageUrl: "https://images.unsplash.com/photo-1503264116251-35a269479413",
  },
  {
    _id: "2",
    title: "Forêt boréale",
    duration: "22 min",
    voice: "Voix masculine",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    _id: "3",
    title: "Vagues nocturnes",
    duration: "18 min",
    voice: "Voix féminine",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    _id: "4",
    title: "Pluie douce",
    duration: "27 min",
    voice: "Voix masculine",
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
  },
];

export default function Home() {
  const trackData = useSelector((state) => state.track.value);
  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  // injecte la prop isFavorite dans les data si tu veux
  const mapped = DATA_BEST.map((it) => ({
    ...it,
    isFavorite: !!favorites[it._id],
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

        <CategoryCarousel title="Histoires apaisantes" data={mapped} />
        <CategoryCarousel
          title="Histoires apaisantes"
          icon={{
            uri: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=64&q=80",
          }}
          data={mapped}
        />
      </ScrollView>
      {displayMiniPlayer && <MiniPlayer />}
      <PlayerModal />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
});
