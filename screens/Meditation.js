import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography } from "../components/KitUI/tokens";

export default function Meditation() {

    return (
        <LinearGradient
            colors={[Colors.bgPrimary[0], Colors.bgPrimary[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.main}
        >
            <View style={styles.main}>
                <Text style={styles.text}>En cours de création</Text>
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
    }
});
