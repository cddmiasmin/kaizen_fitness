import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { mainColor } from '../../colors/colors';

import Footer from '../components/Footer';
import HeaderProfessional from '../components/Profile/Header';
import HeaderConsumer from '../components/Profile/HeaderConsumer';
import DialogAlert from '../components/DialogAlert';

import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';

import { StatusBar } from 'expo-status-bar';

export default function Perfil() {

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [whoCalledTheDialog, setWhoCalledTheDialog] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const { color } = useContext(ColorContext);
  const { userType } = useContext(UserContext);

  const topicName = userType === 'consumer' ? 'Interesses' : 'Serviços';
  const topicIcon = userType === 'consumer' ? 'thumb-up' : 'briefcase';

  const options = [
    { key: 'myData', name: 'Meus dados', icon: 'badge-account-horizontal' },
    // { key: 'location', name: 'Localização', icon: 'map-marker' },
    { key: 'topics', name: topicName, icon: topicIcon },
    { key: 'deleteAccount', name: 'Excluir conta', icon: 'delete' },
    { key: 'exit', name: 'Sair', icon: 'exit-to-app' }
  ]

  const executeDialogUserChoice = () => {
    if(whoCalledTheDialog === 'deleteAccount') console.log('delete');
    else console.log('exit');
  }

  const optionPressed = (key) => {
    if(key === 'myData') navigation.navigate('MyData');
    // else if (key === 'location') navigation.navigate('MyData');
    else if (key === 'topics') navigation.navigate('Topics');
    else if (key === 'deleteAccount') {
      setDialogTitle('Excluir conta');
      setDialogContent('Tem certeza que deseja excluir sua conta do Kaizen Fitness?');
      setWhoCalledTheDialog(key);
      setVisible(true);
    } else {
      setDialogTitle('Sair');
      setDialogContent('Tem certeza que deseja sair do aplicativo?');
      setWhoCalledTheDialog(key);
      setVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {
        userType === 'professional'
        ? <HeaderProfessional />
        : <HeaderConsumer/>
      }
      <View style={styles.line}/>
      <FlatList
        style={{ width: '100%', paddingBottom: 30}}
        data={options}
        ItemSeparatorComponent={() => <View style={{ marginTop: 10 }}/>}
        renderItem={({item: option}) => 
          <TouchableOpacity
          style={{ backgroundColor: '#1c1c1c', borderRadius: 5}}
          onPress={() => optionPressed(option.key)}
          >
              <List.Item
                title={option.name}
                titleStyle={{ color: 'white' }}
                left={props => <List.Icon {...props} icon={option.icon} color={color} />}
                right={props => <List.Icon {...props} icon={'chevron-right'} color={'white'} />}
              />
          </TouchableOpacity>
        }
        keyExtractor={item => item.key}
      />
      <Footer />
      <DialogAlert
        visible={visible} 
        setVisible={setVisible} 
        title={dialogTitle} 
        message={dialogContent} 
        response={() => executeDialogUserChoice()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'star',
    alignItems: 'center',
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  line: {
    width: '100%',
    height: 1 ,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 30,
  },
  opcao: {
    backgroundColor: '#5d6d89',
    width: '100%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  }
});