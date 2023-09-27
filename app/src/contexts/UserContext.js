import { createContext, useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const UserContext = createContext();

export const UserContextProvider = ({ userAux , children }) => {

    GoogleSignin.configure({
        webClientId: '118581849503-fu90sd5l1hd5as2vekqve80elqmdbuj0.apps.googleusercontent.com',
        androidClientId: '118581849503-qgbng2uqq6ns7a8mui1jagnq87dh9naq.apps.googleusercontent.com'
    });

    const [user, setUser] = useState(userAux);
    const [userType, setUserType] = useState('professional');

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
                userType,
                setUserType,
                onGoogleButtonPress
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  