import { createContext, useState } from "react";
import { colorConsumidor } from "../colors/colors";

export const ColorContext = createContext();

export const ColorContextProvider = ({ children }) => {

    const [color, setColor] = useState(colorConsumidor);

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


