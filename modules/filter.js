export function filterDuration(story, selectedDuration) {
  // Si pas de filtre on renvoie true
  if (selectedDuration.key === "all") {
    return true;
  }

  // S'il y a un filtre on vérifie la plage
  const minDuration = parseInt(selectedDuration.min);
  const maxDuration = parseInt(selectedDuration.max);
  const storyDuration = story.configuration?.duration;

  const inPlage = storyDuration >= minDuration && storyDuration < maxDuration;

  return inPlage;
}
