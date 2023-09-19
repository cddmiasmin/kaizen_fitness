import { createContext, useState, useEffect } from "react";
import { consumerUserColor, professionalUserColor } from './../colors/colors';

export const ColorContext = createContext();

export const ColorContextProvider = ({ children }) => {

    const [color, setColor] = useState(consumerUserColor);

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
