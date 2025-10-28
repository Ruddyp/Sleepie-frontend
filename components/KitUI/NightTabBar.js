import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "./tokens";

const TAB_CONFIG = {
  home: { icon: "🏠", label: "Accueil" },
  discover: { icon: "🎧", label: "Découvrir" },
  create: { icon: "✨", label: "Créer" },
  favorites: { icon: "⭐", label: "Favoris" },
  kitScreen: { icon: "🧪", label: "KitScreen" },
};

export const NightTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const activeIndex = state.index;

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, Spacing.sm) }]}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, index) => {
        const isActive = index === activeIndex;
        const cfg = TAB_CONFIG[route.name] || { icon: "❖", label: route.name };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            hitSlop={10}
          >
            {isActive ? (
              <LinearGradient
                colors={Colors.accentPrimary} // ['#4A8BFF', '#1EC8FF']
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconActive}
              >
                <Text style={styles.icon}>{cfg.icon}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{cfg.icon}</Text>
              </View>
            )}

            <Text style={[styles.label, isActive && styles.labelActive]}>{cfg.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ICON = 40;

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
  iconContainer: {
    width: ICON,
    height: ICON,
    borderRadius: ICON / 2,
    backgroundColor: Colors.transparent,
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
    shadowColor: Colors.accentSecondarySolid,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  icon: {
    fontSize: Typography.iconLarge ?? 22,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: Typography.micro.fontSize,
    lineHeight: Typography.micro.lineHeight,
    fontWeight: "400",
  },
  labelActive: {
    color: Colors.textTitle,
    fontWeight: "700",
  },
});
