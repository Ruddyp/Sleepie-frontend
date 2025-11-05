import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "../KitUI/tokens";
import { setTimerTimestamp } from "../../sleepTimerStore";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const timerOptions = ["1", "10", "20", "30", "end"];

export default function SleepTimerModal({ isOpen, setIsOpen, duration }) {
  const [sleepTimer, setSleepTimer] = useState(null);

  async function handleSleepTimer(time) {
    // Définition du timestamp pour arreter l'histoire automatiquement
    const futureTime =
      time === "end" ? duration * 1000 + Date.now() : Date.now() + parseInt(time) * 60 * 1000;
    setSleepTimer(time);
    setTimerTimestamp(futureTime);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.mainContainer}>
        {/* Sleep Timer */}
        <View style={styles.centeredContainer}>
          <View style={styles.header}>
            <Ionicons name="timer" size={Spacing.xxxl} color={Colors.textTitle} />
            <Text style={styles.headerText}>Minuteur sommeil</Text>
          </View>
          <View style={styles.timerContainer}>
            {timerOptions.map((time) => (
              <TouchableOpacity
                style={[
                  styles.timerButton,
                  {
                    backgroundColor:
                      sleepTimer === time ? Colors.accentPrimarySolid : Colors.bgTertiarySolid,
                  },
                ]}
                key={time}
                onPress={() => handleSleepTimer(time)}
                activeOpacity={0.8}
              >
                <Text style={styles.text}>{time === "end" ? "Fin de piste" : `${time} min`}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Ionicons name="close-circle-outline" size={Spacing.maximale} color={Colors.textBody} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.audioWave,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    backgroundColor: Colors.bgSecondarySolid,
    width: "80%",
    borderRadius: BorderRadius.small,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  headerText: {
    ...Typography.h3,
    color: Colors.textTitle,
  },
  text: {
    ...Typography.body,
    color: Colors.textTitle,
    textAlign: "center",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
  },
  timerButton: {
    width: 125,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.small,
    borderWidth: 1,
    borderColor: Colors.accentPrimarySolid,
  },
});
