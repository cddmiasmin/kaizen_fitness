import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "expo-dev-client";
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import ProfessionalController from './src/controller/ProfessionalController';
import UserModal from './src/model/UserModal';

export default function App() {

  const userModal = new UserModal();
  const professionalController = new ProfessionalController();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    auth()
    .signInWithEmailAndPassword('taylorswift@hotmail.com', '131313')
    .then(async (success)  => {
      console.log('User account created & signed in!', success);
      //  const users = await firestore().collection('UserProfessional').doc('Iasmin');
      // console.log("FIRESTORE", users)

      // firestore()
      // .collection('UserProfessional')
      // .add({
      //   name: 'Ada Lovelace',
      //   age: 30,
      // })
      // .then(() => {
      //   console.log('User added!');
      // });

      // const uid = auth().currentUser.uid;

      // // Cria um novo documento na coleção `UserProfessional`
      // const professional = {
      //   // Outros campos do documento
      //   id: uid,
      // };

      // // Salva o documento
      // firestore().collection("UserProfessional").doc('Iasmin').set(professional);

      //professionalController.registerProfessional();
      
       const response = await userModal.hasFullResgistration();
       console.log('data', response);

    })
    .catch(error => {

      console.error(error);
    });
  }, [user]);

  if (initializing) return null;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
