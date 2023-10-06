import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Line({ width, height, top, bottom }) {
    return <View style={[styles.container, { width: width, height: height, marginTop: top, marginBottom: bottom}]}/>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 50,
    }
});