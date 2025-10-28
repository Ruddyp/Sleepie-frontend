import { useMemo, useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AudioCardSquare from "../components/KitUI/AudioCardSquare";
import { Colors, Spacing } from "../components/KitUI/tokens";

const DATA = [
  {
    id: "1",
    title: "Pluie d’été au chalet",
    duration: "24 min",
    voice: "Voix féminine",
    imageUrl: "https://images.unsplash.com/photo-1503264116251-35a269479413",
  },
  {
    id: "2",
    title: "Forêt boréale",
    duration: "22 min",
    voice: "Voix masculine",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: "3",
    title: "Vagues nocturnes",
    duration: "18 min",
    voice: "Voix féminine",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: "4",
    title: "Pluie douce",
    duration: "27 min",
    voice: "Voix masculine",
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
  },
];

export default function Home() {
  const [favorites, setFavorites] = useState({});

  const onToggleFavorite = (id) => setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  const width = Dimensions.get("window").width;
  const PADDING = Spacing.xl || 24;
  const GAP = Spacing.lg || 12;

  // Taille de la carte pour 2 colonnes (padding + gap)
  const CARD_SIZE = useMemo(
    () => Math.floor((width - PADDING * 2 - GAP) / 2),
    [width, PADDING, GAP]
  );

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: GAP }}>
      <AudioCardSquare
        title={item.title}
        duration={item.duration}
        voice={item.voice}
        imageUrl={item.imageUrl}
        isFavorite={!!favorites[item.id]}
        onPlay={() => console.log("Play:", item.title)}
        onToggleFavorite={() => onToggleFavorite(item.id)}
        size={CARD_SIZE}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <FlatList
        data={DATA}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{
          padding: PADDING,
          paddingBottom: PADDING * 2,
        }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
});
