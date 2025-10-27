import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Switch } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/users';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Sizes,
} from "../components/KitUI/tokens";
import Button from '../components/KitUI/Button'
import Input from "../components/KitUI/Input";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";



export default function Login({ navigation }) {


  const IP = process.env.EXPO_PUBLIC_IP
  const port = process.env.EXPO_PUBLIC_PORT

  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false)


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState({ error: false, value: "" });
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("")

  const [errorPassword, setErrorPassword] = useState(false)
  const [emptyfield, setEmptyfield] = useState(false)
  const [messageFromBack, setMessageFromBack] = useState("")

  const [emailSignIn, setEmailSignIn] = useState({ error: false, value: "" })
  const [passwordSignIn, setPasswordSignIn] = useState('')
  const [emptyfieldSignIn, setEmptyfieldSignIn] = useState(false)
  const [messageFromBackSigIn, setMessageFromBackSignIn] = useState("")

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const handlepressSignUp = async () => {
    setErrorPassword(false);
    setEmptyfield(false)
    if (username === "" || email === "" || password === "" || confirmationPassword === "") {
      console.log("empty field")
      setEmptyfield(true);
      return
    }
    if (password !== confirmationPassword) {
      setErrorPassword(true)
      console.log("passwords don't match")
      return
    }

    //Check email 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const isValidEmail = (email) => emailRegex.test(email);
    if (!isValidEmail(email.value)) {
      setEmail({
        error: "invalid email",
        value: email.value
      })
      return
    }

    const body = {
      username: username,
      email: email.value,
      password: password,
    }
    console.log("body", body)
    setMessageFromBack("")

    try {
      const response = await fetch(`http://${IP}:${port}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json();
      console.log("data", data)
      if (data.result) {
        dispatch(updateUser(data.data))
        navigation.navigate("TabNavigator")
      } else {
        setMessageFromBack(data.error)
      }
    } catch (error) {
      console.log("error from SignUp", error)
    }

    setUsername("")
    setPassword("")
    setConfirmationPassword("")
  }

  const handlepressSignIn = async () => {
    setEmptyfieldSignIn(false);

    if (emailSignIn === "" || passwordSignIn === "") {
      console.log("empty field")
      setEmptyfieldSignIn(true);
      return
    }
    //Check email 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const isValidEmail = (email) => emailRegex.test(email);
    if (!isValidEmail(emailSignIn.value)) {
      setEmailSignIn({
        error: "invalid email",
        value: emailSignIn.value
      })
      return
    }
    const body = {
      email: emailSignIn.value,
      password: passwordSignIn,
    }
    console.log("bodySignIn", body)
    setMessageFromBackSignIn("")
    try {
      const response = await fetch(`http://${IP}:${port}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (data.result) {
        dispatch(updateUser(data.data))
        navigation.navigate("TabNavigator")
        console.log("data du signIn", data)
      } else {
        setMessageFromBackSignIn(data.error)
      }
    } catch (error) {
      console.log("error from SignIn", error)
    }

  }

  console.log("emailSignIn", emailSignIn)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LinearGradient
          colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.main}>
          <View style={styles.switchContainer}>
            <Text style={styles.textToggle}>Sign Up</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
            />
            <Text style={styles.textToggle}>Sign In</Text>

          </View>
          {!isEnabled ? (
            //affichage du SignUp
            <View>
              <Input
                placeholder="Username"
                onChangeText={(value) => setUsername(value)}
                value={username}

              />
              <Input
                placeholder="Email"
                onChangeText={(value) => setEmail({
                  error: false,
                  value: value
                })}
                value={email}
                error={email.error}
                keyboardType="email-address" /*Ne fonctionne pas*/
                autoCapitalize="none" /*Ne fonctionne pas*/
              />
              <Input
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                value={password}
                password
              />
              <Input
                placeholder="Confirm password"
                onChangeText={(value) => setConfirmationPassword(value)}
                value={confirmationPassword}
                password
              />
              <Button
                title="Signup"
                size="small"
                variant="primary"
                onPress={() => handlepressSignUp()}
              />
              {errorPassword && <Text style={styles.errorMessage}>Passwords don't match</Text>}
              {emptyfield && <Text style={styles.errorMessage}>Empty field(s)</Text>}
              {messageFromBack && <Text style={styles.errorMessage}>{messageFromBack}(s)</Text>}
            </View>) :
            //affichage du signIn
            <View>
              <Input
                placeholder="Email"
                onChangeText={(value) => setEmailSignIn({
                  error: false,
                  value: value
                })}
                value={emailSignIn}
                error={emailSignIn.error}
                keyboardType="email-address" /*Ne fonctionne pas*/
                autoCapitalize="none" /*Ne fonctionne pas*/
              />
              <Input
                placeholder="Password"
                onChangeText={(value) => setPasswordSignIn(value)}
                value={passwordSignIn}
                password
              />
              <Button
                title="Signin"
                size="small"
                variant="primary"
                onPress={() => handlepressSignIn()}
              />
              {emptyfieldSignIn && <Text style={styles.errorMessage}>Empty field(s)</Text>}
              {messageFromBackSigIn && <Text style={styles.errorMessage}>{messageFromBackSigIn}(s)</Text>}
            </View>}


        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 30,
    backgroundColor: "blue"
  },
  main: {
    height: "100%",
    width: "100%",
  },
  input: {
    backgroundColor: "#ffff"
  },
  errorMessage: {
    color: "#ffff"
  },
  switchContainer: {
    width: "100%",
    height: "100",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: 0,
    flexDirection: "row",

  },
  textToggle: {
    color: "#fff",
    fontSize: 20,
  }
})

