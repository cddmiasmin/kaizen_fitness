import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';

export default function Welcome() {

 const imageBackground = { uri: 'https://i.pinimg.com/564x/7b/4a/dd/7b4add6eb58bbe283c140fc12373e503.jpg'};

 const navigation = useNavigation();

 return (
   <View style={styles.container}>
    <StatusBar style='light'/>
    <ImageBackground source={imageBackground} resizeMode="cover" style={[styles.image, StyleSheet.absoluteFillObject]}/>
    <View style={styles.welcome}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            KAIZEN FITNESS
        </Text>
        <Text style={{ color: 'white', fontSize: 12}}>
            florence melhor do mundo
        </Text>
    </View>
    <View style={styles.footer}>
        <View style={styles.buttons}>
            <TouchableOpacity 
                style={styles.buttonGoogle}
            >
                <BlurView intensity={10} tint="light" style={styles.blurContainer}>
                    <AntDesign name="google" size={22} color="white" />
                </BlurView>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonGetStared}
                onPress={() => navigation.navigate('Registration')}
            >
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18}}>Iniciar </Text>
                <AntDesign name="arrowright" size={18} color="black" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>Já tem uma conta? Entre.</Text>
        </TouchableOpacity>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    welcome: {
        marginTop: 70,
        marginLeft: 15
    },
    buttons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    buttonGoogle: {
        width: 45,
        height: 45,
        overflow: 'hidden',
        borderRadius: 50,
    },
    buttonGetStared: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 270,
        height: 50,
        borderRadius: 20
    },
    blurContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 22,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
});