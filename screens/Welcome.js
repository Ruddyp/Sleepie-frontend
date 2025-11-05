import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";
import Button from "../components/KitUI/Button";

export default function Welcome({ navigation }) {
    const handlePress = () => {
        navigation.navigate("Login")
    }
    return (
        <LinearGradient
            colors={[Colors.bgSleepieBlue1, Colors.bgSleepieBlue2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.main}
        >
            <View style={styles.main}>
                <Text style={styles.text}>Welcome BOLOS</Text>
                <Button title="Prêt à faire la fête ? " size="large" variant="secondary" onPress={() => handlePress()} />
                <Image
                    source={require('../assets/logo-Sleepie-blanc-transparent.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: Spacing.maximale,
        gap: Spacing.xl,
    },
    text: {
        ...Typography.h4,
        color: Colors.textBody,
        textAlign: "center"
    },
    image: {
        width: 200,   // largeur de l'image
        height: 200,  // hauteur de l'image
    },

});