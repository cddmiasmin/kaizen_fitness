import { createContext, useState, useEffect, useContext } from "react";
import { consumerUserColor, professionalUserColor } from './../colors/colors';
import { UserContext } from "./UserContext";

export const ColorContext = createContext();

export const ColorContextProvider = ({ children }) => {

    const { userType } = useContext(UserContext);
    const [color, setColor] = useState(consumerUserColor);

    useEffect(() => {

        if(userType === 'noProfile') {
            
            const drawnNumber = Math.floor(Math.random() * 2);
            
            if(drawnNumber === 0) setColor(consumerUserColor);
            else setColor(professionalUserColor);

        } else {

            if(userType === 'consumer') setColor(consumerUserColor);
            else setColor(professionalUserColor);

        }

    }, [userType]);

    return (
        <ColorContext.Provider
            value={{
                color,
                setColor
            }}
        >
            {children}
        </ColorContext.Provider>
    );

};
