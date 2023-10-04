import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainColor } from '../../colors/colors';
import ProfessionalController from '../../controller/ProfessionalController';

export default function Test() {

 const professionalController = new ProfessionalController();

 const register = () => {
    professionalController.registerProfessional(
        {
            "name": "Demi Lovato",
            "familyName": "Lovato",
            "photo": "https://i.pinimg.com/564x/9f/b1/d5/9fb1d50c5e97a41f44786a2555fec3d0.jpg",
            "dataOfBirth": "1992-08-20",
            "state": "Texas",
            "city": "Dallas",
            "latitude": 32.78306,
            "longitude": -96.76714,
            "cpf": "123456789",
            "kindOfPerson": "singer",
            "services": ["Singing", "Acting", "Songwriting"],
            "mediaSocial": [
              {
                "platform": "Twitter",
                "username": "ddlovato"
              },
              {
                "platform": "Instagram",
                "username": "ddlovato"
              }
            ],
            "calendar": [
              {
                "date": "2023-10-04",
                "event": "Concert in New York City"
              },
              {
                "date": "2023-10-05",
                "event": "Concert in Boston"
              }
            ]
          }
    )
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