import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import Showcase from '../components/Home/Showcase';
import Search from '../components/Search';

export default function Home() {

  const [search, setSearch] = useState('');
  const [activeTextinput, setActiveTextinput] = useState(false);

  return (
      <View style={styles.container}>
        <StatusBar style='light'/>  
        {
          !activeTextinput 
          ?
            <Showcase setActiveTextinput={setActiveTextinput}/>
          :
            <Search search={search} setSearch={setSearch} setActiveTextinput={setActiveTextinput}/>
        }
      </View>
  );
}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
    },
});