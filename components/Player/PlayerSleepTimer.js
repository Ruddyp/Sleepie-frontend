import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Colors,
  Typography,
  Spacing,
  Sizes,
  BorderRadius,
} from "../KitUI/tokens";
import { useProgress } from "react-native-track-player";
import { Ionicons } from "@expo/vector-icons";
import SleepTimerModal from "./SleepTimerModal";
import { useState } from "react";

export default function PlayerSleepTimer() {
  const { duration } = useProgress(500); // 100ms de rafraîchissement
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.sleepTimerButton}
        activeOpacity={0.8}
        onPress={() => setIsOpen(true)}
      >
        <Ionicons name="timer" size={Spacing.xxl} color={Colors.textBody} />
        <Text style={styles.timerLabel}>Minuteur</Text>
      </TouchableOpacity>
      <SleepTimerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        duration={duration}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sleepTimerButton: {
    height: Sizes.buttonDefault,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.audioWave,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  timerLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
  },
});
