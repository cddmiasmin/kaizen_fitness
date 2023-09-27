import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { ColorContext } from '../../contexts/ColorContext';
import { FontAwesome, Entypo } from '@expo/vector-icons'; 
import { RegisterContext } from '../../contexts/RegisterContext';

export default function Stages() {

 const { stepNum } = useContext(RegisterContext);

 const { color } = useContext(ColorContext);

 const colorGrey = '#bdbebd';

 return (
   <SafeAreaView style={styles.container}>
    <View style={styles.stage}>
        {
            stepNum === 1 &&
            <>
                <FontAwesome name="circle" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: colorGrey}]}/>
                <FontAwesome name="circle-o" size={12} color={colorGrey} />
                <View style={[styles.progressLine, { backgroundColor: colorGrey}]}/>
                <FontAwesome name="circle-o" size={12} color={colorGrey} />
                <View style={[styles.progressLine, { backgroundColor: colorGrey}]}/>
                <FontAwesome name="circle-o" size={12} color={colorGrey} />
            </>
        }
        {
            stepNum === 2 &&
            <>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <FontAwesome name="circle" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: colorGrey}]}/>
                <FontAwesome name="circle-o" size={12} color={colorGrey} />
                <View style={[styles.progressLine, { backgroundColor: colorGrey}]}/>
                <FontAwesome name="circle-o" size={12} color={colorGrey} />
            </>
        }
        {
            stepNum === 3 &&
            <>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <FontAwesome name="circle" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: colorGrey}]}/>
                <FontAwesome name="circle-o" size={12} color={colorGrey} />
            </>
        }
        {
            stepNum === 4 &&
            <>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <FontAwesome name="circle" size={12} color={color} />
            </>
        }
        {
            stepNum === 5 &&
            <>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <Entypo name="check" size={12} color={color} />
                <View style={[styles.progressLine, { backgroundColor: color}]}/>
                <Entypo name="check" size={12} color={color} />
            </>
        }
    </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        width: '100%',
        height: 20,
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
