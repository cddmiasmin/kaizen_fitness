import { createContext, useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROID_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [usuarioInfo, setUsuarioInfo] = useState([]);
/*
    const [requisicao, resposta, promptAsync] = Google.useAuthRequest({
        webClientId: '1047859142529-obr934fq6rsas91qc1pffn3pldlibjta.apps.googleusercontent.com',
        androidClientId: ANDROID_CLIENT_ID
    });

    const ConectarComOGoogle = async () => {
        const usuario = await AsyncStorage.getItem("@usuario");

        if(!usuario){

        }
        else setUsuarioInfo(JSON.parse(user));
    }
*/
    return (
        <UserContext.Provider
            value={{
                usuarioInfo,
                setUsuarioInfo,
                
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  