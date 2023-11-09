import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Avatar, IconButton } from 'react-native-paper';
import { TextInput as NativeTextInput } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { AntDesign } from '@expo/vector-icons';

import Line from '../components/Line';

import { DataContext } from '../../contexts/DataContext';
import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

export default function MyData() {

  const navigation = useNavigation();

  const [colorTextHeight, setColorTextHeight] = useState(color);
  const [colorTextWeight, setColorTextWeight] = useState(color);

  const { color } = useContext(ColorContext);
  const { user, userType } = useContext(UserContext);
  const { 
    myData, photo, setPhoto, height, setHeight, weight, setWeight
  } = useContext(DataContext);
  
  const documentLabel = userType === 'consumer' || user.kindOfPerson === 'PF' 
                          ? 'CPF'
                          : 'CNPJ';

  useEffect(() => myData(), []);

  useEffect(() => {
    setColorTextHeight(color);
    setColorTextWeight(color);
  }, []);
 
  return (
    <ScrollView style={styles.container}>
        <StatusBar style='light'/>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.screen}>Meus Dados</Text>
        </View>
        <View style={styles.containerPhoto}>
            <View style={styles.avatar}>                    
            <IconButton
                icon="image-plus"
                iconColor={'white'}
                style={[{backgroundColor: color}, styles.icon]}
                size={15}
                onPress={() => console.log('Pressed')}
            />
              <Avatar.Image
                  size={110} 
                  source={{uri:(user.photo)}}
                  style={{zIndex: 1}}
              />
            </View>
        </View>
        <Line width={'100%'} height={'0.3%'} top={'7%'} bottom={'5%'}/>
        <Text 
          style={[styles.message, {color: color}]}
        >
          Os dados de nome, sobrenome, data de nascimento e {documentLabel} são inalteráveis. Para saber mais, consulte a nossa {'política de privacidade'}.
        </Text>
        <KeyboardAvoidingView style={styles.information}>
          <TextInput
            mode='outlined'
            label="Nome"
            value={user.name}
            outlineColor={'white'}
            textColor={color}
            style={{ backgroundColor: mainColor }}
            theme={{
              colors: {
                  onSurfaceVariant: 'white'
              }
            }}
            editable={false}
          />

          {
            (userType === 'consumer' || user.kindOfPerson === 'PF') &&
            <TextInput
              mode='outlined'
              label="Sobrenome"
              value={user.familyName}
              outlineColor={'white'}
              textColor={color}
              style={{ backgroundColor: mainColor }}
              theme={{
                colors: {
                    onSurfaceVariant: 'white'
                }
              }}
              editable={false}
            />
          }

          {
            (userType === 'consumer' || user.kindOfPerson === 'PF') &&
              <TextInput
              mode='outlined'
              label="Data de nascimento"
              value={user.dataOfBirth}
              outlineColor={'white'}
              textColor={color}
              style={{ backgroundColor: mainColor }}
              theme={{
                colors: {
                    onSurfaceVariant: 'white'
                }
              }}
              editable={false}
            />
          }

          <TextInput
            mode='outlined'
            label={documentLabel}
            value={user.document}
            outlineColor={'white'}
            textColor={color}
            style={{ backgroundColor: mainColor }}
            theme={{
              colors: {
                  onSurfaceVariant: 'white'
              }
            }}
            editable={false}
          />

           {
              userType === 'consumer' &&
              <>
                  <TextInput
                    mode='outlined'
                    label='Altura'
                    value={'1,78'}
                    onChangeText={(text) => setHeight(text)}
                    outlineColor={'white'}
                    activeOutlineColor={color}
                    textColor={colorTextHeight}
                    style={{ backgroundColor: mainColor }}
                    theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                    }}
                    editable={true}
                    onFocus={() => setColorTextHeight('white')}
                    onBlur={() => setColorTextHeight(color)}
                    right={<TextInput.Icon icon="pencil-outline" color={colorTextHeight}/>}
                    render={(props) => <NativeTextInput inputMode={'decimal'} keyboardType={'decimal-pad'} {...props} />}
                  />

                  <TextInput
                    mode='outlined'
                    label='Peso'
                    value={'56,9'}
                    onChangeText={(text) => setWeight(text)}
                    outlineColor={'white'}
                    activeOutlineColor={color}
                    textColor={colorTextWeight}
                    style={{ backgroundColor: mainColor }}
                    theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                    }}
                    editable={true}
                    onFocus={() => setColorTextWeight('white')}
                    onBlur={() => setColorTextWeight(color)}
                    right={<TextInput.Icon icon="pencil-outline" color={colorTextWeight}/>}
                    render={(props) => <NativeTextInput inputMode={'decimal'} keyboardType={'decimal-pad'} {...props} />}
                  />
              </>
           }

        </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: mainColor,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  header: {
      marginTop: 45,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 15,
  },
  containerPhoto: {
     width: '100%',
     alignItems: 'center',
  },
  screen: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 45
  },
  information: {
    width: '100%',
    marginBottom: 25,
    gap: 25
  },
  icon: {
    position: 'absolute', 
    top: '65%', 
    left: '22%', 
    zIndex: 2
  },
  avatar: {
    zIndex: 1
  },
  message: {
    width:'100%',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: '5%'
  },
});