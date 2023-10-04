import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainColor } from '../../colors/colors';
import ProfessionalController from '../../controller/ProfessionalController';
import { StatusBar } from 'expo-status-bar';
import { createJsonObject } from '../../utils/createJsonObject';

export default function MyData() {

 const professionalController = new ProfessionalController();

 const update = () => {

    const object = createJsonObject({ name: 'Florence' });

    professionalController.updateProfessional(object);

 }
 
 return (
    <View style={styles.container}>
        <StatusBar style='light'/>
        <Text
            onPress={() => update()}
        >Iasmin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
      justifyContent: 'star',
      alignItems: 'center',
      paddingLeft: '8%',
      paddingRight: '8%',
      paddingTop: '20%'
    },
});