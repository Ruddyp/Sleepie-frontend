import { StyleSheet, Text, View } from "react-native";
import PlayerModal from "../components/PlayerModal";
import { useSelector } from "react-redux";
import MiniPlayer from "../components/KitUI/MiniPlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../components/KitUI/tokens";
import { useState, useEffect, use } from "react";
import CategoryCarousel from "../components/KitUI/CategoryCarousel";

export default function Favorites() {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const [createdStoriesArray, setCreatedStoriesArray] = useState([]);
  const [likedStories, setLikedStories] = useState([]);
  const trackData = useSelector((state) => state.track.value);
  const displayMiniPlayer =
    !trackData.modalState && trackData.track.url !== null;
  const userToken = useSelector((state) => state.user.value.token);

  useEffect(() => {
    fetch(`http://${IP}:${port}/users/favorites?token=${userToken}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data from fetch", data);
        setCreatedStoriesArray(data.myStories);
        setLikedStories(data.storiesLiked);
      })
      .catch((error) => {
        console.log("error from fetch", error);
      });
  }, []);
  for (const story of createdStoriesArray) {
    for (const label of story.label) {
      if (!createdStoriesArray.includes(label.name)) {
        setCreatedStoriesArray([...createdStoriesArray, label.name]);
      }
    }
  }
  console.log("createdStoriesArray", createdStoriesArray);

  const categoryCarrouselToDisplay = createdStoriesArray.map((labelName, i) => {
    return (
      <CategoryCarousel
        key={i}
        title={labelName}
        data={createdStoriesArray.filter((story) =>
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
      <View>
        <Text>FAVORIS PAGE</Text>
        {categoryCarrouselToDisplay}
        {displayMiniPlayer && <MiniPlayer />}
        <PlayerModal />
      </View>
    </LinearGradient>
  );
}
