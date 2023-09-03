import React from 'react';

import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton } from 'react-native-paper';

import { colorConsumidor } from '../colors/colors';

export default function componentes() {

const navigation = useNavigation();

 return (
   <View style={styles.footer}>
    <View style={styles.container}>      
        <IconButton
            icon="camera"
            iconColor={`#fff`}
            size={30}
            onPress={() => console.log('Pressed')}
        />
        <IconButton
            icon="camera"
            iconColor={colorConsumidor}
            size={45}
            onPress={() => navigation.navigate('Home')}
        />
            <IconButton
            icon="camera"
            iconColor={`#fff`}
            size={30}
            onPress={() => console.log('Pressed')}
        />
    </View>
   </View>
  );
}


const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingBottom: '2%'
    }
});