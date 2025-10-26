import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonSmallPrimary from '../components/KitUI/ButtonSmallPrimary';
import ButtonSmallSecondary from '../components/KitUI/ButtonSmallSecondary';
import ButtonMediumPrimary from '../components/KitUI/ButtonMediumPrimary'
import ButtonMediumSecondary from '../components/KitUI/ButtonMediumSecondary';
import ButtonLargePrimary from '../components/KitUI/ButtonLargePrimary';
import ButtonLargeSecondary from '../components/KitUI/ButtonLargeSecondary copy';
import { LinearGradient } from 'expo-linear-gradient';


export default function KitScreen() {
    return (
        <LinearGradient
            colors={['#0B1A33', '#0F2045']}
            style={styles.main}>
            <ButtonSmallPrimary title="Button Small Primary"
                style={styles.buttonSmallPrimary}>  </ButtonSmallPrimary>
            <ButtonSmallSecondary title="Button Small Secondary">  </ButtonSmallSecondary>
            <ButtonMediumPrimary title="Button Medium Primary">  </ButtonMediumPrimary>
            <ButtonMediumSecondary title="Button Medium Secondary">  </ButtonMediumSecondary>
            <ButtonLargePrimary title="Button Large Primary"></ButtonLargePrimary>
            <ButtonLargeSecondary title="Button Large Secondary"></ButtonLargeSecondary>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    main: {
        height: "100%",
        width: "100%",
        paddingTop: 50,
        gap: 10,
        backgroundColor: ['#0B1A33', '#0F2045']

    },


})