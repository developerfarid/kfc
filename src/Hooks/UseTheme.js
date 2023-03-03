import { useContext } from 'react';
import { MyContext } from '../Context/ThemeContext';

const UseTheme = () => {
    return (
        useContext(MyContext)
    );
};

export default UseTheme;