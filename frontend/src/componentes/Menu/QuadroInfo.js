import React from 'react';
import { View, StyleSheet, Image, Text , ImageBackground} from 'react-native';

export default function Menu() {
 return (
   <View style={styles.container}>
    <View  style={styles.quadro}>
        <ImageBackground
            source={require('./../../../assets/icons/nuvem.jpg')}
            style={[styles.backgroundImage, StyleSheet.absoluteFillObject]}
            opacity={0.4} 
        />
        <View style={styles.info}>
            <Text style={styles.textAgua}>Beba 2,2L de água p/ dia</Text>
            <Text style={styles.textIMC}>IMC Normal (23.51)</Text>
        </View>

    </View>
    <Image
        style={[styles.icon, StyleSheet.absoluteFillObject]}
        source={require('./../../../assets/icons/quadroinfo_mulher.png')}
    />
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '20%',
        marginTop: '2%',
        justifyContent: 'flex-end'
    },
    quadro: {
        height: '82%',
        width: '100%',
        justifyContent: 'flex-center',
        alignItems: 'flex-end',
        overflow: 'hidden',
        borderRadius: 45,
    },
    icon: {
        width: '50%',
        height: '100%',
        marginLeft: '3%',
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',  
    },
    info: {
        overflow: 'hidden',
        color: 'white',
        height: '100%',
        width: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2.5%',
    },
    textAgua: {
        color: 'white',
        fontWeight: 'bold'
    },
    textIMC: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: '4%'
    }
});