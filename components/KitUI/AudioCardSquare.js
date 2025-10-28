import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "./tokens";

export default function AudioCardSquare({
  title,
  duration,
  voice,
  imageUrl,
  isFavorite = false,
  onPlay,
  onToggleFavorite,
  size = 220,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, { width: size }]}
      activeOpacity={0.9}
      onPress={onPlay} // ← cliquer n'importe où (hors cœur) lance la lecture
      accessibilityRole="button"
      accessibilityLabel={`Lire ${title}`}
    >
      {/* IMAGE CARRÉE + boutons superposés */}
      <View style={[styles.imageWrap, { width: size, height: size }]}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* Bouton Play (petit, bas-gauche) */}
        <TouchableOpacity
          onPress={onPlay}
          activeOpacity={0.9}
          style={[styles.fabSmall, styles.playFab, Shadows.soft]}
          accessibilityRole="button"
          accessibilityLabel={`Lire ${title}`}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>

        {/* Bouton Favori (bas-droite) — NE LANCE PAS onPlay */}
        <TouchableOpacity
          onPress={onToggleFavorite}
          activeOpacity={0.9}
          style={[styles.fabSmall, styles.likeFab, Shadows.soft]}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite
              ? `Retirer ${title} des favoris`
              : `Ajouter ${title} aux favoris`
          }
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.likeIcon, isFavorite && styles.likeIconActive]}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Texte sous l'image (fond transparent) */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          ⏱ {duration} • {voice}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // pas de background ici: zone cliquable transparente autour si souhaité
  },
  imageWrap: {
    position: "relative",
    borderRadius: BorderRadius.large,
    overflow: "hidden",
    backgroundColor: Colors.bgSecondarySolid,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.accentPrimarySolid,
  },

  // FABs superposés
  fabSmall: {
    position: "absolute",
    bottom: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.round,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgSecondarySolid, // mets Colors.transparent si tu veux zéro fond
  },
  playFab: {
    left: Spacing.md,
    backgroundColor: Colors.accentPrimarySolid,
  },
  likeFab: {
    right: Spacing.md,
  },
  playIcon: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 1,
  },
  likeIcon: {
    color: Colors.white,
    fontSize: 18,
  },
  likeIconActive: {
    color: Colors.success,
  },

  // Texte sous l'image
  info: {
    marginTop: Spacing.sm,
  },
  title: {
    color: Colors.textTitle,
    fontSize: Typography.body.fontSize,
    fontFamily: Typography.fontHeading,
    fontWeight: "700",
    marginBottom: 2,
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: Typography.caption.fontSize,
  },
});
