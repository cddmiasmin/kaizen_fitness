import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput,  } from 'react-native';
import { ColorContext } from '../../contexts/ColorContext';
import { Picker } from '@react-native-picker/picker';
import { mask, unMask } from 'remask';
import { Chip } from 'react-native-paper';
import { mainColor } from '../../colors/colors';

export default function DataProfessional() {

  const services = [
    'florence welch',
    'taylor swift',
    'demimetria',
    'iasmin',
    'jessica',
    'franklin',
    'girl',
    'ravena',
    'hoo',
    'flamengo'
  ];


  const { color } = useContext(ColorContext);

  const [selectedValue, setSelectedValue] = useState("PF");
  const [document, setDocument] = useState('');
  const [servicesSelected, setServicesSelect] = useState(new Array(services.length));

  const updateServiceSelected = (key, service) => {
    const newServicesSelected = [...servicesSelected];
    newServicesSelected[key] = service;
    setServicesSelect(newServicesSelected);
  };
  
 return (
  <View title="Accordions" style={styles.container}>
    <Text style={[styles.title, { color: color}]}>Dados Profissionais</Text>
    <Text style={styles.description}>Florence melhor do mundo {selectedValue}</Text>

    <View style={styles.typePerson}>
      <Text style={[styles.titleInput, { color: color }]}>Pessoa:</Text>
      <Picker
        selectedValue={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        onValueChange={(value) => {
          setSelectedValue(value);
          setDocument('');
        }}
        mode='dropdown'
        dropdownIconColor={color}
        dropdownIconRippleColor={color}
        style={[styles.picker]}
      >
        <Picker.Item label="Pessoa Física" value="PF" />
        <Picker.Item label="Pessoa Jurídica" value="PJ" />
      </Picker>
    </View>

    <View style={styles.document}>
      <Text style={[styles.titleInput, { color: color}]}>{selectedValue === 'PF' ? 'CPF:' : 'CNPJ:'}</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setDocument(mask(unMask(text), selectedValue === 'PF' ? '999.999.999-99' : '99.999.999/9999-99'))}
        value={document}
      />
    </View>

    <View style={styles.service}>
      <Text style={[styles.titleInput, { color: color}]}>Qual(is) serviço(s) você prestará?</Text>
      <View style={styles.containerChipServices}>
        {
          services.map((service, key) => (
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
      marginTop: 130,
      marginLeft: 35,
      marginRight: 35,
      //backgroundColor: 'red'
      alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  description: {
    color: 'white',
    marginTop: 15,
    marginBottom: 30
  },
  titleInput:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  typePerson: {
    //backgroundColor: 'yellow',
    width: '100%',
  },
  picker: {
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  document: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
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
    alignItems: 'center',
  },
  chipService: {
    width: 'auto'
  }
});
