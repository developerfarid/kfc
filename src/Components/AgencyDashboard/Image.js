import React from 'react';
import GallerySingleItem from '../Profile/GallerySingleItem';
import CommonProfile from './CommonProfile';
import SingleImage from './SingleImage';

const Image = () => {

    const array = Array.from(Array(10).keys());
    return (
        <div className=' '>
            <CommonProfile />
            <div className=' lg:ltr:ml-[206px] lg:rtl:mr-[206px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-8 md:px-8 gap-6 xl:grid-cols-4'>
               {array.map(()=><SingleImage />)}
            </div>
             
        </div>
    );
};

export default Image;