import { useContext } from 'react';
import { Dialog, Button, Text } from 'react-native-paper';
import { ColorContext } from '../../contexts/ColorContext';
import { mainColor } from '../../colors/colors';

export default function DialogAlert({ visible, setVisible, title, message, response }) {

    const { color } = useContext(ColorContext);

    return (
        <Dialog 
            visible={visible} 
            onDismiss={() => setVisible(false)}
            style={{ backgroundColor: mainColor }}
        >
            <Dialog.Icon icon="alert" color={color}/>
            <Dialog.Title style={{ color: color, fontWeight: 'bold', textAlign: 'center'}}>{title}</Dialog.Title>
            <Dialog.Content>
                <Text style={{textAlign: 'center', color: 'white'}}>{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setVisible(false)} textColor={color}>Não</Button>
                <Button onPress={() => {
                    setVisible(false);
                    response();
                }} textColor={color}>Sim</Button>
            </Dialog.Actions>
        </Dialog>
   );
}