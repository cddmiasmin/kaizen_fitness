import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Modal, TextInput } from 'react-native-paper';

import { mainColor } from '../../../colors/colors';

import { ColorContext } from '../../../contexts/ColorContext';
import { Image } from 'react-native';

export default function ModalEventWallpaper({ active, changeMyStatus, chooseWallpaper }) {
    
    const { color } = useContext(ColorContext);
    
    const [search, setSearch] = useState('dog');
    const [photos, setPhotos] = useState({});

    const searchImages = async () => {


    }
    
    useEffect(() => {
        fetch(`https://api.unsplash.com/photos?per_page=14`, {
            headers: {
                Authorization: "Client-ID 5ccP1Jh52xo-HewiKJVRqUB2TFKMTj_Xj9YK3rhYZW4"
            },
        })
        .then((response) => response.json())
        .then((data) => setPhotos(data))
        .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        if(Object.keys(photos).length === 0) {
            setPhotos(async () => {
                const response = await fetch(`https://api.unsplash.com/photos?page=1?pper_page=10?query=${search}`, {
                    headers: {
                        Authorization: "Client-ID 5ccP1Jh52xo-HewiKJVRqUB2TFKMTj_Xj9YK3rhYZW4"
                    },
                });
                const data = await response.json();
                return response.json();
        
            })
        }
        console.log('AAAAAAAAAAAAAAAA', Object.keys(photos).length, Object.keys(photos).length !== 0, photos);
    }, [photos])

    return (
        <Modal
            visible={active}
            onDismiss={() => changeMyStatus(false)}
            contentContainerStyle={styles.container}
        >
            <Text 
                style={[styles.message, { color: color }]}
            >
                Busque por uma imagem que respresente seu evento. Para pesquisar clique na lupa:
            </Text>
            <TextInput
                mode='outlined'
                value={search}
                onChangeText={(text) => setSearch(text)}
                outlineColor={'white'}
                activeOutlineColor={color}
                textColor={'white'}
                style={styles.inputSearch}
                theme={{
                    colors: {
                        onSurfaceVariant: 'white'
                    }
                }}
                right={
                    <TextInput.Icon 
                        icon="magnify" 
                        color={color} 
                        onPress={() => setPhotos({})}/>
                }
            />
            <ScrollView>
                <View style={styles.images}>
                    {/* {
                        Object.keys(photos).length !== 0
                        ?
                            photos.map((photo, key) => (
                                <Image
                                    key={`image#${key}`} 
                                    style={{ width: 140, height: 100 }} 
                                    source={{ uri: photo.urls.full }}
                                />
                            ))
                        : 
                            <Text>iasmin</Text>
                    } */}
                </View>
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColor,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 700
    },
    message: {
        width:'100%',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    inputSearch: {
        backgroundColor: mainColor,
        width: '100%',
        marginTop: 10
    },
    images: {
        width: '100%',
        marginTop: 25,
        marginBottom: 25,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 8
    }
});