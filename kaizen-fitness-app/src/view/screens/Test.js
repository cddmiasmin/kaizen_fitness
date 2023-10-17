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

 const [response, setResponse] = useState({});

 useEffect(() => {
    console.log('response', response)
 }, [response])

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

   professional.registerProfessional(data);
 }


 const registerEvent = async () => {

  const idUser = await auth().currentUser.uid;
  const batch = firestore().batch();
 
  const response = await firestore()
                            .collection('ProfessionalEvent')
                            .where("professional.idUser", "==", idUser)
                            .get()
                            .then((querySnapshot) => {
                              querySnapshot.forEach((doc) => {
                                batch.delete(doc.ref);
                              });
                        
                              batch.commit()
                              .then(() => {
                                return { result: true, message: 'Evento removido com sucesso!'};
                              })
                              .catch((error) => { 
                                return { result: false, message: error};
                              })
                            });

  // const data = {
  //   eventName: "Treinamento Funcional para Iniciantes",
  //   eventDate: new Date("2023-10-20"),
  //   eventTime: new Date("19:00"),
  //   eventLocation: "Academia X",
  //   eventAbout: "Neste evento, você aprenderá os fundamentos do treinamento funcional para iniciantes. Se você está procurando uma maneira de melhorar sua saúde e condicionamento físico, este evento é para você!",
  //   eventOnlinePlatform: false,
  //   eventLink: "https://www.academiax.com.br/eventos/treinamento-funcional-para-iniciantes",
  //   eventWallpaper: "https://i.imgur.com/x8637vD.jpg",
  //   eventTopics: ["Treinamento Funcional", "Iniciantes"],
  // };

  // const a = await addEvent(data, user);
  // console.log('A', a);

  // const a = event.addEvent(data, user);
  // console.log('a', a)

  console.log(response);
 }
 

 return (
    <View style={styles.container}>
        <Text
            onPress={async () => {
              registerEvent();
              
            }}
        >Event</Text>
        <Text
            onPress={async () => {
              console.log(register());
              
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