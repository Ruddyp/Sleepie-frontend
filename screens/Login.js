import { StyleSheet, Text, View, Button } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View>
            <Text>Login PAGE</Text>
            <Button
                title="GO TO HOME"
                onPress={() => navigation.navigate('TabNavigator')}
            />
        </View>
    )
}