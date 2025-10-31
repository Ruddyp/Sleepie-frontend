import TrackPlayer, { Event } from "react-native-track-player";
// Le service gère les événements en arrière-plan (boutons de notification/écran de verrouillage)
module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  TrackPlayer.addEventListener(Event.RemoteSeek, () => TrackPlayer.seekTo());
};
