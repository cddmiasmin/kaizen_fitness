import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';

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

  const getData = async () => {
    console.log(user.topics)
    const response = await eventControllerGetShowcase(user.topics);
    setData(response);
  }

  const getShowcaseData = () => {
    getData();
  }

  useEffect(() => {
    console.log('ju')
    if(user.topics) getShowcaseData();
  }, [], [user]);

  useEffect(() => {
    if(data !== null) {
      console.log('data', data.forYou);
      setLoading(false);
    }
  }, [data]);

  if(loading)
    return (
      <View style={styles.loading}> 
          <StatusBar style='light'/>
          <ActivityIndicator animating={true} color={color} />
          <View style={styles.registerEvent}> 
                            <IconButton
                                icon="calendar-plus"
                                iconColor={'white'}
                                mode='contained'
                                containerColor={color}
                                size={24}
                                onPress={() => getShowcaseData()}
                            />
                        </View>
          <Footer />
      </View>
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
                                <View style={styles.registerEvent}> 
                            <IconButton
                                icon="calendar-plus"
                                iconColor={'white'}
                                mode='contained'
                                containerColor={color}
                                size={24}
                                onPress={() => getShowcaseData()}
                            />
                        </View>
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
  registerEvent: {
    position: 'absolute',
    bottom: 75,
    left: 330
},
});