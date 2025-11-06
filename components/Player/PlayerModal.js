import { StyleSheet, View, Modal, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateModalState } from "../../reducers/modal";
import { Player } from "./Player";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../KitUI/tokens";

const windowHeight = Dimensions.get("window").height;
export default function PlayerModal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);
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
            <Player />
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
  mainModalContainer: {
    width: "100%",
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  middleModalContainer: {
    width: "100%",
    // height: windowHeight <= 800 ? "90%" : "80%",
    height: windowHeight * 0.85,
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
