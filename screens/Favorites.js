import { ScrollView, StyleSheet, Text, View } from "react-native";
import PlayerModal from "../components/Player/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/Player/MiniPlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../components/KitUI/tokens";
import { useState, useEffect, useMemo } from "react";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";

export default function Favorites() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;

  const [createdStoriesArray, setCreatedStoriesArray] = useState([]);
  const [likedStories, setLikedStories] = useState([]);

  console.log("data from created story", createdStoriesArray);
  console.log("data from liked story", likedStories);

  const trackData = useSelector((state) => state.track.value);
  const userToken = useSelector((state) => state.user.value.token);

  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;

  useEffect(() => {
    // Récupérer les histoires créées et likées par l'utilisateur

    fetch(`http://${IP}:${port}/stories/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data from favorites fetch", data);
        setCreatedStoriesArray(data.myStories);
        setLikedStories(data.storiesLiked);
      });
  }, []);

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView style={{ flex: 1, width: "100%", paddingTop: 50, gap: 20 }}>
        <Text style={{ color: "white" }}>FAVORIS PAGE</Text>
        {/* Carrousel 1 : sons/histoires créés par l’utilisateur */}
        <CategoryCarousel title="Mes créations" data={createdStoriesArray} />

        {/* Carrousel 2 : sons/histoires likés */}
        <CategoryCarousel title="Sons likés" data={likedStories} />
      </ScrollView>
      {displayMiniPlayer && <MiniPlayer />}
      <PlayerModal />
    </LinearGradient>
  );
}
