import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "./tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import TrackPlayer, {
  useTrackPlayerEvents,
  useActiveTrack,
  usePlaybackState,
  Event,
  State,
} from "react-native-track-player";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateModalState } from "../../reducers/modal";

const events = [
  Event.RemotePlay,
  Event.RemotePause,
  Event.RemotePlayPause,
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

export default function MiniPlayer({ track }) {
  const { _id, title, image, author, url } = track;
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const playbackState = usePlaybackState();
  const playerState = playbackState.state;
  const activeTrack = useActiveTrack();
  console.log({ playerState });
  console.log({ _id, active: activeTrack?.id });

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
  });

  useEffect(() => {
    const isCurrentTrackPlaying = activeTrack?.id === _id;

    if (activeTrack !== undefined && !isCurrentTrackPlaying && _id) {
      console.log("Action: Détection de nouvelle piste, lancement automatique.");

      const loadAndPlayTrack = async () => {
        await TrackPlayer.reset();
        await TrackPlayer.add([
          {
            id: _id,
            artwork: image,
            artist: author.username,
            url: url,
            title: title,
          },
        ]);
        await TrackPlayer.play();
      };

      loadAndPlayTrack();
    }
    // Le hook se déclenche chaque fois que la piste (_id, image, author, url) change.
  }, [_id, activeTrack?.id]);

  const isPlaying = playerState === State.Playing;

  async function handlePlay() {
    const shouldChangeTrack = !activeTrack || activeTrack.id !== _id || playerState === State.Ended;
    console.log({ shouldChangeTrack });
    if (shouldChangeTrack) {
      console.log("Action: Changement de piste / Ajout initial");
      // Réinitialise le lecteur et ajoute la nouvelle piste
      await TrackPlayer.reset();
      // On décompose track et on ajoute un id: _id car le track player attend une cled id et non _id
      // Trackplayer attend une clef artwork et non image donc on lui donne
      // Trackplayer attend une clef artist et non author donc on lui donne
      await TrackPlayer.add([{ id: _id, artwork: image, artist: author.username, url: url, title: title }]);
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

  return (
    <LinearGradient
      colors={Colors.bgTertiary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <View style={styles.miniPlayerContainer}>
        <View>
          <TouchableOpacity onPress={() => handlePlay()} activeOpacity={0.8}>
            {isPlaying ? (
              <Ionicons name="pause" size={Spacing.xxxl} color={Colors.textTitle} />
            ) : (
              <Ionicons name="play" size={Spacing.xxxl} color={Colors.textTitle} />
            )}
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() => dispatch(updateModalState(true))}
          style={styles.middleMiniPlayerContainer}
        >
          <View style={styles.cover}>
            <Image
              style={styles.artwork}
              source={{
                uri:
                  image ||
                  "https://res.cloudinary.com/dr6rfk2nz/image/upload/v1761208190/cld-sample-5.jpg",
              }}
            />
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{author.username}</Text>
          </View>
        </Pressable>
        <View>
          {isLike ? (
            <Ionicons
              onPress={() => setIsLike(false)}
              name="heart"
              size={Spacing.xxxl}
              color={Colors.error}
            />
          ) : (
            <Ionicons
              onPress={() => setIsLike(true)}
              name="heart-outline"
              size={Spacing.xxxl}
              color={Colors.textTitle}
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
  },
  miniPlayerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  middleMiniPlayerContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  artwork: {
    flex: 1,
    borderRadius: 8,
  },
  title: {
    ...Typography.body,
    fontSize: 18,
    color: Colors.textBody,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textBody,
  },
});
