// Variable simple pour stocker le timestamp de fin du minuteur
let sleepTimerTimestamp = null;

/**
 * Définit l'heure d'arrêt du minuteur.
 * Utilisé par le composant Player.
 * @param {number | null} timestamp - L'heure en millisecondes (ou null pour annuler).
 */
export const setTimerTimestamp = (timestamp) => {
  sleepTimerTimestamp = timestamp;
  console.log(
    `[TimerStore] Minuteur réglé à: ${
      timestamp ? new Date(timestamp).toLocaleTimeString() : "Annulé"
    }`
  );
};

/**
 * Récupère l'heure d'arrêt du minuteur.
 * Utilisé par le service de lecture en arrière-plan.
 * @returns {number | null}
 */
export const getTimerTimestamp = () => {
  return sleepTimerTimestamp;
};
