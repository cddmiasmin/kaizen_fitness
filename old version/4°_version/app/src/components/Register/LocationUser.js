import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import { RegisterContext } from '../../contexts/RegisterContext';

import Buttons from './Buttons';
import { ColorContext } from '../../contexts/ColorContext';

// import * as Location from 'expo-location';

export default function LocationUser() {

  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  const {
    city, setCity,
    state, setState,
    stepNum, setStepNum,
  } = useContext(RegisterContext);

  const { color } = useContext(ColorContext);

  // const getAdress = async () => {

  //   const apiKey = "AIzaSyDEfBb_kz7GxhGkIIHjBRBx_N282c0UvSo";

  //   // Definir as coordenadas
  //   const latitude = location[0]
  //   const longitude = location[1]

  //   // Fazer a solicitação da API
  //   const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`, {
  //     method: "GET",
  //   });

  //   // Processar a resposta
  //   const json = await response.json();

  //   // Obter o estado
  //   const state = json.results[0].address_components[1].short_name;

  //   // Obter a cidade
  //   const city = json.results[0].address_components[2].short_name;

  //   // Imprimir o resultado
  //   console.log("Estado: " + state);
  //   console.log("Cidade: " + city);
  // }

  // const getUserLocation = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     if(location) setLocation([location.coords.latitude, location.coords.latitude]);
  //     console.log(location);
  // }

  // useEffect(() => {
  //   getAdress();
  // }, [location])

  function validateData() {
    setStepNum(stepNum + 1)
  }


 return (
   <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Localização</Text>
      <Text style={styles.description}>
        Precisamos da sua localização para recomendar eventos presenciais, procurar pessoas e estabelecimentos.
      </Text>
      {/* <TouchableOpacity
        onPress={() => getUserLocation()}
        style={styles.permissionButton}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>Fornecer minha localização atual</Text>
      </TouchableOpacity> */}

      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color}]}>Estado</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setState(text)}
          value={state}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color } ]}>Cidade</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setCity(text)}
          value={city}
        />
      </View>
      <Buttons validateData={() => validateData()}/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  description: {
    color: 'white',
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center'
  },
  permissionButton:{
    marginBottom: 20,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 2,
    width: 255,
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInput:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
  },
  boxInput: {
    width: '100%',
    marginTop: 20,
  }
});