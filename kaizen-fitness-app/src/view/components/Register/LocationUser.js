import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { HelperText } from 'react-native-paper';

import { UserContext } from '../../../contexts/UserContext';
import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import Buttons from './Buttons';
import SnackBar from '../SnackBar';

import * as Location from 'expo-location';

export default function LocationUser() {

  const {
    city, setCity,
    state, setState,
    stepNum, setStepNum,
  } = useContext(DataContext);
  const { userType } = useContext(UserContext);
  const { color } = useContext(ColorContext);
  
  const onlyLetterRegex = new RegExp(/^[A-Za-zÀ-ú\s]+$/);
  const message = userType === 'professional'
                      ?
                        'Preencha os campos corretamente para concluir o cadastro!'
                      :
                        'Preencha os campos corretamente para ir para a próxima etapa!';

  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  const [errCity, setErrCity] = useState(false);
  const [errState, setErrState] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

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

  const isCityValid = () => {
    const valid = onlyLetterRegex.test(city);
    setErrCity(!valid)
  }

  const isStateValid = () => {
    const valid = onlyLetterRegex.test(state);
    setErrState(!valid)
  }

  const canIGoToTheNextStep = () => {
    if(state.length === 0) {
      setErrState(true);
      return false;
    }
    else if(city.length === 0){
      setErrCity(true);
      return false;
    }

    return true;
  }

  function validateData() {
    if(errCity || errState || !canIGoToTheNextStep()) {
      setVisibleSnackbar(true);
    }
    else setStepNum(stepNum + 1);
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
        <Text style={[styles.titleInput, { color: errState ? '#ba1a1a' : color }]}>Estado</Text>
        <TextInput
          style={styles.input}
          inputMode={'text'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setState(text)}
          value={state}
          onBlur={() => isStateValid()}
        />
        {
          errState &&
            <HelperText type="error" visible={errState}>
              {state.length !== 0 ? 'O campo estado só aceita letras' : 'Campo obrigatório'} 
            </HelperText>
        }
      </View>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: errCity ? '#ba1a1a' : color } ]}>Cidade</Text>
        <TextInput
          style={styles.input}
          inputMode={'text'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setCity(text)}
          value={city}
          onBlur={() => isCityValid()}
        />
        {
          errCity &&
            <HelperText type="error" visible={errCity}>
              {city.length !== 0 ? 'O campo estado só aceita letras' : 'Campo obrigatório'} 
            </HelperText>
        }
      </View>
      <Buttons validateData={() => validateData()}/>
      <SnackBar 
        visible={visibleSnackbar} 
        setVisible={setVisibleSnackbar} 
        message={message} 
        error={true}
        width={315} 
      />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: 650
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  description: {
    color: 'white',
    marginTop: 15,
    marginBottom: 15,
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
    marginBottom: 15,
  }
});