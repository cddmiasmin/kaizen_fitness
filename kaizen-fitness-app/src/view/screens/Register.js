import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { UserContext } from './../../contexts/UserContext';
import { DataContextProvider } from './../../contexts/DataContext';

import Stages                from '../components/Register/Stages';
import Services              from '../components/Register/Services';
import LocationUser          from '../components/Register/LocationUser';
import DataConsumer          from '../components/Register/DataConsumer';
import DataProfessional      from '../components/Register/DataProfessional';
import DataBasicPerson       from '../components/Register/DataBasicPerson';
import DataBasicProfessional from '../components/Register/DataBasicProfessional';

export default function Register() {
 
 const { userType } = useContext(UserContext);
 
 const [stepNum, setStepNum] = useState(1);

 return (
    <DataContextProvider stepNum={stepNum} setStepNum={setStepNum}>
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
                  ||  stepNum === 4 || stepNum === 5 && <Services/> 
            }
          </View>
      </ScrollView>
    </DataContextProvider>
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
