import { useState, useContext, useRef, useEffect } from 'react';
import { TextInput, List, Dialog, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TouchableOpacity, View, BackHandler, FlatList } from 'react-native';
import { TextInput as NativeTextInput } from 'react-native';

import { grayText, mainColor } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { consumerControllerUpdateProfile } from '../../controller/ConsumerController';

export default function Search({ search, setSearch, setActiveTextinput }) {

    const route = useRoute();
    const navigation = useNavigation();

    const refInput = useRef();

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [history, setHistory] = useState('');
    const [userHistory, setUserHistory] = useState(user.searchHistory);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const exe = () => {
        updateUserHistory();
    }

    const updateUserHistory = async () => {
        const data = {
            searchHistory: userHistory
        }

        const response = await consumerControllerUpdateProfile(data);

        if(response.result) user.searchHistory = userHistory;
    }

    useEffect(() => refInput.current.focus(), []);

    useEffect(() => {
        const handleBackPress = () => {
            setSearch('');

            if(route.name === 'HomeConsumer') setActiveTextinput(false);
            else navigation.navigate('HomeConsumer');

            return true;
        };
    
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    useEffect(() => {
        exe();
    }, [userHistory]);

    return (
        <View style={styles.container}>
            <View style={[styles.header]}>
                <TouchableOpacity 
                    style={styles.arrow}
                    onPress={() => {
                        setSearch('');
                        setActiveTextinput(false);
                        if(route.name !== 'HomeConsumer') navigation.navigate('HomeConsumer');
                    }}
                >
                    <Icon 
                        name={'chevron-left'} 
                        size={24} 
                        color={'white'} 
                    />
                </TouchableOpacity>
                <View style={styles.search}>
                    <TextInput
                        mode='outlined'
                        ref={refInput}
                        label={''}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholder='Pesquise Eventos, Organizadores'
                        placeholderTextColor={grayText}
                        outlineColor={'white'}
                        activeOutlineColor={color}
                        textColor={'white'}
                        style={{ backgroundColor: mainColor, width: 345, height: 45}}
                        theme={{
                            colors: {
                                onSurfaceVariant: 'white'
                            }
                        }}
                        editable={true}
                        onFocus={() => setActiveTextinput(true)}
                        onBlur={() => {
                            if(search.length !== 0){
                                const searchAux = search;
                                const historyAux = userHistory;
                                historyAux.push({
                                    search: searchAux,
                                    created: new Date()
                                });

                                setUserHistory(historyAux);
                                setSearch('');
                                setActiveTextinput(false); 

                                navigation.navigate('SearchResults', { initialSearch: searchAux, mode: 'Search' });
                            }
                        }}
                        render={(props) => <NativeTextInput inputMode={'search'} returnKeyType="search" {...props} />}
                    />
                </View>
            </View>
            <View style={[styles.line, { backgroundColor: color }]}/>
            <View style={styles.body}>
                <FlatList
                    data={userHistory}
                    renderItem={({item: item }) =>  
                        <TouchableOpacity 
                            onLongPress={() => {
                                setHistory(item);
                                setIsDialogVisible(true);
                            }}
                            onPress={() => {
                                const searchAux = item.search;
                                setSearch('');
                                setActiveTextinput(false); 
                                navigation.navigate('SearchResults', { initialSearch: searchAux, mode: 'Search' })
                            }}
                        >
                            <List.Item
                                title={item.search}
                                titleStyle={{ color: grayText }}
                                left={props => <List.Icon {...props} icon="clock-time-three-outline" color={grayText}/>}
                                right={props => <List.Icon {...props} icon="arrow-top-left" color={grayText}/>}
                            />
                        </TouchableOpacity>          
                    }
                />
            </View>
            <Dialog
                style={{ backgroundColor: mainColor }}
                visible={isDialogVisible} 
                onDismiss={() => setIsDialogVisible(false)}
            >
                <Dialog.Title style={{color: 'white'}}>{history.search}</Dialog.Title>
                <Dialog.Content>
                    <Text style={{ color: 'white' }}>Remover do histórico de pesquisa?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        textColor={color} 
                        onPress={() => setIsDialogVisible(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        textColor={color} 
                        onPress={() => {
                            const userHistoryAux = userHistory.filter(object => object !== history);
                            setUserHistory(userHistoryAux);
                            setIsDialogVisible(false);
                        }}
                    >
                        Remover
                    </Button>
                </Dialog.Actions>
            </Dialog>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
    },
    header: {
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 2.5,
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        marginTop: 10,
        width: '100%',
        height: 5
    }
});