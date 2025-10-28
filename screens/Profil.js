import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../components/KitUI/tokens";
import Button from "../components/KitUI/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../reducers/users";

export default function Login({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handlePressDeconnect = () => {
    dispatch(deleteUser());
    navigation.navigate("Login");
  };
  const handlePressDelete = () => {
    dispatch(deleteUser());
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.main}
    >
      <View style={styles.containerTop}>
        <Text style={styles.textTop}>{user.username}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Compte</Text>
        <View>
          <Text style={styles.textSmall}> Email : {user.email}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Mon abonnement</Text>
      </View>
      <View style={styles.containerBottom}>
        <Button title="Se déconnecter" onPress={() => handlePressDeconnect()} />
        <Button title="Supprimer mon compte" onPress={() => handlePressDelete()} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "blue",
  },
  main: {
    flex: 1,
    height: "100%",
    marginTop: 0,
    alignContent: "center",
    justifyContent: "center",
    padding: 15,
  },
  container: {
    flex: 1,
  },
  text: {
    ...Typography.h3,
    color: Colors.textTitle,
  },
  containerTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textTop: {
    ...Typography.h2,
    color: Colors.textTitle,
  },
  textSmall: {
    ...Typography.body,
    color: Colors.textBody,
  },
  containerBottom: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
