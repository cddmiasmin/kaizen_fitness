import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { UserContext } from './../../contexts/UserContext';
import { DataContext } from './../../contexts/DataContext';

import Stages                from '../components/Register/Stages';
import Services              from '../components/Register/Services';
import SnackBar              from '../components/SnackBar';
import LocationUser          from '../components/Register/LocationUser';
import DataConsumer          from '../components/Register/DataConsumer';
import DataProfessional      from '../components/Register/DataProfessional';
import DataBasicPerson       from '../components/Register/DataBasicPerson';
import DataBasicProfessional from '../components/Register/DataBasicProfessional';

import { consumerControllerCreateProfile } from '../../controller/ConsumerController';
import { professionalControllerCreateProfile } from '../../controller/ProfessionalController';
import { useNavigation } from '@react-navigation/native';

export default function Register() {

  const navigation = useNavigation();
 
  const { setUser, userType, getProfile } = useContext(UserContext);
  const { stepNum, data, setData } = useContext(DataContext);

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackbar] = useState('');
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  const onDismissSnackBar = async () => {

    setVisibleSnackbar(false);

    if(!errorSnackBar){
      setUser([]);
      getProfile();
      if(userType === 'consumer') navigation.navigate('HomeConsumer');
      else navigation.navigate('HomeProfessional');
    }

  }

  const consumerCreateProfile = async () => {
    let dataAux = data;
    dataAux.created = new Date();

    const response = await consumerControllerCreateProfile(dataAux);
    
    setErrorSnackBar(!response.result);
    setMessageSnackbar(response.message);
    setVisibleSnackbar(true);
  }

  const professionalCreateProfile = async () => {
    let dataAux = data;
    dataAux.created = new Date();
    
    const response = await professionalControllerCreateProfile(dataAux);
    
    setErrorSnackBar(!response.result);
    setMessageSnackbar(response.message);
    setVisibleSnackbar(true);
  }

  useEffect(() => {
    
    if(stepNum === 5) {
     
      if(userType === 'consumer') consumerCreateProfile();
      else professionalCreateProfile();

    }

  }, [stepNum]);

  useEffect(() => {
    if(userType === 'consumer') {
      let dataAux = data;
      dataAux.searchHistory = [];
      setData(dataAux);
    }
  }, []);

  return (
        <ScrollView style={styles.container}>
          <StatusBar style='light'/>
          <View style={styles.stepper}>
            <Stages/>
            {
              userType === 'professional' 
              ?
                stepNum === 1 && <DataProfessional/> 
                  ||  stepNum === 2 && <DataBasicProfessional/> 
                  ||  stepNum === 3 && <Services/> 
                  ||  stepNum === 4 && <LocationUser/> 
                  ||  stepNum === 5 && <LocationUser/> 
              :
                stepNum === 1 && <DataBasicPerson/> 
                  ||  stepNum === 2 && <DataConsumer/> 
                  ||  stepNum === 3 && <LocationUser/> 
                  ||  stepNum === 4 && <Services/> 
                  ||  stepNum === 5 && <Services/> 
            }
          </View>
          <SnackBar 
            visible={visibleSnackbar} 
            setVisible={onDismissSnackBar} 
            message={messageSnackBar} 
            error={errorSnackBar}
            width={315} 
          />
        </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: 35,
        paddingRight: 35,
    }
});
