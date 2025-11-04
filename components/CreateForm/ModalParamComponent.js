import { StyleSheet, View, Modal, Dimensions, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateModalParamState, updateModalStateCharacter, updateModalParamStateWeather } from "../../reducers/modalparam";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../KitUI/tokens";
import ModalCharacterComponent from "./ModalCharacterComponent"
import ModalWeatherComponent from "./ModalWeatherComponent";

const windowHeight = Dimensions.get("window").height;
export default function ModalParamComponent() {
    const dispatch = useDispatch();
    const modalParam = useSelector((state) => state.modalparam.value);
    const form = useSelector((state) => state.createForm.value)
    function handleClose() {
        dispatch(updateModalParamState(false));
        dispatch(updateModalStateCharacter(false));
        dispatch(updateModalParamStateWeather(false));
    }

    const handleclickCharacterParam = () => {
        dispatch(updateModalStateCharacter(true))
    }
    const handleclickWeatherParam = () => {
        dispatch(updateModalParamStateWeather(true))
    }
    console.log("form", form)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalParam.modalState}
            onRequestClose={() => dispatch(updateModalParamState(false))}
        >
            <LinearGradient
                colors={Colors.bgPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.bottomSheet, { height: windowHeight }]}
            >
                <View style={styles.mainModalContainer}>
                    <View style={styles.middleModalContainer}>
                        <Text style={styles.titlemodal}>AUTRES PARAMETRES</Text>
                        <TouchableOpacity onPress={() => handleclickCharacterParam()}>
                            <View style={styles.optioncontainer}>
                                <Text style={styles.titleparam}>CHOIX DU PERSONNAGE</Text>
                                <Ionicons
                                    name="people"
                                    size={Spacing.huge}
                                    color={Colors.textBody}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleclickWeatherParam()}>
                            <View style={styles.optioncontainer}>
                                <Text style={styles.titleparam}>CHOIX DE LA METEO </Text>
                                <Ionicons
                                    name="partly-sunny"
                                    size={Spacing.huge}
                                    color={Colors.textBody}
                                />
                            </View>
                        </TouchableOpacity>
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
                    <View>
                        {modalParam.modalStateCharacter && <ModalCharacterComponent />}
                        {modalParam.modalStateWeather && <ModalWeatherComponent />}
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
        width: "100%",
        height: "80%",
        alignItems: "center",
        paddingTop: 20,
        gap: 20,
        // justifyContent: "center",
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
    }

});
