import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainColor, success } from '../../colors/colors';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../contexts/UserContext';

import { mask, unMask } from 'remask';

export default function Test() {

  const date = new Date();
  // console.log(date, typeof date);

  const timestampToDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    date.setMilliseconds(timestamp.nanoseconds / 1000000);
    return new Date(date);
  }

  const user = async () => {
    const idUser = 'Ryqa8zTxtiee6LcMfMSecKoLaat1';

    const response = await firestore()
                            .collection('ProfessionalUsers')
                            .doc(idUser)
                            .get();
    console.log('Fist', response.data());

    const dateAux = timestampToDate(response.data().dateOfBirth);
    const date = new Date(dateAux)

    console.log(date, typeof date, date.toDateString(), date.toTimeString());
  }

  const register = async () => {
    const data = [{
      name: "Florence Welch",
      familyName: "Welch",
      photo: "https://i.pinimg.com/564x/d3/07/90/d3079067600690197995318a82994358.jpg",
      dateOfBirth: "28/08/1986",
      document: "123.456.789-00",
      city: "London",
      county: "England",
      state: "England",
      latitude: 51.5074,
      longitude: -0.1278,
      height: 1.70,
      weight: 60,
      calendar: [],
      topics: ["Treinamento"],
      kindOfPerson: "PF",
      about: 'Aconselha a comer de forma variada e equilibrada, com foco em alimentos frescos e nutritivos. Também recomenda a prática regular de exercícios físicos'
    }]

    data.push({
      nome: 'iasmin'
    })
    
        console.log(data)

    const newOnlinePlataforms = data.filter(platform => platform.name !== 'Florence Welch');

      console.log(newOnlinePlataforms);
    //  return await professional.registerProfessional(data);
  }


  const registerEvent = async () => {
    //online
    // const data = {
    //   styleStatusBar: 'light',
    //   wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   topics: ['Nutrição', 'Saúde Pública'],
    //   name: "Conferência NutriSaúde 2023",
    //   about: "Uma conferência online abordando temas cruciais sobre nutrição e saúde pública para promover bem-estar e qualidade de vida.",
    //   modality: 'Online',
    //   organizer: {
    //     kindOfPerson: 'PJ', // Pessoa Jurídica
    //     name: 'HealthCare Solutions Corp',
    //   },
    //   datetime: new Date('2023-12-05T14:30:00'),
    //   participants: [
    //     { idUser: 'IZZfxUCWwjNMKPk47Qf8HcfcaE55', name: 'Clara'},
    //     { idUser: 'blacla1', name: 'Hola'},
    //     { idUser: 'blacla2', name: 'Erika'},
    //     { idUser: 'blacla3', name: 'Julia'},
    //   ],
    //   plataform: 'google-meet',
    //   meetingLink: 'https://florenceandthemachine.net/home/',
    // }

    //presencial
    // const data = {
    //   topics: ['Atividade Física'],
    //   name: "Workshop de Atividade Física",
    //   about: "Um evento dedicado a promover a importância da atividade física na saúde e no bem-estar.",
    //   organizer: {
    //     kindOfPerson: 'PJ',
    //     name: 'Empresa Fitness Total',
    //   },
    //   datetime: new Date('2023-11-20T14:00:00'), // Data e hora do evento
    //   modality: 'Presencial',
    //   address: 'Avenida da Saúde, 123, Cidade Fitness',
    //   participants: [],
    //   styleStatusBar: 'light',
    //   wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // }

    const idUser = 'IZZfxEDWwjNMKPk47Qf8HcfcaE53';

    // const response = await firestore()
    //                       .collection('Events')
    //                       .doc(idUser)
    //                       .set(data)
    //                       .then(() => {
    //                           return { result: true, message: 'Evento cadastrado com sucesso!'}
    //                       })
    //                       .catch((error) => {
    //                           return { result: false, message: error }
    //                       });
    // return response;

    let response = [];

    const events = await firestore()
                              .collection("Events")
                              .where("participants", "array-contains", idUser)
                              .get();


    if(!events.empty){
      events.forEach((doc) => {
  
        let event = doc.data();
        event.idDoc = doc.id;
        response.push(event);
        console.log(event.datetime)
      });
    } else response = null;

    return response;

  }

  const a = '21,6';

  const b = mask(unMask(a), ['9.9', '99.9', '999.9']);

  console.log(b)

 return (
    <View style={styles.container}>
        <Text
            onPress={async () => {
              const a = await registerEvent();
              console.log('Event', a)
              
            }}
        >Event</Text>
        <Text
            onPress={async () => {
              const a = await register();
              console.log('A', a)
              
            }}
        >Professional</Text>
        <Text
            onPress={async () => {
              user();
            }}
        >User</Text>
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