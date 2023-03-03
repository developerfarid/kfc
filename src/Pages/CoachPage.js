import React, { useState, useEffect } from "react";
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import img from "../image/Rectangle 34624243.png"
import img1 from "../image/Ellipse 1459.png"
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import { useTranslation } from "react-i18next";
const CoachPage = () => {
    const arr = Array.from(Array(10).keys())
    let navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);
    const [isDataPresent, setIsDataPresent] = useState(false);
    useEffect(() => {
        async function fetchData() {
            console.log('useEffect');
            getData();
        }
        fetchData();
        window.scrollTo(0, 0);
    }, []);
    function getData() {
        try {
            var formData = new FormData();
            formData.append('tablename', 'coaches');
            formData.append('token', 'token');
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {
                    //console.log(data);
                    var responseObj = JSON.parse(data);
                    console.log(responseObj);
                    if (responseObj[0] == 'SUCCESS') {
                        //alert(responseObj[1]);
                        if (responseObj[1] == 'DATA_FOUND') {
                            console.log(responseObj[2]);
                            const fetchedData = responseObj[2];
                            setDataArray(fetchedData);
                            setIsDataPresent(true);
                        } else {
                            alert(responseObj[1]);
                            setIsDataPresent(false);
                        }
                    } else {
                        alert(responseObj[0]);
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'requestList.php',
                cache: false
            });
        } catch (err) {
            alert('getData()' + err);
        }
    }
    const {  t } = useTranslation()
    return (
        <>
            <Header />
            <section className='pb-8'>
                <div className='container'>
                    <div className='flex justify-between items-center py-5'><h3 className='text-lg md:text-4xl font-semibold'>{t("common.Coach")}</h3>   <div className="relative w-32 md:w-auto text-gray-600 border rounded-lg   focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1  focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </span>
                        <input type="search" name="q" className="py-3 md:py-4 text-sm text-white  rounded-md ltr:pl-10 rtl:pr-10 focus:outline-none placeholder:text-sm md:placeholder:text-base focus:bg-white focus:text-gray-900" placeholder="Search" autoComplete="off" />
                    </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {isDataPresent &&
                        dataArray.map((item, i) => (
                                <div className='mb-5 border-2 rounded-lg' key={i}>
                                    <div className='relative -mb-24 before:absolute before:left-0 before:top-0 before:w-full before:h-full overflow-hidden rounded-t-lg '>
                                <img  className='w-full object-cover  blur-sm' src={img} alt="" /> 
                                        <span className='absolute flex justify-center items-center right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                   </span>
                                    </div>
                                    <div className='text-center'>                                    
                                    <Link to={`/CoachInfo/${item?.id}`} state={{ data: item }}> <img className="md:w-36   inline-block object-cover transform w-32 h-32  md:h-36 rounded-full l text-center mx-auto border-2 border-white" src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" /></Link>
                                    </div>
                                    <div className='py-5 px-5 flex justify-between items-end '>
                                    <div className='space-y-3'>
                                    <Link to={`/CoachInfo/${item?.id}`} state={{ data: item }}> <h3 className='text-2xl font-semibold'>{item.name}</h3></Link>
                                        <p className='flex items-center text-[#515151] text-[18px]'>
                                        {t('request.Football')} :  <span className=' font-semibold'> {t("common.Coach")} </span>
                                        </p>
                                    </div>
                                    <div className='text-center border border-[#BABBBE]  rounded-lg p-3'>
                                        <p className='text-[15px] text-bg-yellow'>{item.salary}</p>
                                        <p className='text-[13px] text-[#515151]'>{t('common.Permatch')}</p>
                                        
                                    </div>
                                </div>
                                </div>
                            ))
}
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default CoachPage;