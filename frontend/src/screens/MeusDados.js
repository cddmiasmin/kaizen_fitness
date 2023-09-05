import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Text, KeyboardAvoidingView , TextInput, TouchableOpacity} from 'react-native';
import { papelDeParede } from '../colors/colors';

import Header from '../componentes/MeusDados/Header';
import { ColorContext } from '../contexts/ColorContext';


export default function MeusDados() {

 const [email, setEmail] = useState('');

 const { color } = useContext(ColorContext);

 return (
   <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
     <ScrollView style={styles.scroll}>
        <View style={styles.subcontainer}>
          <Header />
          <View style={styles.linha}/>
          <KeyboardAvoidingView style={styles.caixaInput}>

            <Text style={[styles.span, { color: color }]}>Nome Completo</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Data de Nascimento</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>CPF</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Endereço</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Altura</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Altura</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChange={setEmail}
                  value={email}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CadastroCompleto')} style={[styles.botao, { backgroundColor: color }]}>
              <Text style={styles.tituloBotao}>Continuar cadastro</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
     </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: papelDeParede
    },
    titulo: {
        color: 'white',
        fontSize: 67
    },
    scroll:{
      paddingLeft: '8%',
      paddingRight: '8%',
      paddingTop: '5%',
    },
    subcontainer: {
      justifyContent: 'star',
      alignItems: 'center'
    },
    linha: {
      width: '100%',
      height: 2,
      backgroundColor: 'white',
      borderRadius: 50,
      marginTop: '5%',
      marginBottom: '5%'
    },
    caixaInput: {
      width: '100%'
    },
    inputContainer: {
      width: '100%',
      height: 45,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    input: {
      width: '95%',
      height: 35,
      backgroundColor: 'white',
    },
    span: {
      fontWeight: 'bold',
      marginBottom: 5
    },
    botao: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginTop: '10%',
      marginBottom: '15%'
    },
});