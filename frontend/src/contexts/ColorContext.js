import { createContext, useContext, useState } from "react";
import { colorConsumidor } from "../colors/colors";

export const ColorContext = createContext();

export const ColorContextProvider = ({ children }) => {

    const [color, setColor] = useState(colorConsumidor);

    console.log('iasmin', color);
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

export const useColorContext = () => {
    return useContext(ColorContext);
};

  
  
  
  

