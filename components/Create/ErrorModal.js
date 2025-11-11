import { StyleSheet, Text, View, Modal, Dimensions } from "react-native";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import Button from "../KitUI/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { resetCreateForm } from "../../reducers/createForm";
import { updateModalState } from "../../reducers/modal";
import { resetTrack } from "../../reducers/track";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

export default function ErrorModal() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const navigation = useNavigation();
  const displayModal = form.generationStatus === "error";

  function handleClose() {
    // lors d'une erreur on reset track form et modal pour repartir propre
    dispatch(resetCreateForm());
    dispatch(resetTrack());
    dispatch(updateModalState(false));
    navigation.navigate("create");
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
          <Ionicons
            name="alert-circle"
            size={Spacing.maximale}
            color={Colors.error}
          />
          <View style={{ gap: Spacing.md }}>
            <Text style={styles.text}>
              Une erreur est survenue lors de la génération de votre histoire.
            </Text>
            <Text style={styles.text}>Veuillez réessayer.</Text>
          </View>

          <Button
            title={"Réessayer"}
            size="large"
            variant="primary"
            onPress={() => handleClose()}
          />
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainModalContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.huge,
    paddingHorizontal: Spacing.huge,
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
