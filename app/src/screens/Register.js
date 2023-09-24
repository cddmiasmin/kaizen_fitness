import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { mainColor } from '../colors/colors';
import Stages from '../components/Register/Stages';
import { Formik, FormikField, useFormik } from "formik";
import * as yup from 'yup';
import { Text, TextInput, Button } from "react-native";
import DataProfessional from '../components/Register/DataProfessional';


export default function Register() {

 const [stepNum, setStepNum] = useState(1);
 
  
 return (
   <SafeAreaView style={styles.container}>
    <StatusBar style='light'/>
      <View style={styles.stepper}>
        <DataProfessional/>
        <Stages stepNum={stepNum}/>
      </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor
    },
    
});