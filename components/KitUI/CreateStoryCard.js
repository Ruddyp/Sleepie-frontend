// components/KitUI/CreateStoryCardFull.js
import React, { useEffect, useRef } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "./tokens";

export default function CreateStoryCard({
  onPress,
  title = "Créer mon histoire",
}) {
  const screenHeight = Dimensions.get("window").height;
  const CARD_HEIGHT = Math.floor(screenHeight / 3);

  // --- Animation "respiration"
  const breath = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(breath, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breath]);

  // 1) Scale doux sur la carte
  const scale = breath.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });
  // 2) Overlay respirant au-dessus du gradient (sinon caché)
  const overlayOpacity = breath.interpolate({
    inputRange: [0, 1],
    outputRange: [0.0, 0.25],
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { height: CARD_HEIGHT },
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
      android_ripple={{ color: "rgba(255,255,255,0.12)" }}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {/* Wrapper animé (scale) */}
      <Animated.View style={{ flex: 1, transform: [{ scale }] }}>
        <LinearGradient
          colors={["#1064DB", "#00A0F7"]} // 💙 Sleepie
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Icône lune (haut-droite)
          <View style={styles.moonWrap} pointerEvents="none">
            <Ionicons
              name={Platform.OS === "ios" ? "ios-moon" : "moon"}
              size={28}
              color="rgba(255,255,255,0.95)"
            />
          </View> */}

          {/* Pastille + (haut-gauche) */}
          <View style={styles.plusCircle}>
            <Text style={styles.plusText}>＋</Text>
          </View>

          {/* Texte central */}
          <View style={styles.textWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>Personnalisée en 3 minutes</Text>
          </View>

          {/* Vagues décoratives */}
          <View style={styles.waveLarge} />
          <View style={styles.waveSmall} />

          {/* Overlay respirant AU-DESSUS du gradient */}
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              styles.breathOverlay,
              { opacity: overlayOpacity },
            ]}
          />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing.xl,
    ...Shadows.soft,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  // Overlay respirant placé AU-DESSUS (teinte douce blanche)
  breathOverlay: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  // Icône lune
  moonWrap: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  // Pastille +
  plusCircle: {
    position: "absolute",
    top: Spacing.lg,
    left: Spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  plusText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginTop: -1,
  },

  // Texte
  textWrap: { alignItems: "center", gap: Spacing.sm },
  title: {
    color: Colors.textSleepieYellow,
    fontFamily: Typography.fontHeading,
    fontSize: Typography.h2?.fontSize || 26,
    lineHeight: Typography.h2?.lineHeight || 32,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: Typography.body.fontSize,
    textAlign: "center",
  },

  // Waves décoratives
  waveLarge: {
    position: "absolute",
    bottom: -30,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  waveSmall: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
});
