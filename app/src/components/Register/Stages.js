import React, { useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ColorContext } from '../../contexts/ColorContext';
import { FontAwesome, Entypo } from '@expo/vector-icons'; 

export default function Stages({ stepNum }) {

 const { color } = useContext(ColorContext);

 return (
   <SafeAreaView style={styles.container}>
    <View style={styles.stage}>
        <Entypo name="check" size={12} color={color} />
        <View style={[styles.progressLine, { backgroundColor: color}]}/>
        <FontAwesome name="circle" size={12} color={color} />
        <View style={[styles.progressLine, { backgroundColor: color}]}/>
        <FontAwesome name="circle-o" size={12} color={color} />
        <View style={[styles.progressLine, { backgroundColor: color}]}/>
        <FontAwesome name="circle-o" size={12} color={color} />
    </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 70,
        width: '100%',
        height: 20,
        flex: 1
    },
    stage: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    progressLine: {
        width: 70,
        height: 3,
    }
});

/*
    <FontAwesome name="circle-o" size={24} color="black" /> //circulo
    <FontAwesome name="circle" size={24} color="black" /> //bola preta
    <Entypo name="check" size={24} color="black" /> //check
*/