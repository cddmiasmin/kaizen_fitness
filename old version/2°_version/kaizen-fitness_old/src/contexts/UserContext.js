import { createContext, useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    GoogleSignin.configure({
        webClientId: '170670990246-fbo5pnlha5oc1ovrgrsgf9ng183q208p.apps.googleusercontent.com',
    });

    const [usuarioInfo, setUsuarioInfo] = useState(null);
    
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const userSingIn =  auth().signInWithCredential(googleCredential);
        userSingIn.then((user) => {
            console.log(user);
          })
          .catch((error) => {
            console.log(error)
          });
    }

    console.log(usuarioInfo)
    return (
        <UserContext.Provider
            value={{
                usuarioInfo,
                setUsuarioInfo,
                onGoogleButtonPress
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  