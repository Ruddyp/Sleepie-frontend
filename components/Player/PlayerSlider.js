import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../KitUI/tokens";
import { useProgress } from "react-native-track-player";
import Slider from "@react-native-community/slider";
import { formatSecondsToMinutes } from "../../modules/utils";
import { useDispatch } from "react-redux";
import { updateSeekTo } from "../../reducers/track";
export default function PlayerSlider() {
  const dispatch = useDispatch();
  const { position, duration } = useProgress(500);
  return (
    <>
      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(value) => dispatch(updateSeekTo(value))}
        minimumTrackTintColor={Colors.accentPrimarySolid}
        maximumTrackTintColor={Colors.textTitle}
        thumbTintColor={Colors.textSleepieYellow}
      />
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          {formatSecondsToMinutes(Math.round(position))}
        </Text>
        <Text style={styles.progressText}>
          {formatSecondsToMinutes(Math.round(duration - position))}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  progressTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.textBody,
  },
});
