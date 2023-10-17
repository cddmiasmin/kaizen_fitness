import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Modal, TextInput } from 'react-native-paper';

import { mainColor } from '../../../colors/colors';

import { ColorContext } from '../../../contexts/ColorContext';

import { getColors } from 'react-native-image-colors'

export default function ModalEventWallpaper({ active, changeMyStatus, chooseWallpaper, colorStatusBar }) {
    
    const { color } = useContext(ColorContext);
    
    const [search, setSearch] = useState('');
    const [photos, setPhotos] = useState({});

    const searchImages = async () => {

        const data = await fetch(`https://api.unsplash.com/search/photos/?query=${search}&orientation=landscape&client_id=5ccP1Jh52xo-HewiKJVRqUB2TFKMTj_Xj9YK3rhYZW4`)
                                .then((response) => response.json())
                                .then((data) => {
                                    return data;
                                })
                                .catch((error) => console.log(error))
        setPhotos(data.results);
    }
    
    useEffect(() => {
        fetch(`https://api.unsplash.com/photos?client_id=5ccP1Jh52xo-HewiKJVRqUB2TFKMTj_Xj9YK3rhYZW4`)
            .then((response) => response.json())
            .then((data) => setPhotos(data))
            .catch((error) => console.log(error))
    }, []);

    const isEventWallpaperIsDark = (Img) => {

        getColors(Img, {
          fallback: "#000000",
          cache: true,
          key: Img,
        })
        .then((result) => {

            function isColorDark(hexColor) {
                hexColor = hexColor.replace('#', '');
            
                const r = parseInt(hexColor.slice(0, 2), 16);
                const g = parseInt(hexColor.slice(2, 4), 16);
                const b = parseInt(hexColor.slice(4, 6), 16);
            
                const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            
                return luminance < 128 ? 'light' : 'dark';
            }

            colorStatusBar(isColorDark(result.average));
        })
        .catch((error) => console.log(error))
    }

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
                        onPress={() => searchImages()}/>
                }
            />
            <ScrollView>
                <View style={styles.images}>
                    {
                        Object.keys(photos).length !== 0
                        ?
                            photos.map((photo, key) => (
                                <TouchableOpacity 
                                    key={`image#${key}`} 
                                    onPress={() => {
                                        chooseWallpaper(photo.urls.full);
                                        isEventWallpaperIsDark(photo.urls.full);
                                        setSearch('');
                                        changeMyStatus(false);
                                    }}
                                >
                                    <Image
                                        key={`image#${key}`} 
                                        style={{ width: 140, height: 100 }} 
                                        source={{ uri: photo.urls.full }}
                                    />
                                </TouchableOpacity>
                            ))
                        : 
                            <Text>iasmin</Text>
                    }
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
        height: 410
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