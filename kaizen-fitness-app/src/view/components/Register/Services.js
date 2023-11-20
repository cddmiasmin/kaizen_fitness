import { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';
import { UserContext } from '../../../contexts/UserContext';

import { mainColor } from '../../../colors/colors';

import { availableTopics } from '../../../services/availableServices';

import Buttons from './Buttons';
import SnackBar from '../SnackBar';

export default function Services() {

  const { color } = useContext(ColorContext);
  const { userType } = useContext(UserContext);
  const { 
    stepNum, setStepNum, setTopics, topics, data, setData
  } = useContext(DataContext);

  const [servicesSelected, setServicesSelect] = useState(new Array(availableTopics.length));

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackbar] = useState('');
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  const topic = userType === 'consumer' ? 'Interesses' : 'Serviços';
  const message = userType === 'consumer' 
                    ? 'Escolha no minimo 3 tópicos que melhor representa seus interesses' 
                    : 'Escolha os tópicos de serviço que melhor representa sua atuação';
  
  function validateData() {

    if(userType === 'professional'){

      if(topics.length === 0 ){
        setMessageSnackbar('É obrigatório definir um tópico que represente sua atuação.');
        setErrorSnackBar(true);
        setVisibleSnackbar(true);
      } else {
        let dataAux = data;
        dataAux.topics = topics;

        console.log('Aux', dataAux);

        setData(dataAux);
        setStepNum(stepNum + 1);
      }
    } else {

        if(topics.length === 0 ){
          setMessageSnackbar('É obrigatório definir tópicos que represente seus interesses.');
          setErrorSnackBar(true);
          setVisibleSnackbar(true);
        }
        else if (topics.length < 3){
          setMessageSnackbar('É necessário escolher no minino 3 tópicos de interesse.');
          setErrorSnackBar(true);
          setVisibleSnackbar(true);
        } else {
          let dataAux = data;
          dataAux.topics = topics;
    
          console.log('Aux', dataAux);
    
          setData(dataAux);
          setStepNum(stepNum + 1);
        }

    }
    
  }
  
  const updateServiceSelected = (key, service) => {
    const newServicesSelected = [...servicesSelected];
    newServicesSelected[key] = service;
    setServicesSelect(newServicesSelected);
  };

  useEffect(() => {
    setTopics(servicesSelected.filter(value => value !== undefined));
  }, [servicesSelected]);

  useEffect(() => console.log(topics), []);

  return (
    <View style={styles.container}>
        <Text style={[styles.title, { color: color}]}>{topic}</Text>
        <Text style={styles.description}>
          {message}
        </Text>
        <View style={styles.service}>
          <View style={styles.containerChipServices}>
            {
              availableTopics.map((service, key) => (
                  <Chip
                    key={`chip#${key}`}
                    mode='outlined' 
                    onPress={() => {
                      if(servicesSelected[key] === undefined) 
                      updateServiceSelected(key, service);
                      else updateServiceSelected(key, undefined);
                    }}
                    style={[styles.chipService, { backgroundColor: mainColor }]}
                    selected={servicesSelected[key] === undefined ? false : true}
                    selectedColor={servicesSelected[key] === undefined ? 'white' : color}
                  >
                    {service}
                  </Chip>
              ))
            }
          </View>
      </View>
      <Buttons validateData={() => validateData()}/>    
      <SnackBar 
        visible={visibleSnackbar} 
        setVisible={setVisibleSnackbar} 
        message={messageSnackBar} 
        error={errorSnackBar}
        width={315} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  description: {
    color: 'white',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center'
  },
  service: {
    width: '100%',
    marginTop: 20,
  },
  containerChipServices: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chipService: {
    width: 'auto'
  }
});