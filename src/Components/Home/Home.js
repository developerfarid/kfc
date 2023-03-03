import React from 'react';
import Header from '../Share/Header';
import AboutHome from './AboutHome';
import Banner from './Banner';
import NewsHome from './NewsHome';
import Footer from '../Share/Footer';
import LatestMatche from './LatestMatche';
import AcademyPage from '../../Pages/AcademyPage';
import AppStore from './AppStore';

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            {/* <NewsHome /> */}
            <LatestMatche />
            <AboutHome />
           <AppStore />
            <Footer />
        </div>
    );
};

export default Home;