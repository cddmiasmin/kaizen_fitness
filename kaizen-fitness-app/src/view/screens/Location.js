import { useContext, useEffect, useRef, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import { IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import _ from 'lodash';

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

import { grayText, mainColor } from '../../colors/colors';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import SnackBar from '../components/SnackBar';

//import { consumerControllerUpdateProfile } from '../../controller/ConsumerController';
//import { professionalControllerUpdateProfile } from '../../controller/ProfessionalController';

export default function Location() {

    const navigation = useNavigation();

    Geocoder.init("AIzaSyB1hvzyAxGbCER_SU1t7HHCWSosCiDi7mI");

    const mapCustomStyle = [ 
        { 
          "elementType": "geometry", 
          "stylers": [ { "color": "#242f3e" } ] 
        }, 
        { 
          "elementType": "labels.text.fill", 
          "stylers": [ { "color": "#746855" } ] 
        }, 
        { 
          "elementType": "labels.text.stroke", 
          "stylers": [ { "color": "#242f3e" } ] 
        }, 
        { 
          "featureType": "administrative.locality", 
          "elementType": "labels.text.fill", 
          "stylers": [ { "color": "#d59563" } ] 
        }, 
        { 
          "featureType": "poi", 
          "elementType": "labels.text.fill", 
          "stylers": [ { "color": "#d59563" } ] 
        }, 
        { 
          "featureType": "poi.park", 
          "elementType": "geometry", 
          "stylers": [ { "color": "#263c3f" } ] 
        }, 
        { 
          "featureType": "poi.park", 
          "elementType": "labels.text.fill", 
          "stylers": [ { "color": "#6b9a76" } ] 
        }, 
        { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#38414e" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#212a37" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#9ca5b3" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#746855" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#1f2835" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#f3d19c" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#2f3948" } ] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#17263c" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#515c6d" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#17263c" } ] } ]
    

    const googleRef = useRef();

    const [location, setLocation] = useState({});
    const [addressText, setAddressText] = useState('');
    const [place, setPlace] = useState([]);
    const [mapRegion, setMapRegion] = useState({
        latitude: -23.609728827116818,
        longitude: -46.60792569675929,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const { color } = useContext(ColorContext);
    const { 
        user, userType, setUserCalendar, 
        getCalendarUser, setUser, getProfile 
    } = useContext(UserContext);

    const onChange = (text) => {
        setAddressText(text);
    }

    const saveChangesNewLocation = async () => {
        const data = { location: location }
        console.log(data);

        let response = {};

        if(userType === 'consumer') response = await consumerControllerUpdateProfile(data);
        else response = await professionalControllerUpdateProfile(data);

        console.log(response, response.length);

        if(Object.keys(response).length !== 0) {
            setErrorSnackBar(!response.result);
            setMessageSnackbar(response.message);
            setVisibleSnackbar(true);

            if(response.result){
                setUser([]);
                getProfile();
            }

            if(response.result && userType === 'consumer'){
                setUserCalendar(undefined);
                getCalendarUser();
            }
        }
    }

    useEffect(() => {
        // if(user.length !== 0) setLocation(user.location);
            setLocation({
                address: 'Avenida Bolos, 32 - Iasmin, São Paulo - SP, Brasil',
                latitude: -23.607398943651173,
                longitude: -46.4564346851783
            });

            setMapRegion({
                latitude: -23.607398943651173,
                longitude: -46.4564346851783,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            googleRef.current.setAddressText('Avenida Bolos, 32 - Iasmin, São Paulo - SP, Brasil');
    }, []);

    useEffect(() => {
        if(place.length !== 0) {
          Geocoder
              .from(place.address)
              .then(json => {
                var location = json.results[0].geometry.location;
    
                setMapRegion({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
    
                setLocation({
                  mainText: place.mainText,
                  address: place.address,
                  state: place.state,
                  city: place.city,
                  neighborhood: place.neighborhood,
                  latitude: location.lat,
                  longitude: location.lng,
                });
              })
              .catch(error => console.warn(error));
        }
    }, [place])

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <AntDesign name="left" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.screen}>Meu endereço</Text>
                </View>
                <View style={styles.headerRight}>
                    <IconButton
                        icon="check-bold"
                        iconColor={color}
                        style={styles.button}
                        containerColor={mainColor}
                        size={18}
                        //disabled={_.isEqual(user.location, location)}
                        onPress={() => saveChangesNewLocation()}
                    />
                </View>
            </View>
            <View style={styles.containerMap}>
                <MapView region={mapRegion} style={styles.map} customMapStyle= {mapCustomStyle} >
                    {
                        location.length !== 0 &&
                            <Marker coordinate={mapRegion} title='Marker' />
                    }
                </MapView>

                <View style={[styles.search, StyleSheet.absoluteFillObject]}>
                    <GooglePlacesAutocomplete
                        ref={googleRef} 
                        placeholder='Informe seu novo endereço' 
                        onPress = { (data, details = null) => {

                            if(details.terms.length < 4) {
                                setMessageSnackbar('Insira um endereço válido');
                                setErrorSnackBar(true);
                                setVisibleSnackbar(true);
                            } else {
                                setPlace({
                                mainText: details.structured_formatting.main_text,
                                address: details.description,
                                state: details.terms[4].value,
                                city: details.terms[3].value,
                                neighborhood: details.terms[2].value,
                                }); 
                            }
                        }} 
                        query = {{ 
                            key: 'AIzaSyB1hvzyAxGbCER_SU1t7HHCWSosCiDi7mI',
                            language: 'pt-BR', 
                        }} 
                        placeholderColor='black'
                        styles={{
                            container: {
                                width: 300,
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                            },
                            textInputContainer: {
                                color: 'black',
                            },
                            textInput: {
                                height: 38,
                                fontSize: 16,
                                backgroundColor: 'white',
                                color: 'black',
                                paddingRight: 40
                            },
                            predefinedPlacesDescription: {
                                color: grayText,
                            },
                        }}
                        textInputProps={{
                            onChangeText: onChange
                        }}
                        value={addressText}
                    />
                    {
                        addressText.length !== 0 &&
                            <IconButton
                                icon="close-circle"
                                iconColor={mainColor}
                                size={20}
                                style={[styles.googleClear, StyleSheet.absoluteFillObject]}
                                onPress={() => {
                                    setAddressText('');
                                    setLocation([]);
                                    googleRef.current.clear();
                                }}
                            /> 
                    }
                </View>
                <SnackBar 
                    visible={visibleSnackbar} 
                    setVisible={setVisibleSnackbar} 
                    message={messageSnackBar} 
                    error={errorSnackBar}
                    width={315} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // loading: {
    //     flex: 1,
    //     backgroundColor: mainColor,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: '8%',
        paddingRight: '8%',
        alignItems: 'center',
    },
    header: {
        marginTop: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        flexDirection: 'row',
        width: '100%',
    },
    headerLeft:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerRight:{
        alignItems: 'flex-end',
        alignItems: 'center',
    },
    screen: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 45
    },
    containerMap: {
        width: '100%',
        height: '80%',
        marginBottom: 15,
    },  
    map: {
        width: '100%',
        height: '100%',
    },
    googleClear: {
        marginTop: 12,
        marginLeft: 270
    }
});