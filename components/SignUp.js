import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/users";
import { Colors, Typography } from "../components/KitUI/tokens";
import Button from "../components/KitUI/Button";
import Input from "../components/KitUI/Input";
import { useState } from "react";
import { checkInput } from "../modules/checkInput";

export default function SignUp({ navigation }) {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState({ error: false, value: "" });
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [emptyfield, setEmptyfield] = useState(false);
  const [messageFromBack, setMessageFromBack] = useState("");

  const handlepressSignUp = async () => {
    setErrorPassword(false);
    setEmptyfield(false);

    const inputFields = [email.value, username, password, confirmationPassword];
    if (!checkInput(inputFields)) return setEmptyfield(true);

    if (password !== confirmationPassword) {
      setErrorPassword(true);
      return;
    }

    //Check email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const isValidEmail = (email) => emailRegex.test(email);
    if (!isValidEmail(email.value)) {
      setEmail({
        error: "invalid email",
        value: email.value,
      });
      return;
    }

    const body = {
      username: username,
      email: email.value,
      password: password,
    };
    setMessageFromBack("");

    try {
      const response = await fetch(`http://${IP}:${port}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.result) {
        dispatch(updateUser(data.data));
        setUsername("");
        setPassword("");
        setConfirmationPassword("");
        setEmail({ error: false, value: "" });
        navigation.navigate("TabNavigator");
      } else {
        setMessageFromBack(data.error);
      }
    } catch (error) {
      console.log("error from SignUp", error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nom d'utilisateur"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <Input
        placeholder="Email"
        onChangeText={(value) =>
          setEmail({
            error: false,
            value: value,
          })
        }
        value={email.value}
        error={email.error}
        keyboardType="email-address" /*Ne fonctionne pas*/
        autoCapitalize="none" /*Ne fonctionne pas*/
      />
      <Input
        placeholder="Mot de passe"
        onChangeText={(value) => setPassword(value)}
        value={password}
        password
        autoCapitalize="none"
      />
      <Input
        placeholder="Confirmation mot de passe"
        onChangeText={(value) => setConfirmationPassword(value)}
        value={confirmationPassword}
        password
        autoCapitalize="none"
      />
      <Button
        title="Créer mon compte"
        size="large"
        variant="primary"
        onPress={() => handlepressSignUp()}
      />
      {errorPassword && (
        <Text style={styles.errorMessage}>Les mots de passe ne correspondent pas</Text>
      )}
      {emptyfield && <Text style={styles.errorMessage}>Champ(s) vide(s)</Text>}
      {messageFromBack && <Text style={styles.errorMessage}>{messageFromBack}(s)</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: Colors.textTitle,
    ...Typography.body,
    fontFamily: Typography.fontBody,
  },
  container: {
    paddingHorizontal: 30,
    justifyContent: "center",
    gap: 15,
  },
});
