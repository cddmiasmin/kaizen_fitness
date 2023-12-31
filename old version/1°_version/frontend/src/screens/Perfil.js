import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import { colorCinza, colorConsumidor, papelDeParede} from '../colors/colors';
import Footer from '../componentes/Footer';
import Header from '../componentes/Perfil/Header';

import { ColorContext } from '../contexts/ColorContext';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Dialog, Button } from 'react-native-paper';
import { UserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from '@env'

export default function Perfil() {

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const { color } = useContext(ColorContext);

  const { setUsuarioInfo, usuarioInfo } = useContext(UserContext);

  const opcoes = [
    { 'id': 1, 'nome': 'Meus dados', 'icon': 'account'},
    { 'id': 2, 'nome': 'Deletar minha conta', 'icon': 'trash-can'},
    { 'id': 3, 'nome': 'Deslogar minha conta', 'icon': 'exit-to-app'}
  ]

  const ativarConfirmacao = async () => {

    if (dialogTitle === 'Deletar minha conta'){

      try {
        const response = await fetch(`${API_URL}/usuario/${usuarioInfo.idUsuario}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error('Erro na solicitação');
        }
    
        const json = await response.json();
        setUsuarioInfo(json.result);
        setVisible(false);
        navigation.navigate('Login');
        
      } catch (error) {
        console.error(error);
      }

    } else {
      setUsuarioInfo([]);
      navigation.navigate('Login');
    }
  }

  const ativarOpcao = (key) => {
    if(key === 0) {
      navigation.navigate('MeusDados', { screen: 'Perfil'});
    } else {

      setVisible(true);
      
      if(key === 1){
        setDialogTitle('Deletar minha conta');
        setDialogContent('Tem certeza que deseja excluir sua conta do Kaizen Fitness?');
      } else {
        setDialogTitle('Deslogar minha conta');
        setDialogContent('Tem certeza que deseja deslogar do aplicativo?');
      }

    }
 }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={papelDeParede} barStyle="light-content"/>
      <Header/>
      <View style={styles.linha}/>
      {opcoes.map((opcao, key) => (
        <TouchableOpacity key={key} style={styles.opcao} onPress={() => ativarOpcao(key)}>
           <MaterialCommunityIcons name={opcao.icon} size={24} color="white" style={{ marginLeft: 20, marginRight: 20}}/>
           <Text style={{color: 'white', fontWeight: 'bold'}} >{opcao.nome}</Text>
           <Entypo style={{position: 'absolute', right: 0, marginRight: 10}} name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      ))}
      <Footer/>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Icon icon="alert" size={35} color={color}/>
        <Dialog.Title style={{color: color, fontWeight: 'bold', textAlign: 'center'}}>{dialogTitle}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{textAlign: 'center'}}>{dialogContent}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)} textColor={color}>Não</Button>
          <Button onPress={() => ativarConfirmacao()} textColor={color}>Sim</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: papelDeParede,
    justifyContent: 'star',
    alignItems: 'center',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '5%',
    marginTop: StatusBar.length
  },
  linha: {
    width: '100%',
    height: '0.5%',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 200,
    marginBottom: '10%'
  },
  opcao: {
    backgroundColor: colorCinza,
    width: '100%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  }
});