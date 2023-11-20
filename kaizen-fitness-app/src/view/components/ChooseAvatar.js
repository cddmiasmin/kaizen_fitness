import { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';

import { ColorContext } from '../../contexts/ColorContext';
import { DataContext } from '../../contexts/DataContext';

export default function ChooseAvatar({ chooseStatusModal, size }) {

    const { color } = useContext(ColorContext);
    const { avatar } = useContext(DataContext);

    const icon = avatar.length === 0 ? 'image-plus' : 'image-edit';

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.avatar}
                onPress={() => chooseStatusModal(true)}
            >                    
                {
                    avatar.length === 0 
                    ? 
                        <Avatar.Icon 
                            size={size} 
                            icon="account-circle" 
                            color={color}
                            style={{ backgroundColor: 'white' }}
                        />
                    :
                        <Avatar.Image
                            size={size} 
                            source={{ uri: avatar.photo }}
                        />
                }
                <IconButton
                    icon={icon}
                    iconColor={'white'}
                    style={[{ backgroundColor: color }, styles.icon]}
                    size={15}
                    onPress={() => chooseStatusModal(true)}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },  
    icon: {
        position: 'absolute', 
        top: '60%', 
        left: '15%', 
    }
});