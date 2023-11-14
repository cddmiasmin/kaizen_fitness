import React, { useContext } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { mainColor } from '../../colors/colors';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../../contexts/UserContext';
import EventCard from '../components/EventCard';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';

export default function CalendarAux() {

    const navigation = useNavigation();

    const { userCalendar } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <Button
                onPress={() => navigation.navigate('KindOfEvent')}
                title="Criar evento"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            {
                userCalendar === null 
                ?
                    <Text style={{ color: 'white'}}>SEM EVENTOS CADASTRADOS</Text>
                :                
                    (
                        userCalendar.length === 0 
                        ?
                            <ActivityIndicator animating={true} color={'white'} />
                        :
                            <FlatList
                                data={userCalendar}
                                // ItemSeparatorComponent={ItemSeparator}
                                renderItem={({ item: event }) => 
                                    <EventCard data={event} orientation={'vertical'}/>
                                }
                            />  
                    )
            }
            <Footer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColor,
        flex: 1,
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingTop: 50
    },
    contain: {

    }
});