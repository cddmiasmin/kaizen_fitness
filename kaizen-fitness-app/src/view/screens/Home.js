import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, RefreshControl, SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import Search from '../components/Search';
import Footer from '../components/Footer';
import Showcase from '../components/Home/Showcase';
import { eventControllerGetShowcase } from '../../controller/EventController';
import { UserContext } from '../../contexts/UserContext';

export default function Home() {

  const { user } = useContext(UserContext);
  const { color } = useContext(ColorContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTextinput, setActiveTextinput] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    //console.log(user.topics)
    const response = await eventControllerGetShowcase(user.topics);
    setData(response);
  }

  const getShowcaseData = () => {
    getData();
  }

  useEffect(() => {
    //console.log('ju')
    if(user?.topics) getShowcaseData();
  }, []);

  useEffect(() => {
    //console.log('ju')
    if(user?.topics) getShowcaseData();
  }, [user]);

  useEffect(() => {
    if(data !== null) {
      //console.log('data', data.forYou);
      setLoading(false);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if(user?.topics) {
      getShowcaseData();
      setRefreshing(false);
    }
    else setRefreshing(false);

  }, []);

  if(loading)
    return (
      <SafeAreaView style={styles.loading}>
        <StatusBar style='light'/>
        <RefreshControl 
            refreshing={refreshing} onRefresh={onRefresh} 
            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
        >
            <ActivityIndicator animating={true} color={color} style={[StyleSheet.absoluteFillObject]}/>
            <Footer />
        </RefreshControl>
      </SafeAreaView>       
    )

  return (
      <View style={styles.container}>
        <StatusBar style='light'/>  
        {
          !activeTextinput 
          ?
            <Showcase data={data} setActiveTextinput={setActiveTextinput} setLoading={setLoading}/>
          :
            <Search search={search} setSearch={setSearch} setActiveTextinput={setActiveTextinput}/>
        }
      </View>
  );
}

const styles =  StyleSheet.create({
  loading: { 
    backgroundColor: mainColor,
    flex: 1,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  registerEvent: {
    position: 'absolute',
    bottom: 75,
    left: 330
  },
});