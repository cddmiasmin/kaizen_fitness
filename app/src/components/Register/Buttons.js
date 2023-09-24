import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorContext } from '../../contexts/ColorContext';

export default function Buttons() {

 const { color } = useContext(ColorContext);

 const teste = false

 return (
   <View style={[styles.container, teste ? { justifyContent: 'space-between'} : { justifyContent: 'flex-end'}]}>
        { teste &&
            <TouchableOpacity style={[styles.button, styles.buttonBack, { backgroundColor: color}]}>
                <Text style={styles.title}>Retornar</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity style={[styles.button, styles.buttonNext, { backgroundColor: color}]}>
            <Text style={styles.title}>Prossegrir</Text>
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
        fontSize: 14
    }
});