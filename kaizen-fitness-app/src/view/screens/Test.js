import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainColor } from '../../colors/colors';
import ProfessionalController from '../../controller/ProfessionalController';
import EventController from '../../controller/EventController';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Test() {

 const controller = new EventController();

 const register = async () => {
  // const snapshot = await firestore()
  // .collection('professionalEvent')
  // .where('id', '==', 1234567890)
  // .get()
  // .then(querySnapshot => {
  //     /* ... */
  //     console.log(querySnapshot.docs[0].ref)
  // })


 }
 
 return (
    <View style={styles.container}>
        <Text
            onPress={() => register()}
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
      paddingTop: '15%'
    },
});