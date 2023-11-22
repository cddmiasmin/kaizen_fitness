import { useContext } from 'react';
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
            activeOpacity={stepNum > 4 ? 1 : 0.2}
            disabled={stepNum > 4}
            style={[styles.button, styles.buttonNext, { backgroundColor: stepNum > 4 ? '#a6a6a6' : color }]}
        >
            <Text style={[styles.title, { color: stepNum > 4 ?'#666666' : 'white', fontWeight: 'bold' }]}>
                {stepNum >= 4 ? 'Concluir' : 'Prosseguir'}
            </Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
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
        color: 'white',
        fontSize: 12
    }
});