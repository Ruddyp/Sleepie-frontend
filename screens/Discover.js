import { StyleSheet, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../components/KitUI/tokens";
import { useState, useEffect } from "react";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import PlayerModal from "../components/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/KitUI/MiniPlayer";

export default function Discover() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const [labelArray, setLabelArray] = useState([]);
  const [storiesSleepie, setStoriesSleepie] = useState([]);
  const trackData = useSelector((state) => state.track.value);
  const modal = useSelector((state) => state.modal.value);
  const displayMiniPlayer = !modal.modalState && trackData.track.url !== null;

  useEffect(() => {
    fetch(`http://${IP}:${port}/stories/sleepiestories`)
      .then((response) => response.json())
      .then((data) => {
        setStoriesSleepie(data.stories);
      })
      .catch((error) => {
        console.log("error from fetch", error);
      });
  }, []);

  // Récupère un tableau des labels de toutes les histoires sleepie
  for (const story of storiesSleepie) {
    for (const label of story.label) {
      if (!labelArray.includes(label.name)) {
        setLabelArray([...labelArray, label.name]);
      }
    }
  }

  const categoryCarrouselToDisplay = labelArray.map((labelName, i) => {
    const stories = storiesSleepie.filter((story) =>
      story.label.some((label) => label.name === labelName)
    );
    return <CategoryCarousel key={i} title={labelName} data={stories} />;
  });

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView>
        <View style={styles.carrousel}>{categoryCarrouselToDisplay}</View>
      </ScrollView>
      {displayMiniPlayer && <MiniPlayer track={trackData.track} />}
      <PlayerModal />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  carrousel: {
    flex: 1,
    width: "100%",
    paddingTop: 50,
    gap: Spacing.xl,
  },
});
