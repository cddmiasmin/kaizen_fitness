import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';
import { UserContext } from '../../../contexts/UserContext';

import { Chip } from 'react-native-paper';

import { mainColor } from '../../../colors/colors';

import Buttons from './Buttons';

import { availableServices } from '../../../services/availableServices';

export default function Services() {

  const {
    stepNum, setStepNum,
  } = useContext(DataContext);

  const [servicesSelected, setServicesSelect] = useState(new Array(availableServices.length));

  const { userType } = useContext(UserContext);

  const { color } = useContext(ColorContext);

  function validateData() {
    setStepNum(stepNum + 1)
  }
  
  const updateServiceSelected = (key, service) => {
    const newServicesSelected = [...servicesSelected];
    newServicesSelected[key] = service;
    setServicesSelect(newServicesSelected);
  };

  return (
    <View style={styles.container}>
        <Text style={[styles.title, { color: color}]}>{userType === 'consumer' ? 'Interesses' : 'Serviços'}</Text>
        <Text style={styles.description}>
          Escolha a área ou categoria de serviço que melhor representa sua atuação
        </Text>

        <View style={styles.service}>
        
        <View style={styles.containerChipServices}>
          {
            availableServices.map((service, key) => (
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
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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