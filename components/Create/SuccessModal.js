import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import Button from "../KitUI/Button";
import { updateTrack } from "../../reducers/track";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

export default function SuccessModal({ navigation, displayModal }) {
  const dispatch = useDispatch();
  const trackData = useSelector((state) => state.track.value);

  function handleClose(type) {
    if (type === "start") {
      // Quand on appuie sur le bouton Ecoutez votre histoire on lance l'histoire automatiquement
      dispatch(
        updateTrack({
          track: { ...trackData.track },
          shouldPlayAutomatically: true,
        })
      );
    }
    // On reset les params de create form
    navigation.navigate("home");
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={displayModal}
      onRequestClose={() => handleClose()}
    >
      <LinearGradient
        colors={Colors.bgPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomSheet, { height: windowHeight }]}
      >
        <View style={styles.mainModalContainer}>
          <View>
            <Text></Text>
          </View>
          <View style={styles.middleModalContainer}>
            <Ionicons name="checkmark-circle" size={Spacing.maximale} color={Colors.success} />
            <View>
              <Text style={styles.text}>Votre histoire a bien été générée.</Text>
              <Text style={styles.text}>Retrouvez-la dans votre Bibliothèque.</Text>
            </View>

            <Button
              title={"Ecoutez votre histoire"}
              size="large"
              variant="primary"
              onPress={() => handleClose("start")}
            />
          </View>
          <View style={styles.bottomModalContainer}>
            <TouchableOpacity onPress={() => handleClose("close")}>
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
  bottomModalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainModalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  middleModalContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.huge,
    paddingHorizontal: Spacing.lg,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  text: {
    ...Typography.body,
    color: Colors.textBody,
    textAlign: "center",
  },
});
