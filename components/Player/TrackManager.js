import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrackPlayer from "react-native-track-player";
import { updateStoryCountAndRecentlyPlayed } from "../../modules/databaseAction";
import { voices } from "../../modules/constant";

export default function TrackManager() {
  const dispatch = useDispatch();
  const trackData = useSelector((state) => state.track.value);
  const user = useSelector((state) => state.user.value);
  const { _id, title, image, author, url } = trackData.track;
  const { shouldPlayAutomatically } = trackData;
  console.log("trackkkkkkkkkkk", trackData);

  useEffect(() => {
    if (url) {
      const loadAndPlayTrack = async () => {
        try {
          // Vérification si une track est déjà chargée et si c'est la même
          const currentTrack = await TrackPlayer.getActiveTrack();
          const isSameTrack = currentTrack?.id === _id;

          if (!isSameTrack) {
            console.log("TrackManager: Nouvelle piste détectée. Chargement et lecture.");

            // Réinitialisation du lecteur
            await TrackPlayer.reset();
            // Ajout de la nouvelle piste.
            await TrackPlayer.add([
              {
                id: _id,
                title: title,
                artist: author ? author.username : "",
                artwork: image,
                url: url,
              },
            ]);

            if (shouldPlayAutomatically) {
              console.log("TrackManager: Lancement automatique demandé.");

              // Si la track en question n'est pas un sample de voix
              // On met a jour le count de la track et ajout dans recently played
              if (!voices.includes(title)) {
                await updateStoryCountAndRecentlyPlayed(user.token, trackData.track, dispatch);
              }
              await TrackPlayer.play();
            } else {
              console.log("TrackManager: Piste chargée, mais pas de lancement automatique.");
            }
          } else {
            console.log("TrackManager: Même piste que celle en cours.");
            // Gestion du cas de création d'une hsitoire
            // Appuyer sur le bouton va passer shouldPlayAutomatically a true mais la piste et la même
            if (shouldPlayAutomatically) {
              console.log("TrackManager: Lancement automatique demandé.");
              // Si la track en question n'est pas un sample de voix
              // On met a jour le count de la track et ajout dans recently played
              if (!voices.includes(title)) {
                await updateStoryCountAndRecentlyPlayed(user.token, trackData.track, dispatch);
              }
              await TrackPlayer.play();
            }
          }
        } catch (error) {
          console.log("Erreur lors du chargement/lecture de la piste:", error);
        }
      };

      loadAndPlayTrack();
    } else {
      const resetTrack = async () => {
        // Réinitialisation du lecteur
        await TrackPlayer.reset();
      };
      resetTrack();
    }
  }, [_id, url, shouldPlayAutomatically]);

  // On ne rend rien, le but est de gérer le changement de track.
  return null;
}
