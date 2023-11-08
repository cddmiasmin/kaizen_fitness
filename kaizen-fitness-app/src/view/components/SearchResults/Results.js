import { useContext, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { grayText, mainColor } from '../../../colors/colors';

import { ColorContext } from '../../../contexts/ColorContext';
import EventCard from '../EventCard';
import { useNavigation } from '@react-navigation/native';

export default function Results({ search, setSearch, setActiveTextinput }) {

  const navigation = useNavigation()

  const { color } = useContext(ColorContext);

  const data = [
    {
        styleStatusBar: 'light',
        wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        topics: ["Nutrição","Saúde pública",],
        name: 'Palestra sobre alimentação saudável' ,
        about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        plataform: 'microsoft-teams',
        meetingLink: 'https://florenceandthemachine.net/home/',
        organizer: {
            kindOfPerson: 'PF',
            name: 'Florence',
            familyName: 'Welch',
            photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        },
        datatime: new Date(2023, 9, 25, 19, 30),
        modality: 'Online',
        participants: [
            { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
            
            { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
            { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
            { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
        ]
    },
    {
        styleStatusBar: 'light',
        wallpaper: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: "Semana da Saúde Feminina",
        datatime: new Date(2024, 0, 2, 10, 30),
        topics: ["Saúde Pública", "Saúde Feminina"],
        modality: "Presencial",
        address: "Rua Frei João, 123",
        city: "Rio GRande do Norte",
        state: "RN",
        latitude: -22.90956,
        longitude: -43.17632,
        organizer: {
          kindOfPerson: 'PJ',
          name: 'Florence',
          familyName: 'Welch',
          photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        },
        about: "Participe da Semana da Saúde Feminina, um evento dedicado à promoção da saúde da mulher. Teremos palestras, workshops e consultas gratuitas.",
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
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
        ]
    },
    {
        styleStatusBar: 'light',
        wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        topics: ["Nutrição","Saúde pública",],
        name: 'Palestra sobre alimentação saudável' ,
        about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        plataform: 'microsoft-teams',
        meetingLink: 'https://florenceandthemachine.net/home/',
        organizer: {
            kindOfPerson: 'PF',
            name: 'Florence',
            familyName: 'Welch',
            photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        },
        datatime: new Date(2023, 9, 25, 19, 0),
        modality: 'Online',
        participants: [
            { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
            { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
            { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
            { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
        ]
    },
    {
        styleStatusBar: 'light',
        wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        topics: ["Nutrição","Saúde pública",],
        name: 'Palestra sobre alimentação saudável' ,
        about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        plataform: 'microsoft-teams',
        meetingLink: 'https://florenceandthemachine.net/home/',
        organizer: {
            kindOfPerson: 'PF',
            name: 'Florence',
            familyName: 'Welch',
            photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        },
        datatime: new Date(2023, 10, 3, 2, 58),
        modality: 'Online',
        participants: [
            { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
            
            { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
            { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
            { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
        ]
    },
  ];

  return (
    <View style={styles.container}>
        <View style={[styles.header]}>
          <TouchableOpacity 
              style={styles.arrow}
              onPress={() => {
                setSearch('');
                setActiveTextinput(false);
                navigation.navigate('Home');
              }}
          >
              <Icon 
                  name={'chevron-left'} 
                  size={24} 
                  color={'white'} 
              />
          </TouchableOpacity>
          <View style={styles.search}>
              <TextInput
                  mode='outlined'
                  // ref={refInput}
                  label={''}
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                  placeholder='Pesquise Eventos, Organizadores'
                  placeholderTextColor={grayText}
                  outlineColor={'white'}
                  activeOutlineColor={color}
                  textColor={'white'}
                  style={{ backgroundColor: mainColor, width: 345, height: 45}}
                  theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                  }}
                  editable={true}
                  onFocus={() => setActiveTextinput(true)}
              />
          </View>
        </View>
        <View style={[styles.line, { backgroundColor: color }]}/>
        <View style={styles.body}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>
            {`Resultado de buscas para "${search}"`}
          </Text>
          <Text style={{ color: grayText, fontSize: 12, textAlign: 'center' }}>
            {`${data.length} resultados`}
          </Text>
          <View style={styles.results}>
            <FlatList
              data={data}
              ItemSeparatorComponent={() => <View style={{ marginTop: 10 }} />}
              contentContainerStyle={{ paddingBottom: 30 }}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{ height: 150}}
              renderItem={({item: result }) => 
                <EventCard data={result} orientation={'vertical'}/>
              }
            />
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: mainColor,
  },
  header: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 2.5,
  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginTop: 10,
    width: '100%',
    height: 5
  },
  body: {
    marginTop: 40,
    paddingLeft: '6%',
    paddingRight: '6%',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showcase: {
    // marginTop: -10,
    flexDirection: 'column',
    gap: 5
  },
  searchResultsText: {
    width: '100%'
  },
  results: {
    width: '100%'
  }
});