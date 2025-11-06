import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Typography, Spacing } from "../components/KitUI/tokens";
import Button from "../components/KitUI/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../reducers/users";
import { resetStories } from "../reducers/stories"
import { resetTrack } from "../reducers/track";
import { resetForm } from "../reducers/createForm"
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import React from "react";




export default function Login({ navigation, route }) {

  const IP = process.env.EXPO_PUBLIC_IP;
  const port = process.env.EXPO_PUBLIC_PORT;
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false)
  const [messageModal, setMessageModal] = useState("")
  const [subscribe, setSubscribe] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      getRole()
    }, [])
  );



  const getRole = async () => {
    const body = {
      token: user.token
    }
    try {
      const response = await fetch(`http://${IP}:${port}/rights/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (data.result) {
        if (data.role === "user") return setSubscribe(true)
        if (data.role === "premium") return setSubscribe(false)
      }
    } catch (error) {
      console.log({ result: false, message: error.message })
    }
  }

  const handlePressDeconnect = () => {
    dispatch(deleteUser());
    dispatch(resetStories());
    dispatch(resetForm());
    dispatch(resetTrack())
    navigation.navigate("Login");
  };



  const handlePressAbonnement = async () => {
    const body = {
      token: user.token,
      role: "premium"
    }
    try {
      const response = await fetch(`http://${IP}:${port}/rights/modify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.result) {
        setMessageModal(data.message)
        setModalVisible(true)
        setSubscribe(false)
      } else {
        setMessageModal(data.message);
        setModalVisible(true)
        setSubscribe(false)
      }
    } catch (error) {
      console.log({ result: false, message: error.message })
    }
  }

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
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <Text style={styles.textmodal}>{messageModal}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={Spacing.huge}
                  color={Colors.textBody}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Mon abonnement</Text>
        {subscribe ? <View style={styles.abonnement}>
          <Text style={styles.textabonnement}>S'abonner pour 50 €/mois</Text>
          <Button title="S'abonner" variant="primary" onPress={() => handlePressAbonnement()} />
        </View> :
          <View>
            <Text style={styles.textabonnement}> Vous bénéficiez d'un abonnement premium</Text>
          </View>}
      </View>
      <View style={styles.containerBottom}>
        <Button title="Se déconnecter" onPress={() => handlePressDeconnect()} />
        {/* <Button title="Supprimer mon compte" onPress={() => handlePressDelete()} /> */}
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
    justifyContent: "center",
    padding: 10,
    flex: 1,
  },
  abonnement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textabonnement: {
    color: Colors.textBody
  },
  modal: {
    backgroundColor: Colors.bgTertiarySolid,
    width: 300,
    height: 200,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  textmodal: {
    color: Colors.textBody,
    ...Typography.h4,
    textAlign: "center"
  },
  overlay: {
    height: "100%",
    backgroundColor: Colors.audioWave,
    alignItems: "center",
    justifyContent: "center"
  }

});
