import { useState, useContext, useRef, useEffect } from 'react';
import { TextInput, List, Dialog, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TouchableOpacity, View, BackHandler, FlatList } from 'react-native';

import { grayText, mainColor } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Search({ search, setSearch, setActiveTextinput }) {

    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.name);
    const refInput = useRef();

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [history, setHistory] = useState('iasmin');
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    useEffect(() => refInput.current.focus(), []);

    useEffect(() => {
        const handleBackPress = () => {
            setSearch('');

            if(route.name === 'Home') setActiveTextinput(false);
            else navigation.navigate('Home');

            return true;
        };
    
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const removeSearchHistory = () => {
        console.log('A paz do senhor Jesus');
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header]}>
                <TouchableOpacity 
                    style={styles.arrow}
                    onPress={() => {
                        setSearch('');
                        setActiveTextinput(false);
                        if(route.name !== 'Home') navigation.navigate('Home');
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
                            if(search.length){
                                const searchAux = search;

                                setSearch('');
                                setActiveTextinput(false); 
                                navigation.navigate('SearchResults', { initialSearch: searchAux });
                            }
                        }}
                    />
                </View>
            </View>
            <View style={[styles.line, { backgroundColor: color }]}/>
            <View style={styles.body}>
                <FlatList
                    data={user.searchHistory}
                    renderItem={({item: history}) =>  
                        <TouchableOpacity 
                            onLongPress={() => {
                                setHistory(history.search);
                                setIsDialogVisible(true);
                            }}
                        >
                            <List.Item
                                title={history.search}
                                titleStyle={{ color: grayText }}
                                left={props => <List.Icon {...props} icon="clock-time-three-outline" color={grayText}/>}
                                right={props => <List.Icon {...props} icon="arrow-top-right" color={grayText}/>}
                            />
                        </TouchableOpacity>          
                    }
                />
            </View>
            {
                isDialogVisible &&
                    <Dialog
                        style={{ backgroundColor: mainColor }}
                        visible={isDialogVisible} 
                        onDismiss={() => setIsDialogVisible(false)}
                    >
                        <Dialog.Title style={{color: 'white'}}>{history}</Dialog.Title>
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
                                    removeSearchHistory();
                                    setIsDialogVisible(false);
                                }}
                            >
                                Remover
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
            }
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