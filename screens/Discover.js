import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Player } from "../components/KitUI/Player";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../components/KitUI/tokens";
import { useState, useEffect, use } from "react";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";
import PlayerModal from "../components/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/KitUI/MiniPlayer";

export default function Discover() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const sleepyUserId = process.env.EXPO_PUBLIC_SLEEPIEID;
  const [labelArray, setLabelArray] = useState([]);
  const [storiesSleepie, setStoriesSleepie] = useState([]);
  const trackData = useSelector((state) => state.track.value);
  const displayMiniPlayer = !trackData.modalState && trackData.track.url !== null;

  useEffect(() => {

    fetch(`http://${IP}:${port}/stories/sleepiestories`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data from fetch", data);
        setStoriesSleepie(data.stories);
      })
      .catch((error) => {
        console.log("error from fetch", error);
      });
  }, []);

  // console.log("storiesSleepie", storiesSleepie);

  for (const story of storiesSleepie) {
    for (const label of story.label) {
      if (!labelArray.includes(label.name)) {
        setLabelArray([...labelArray, label.name]);
      }
    }
  }
  // console.log("labelArray", labelArray);

  const categoryCarrouselToDisplay = labelArray.map((labelName, i) => {
    return (
      <CategoryCarousel
        key={i}
        title={labelName}
        data={storiesSleepie.filter((story) =>
          story.label.some((label) => label.name === labelName)
        )}
      />
    );
  });

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.carrousel}>{categoryCarrouselToDisplay}</View>
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
  card: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 75,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  carrousel: {
    flex: 1,
    width: "100%",
    paddingTop: 50,
  },
});
