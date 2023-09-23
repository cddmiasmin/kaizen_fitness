import { createContext, useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const UserContext = createContext();

export const UserContextProvider = ({ userAux , children }) => {

    GoogleSignin.configure({
        webClientId: '118581849503-b583ce4t9urtep9mftom8q1905cklmh6.apps.googleusercontent.com',
    });

    const [user, setUser] = useState(userAux);

    const onGoogleButtonPress = async () => {
  
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
        const { idToken } = await GoogleSignin.signIn();
      
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        const userSingIn = auth().signInWithCredential(googleCredential);
    
        userSingIn.then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error)
        });
    }

    console.log('MENTIRA', user);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                onGoogleButtonPress
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  