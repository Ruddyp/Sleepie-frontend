import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/users";
import { Colors, Typography } from "../components/KitUI/tokens";
import Button from "../components/KitUI/Button";
import Input from "../components/KitUI/Input";
import { useState } from "react";
import { checkInput } from "../modules/checkInput";
import { setCreatedStories, setLikedStories } from "../reducers/stories";

export default function SignIn({ navigation }) {
  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const dispatch = useDispatch();

  const [email, setEmail] = useState({ error: false, value: "" });
  const [password, setPassword] = useState("");
  const [emptyfield, setEmptyfield] = useState(false);
  const [messageFromBack, setMessageFromBack] = useState("");

  const handlePress = async () => {
    setEmptyfield(false);

    const inputFields = [email.value, password];
    if (!checkInput(inputFields)) return setEmptyfield(true);

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
      email: email.value,
      password: password,
    };
    setMessageFromBack("");
    try {
      const response = await fetch(`http://${IP}:${port}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.result) {
        console.log(data);
        dispatch(updateUser(data.data.user));
        dispatch(setCreatedStories(data.data.createdStories));
        dispatch(setLikedStories(data.data.likedStories));
        setEmail({ error: false, value: "" });
        setPassword("");
        navigation.navigate("TabNavigator");
      } else {
        setMessageFromBack(data.error);
      }
    } catch (error) {
      console.log("error from SignIn", error);
    }
  };
  return (
    <View style={styles.container}>
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
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Mot de passe"
        onChangeText={(value) => setPassword(value)}
        value={password}
        password
        autoCapitalize="none"
      />
      <Button title="Se connecter" size="large" variant="primary" onPress={() => handlePress()} />
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
