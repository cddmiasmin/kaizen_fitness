import { createContext, useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROID_CLIENT_ID } from '@env';


WebBrowser.maybeCompleteAuthSession();

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [usuarioInfo, setUsuarioInfo] = useState({
        "idUsuario": "",
        "idConsumidor": "",
        "foto": "https://i.pinimg.com/564x/f6/4b/52/f64b529d5c5c5c33a149ce3e22f70709.jpg",
        "nome": "",
        "sobrenome": "",
        "dtNascimento": "",
        "email": "",
        "senha": "",
        "estado": "",
        "cidade": "",
        "cpf": "",
        "peso": "",
        "altura": ""
    });
    
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

    console.log(usuarioInfo)
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


  
  