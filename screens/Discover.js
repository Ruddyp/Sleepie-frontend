import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, {
  useTrackPlayerEvents,
  useActiveTrack,
  Event,
  State,
} from "react-native-track-player";
import { getIsPlaying } from "../modules/trackPlayerHandler";

const track1 = {
  url: "https://res.cloudinary.com/dr6rfk2nz/video/upload/v1761571176/Rick_Roll_Different_link_no_ads_cbpgdh.mp3", // Load media from the network
  title: "RickRoll",
  artist: "deadmau5",
  album: "while(1<2)",
  genre: "Progressive House, Electro House",
  date: "2014-05-20T07:00:00+00:00", // RFC 3339
  artwork: "https://res.cloudinary.com/dr6rfk2nz/image/upload/v1761208189/cld-sample-4.jpg",
  id: "rick-roll-id", // Load artwork from the network
};

const track2 = {
  url: "https://res.cloudinary.com/dr6rfk2nz/video/upload/v1761576007/Baby_Shark_Doo_Doo_Doo_Mommy_Shark_Joins_In_Baby_Twinkle_shorts_m2undo.mp3", // Load media from the network
  title: "Baby_shark",
  artist: "deadmau5",
  album: "while(1<2)",
  genre: "Progressive House, Electro House",
  date: "2014-05-20T07:00:00+00:00", // RFC 3339
  artwork: "https://res.cloudinary.com/dr6rfk2nz/image/upload/v1761208189/cld-sample-4.jpg", // Load artwork from the network
  id: "baby-shark-id",
};
const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged];

export default function Discover() {
  const [playerState, setPlayerState] = useState(null);
  const [track, setTrack] = useState(track1);
  const activeTrack = useActiveTrack();

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  const isPlaying = playerState === State.Playing;
  async function handlePlay() {
    console.log("playerState", playerState);
    console.log("active track", activeTrack);
    console.log("track", track.title);

    const shouldChangeTrack =
      !activeTrack || activeTrack.id !== track.id || playerState === State.Ended;
    if (shouldChangeTrack) {
      console.log("Action: Changement de piste / Ajout initial");
      // Réinitialise le lecteur et ajoute la nouvelle piste
      await TrackPlayer.reset();
      await TrackPlayer.add([track]);
      await TrackPlayer.play();
    } else {
      // 2. Contrôle Lecture/Pause de la piste courante
      if (isPlaying) {
        console.log("Action: Pause");
        await TrackPlayer.pause();
      } else {
        console.log("Action: Lecture");
        await TrackPlayer.play();
      }
    }
  }

  function handleTrack() {
    if (track.title === "RickRoll") {
      setTrack(track2);
    } else {
      setTrack(track1);
    }
  }

  return (
    <View style={styles.main}>
      <Text>LISTEN PAGE</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={() => handlePlay()}>
          <Text>PLAY</Text>
        </TouchableOpacity>
        <Text>The TrackPlayer is {isPlaying ? "playing" : "not playing"}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleTrack()}>
          <Text>Track: {track.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
