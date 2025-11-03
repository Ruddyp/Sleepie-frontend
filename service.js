import TrackPlayer, { Event } from "react-native-track-player";
import { getTimerTimestamp, setTimerTimestamp } from "./sleepTimerStore";
// Le service gère les événements en arrière-plan (boutons de notification/écran de verrouillage)
module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  TrackPlayer.addEventListener(Event.RemoteSeek, async (event) => {
    TrackPlayer.seekTo(event.position);
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (event) => {
    console.log("eveeeeeeennnnnnt", event);
    const sleepTimestamp = getTimerTimestamp();
    console.log("sleepTimestamp", sleepTimestamp);

    if (sleepTimestamp && sleepTimestamp > 0) {
      const now = Date.now();

      // Vérifie si le temps est écoulé
      if (sleepTimestamp <= now) {
        console.log("Minuteur de veille expiré. Mise en pause.");

        await TrackPlayer.pause();

        // Réinitialiser le minuteur
        setTimerTimestamp(null);
      }
    }
  });
};
