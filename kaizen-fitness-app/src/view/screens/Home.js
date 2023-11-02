import React, { useContext, useState } from 'react';

import { StyleSheet, 
  Text, View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { TextInput } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';
import { topics } from '../../services/availableServices';

import { ColorContext } from '../../contexts/ColorContext';
import Category from '../components/Categories/Category';
import { useNavigation } from '@react-navigation/native';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

export default function Home() {

  const navigation = useNavigation();

  const { color } = useContext(ColorContext);

  const [search, setSearch] = useState('');
  const [colorTextSearch, setColorTextSearch] = useState(color);

  const eventOnline = {
    styleStatusBar: 'light',
    wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    topics: ["Nutrição","Saúde pública",],
    name: 'Palestra sobre alimentação saudável' ,
    about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    plataform: 'meetup',
    meetingLink: 'https://florenceandthemachine.net/home/',
    organizer: {
        kindOfPerson: 'PF',
        name: 'Florence',
        familyName: 'Welch',
        photo: 'user.photo'
    },
    datatime: new Date(2023, 9, 25, 19, 30),
    modality: 'Online',
    participants: [
        { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
        { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
        { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
        { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
        { photo: 'https://i.pinimg.com/564x/f7/a6/bc/f7a6bc0999bae0e3148ff8f3d660358e.jpg'},
        { photo: ''},
        { photo: ''},
        { photo: ''},
        { photo: ''},
        { photo: ''},
        { photo: ''},
        { photo: ''}
    ]
  };

  const inPersonEvent = {
    styleStatusBar: 'light',
    wallpaper: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: "Semana da Saúde Feminina",
    datatime: new Date(2024, 0, 2, 10, 0),
    topics: ["Saúde Pública", "Saúde Feminina"],
    modality: "Presencial",
    address: "Rua Frei João, 123",
    city: "São Paulo",
    state: "SP",
    latitude: -22.90956,
    longitude: -43.17632,
    about: "Participe deste workshop informativo sobre atividade física, saúde e nutrição para melhorar sua qualidade de vida."
  }

  return (
      <View style={styles.container}>
        <StatusBar style='light'/>
        <ScrollView>
          <TextInput
            mode='outlined'
            label={''}
            value={search}
            placeholder='Pesquise Eventos, Organizadores'
            placeholderTextColor={color}
            onChangeText={(text) => setSearch(text)}
            outlineColor={'white'}
            activeOutlineColor={color}
            textColor={colorTextSearch}
            style={{ backgroundColor: mainColor, marginTop: 55 }}
            theme={{
              colors: {
                  onSurfaceVariant: 'white'
              }
            }}
            editable={true}
            onFocus={() => setColorTextSearch('white')}
            onBlur={() => setColorTextSearch(color)}
            left={<TextInput.Icon icon="magnify" color={colorTextSearch}/>}
          />
          <View style={styles.home}>
            <View style={styles.categories}>
              <View style={styles.categoriesHeader}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Categorias
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')} >
                  <Text style={{color: color, fontSize: 10}}>
                    Mostrar tudo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.categoriesContainer}>
                {
                  topics.map((category, key) => (
                    key < 4
                    ?
                      <Category key={`category#${key}`} category={category} selected={false}/>
                    : 
                    ''
                  ))
                }
              </View>
            </View>
            <View style={styles.upcoming}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Próximos eventos
                </Text>
                <ScrollView horizontal={true}>
                  <View style={styles.cardContainerUpcoming}>
                      <EventCard data={inPersonEvent}/>
                      <EventCard data={eventOnline}/>
                      {/* <EventCard data={search}/>
                      <EventCard data={search}/> */}
                  </View>
                </ScrollView>
            </View>
            <View style={styles.nearby}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Eventos Futuros
                </Text>       
                {/* <View style={styles.cardContainerNearby}>
                    <EventCard data={search}/>
                    <EventCard data={search}/>
                    <EventCard data={search}/>
                </View> */}
            </View>
          </View>
        </ScrollView>
        <Footer />
      </View>
  );
}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
      paddingLeft: '8%',
      paddingRight: '8%',
    },
    home: {
      flexDirection: 'column',
      width: '100%',
      gap: 10
    },
    categories: {
      marginTop: 20
    },
    categoriesContainer: {
      marginTop: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4
    },
    categoriesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    upcoming: {
      marginTop: 10,
      flexDirection: 'column'
    },
    cardContainerUpcoming: {
      flexDirection: 'row',
      gap: 15,
      marginTop: 10
    },
    nearby: {
      marginTop: 10,
      flexDirection: 'column'
    },
    cardContainerNearby: {
      flexDirection: 'column',
      gap: 15,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80
    }
});