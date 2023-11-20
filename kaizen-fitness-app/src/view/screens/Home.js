import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import Search from '../components/Search';
import Footer from '../components/Footer';
import Showcase from '../components/Home/Showcase';
import { eventControllerGetShowcase } from '../../controller/EventController';

export default function Home() {

  const { color } = useContext(ColorContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTextinput, setActiveTextinput] = useState(false);

  // const getData = async () => {
  //   const response = await eventControllerGetShowcase();
  //   setData(response);
  // }

  // const getShowcaseData = () => {
  //   getData();
  // }

  // useEffect(() => {
  //   getShowcaseData();
  // }, []);

  // useEffect(() => {
  //   if(data !== null) console.log(data);
  // }, [data]);

  if(loading)
    return (
        <View style={styles.loading}> 
            <StatusBar style='light'/>
            <ActivityIndicator animating={true} color={color} />
            <Footer />
        </View>
    )

  return (
      <View style={styles.container}>
        <StatusBar style='light'/>  
        {
          !activeTextinput 
          ?
            <Showcase setActiveTextinput={setActiveTextinput} setLoading={setLoading}/>
          :
            <Search search={search} setSearch={setSearch} setActiveTextinput={setActiveTextinput}/>
        }
      </View>
  );
}

const styles =  StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
});