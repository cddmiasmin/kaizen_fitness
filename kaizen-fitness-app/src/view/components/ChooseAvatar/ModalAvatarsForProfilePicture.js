import { useContext, useState } from "react";
import { Avatar, Modal } from "react-native-paper";
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from "react-native";

import { mainColor } from "../../../colors/colors";
import { avatarsForProfilePicture } from "../../../services/avatarsForProfilePicture";

import { ColorContext } from "../../../contexts/ColorContext";

export default function ModalAvatarsForProfilePicture({ active, changeMyStatus, chooseAvatar, initialValue }) {

    const { color } = useContext(ColorContext);

    const [avatar, setAvatar] = useState(initialValue);

    return (
        <Modal 
            visible={active} 
            onDismiss={() => changeMyStatus(false)}
            contentContainerStyle={styles.container}
        >
            <Text 
                style={[styles.message, { color: color }]}
            >
                Escolha um avatar para ser sua foto de perfil
            </Text>
            <View style={styles.avatars}>
                {
                    avatarsForProfilePicture.map((avatarObj, key) => (
                        <TouchableOpacity
                            style={[styles.avatar,
                                avatarObj.value === avatar.value ? styles.selected : '',
                                avatarObj.value === avatar.value ? { backgroundColor: color } : '',
                            ]} 
                            onPress={() => {
                                setAvatar(avatarObj);
                            }}
                        >
                            <Avatar.Image
                                size={70} 
                                source={{ uri: avatarObj.photo }}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => {
                    chooseAvatar(avatar);
                    changeMyStatus(false);
                }}
            >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar</Text>
            </TouchableOpacity>
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
    },
    message: {
        width:'100%',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    avatars:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    avatar: {
        padding: 5,
        marginBottom: 10
    },    
    columnWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    selected: {
        borderRadius: 5
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        height: 40,
        borderRadius: 50
    }
});