import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useDispatch, useSelector } from "react-redux";
import Button from "../KitUI/Button";
import { updateIsGenerating } from "../../reducers/createForm";
import { updateModalParamState } from "../../reducers/modalparam";
import ModalParamComponent from "./ModalParamComponent";

export default function Step7() {
  const dispatch = useDispatch();
  const modalParam = useSelector((state) => state.modalparam.value);
  console.log(modalParam);
  return (
    <View style={styles.main}>
      <Button
        title="Génère ton histoire"
        size="large"
        variant="primary"
        onPress={() => dispatch(updateIsGenerating())}
      />
      <View style={styles.dividerContainer}>
        <View style={styles.divider}></View>
        <Text style={styles.textDivider}>Autres paramètres</Text>
        <View style={styles.divider}></View>
      </View>
      <Button
        title="Définir d'autres paramètres"
        size="medium"
        variant="secondary"
        onPress={() => dispatch(updateModalParamState(true))}
      />
      {modalParam.modalState && <ModalParamComponent />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacing.huge,
  },
  dividerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  divider: {
    width: "25%",
    height: 2,
    backgroundColor: Colors.audioWave,
    marginHorizontal: Spacing.md,
  },
  textDivider: {
    ...Typography.body,
    color: Colors.textBody,
  },
});
