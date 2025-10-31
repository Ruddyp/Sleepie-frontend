import { useMemo, useRef, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "./tokens";
import AudioCardSquare from "./AudioCardSquare"; // <-- ton composant

export default function CategoryCarousel({
  title = "",
  icon, // { uri: "..." } ou require(".../icon.png")
  data = [], // [{ id, title, duration, voice, imageUrl, isFavorite }, ...]
  gap = Spacing.lg || 12,
  sidePadding = Spacing.xl || 24,
  cardWidth, // optionnel: largeur fixe des cards; sinon calcul auto
}) {
  const listRef = useRef(null);
  const [containerW, setContainerW] = useState(null);

  const cardSize = useMemo(() => {
    if (cardWidth) return cardWidth;
    if (!containerW) return 0;
    // Par défaut: 75% de la largeur disponible
    return Math.round(containerW * 0.45);
  }, [containerW, cardWidth]);

  const itemFullWidth = useMemo(() => cardSize + gap, [cardSize, gap]);

  // const keyExtractor = (it, idx) => (it.id ? String(it.id) : String(idx));

  const renderItem = ({ item }) => {
    // console.log(item, "item in renderItem")
    return (
      <View style={{ width: cardSize }}>
        <AudioCardSquare
          {...item}
          // title={item.title}
          // duration={item.duration}
          // voice={item.voice}
          // imageUrl={item.imageUrl}
          // isFavorite={!!item.isFavorite}
          // onPlay={() => onPlayItem?.(item)}
          // onToggleFavorite={() => onToggleFavorite?.(item)}
          size={cardSize}
        />
      </View>
    );
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerW(e.nativeEvent.layout.width - sidePadding * 2)}
    >
      {/* HEADER : icône + titre */}
      <View style={styles.header}>
        {icon ? <Image source={icon} style={styles.icon} /> : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* CARROUSEL */}
      {cardSize > 0 && (
        <FlatList
          ref={listRef}
          data={data}
          // keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: sidePadding }}
          ItemSeparatorComponent={() => <View style={{ width: gap }} />}
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
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl || 24,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    resizeMode: "cover",
  },
  title: {
    color: Colors.textTitle,
    fontSize: Typography.h3?.fontSize || 20,
    lineHeight: Typography.h3?.lineHeight || 26,
    fontFamily: Typography.fontHeading,
    fontWeight: "800",
  },
});
