import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrackPlayer from "react-native-track-player";
import { updateStoryCountAndRecentlyPlayed } from "../../modules/databaseAction";
import { voices } from "../../modules/constant";
import {
  updatePlaybackState,
  updateSeekTo,
  updateShouldPlayAutomatically,
} from "../../reducers/track";
import { useTrackPlayerEvents, Event, State } from "react-native-track-player";

const events = [Event.PlaybackError, Event.PlaybackState];

export default function TrackManager() {
  const dispatch = useDispatch();
  const trackData = useSelector((state) => state.track.value);
  const user = useSelector((state) => state.user.value);
  const { _id, title, image, author, url } = trackData.track;
  const { shouldPlayAutomatically, playbackState, seekTo } = trackData;

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }

    // Cas ou la track arrive a la fin on dispatch avec State.Ended
    if (event.type === Event.PlaybackState && event.state === State.Ended) {
      dispatch(updatePlaybackState(State.Ended));
    }
  });

  // useEffect 1 : Gestion du changement de track
  useEffect(() => {
    if (!url) {
      // Reset si pas d'URL
      const resetTrack = async () => {
        await TrackPlayer.stop();
        await TrackPlayer.reset();
      };
      resetTrack();
      return;
    }

    const loadTrack = async () => {
      try {
        const currentTrack = await TrackPlayer.getActiveTrack();
        const isSameTrack = currentTrack?.id === _id;

        if (!isSameTrack) {
          await TrackPlayer.reset();
          await TrackPlayer.add([
            {
              id: _id,
              title: title,
              artist: author ? author.username : "",
              artwork: image,
              url: url,
            },
          ]);
          dispatch(updatePlaybackState(State.Paused));
          dispatch(updateSeekTo(null));
        }
      } catch (error) {
        console.log("Erreur lors du chargement de la piste:", error);
      }
    };

    loadTrack();
  }, [_id, url]);

  // useEffect 2 : Gestion de la lecture automatique
  useEffect(() => {
    if (!url || !shouldPlayAutomatically) return;

    const playTrack = async () => {
      try {
        if (!voices.includes(title)) {
          await updateStoryCountAndRecentlyPlayed(
            user.token,
            trackData.track,
            dispatch
          );
        }
        // Reset le flag après utilisation
        dispatch(updateShouldPlayAutomatically(false));
        dispatch(updatePlaybackState(State.Playing));
      } catch (error) {
        console.log("Erreur lors de la lecture:", error);
      }
    };

    playTrack();
  }, [shouldPlayAutomatically]);

  // useEffect 3 : Gestion des play/pause/ended
  useEffect(() => {
    if (!url) return;

    const playbackStateHandler = async () => {
      switch (playbackState) {
        case State.Playing:
          await TrackPlayer.play();
          break;
        case State.Paused:
          await TrackPlayer.pause();
          break;
        case State.Ended:
          await TrackPlayer.seekTo(0);
          await TrackPlayer.pause();
          break;
        default:
          break;
      }
    };

    playbackStateHandler();
  }, [playbackState]);

  // useEffect 4 : Gestion des seekTo
  useEffect(() => {
    if (!url || seekTo === null || typeof seekTo !== "number") return;

    const seekToHandler = async () => {
      await TrackPlayer.seekTo(seekTo);
      dispatch(updateSeekTo(null));
    };

    seekToHandler();
  }, [seekTo]);

  // On ne rend rien, le but est de gérer le changement de track et les action play/pause/ended.
  return null;
}
