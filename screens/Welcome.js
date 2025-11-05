import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";
import Button from "../components/KitUI/Button";

export default function Welcome({ navigation }) {
  const goLogin = () => navigation.navigate("Login");

  return (
    <View style={styles.root}>
      {/* Fond principal — plus sombre et moins saturé */}
      <LinearGradient
        colors={[Colors.bgSleepieBlue2, Colors.bgSleepieBlue1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Vignette douce sur les bords */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.18)",
          "transparent",
          "transparent",
          "rgba(0,0,0,0.14)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Voile vertical (atténue le bas de l’écran) */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,20,0.20)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Halo radial — plus petit, plus léger */}
      <LinearGradient
        colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.0)"]}
        style={styles.halo}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Étoiles très atténuées */}
      <View style={[styles.star, { top: 86, left: 36, opacity: 0.18 }]} />
      <View style={[styles.star, { top: 140, right: 62, opacity: 0.14 }]} />
      <View style={[styles.star, { top: 220, left: 128, opacity: 0.12 }]} />

      <View style={styles.container}>
        {/* Logo plus contenu */}
        <Image
          source={require("../assets/logo-Sleepie-blanc-transparent.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Sleepie"
        />

        {/* Titre — lisible mais doux */}
        <Text style={styles.title}>
          La première application d’histoires pour vous endormir
        </Text>

        {/* CTA unique — texte en jaune Sleepie */}
        <View style={styles.ctaWrapper}>
          <Button
            title="Je commence à rêver..."
            size="large"
            variant="primary"
            onPress={goLogin}
            textStyle={{ color: Colors.textSleepieYellow }}
          />
        </View>

        {/* Vague basse — très légère */}
        <LinearGradient
          colors={["rgba(255,255,255,0.04)", "rgba(255,255,255,0.0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.wave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgSleepieBlue2 },

  container: {
    flex: 1,
    paddingTop: Spacing.xl * 2,
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Spacing.md,
  },

  halo: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    top: -20,
    left: "50%",
    marginLeft: -160,
    opacity: 0.9,
  },

  star: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  logo: {
    width: 300,
    height: 300,
    opacity: 0.9,
    marginBottom: Spacing.sm,
  },

  title: {
    ...Typography.h1,
    color: Colors.textTitle, // plus lisible que textBody
    textAlign: "center",
    lineHeight: 36,
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
    opacity: 0.85,
  },

  ctaWrapper: {
    marginTop: Spacing.md,
    width: "100%",
  },

  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
});
