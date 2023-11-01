import React, { useContext, useState } from 'react';

import { StyleSheet, 
  Text, View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { TextInput } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';
import { categories } from '../../services/availableServices';

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
                <Text style={{color: color, fontWeight: 'bold', fontSize: 18}}>
                  Categorias
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')} >
                  <Text style={{color: color, fontSize: 12}}>
                    Mostrar tudo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.categoriesContainer}>
                {
                  categories.map((category, key) => (
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
                <Text style={{color: color, fontWeight: 'bold', fontSize: 18}}>
                  Próximos eventos
                </Text>
                <ScrollView horizontal={true}>
                  <View style={styles.cardContainerUpcoming}>
                      <EventCard data={search}/>
                      <EventCard data={search}/>
                      <EventCard data={search}/>
                  </View>
                </ScrollView>
            </View>
            <View style={styles.nearby}>
                <Text style={{color: color, fontWeight: 'bold', fontSize: 18}}>
                  Eventos Futuros
                </Text>       
                <View style={styles.cardContainerNearby}>
                    <EventCard data={search}/>
                    <EventCard data={search}/>
                    <EventCard data={search}/>
                </View>
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