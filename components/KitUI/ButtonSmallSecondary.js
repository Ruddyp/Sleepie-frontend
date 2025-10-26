import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Sizes } from './tokens';



export default function ButtonSmallSecondary({ title }) {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.large,
        paddingHorizontal: Spacing.xxxl,
        ...Shadows.soft,
        backgroundColor: Colors.accentGlow,
        height: Sizes.buttonSmall,



    },
    text: {
        fontSize: Typography.body.fontSize,
        fontFamily: Typography.fontBody,
        fontWeight: '500',
        color: Colors.textBody
    }
})