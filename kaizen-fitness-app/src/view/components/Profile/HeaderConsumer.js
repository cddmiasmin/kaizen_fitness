import { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import { UserContext } from '../../../contexts/UserContext';
import { ColorContext } from '../../../contexts/ColorContext';

export default function HeaderConsumer() {

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    user.avatar && user.avatar.photo
                    ?                        
                        <Avatar.Image
                            size={80} 
                            source= {{ uri: (user.avatar.photo) }} 
                        />
                    : 
                        <Avatar.Icon 
                            size={80} 
                            icon="account-circle" 
                            color={'white'}
                            style={{ backgroundColor: color }}
                        />
                }
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                    {user.name + ' ' + user.familyName}
                </Text>
            </View>
            <View style={styles.frames}>
                <View style={styles.frame}>
                    <Image 
                        style={{ width: 50, height: 50}}
                        source={require('../../../assets/Profile/body.png')}
                    />
                    <View style={styles.frameText}>
                        <Text style={{ color: color, fontWeight: 'bold', fontSize: 14}}>IMC</Text>
                        <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 14}}>Normal</Text>
                        <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 14}}>23,1</Text>
                    </View>
                </View>

                <View style={styles.frame}>
                    <View style={styles.frameText}>
                        <Text style={{ color: color, fontWeight: 'bold', fontSize: 14}}>ÁGUA</Text>
                        <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 14}}>2,2 Litros</Text>
                        <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 14}}>por dia</Text>
                    </View>
                    <Image 
                        style={{ width: 50, height: 50}}
                        source={require('../../../assets/Profile/water.png')}
                        resizeMode={'stretch'}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 50
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    frames: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25,
        gap: 10,
    },
    frame: {
        width: '50%',
        height: 80,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        gap: 10
    },
    frameImg:{
        width: 50,
        height: 50
    },
    frameText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});