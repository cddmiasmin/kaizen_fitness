import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { error, success } from '../../colors/colors';

export default function SnackBar({ visible, setVisible, message, error, width }) {
    return (
        <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={4000}
            action={{
                label: 'Ok',
                textColor: error === true ? 'black' : 'white',
                onPress: () => {
                    setVisible(false);
                },
            }}
            style={[
                    styles.snackbar,
                    { width: width }, 
                    error === true ?  styles.snackbarError : styles.snackbarSucess
                ]}
        >
            <Text style={{ color: error === true ? 'black' : 'white', fontWeight: 'bold'}}>
                {message}
            </Text>
        </Snackbar>
    );
}

const styles = StyleSheet.create({
    snackbar: {
        alignSelf: 'center',
    },
    snackbarSucess: {
        backgroundColor: success,
    },
    snackbarError: {
        backgroundColor: error,
    }
});