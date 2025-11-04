import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "./tokens";

function FilterBar(props) {
  const {
    selectedCategory,
    selectedDuration,
    onChangeCategory,
    onChangeDuration,
    style,
  } = props;

  const durationOptions = [
    { key: "ALL", label: "Toutes" },
    { key: "LE10", label: "≤ 10 min" },
    { key: "D10_20", label: "10–20 min" },
    { key: "D20_30", label: "20–30 min" },
    { key: "GE30", label: "30+ min" },
  ];

  const categoryOptions = [
    { key: "ALL", label: "Toutes" },
    { key: "voyage", label: "Voyages" },
    { key: "fiction", label: "Histoires fictionnelles" },
    { key: "histoire", label: "Histoires historiques" },
    { key: "nature", label: "Histoires de la nature" },
  ];
  return (
    <View style={[styles.container, style]}>
      {/* Durée */}
      <Text style={styles.title}>Durée</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {durationOptions.map((opt) => {
            const selected = selectedDuration === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => onChangeDuration(opt.key)}
                style={[
                  styles.chip,
                  selected ? styles.chipSelected : styles.chipUnselected,
                ]}
              >
                <Text
                  style={
                    selected
                      ? styles.chipTextSelected
                      : styles.chipTextUnselected
                  }
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* // Catégorie */}

      <Text style={[styles.title, { marginTop: Spacing.sm }]}>Catégorie</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {categoryOptions.map((opt) => {
            const selected = selectedCategory === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => onChangeCategory(opt.key)}
                style={[
                  styles.chip,
                  selected ? styles.chipSelected : styles.chipUnselected,
                ]}
              >
                <Text
                  style={
                    selected
                      ? styles.chipTextSelected
                      : styles.chipTextUnselected
                  }
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  title: {
    ...Typography.micro,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingRight: Spacing.xs,
  },
  chip: {
    borderRadius: BorderRadius.round,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: Colors.accentGlow,
    borderColor: Colors.borderSubtle,
  },
  chipSelected: {
    backgroundColor: Colors.bgTertiarySolid,
    borderColor: "#234074",
  },
  chipTextUnselected: {
    ...Typography.micro,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    ...Typography.micro,
    color: Colors.textTitle,
  },
});

export default FilterBar;
