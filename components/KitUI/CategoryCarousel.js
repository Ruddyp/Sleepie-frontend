import { View, Text, Pressable, FlatList, StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, Typography } from "./tokens";
import AudioCardSquare from "./AudioCardSquare";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CategoryCarousel({
  title = "",
  data = [], // Ensemble des histoires a afficher dans le carroussel
}) {
  if (data.length === 0) return null;
  const navigation = useNavigation();
  const route = useRoute();
  const sidePadding = Spacing.lg;
  const gapBetweenCard = Spacing.lg;
  const cardSize = Dimensions.get("window").width * 0.42;

  const itemFullWidth = cardSize + gapBetweenCard;

  const renderItem = ({ item }) => <AudioCardSquare {...item} size={cardSize} />;

  const handleSeeMore = () => {
    navigation.navigate("playlist", {
      title,
      stories: data,
      origin: route.name,
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER : titre de la catégories + voir plus*/}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Pressable style={styles.moreContainer} onPress={handleSeeMore}>
          <Ionicons name="add-circle-outline" size={Spacing.xl} color={Colors.textTitle} />
          <Text style={styles.more}>Voir plus</Text>
        </Pressable>
      </View>

      {/* CARROUSEL */}
      {cardSize > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => `${title}-${item._id}`}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ paddingHorizontal: sidePadding }}
          ItemSeparatorComponent={() => <View style={{ width: gapBetweenCard }} />}
          snapToAlignment="start"
          snapToInterval={itemFullWidth}
          decelerationRate="fast"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    color: Colors.textTitle,
    ...Typography.h3,
    fontWeight: Typography.h2.fontWeight,
    fontFamily: Typography.fontHeading,
  },
  moreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  more: {
    color: Colors.textBody,
    ...Typography.caption,
  },
});
