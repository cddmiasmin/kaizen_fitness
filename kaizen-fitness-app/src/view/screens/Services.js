import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { availableServices } from '../../services/availableServices';
import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import { Chip } from 'react-native-paper';
import { mainColor } from '../../colors/colors';
import { StatusBar } from 'expo-status-bar';

export default function Services() {

  const [servicesSelected, setServicesSelect] = useState(new Array(availableServices.length));

  const { userType } = useContext(UserContext);

  const { color } = useContext(ColorContext);
  
  const updateServiceSelected = (key, service) => {
    const newServicesSelected = [...servicesSelected];
    newServicesSelected[key] = service;
    setServicesSelect(newServicesSelected);
  };

 return (
    <View style={styles.container}>
        <StatusBar style="light" backgroundColor={mainColor}/>
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
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: mainColor,
    paddingLeft: 35,
    paddingRight: 35,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30
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