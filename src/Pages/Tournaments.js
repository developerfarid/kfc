import React from 'react';
import icon from '../image/278693113_415039269957608_8391190177219528907_n.png'
import icon1 from '../image/277993204_472069158022788_4784317908931732947_n.png'
import { RiTimeLine } from 'react-icons/ri';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import Header from '../Components/Share/Header';
import Footer from '../Components/Share/Footer';
import LatestMatche from '../Components/Home/LatestMatche';

const Tournaments = () => {
    const arr = Array.from(Array(10).keys())
    return (
        <section className=''>
            <Header />
            
           <LatestMatche />
       
         <Footer />
        </section>
    );
};

export default Tournaments;