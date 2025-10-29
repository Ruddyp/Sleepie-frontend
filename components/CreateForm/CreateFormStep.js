import { Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../KitUI/Button";
import { updateCurrentStep } from "../../reducers/createForm";
import { formStyles } from "./CreateFormStyle";

export default function CreateFormStep({ stepComponent, title, subtitle }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.createForm.value);
  const { currentStep } = form;
  // Si on a aucune valeur dans le redux on disable le button next
  const disableButton = !form.steps[currentStep - 1];
  console.log(form.steps[currentStep - 1]);

  return (
    <View style={formStyles.fullScreenContainer}>
      <ScrollView contentContainerStyle={formStyles.scrollViewContent}>
        <View style={formStyles.mainFormContainerScrollable}>
          <View>
            <Text style={formStyles.title}>{title}</Text>
            <Text style={formStyles.subtitle}>{subtitle}</Text>
          </View>
          <View style={formStyles.formContainer}>{stepComponent}</View>
        </View>
        {/* Un espace pour compenser la barre fixe du bas */}
        <View style={formStyles.spacerForFixedButtons} />
      </ScrollView>
      <View style={formStyles.nextBackContainer}>
        <Button
          title="Précédent"
          size="medium"
          variant="primary"
          onPress={() => dispatch(updateCurrentStep(currentStep - 1))}
        />
        <Button
          title="Suivant"
          size="medium"
          variant="primary"
          onPress={() => dispatch(updateCurrentStep(currentStep + 1))}
          disable={disableButton}
        />
      </View>
    </View>
  );
}
