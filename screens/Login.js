import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { API_IP, API_PORT } from '@env';



export default function Login({ navigation }) {




  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("")

  const [errorPassword, setErrorPassword] = useState(false)
  const [emptyfield, setEmptyfield] = useState(false)


  const handlepressLogin = () => {
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
    const body = {
      username: username,
      email: email,
      password: password,
    }
    // fetch(`http://${API_IP}:${API_PORT}`) REPRENDRE ICI

    navigation.navigate("TabNavigator")
  }

  console.log("errorPassword", errorPassword)
  console.log("emptyfield", emptyfield)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LinearGradient
          colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.main}>
          <Text>Login PAGE</Text>
          <TextInput
            placeholder="username"
            onChangeText={(value) => setUsername(value)}
            value={username}
            style={styles.input}
          />
          <TextInput
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
          />
          <TextInput
            placeholder="confirm password"
            onChangeText={(value) => setConfirmationPassword(value)}
            value={confirmationPassword}
            style={styles.input}
          />
          <Button
            title="Signup"
            size="small"
            variant="primary"
            onPress={() => handlepressLogin()}
          />
          {errorPassword && <Text style={styles.errorMessage}>Passwords don't match</Text>}
          {emptyfield && <Text style={styles.errorMessage}>Empty field(s)</Text>}
          <TouchableOpacity
            title="GO TO HOME"
            onPress={() => handlepressLogin()}
            style={styles.button}
          >
          </TouchableOpacity>
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
  }
})

