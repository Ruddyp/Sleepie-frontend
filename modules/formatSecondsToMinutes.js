export function formatSecondsToMinutes(totalSeconds) {
  // S'assurer que l'entrée est un nombre non négatif
  if (typeof totalSeconds !== "number" || totalSeconds < 0) {
    return "0:00";
  }

  // Calculer les minutes et les secondes restantes
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Formater les secondes pour toujours avoir deux chiffres (ex: 9 devient "09")
  // On utilise padStart pour ajouter un zéro initial si nécessaire.
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Construire la chaîne de caractères finale "m:ss"
  return `${minutes}:${formattedSeconds}`;
}
