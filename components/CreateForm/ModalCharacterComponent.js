import { StyleSheet, View, Modal, Dimensions, TouchableOpacity, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateModalStateCharacter } from "../../reducers/modalparam";
import { updateParamCharacter } from "../../reducers/createForm"
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import { useState } from "react";
import Button from "../KitUI/Button";
import Input from "../KitUI/Input"

const windowHeight = Dimensions.get("window").height;
export default function ModalCharacterComponent() {
    const form = useSelector((state) => state.createForm.value)
    const initialValue = form.otherparam?.characterName || ""
    const [characterName, setCharacterName] = useState(initialValue)
    const dispatch = useDispatch();
    const modalparam = useSelector((state) => state.modalparam.value);
    function handleClose() {
        dispatch(updateModalStateCharacter(false));
    }
    console.log(characterName)

    const handleClick = () => {
        dispatch(updateParamCharacter(characterName))
        dispatch(updateModalStateCharacter(false))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalparam.modalStateCharacter}
            onRequestClose={() => dispatch(updateModalStateCharacter(false))}
        >
            <LinearGradient
                colors={Colors.bgPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.bottomSheet, { height: windowHeight }]}
            >
                <View style={styles.mainModalContainer}>
                    <View style={styles.middleModalContainer}>
                        <Text style={styles.titlemodal}>CHOIX DU PERSONNAGE</Text>
                        <Input
                            placeholder={form.otherparam?.characterName || "Nom de ton personnage"}
                            value={characterName}
                            onChangeText={(characterName) => setCharacterName(characterName)}
                            secureTextEntry={false}
                        >
                        </Input>
                        <Button
                            disable={characterName ? false : true}
                            title="Sauvegarder"
                            onPress={() => handleClick()}
                        />
                    </View>
                    <View style={styles.bottomModalContainer}>
                        <TouchableOpacity onPress={() => handleClose()}>
                            <Ionicons
                                name="close-circle-outline"
                                size={Spacing.maximale}
                                color={Colors.textBody}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    bottomModalContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    mainModalContainer: {
        width: "100%",
        height: windowHeight,
        justifyContent: "center",
        alignItems: "center",
    },
    middleModalContainer: {
        width: "90%",
        height: "80%",
        paddingTop: 20,
        gap: 20,
    },
    bottomSheet: {
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
    },
    titlemodal: {
        color: Colors.textTitle,
        ...Typography.h2,
        paddingBottom: 30,
    },
    titleparam: {
        color: Colors.textTitle,
        ...Typography.body
    },
    optioncontainer: {
        width: 300,
        backgroundColor: Colors.bgTertiarySolid,
        borderRadius: 10,
        padding: 20,
        gap: 20,
        flexDirection: "row",
        alignItems: "center"
    },


});
