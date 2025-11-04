import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "./tokens";

function FilterBar(props) {
  const {
    selectedCategory,
    selectedDuration,
    setSelectedCategory,
    setSelectedDuration,
    hideCategory = false,
    hideDuration = false,
  } = props;

  const durationOptions = [
    { key: "all", label: "Toutes" },
    { key: "1", label: "1-5 min", min: 1, max: 5 },
    { key: "5", label: "5-10 min", min: 5, max: 10 },
    { key: "10", label: "10-20 min", min: 10, max: 20 },
    { key: "20", label: "20-30 min", min: 20, max: 30 },
    { key: "30", label: "30+ min", min: 30, max: 9999 },
  ];

  const categoryOptions = [
    { key: "all", label: "Toutes" },
    { key: "voyage", label: "Voyages" },
    { key: "fiction", label: "Fictionnelles" },
    { key: "historique", label: "Historiques" },
    { key: "nature", label: "Nature" },
  ];
  return (
    <View style={styles.container}>
      {/* Catégorie */}
      {!hideCategory && (
        <>
          <Text style={styles.title}>Catégories d'histoires</Text>
          <ScrollView horizontal>
            <View style={styles.row}>
              {categoryOptions.map((opt) => {
                const selected = selectedCategory === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setSelectedCategory(opt.key)}
                    style={[styles.chip, selected ? styles.chipSelected : styles.chipUnselected]}
                  >
                    <Text style={selected ? styles.chipTextSelected : styles.chipTextUnselected}>
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}

      {/* Durée */}
      {!hideDuration && (
        <>
          <Text style={styles.title}>Durée</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              {durationOptions.map((opt) => {
                const selected = selectedDuration.key === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setSelectedDuration(opt)}
                    style={[styles.chip, selected ? styles.chipSelected : styles.chipUnselected]}
                  >
                    <Text style={selected ? styles.chipTextSelected : styles.chipTextUnselected}>
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textBody,
    ...Typography.caption,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingRight: Spacing.sm,
  },
  chip: {
    borderRadius: BorderRadius.round,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  chipUnselected: {
    backgroundColor: Colors.accentGlow,
  },
  chipSelected: {
    backgroundColor: Colors.bgTertiarySolid,
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
