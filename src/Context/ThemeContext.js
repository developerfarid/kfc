import React, { createContext } from 'react';
import Theme from '../Hooks/Theme';
export const MyContext= createContext()

const ThemeContext = ({children}) => {
    const data = Theme()
    return (
        <MyContext.Provider value={data}>
            {children}
        </MyContext.Provider>
    );
};

export default ThemeContext;