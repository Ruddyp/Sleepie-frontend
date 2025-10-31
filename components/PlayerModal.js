import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState } from "../reducers/modal";
import { Player } from "./KitUI/Player";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "./KitUI/tokens";

const windowHeight = Dimensions.get("window").height;
export default function PlayerModal() {
  const dispatch = useDispatch();
  const trackData = useSelector((state) => state.track.value);
  const modal = useSelector((state) => state.modal.value);
  function handleClose() {
    dispatch(updateModalState(false));
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal.modalState}
      onRequestClose={() => dispatch(updateModalState(false))}
    >
      <LinearGradient
        colors={Colors.bgPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomSheet, { height: windowHeight }]}
      >
        <View style={styles.mainModalContainer}>
          <View style={styles.middleModalContainer}>
            <Player track={trackData.track} />
          </View>
          <View style={styles.bottomModalContainer}>
            <TouchableOpacity onPress={() => handleClose()}>
              <Ionicons
                name="close-circle-outline"
                size={Spacing.maximale}
                color={Colors.textBody}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bottomModalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainModalContainer: {
    width: "100%",
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  middleModalContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
});
