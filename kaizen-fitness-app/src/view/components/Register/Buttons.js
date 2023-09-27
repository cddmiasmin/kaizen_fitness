import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ColorContext } from '../../../contexts/ColorContext';
import { DataContext } from '../../../contexts/DataContext';

export default function Buttons({ validateData }) {

 const { stepNum, setStepNum } = useContext(DataContext);

 const { color } = useContext(ColorContext);

 return (
   <View style={[styles.container, stepNum !== 1 ? { justifyContent: 'space-between'} : { justifyContent: 'flex-end'}]}>
        { stepNum !== 1 &&
            <TouchableOpacity
                onPress={() => setStepNum(stepNum - 1)} 
                style={[styles.button, styles.buttonBack, { backgroundColor: color}]}>
                <Text style={styles.title}>Retornar</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity
            onPress={() => validateData()} 
            style={[styles.button, styles.buttonNext, { backgroundColor: color}]}>
            <Text style={styles.title}>{stepNum === 4 ? 'Concluir' : 'Prosseguir'}</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
       marginTop: 50,
       width: '100%',
       justifyContent: 'center',
       flexDirection: 'row',
       marginBottom: 15
    },
    button: {
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 12
    }
});