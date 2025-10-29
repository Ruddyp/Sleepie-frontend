import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, Shadows } from "./tokens";

const TAB_CONFIG = {
  home: { inactive: "home-outline", active: "home", label: "Accueil" },
  discover: {
    inactive: "headset-outline",
    active: "headset",
    label: "Découvrir",
  },
  create: {
    inactive: "sparkles-outline",
    active: "sparkles",
    label: "Créer",
    isMain: true,
  },
  favorites: { inactive: "heart-outline", active: "heart", label: "Favoris" },
  kitScreen: {
    inactive: "person-outline",
    active: "person",
    label: "KitScreen",
  },
};




export const NightTabBar = ({ state, navigation, descriptors }) => {
  const activeIndex = state.index;

  const visibleRoutes = state.routes.filter(route => {
    const opts = descriptors[route.key].options;
    if (opts.tabBarButton === null) return false;
    if (opts.tabBarItemStyle && opts.tabBarItemStyle.display === "none") return false;
    return true;
  });

  return (
    <View
      style={[styles.container, { paddingBottom: Spacing.xs }]}
      accessibilityRole="tablist"
    >
      {visibleRoutes.map((route, index) => {
        const isActive = index === activeIndex;
        const cfg = TAB_CONFIG[route.name] || {
          inactive: "ellipse-outline",
          active: "ellipse",
          label: route.name,
        };
        const isMain = cfg.isMain;

        // Taille plus grande pour le bouton Créer
        const iconSize = isMain ? 36 : 24;

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tab, isMain && styles.mainTab]}
            onPress={() => {
              if (!isActive) navigation.navigate(route.name);
            }}
            activeOpacity={0.85}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            hitSlop={10}
          >
            {/* Icône Créer spéciale avec jaune Sleepie */}
            {isMain ? (
              <LinearGradient
                colors={["#1064DB", "#00A0F7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.mainIconWrapper,
                  isActive && styles.mainIconActive,
                ]}
              >
                <Ionicons
                  name={cfg.active}
                  size={iconSize}
                  color={Colors.textSleepieYellow} // ✅ Jaune Sleepie ici
                />
              </LinearGradient>
            ) : isActive ? (
              <LinearGradient
                colors={["#1064DB", "#00A0F7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconActive}
              >
                <Ionicons name={cfg.active} size={iconSize} color={"#FFFFFF"} />
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={cfg.inactive}
                  size={iconSize}
                  color={Colors.textSecondary}
                />
              </View>
            )}

            {/* Label */}
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
                isMain && styles.mainLabel,
              ]}
            >
              {cfg.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ICON = 44;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.bgPrimarySolid,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    ...Shadows.soft,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  mainTab: {
    marginTop: -20, // bouton créer flottant
  },
  iconContainer: {
    width: ICON,
    height: ICON,
    borderRadius: ICON / 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  iconActive: {
    width: ICON,
    height: ICON,
    borderRadius: ICON / 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    ...Shadows.soft,
  },
  mainIconWrapper: {
    width: ICON + 14,
    height: ICON + 14,
    borderRadius: (ICON + 14) / 2,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.soft,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: Typography.micro.fontSize,
    fontWeight: "400",
  },
  labelActive: {
    color: "#FFFFFF",
    fontWeight: "700",
    textShadowColor: "rgba(255,255,255,0.5)", // Glow subtil
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  mainLabel: {
    fontSize: Typography.caption.fontSize,
  },
});
