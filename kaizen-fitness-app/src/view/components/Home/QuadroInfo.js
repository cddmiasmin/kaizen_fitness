import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text , ImageBackground} from 'react-native';

import { UserContext } from './../../../contexts/UserContext';

import { consumerUserColor } from './../../../colors/colors';

export default function QuadroInfo() {

 const { userType } = useContext(UserContext);

 return (
   <View style={styles.container}>
    {
        userType === 'consumer'
        ?
        <>
            <View  style={styles.quadro}>
                <ImageBackground
                    source={require('./../../../assets/Home/nuvem.jpg')}
                    style={[styles.backgroundImage, StyleSheet.absoluteFillObject]}
                    opacity={0.4} 
                />
                <View 
                    style={[styles.infoConsumer]}>
                    <Text style={styles.text}>Beba 2,2L de água p/ dia</Text>
                    <Text style={styles.textIMC}>IMC Normal (23.51)</Text>
                </View>
            </View>
            <Image
                style={[styles.iconConsumer, StyleSheet.absoluteFillObject]}
                source={require('./../../../assets/Home/quadroinfo_mulher.png')}
            />
        </>
        :
        <>
            <View  style={styles.quadro}>
                {/* <ImageBackground
                    source={require('./../../../assets/Home/nuvem.jpg')}
                    style={[styles.backgroundImage, StyleSheet.absoluteFillObject]}
                    opacity={0.0} 
                /> */}
                <View style={[styles.backgroundView, StyleSheet.absoluteFillObject]}/>
                <View 
                    style={[styles.infoProfessional]}>
                    <Text style={styles.text}>Você possui 3 eventos</Text>
                </View>
            </View>
            <Image
                style={[styles.iconProfessional, StyleSheet.absoluteFillObject]}
                source={require('./../../../assets/QuadroInfo/professional.png')}
            />
        </>
    }
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
    iconProfessional: {
        width: '65%',
        height: '100%',
        marginLeft: '12%',
        justifyContent: 'center',
        marginTop: 12
    },
    iconConsumer: {
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
    backgroundView: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: consumerUserColor,
        opacity: 0.7
    },
    infoConsumer: {
        overflow: 'hidden',
        color: 'white',
        height: '100%',
        width: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2.5%',
    },
    infoProfessional: {
        overflow: 'hidden',
        color: 'white',
        height: '100%',
        width: "86%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: '2.5%',
        //backgroundColor: 'red'
        marginTop: 4
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textIMC: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: '4%'
    }
});