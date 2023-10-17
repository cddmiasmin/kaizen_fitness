import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainColor } from '../../colors/colors';
import ProfessionalController from '../../controller/ProfessionalController';
import EventController from '../../controller/EventController';
import UserController from '../../controller/UserController';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../contexts/UserContext';

export default function Test() {
 const { user } = useContext(UserContext);

 const event = new EventController();
 const usercontroller = new UserController();
 const professional = new ProfessionalController();

 const login = async () => {
  usercontroller.signIn('florence.welch@hotmail.com', '123456');
 }

 const register = async () => {
   const data = {
    name: "Florence Welch",
    familyName: "Welch",
    photo: "https://i.pinimg.com/564x/d3/07/90/d3079067600690197995318a82994358.jpg",
    dataOfBirth: "28/08/1986",
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
   }

   return await professional.registerProfessional(data);
 }


 const registerEvent = async () => {

  // const data = {
  //   "name": "Treinamento de corrida para iniciantes",
  //   "datetime": new Date(2023, 9, 26, 10, 0),
  //   "topics": ["Atividade Física", "Esporte"],
  //   "modality": "presencial",
  //   "address": "Parque Ibirapuera, São Paulo",
  //   "latitude": -23.555555,
  //   "longitude": -46.666667,
  //   "about": "Este treinamento é ideal para quem quer começar a correr. Você aprenderá as técnicas básicas de corrida, como postura, respiração e alongamento.",
  // }

  // return await event.addEvent(data, user);


  const search = "Florence Welch";
  var nowDate = new Date(Date.now());

  var date = new Date();
  date.setDate(nowDate.getDate() + 15);
  date.setHours(0);
  date.setMinutes(0);
  date.setMilliseconds(0);

  console.log('now', nowDate.toLocaleString('pt-BR'));
  console.log('date', date.toLocaleString('pt-BR'));

  const response = await firestore()
                          .collection("ProfessionalEvent")
                          .where(          
                              firestore.Filter('datetime', '>=', date), 
                          )
                          .get({
                            limit: 10,
                          })

  console.log(response.docs);

  response.docs.forEach((doc) => (
    console.log(doc.data().name)
  ))

 }


 

 return (
    <View style={styles.container}>
        <Text
            onPress={async () => {
              const a = await registerEvent();
              //console.log('Event', a)
              
            }}
        >Event</Text>
        <Text
            onPress={async () => {
              const a = await register();
              console.log('A', a)
              
            }}
        >Professional</Text>
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