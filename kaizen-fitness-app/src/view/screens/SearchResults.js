import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import Search from '../components/Search';
import Results from '../components/SearchResults/Results';
import { useRoute } from '@react-navigation/native';
import { eventControllerSearch, eventControllerSearchByCategory } from '../../controller/EventController';

export default function SearchResults() {

    const route = useRoute();
    const mode = route.params.mode;
    const initialSearch = route.params.initialSearch;

    const [search, setSearch] = useState(initialSearch);
    const [resultsData, setResultsData] = useState(undefined);
    const [activeTextinput, setActiveTextinput] = useState(false);

    const searchEvents = async () => {
        const data = await eventControllerSearch(search);
        setResultsData(data);
    }

    const searchEventsByCategtory = async () => {
        const data = await eventControllerSearchByCategory(search);
        setResultsData(data);
    }

    const whatTypeOfSearch = () => {
        if(mode === 'Search') searchEvents();
        else searchEventsByCategtory();
    }

    useEffect(() => {
        setSearch(initialSearch);
        console.log(route)
    }, [route]);

    useEffect(() => {
        whatTypeOfSearch();
    }, [search]);

    return (
        <View style={styles.container}>
            <StatusBar style={'light'}/>
            {
                !activeTextinput 
                ?
                    <Results 
                        search={search} 
                        setSearch={setSearch}
                        data={resultsData} 
                        setActiveTextinput={setActiveTextinput}
                    />
                :
                    <Search 
                        search={search} 
                        setSearch={setSearch} 
                        setActiveTextinput={setActiveTextinput}
                    />
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