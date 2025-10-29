import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
export const formStyles = StyleSheet.create({
  title: {
    color: Colors.textSleepieYellow,
    ...Typography.h1,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.textTitle,
    ...Typography.bodyMedium,
    textAlign: "center",
  },
  createContainer: {
    flex: 1,
    gap: Spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  mainFormContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  nextBackContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: Spacing.sm,
  },
});
