import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../KitUI/Button";
import { updateCurrentStep } from "../../reducers/createForm";
import { formStyles } from "./CreateFormStyle";

export default function CreateFormStep({ stepComponent, title, subtitle, isFocused }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep } = form;
  return (
    <View style={formStyles.mainFormContainer}>
      <View>
        <Text style={formStyles.title}>{title}</Text>
        <Text style={formStyles.subtitle}>{subtitle}</Text>
      </View>
      <View style={formStyles.formContainer}>{stepComponent}</View>
      <View style={formStyles.nextBackContainer}>
        <Button
          title="Précédent"
          size="medium"
          variant="secondary"
          onPress={() => dispatch(updateCurrentStep(currentStep - 1))}
        />
        <Button
          title="Suivant"
          size="medium"
          variant="secondary"
          onPress={() => dispatch(updateCurrentStep(currentStep + 1))}
        />
      </View>
    </View>
  );
}
