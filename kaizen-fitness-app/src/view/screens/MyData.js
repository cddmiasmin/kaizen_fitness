import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mainColor } from '../../colors/colors';
import ProfessionalController from '../../controller/ProfessionalController';
import { StatusBar } from 'expo-status-bar';
import { createJsonObject } from '../../utils/createJsonObject';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export default function MyData() {
  const [text, setText] = React.useState("");

 const professionalController = new ProfessionalController();

 const update = () => {

    const object = createJsonObject({ name: 'Florence' });

    professionalController.updateProfessional(object);

 }
 
 return (
    <View style={styles.container}>
        <StatusBar style='light'/>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.screen}>Meus Dados</Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: mainColor,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  header: {
      marginTop: 60,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 40,
  },
  screen: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 45
  },
});