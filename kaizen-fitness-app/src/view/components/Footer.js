import { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';

import { grayText } from '../../colors/colors';

export default function Footer() {

    const route = useRoute();
    const navigation = useNavigation();

    const { userType } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const consumer = [
        { key: 'home', route: 'HomeConsumer', title: 'Home', focusedIcon: 'home-variant', unfocusedIcon: 'home-variant-outline' },
        { key: 'people', route: 'People', title: 'Pessoas', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
        { key: 'place', route: 'Place', title: 'Locais', focusedIcon: 'store', unfocusedIcon: 'store-outline', color: 'green' },
        { key: 'calendar', route: 'Calendar', title: 'Agenda', focusedIcon: 'calendar-month', unfocusedIcon: 'calendar-month-outline' },
        { key: 'profile', route: 'Profile', title: 'Perfil', focusedIcon: 'account', unfocusedIcon: 'account-outline'}
    ]

    const professional = [
        { key: 'home', route: 'HomeProfessional', title: 'Home', focusedIcon: 'home-variant', unfocusedIcon: 'home-variant-outline' },
        { key: 'calendar', route: 'Calendar', title: 'Agenda', focusedIcon: 'calendar-month', unfocusedIcon: 'calendar-month-outline' },
        { key: 'profile', route: 'Profile', title: 'Perfil', focusedIcon: 'account', unfocusedIcon: 'account-outline' }
    ]

    const noProfile = [
        { key: 'profile', route: 'CreateProfile', title: 'Perfil', focusedIcon: 'account', unfocusedIcon: 'account-outline' }
    ]

    const setBottomTaps = () => {
        if(userType === 'professional') return professional;
        else if (userType === 'consumer') return consumer;
        else return noProfile;
    }

    const bottomTaps = setBottomTaps();

    return (
    <View style={styles.footer}>
        {
            bottomTaps.map((tap) => (
                <TouchableOpacity
                    key={`button#${tap.key}`}
                    style={[styles.bottomTaps]}
                    onPress={() => {
                        if(tap.route === 'Calendar') navigation.navigate(tap.route, { screen: 'Calendar'});
                        else navigation.navigate(tap.route);
                    }}
                >
                    <Icon 
                        name={route.name === tap.route ? tap.focusedIcon : tap.unfocusedIcon} 
                        size={22} 
                        color={route.name === tap.route ? color : 'white'} 
                    />
                    <Text
                        style={{ color: route.name === tap.route ? color : grayText,
                                     fontSize: 10}}
                    >
                        {tap.title}
                    </Text>
                </TouchableOpacity>
            ))
        }
    </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2c2c2c',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    bottomTaps: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '20%'
    },
});