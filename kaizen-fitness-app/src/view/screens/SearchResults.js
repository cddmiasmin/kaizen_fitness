import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import Search from '../components/Search';
import Results from '../components/SearchResults/Results';
import { useRoute } from '@react-navigation/native';

export default function SearchResults() {

    const route = useRoute();

    const [search, setSearch] = useState('');
    const [activeTextinput, setActiveTextinput] = useState(false);

    useEffect(() => setSearch(route.params.initialSearch), []);

    return (
        <View style={styles.container}>
            <StatusBar style={'light'}/>
            {
                !activeTextinput 
                ?
                    <Results search={search} setSearch={setSearch} setActiveTextinput={setActiveTextinput}/>
                :
                    <Search search={search} setSearch={setSearch} setActiveTextinput={setActiveTextinput}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor
    }
});