import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Player } from "../components/KitUI/Player";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../components/KitUI/tokens";
import { useState } from "react";

const track1 = {
  url: "https://res.cloudinary.com/dr6rfk2nz/video/upload/v1761644049/D%C3%A9couvrez_le_clip_restaur%C3%A9_de_C_est_%C3%A9crit_de_Francis_Cabrel_extrait_de_son_album_Sarbacane._rqdy9p.mp3", // Load media from the network
  title: "C'est écrit",
  artist: "Francis cabrel",
  album: "Poulet braisé",
  genre: "Variété française",
  date: "2014-05-20T07:00:00+00:00", // RFC 3339
  artwork: "https://res.cloudinary.com/dr6rfk2nz/image/upload/v1761208190/cld-sample-5.jpg",
  _id: "francis",
  duration: 60,
};

const track2 = {
  url: "https://res.cloudinary.com/dr6rfk2nz/video/upload/v1761643955/Beat_It_Dance_Mix_-_Michael_Jackson_MoonwalkMagic_pg9j3x.mp3", // Load media from the network
  title: "Beat it",
  artist: "Michael Jackson",
  album: "Thrillllllllller",
  genre: "Pop",
  date: "2014-05-20T07:00:00+00:00", // RFC 3339
  artwork: "https://res.cloudinary.com/dr6rfk2nz/image/upload/v1761208184/samples/man-portrait.jpg", // Load artwork from the network
  _id: "MJ",
};

export default function Discover() {
  const [track, setTrack] = useState(track1);

  function handleTrack() {
    if (track.title === "C'est écrit") {
      setTrack(track2);
    } else {
      setTrack(track1);
    }
  }

  return (
    <LinearGradient
      colors={Colors.bgPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>LISTEN PAGE</Text>
      <Player track={track} />
      <TouchableOpacity style={styles.button} onPress={() => handleTrack()}>
        <Text style={{ color: "white" }}>Change track</Text>
      </TouchableOpacity>
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
});
