import { StyleSheet, Text, View, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/users';


export default function Home() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  console.log("user", user)

  return (
    <SafeAreaView>
      <TextInput></TextInput>
      <Text>HOME PAGE</Text>
    </SafeAreaView>
  );
}
