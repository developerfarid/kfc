import React, { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiTimeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import imgicon from "../../image/Screenshot_20220508_123158 1.png"
import { useTranslation } from 'react-i18next';

const Banner = () => {
    const language = localStorage?.getItem("i18nextLng");
    console.log(language, "language");
    const [dataArray, setDataArray] = useState([]);
    console.log(dataArray);
    const [isDataPresent, setIsDataPresent] = useState(false);
    const [dataArrayWorldcup, setDataArrayyWorldcup] = useState([]);
    console.log(dataArrayWorldcup);
    const [isDataPresentWorldcup, setIsDataPresentWorldcup] = useState(false);
    const { t } = useTranslation()
    useEffect(() => {
        if (language) {
            async function fetchData() {
                getData('', 4, 'general');
                getData('', 4, 'worldcup');
            }
            fetchData();
        }
    }, [language]);

    function getData(_searchfor, _limit, _category) {
        try {
            var formData = new FormData();
            formData.append('tablename', 'news');
            formData.append('token', 'token');
            formData.append('searchfor', _searchfor);
            formData.append('limit', _limit);
            formData.append('getFullNews', 'NO');
            formData.append('language', language);
            formData.append('category', _category);
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {                    
                    var responseObj = JSON.parse(data);
                    // console.log(responseObj, "responseObj");
                    if (responseObj['status'] === 'SUCCESS') {
                        //alert(responseObj['message']);
                        if (responseObj['message'] === 'DATA_FOUND') {
                            //console.log(responseObj['data']);
                            const fetchedData = responseObj['data'];
                            if( _category === 'general'){
                                setDataArray(fetchedData);
                                setIsDataPresent(true);
                            }else if( _category === 'worldcup'){
                                setDataArrayyWorldcup(fetchedData);
                                setIsDataPresentWorldcup(true);
                            }
                            
                        } else {
                            alert(responseObj['message']);
                            setIsDataPresent(false);
                        }
                    } else {
                        alert(responseObj['status']);                        
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'newsListHome.php',
                cache: false
            });
        } catch (err) {
            alert('newsListHome->getData()' + err);
        }
    }

    return (
        <section>
            <div className='container '>
                <div className='grid grid-cols-1 lg:grid-cols-7 h-auto lg:h-[633px] lg:gap-x-3'>
                    <div className='col-span-4'>
                        <div className='relative z-10 after:absolute after:-z-[0] after:left-0 after:top-0 after:bg-gradient-to-b from-[#00000000] to-[#203650] after:w-full after:h-full '>
                            {isDataPresent && typeof dataArray[0] !== 'undefined' ? <img className='w-full sm:h-auto h-[266px] lg:h-[633px] rounded-lg lg:rounded-none object-cover' src={`${window.IMG_HOST_URL}${dataArray[0]['img_path']}`} alt="" /> : ''}

                            <div className='absolute z-30 ltr:left-0 rtl:right-0 bottom-3 md:bottom-12 px-4 lg:px-14 space-y-6'>
                                {isDataPresent && typeof dataArray[0] !== 'undefined' ? <p className='text-lg sm:text-2xl md:text-[32px] text-white leading-tight md:leading-9 font-Inter'>{dataArray[0]['heading']}</p> : ''}
                                <Link to={isDataPresent && typeof dataArray[0] !== 'undefined' ? `/NewsDetails/${dataArray[0]['id']}` : ''}>
                                    <button className=' font-semibold bg-bg-yellow text-sm sm:text-base   px-5 mt-2 md:mt-4 font-Inter py-2 border border-bg-yellow'>{t("news.Readthenews") }</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 '>
                    {isDataPresent && typeof dataArray[1] !== 'undefined' ? (
                            <>
                                <div className='grid grid-cols-8 mt-2 lg:mt-0 bg-white h-1/3'>
                                    <div className='col-span-3'>
                                        <img className='h-[155px] lg:h-[211px]  rounded-lg lg:rounded-none  w-full object-cover' src={`${window.IMG_HOST_URL}${dataArray[1]['img_path']}`} alt="" />
                                    </div>
                                    <div className='banner-item'>
                                        <h5 className=' font-Inter text-3line'>{dataArray[1]['heading']}</h5>
                                        <Link to={`/NewsDetails/${dataArray[1]['id']}`}>
                                            <button className='text-bg-yellow  px-5 lg:mt-4 font-Inter py-2 border border-bg-yellow rounded-md'>{t("news.Readthenews") }</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : ''}
                        {isDataPresent && typeof dataArray[2] !== 'undefined' ? (
                            <>
                                <div className='grid grid-cols-8 my-1 lg:my-0  bg-white h-1/3'>
                                    <div className='col-span-3'>
                                        <img className='h-[155px] lg:h-[211px] w-full  rounded-lg lg:rounded-none object-cover' src={`${window.IMG_HOST_URL}${dataArray[2]['img_path']}`} alt="" />
                                    </div>
                                    <div className='banner-item'>
                                        <h5 className=' font-Inter text-3line'>{dataArray[2]['heading']}</h5>
                                        <Link to={`/NewsDetails/${dataArray[2]['id']}`}>
                                            <button className='text-bg-yellow  px-5 lg:mt-4 font-Inter py-2 border border-bg-yellow rounded-md'>{t("news.Readthenews") }</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : ''}
                        {isDataPresent && typeof dataArray[3] !== 'undefined' ? (
                            <>
                                <div className='grid grid-cols-8 bg-white h-1/3'>
                                    <div className='col-span-3'>
                                        <img className='h-[155px] lg:h-[211px] w-full  rounded-lg lg:rounded-none object-cover' src={`${window.IMG_HOST_URL}${dataArray[3]['img_path']}`} alt="" />
                                    </div>
                                    <div className='banner-item'>
                                        <h5 className=' font-Inter text-3line'>{dataArray[3]['heading']}</h5>
                                        <Link to={`/NewsDetails/${dataArray[3]['id']}`}>
                                            <button className='text-bg-yellow  px-5  lg:mt-4 font-Inter py-2 border border-bg-yellow rounded-md'>{t("news.Readthenews") }</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : ''}
                    </div>
                </div>
                <div className='bg-bg-yellow text-center  mt-5 lg:mt-0 py-[13px] '><h3 className='text-sm md:text-2xl font-Inter font-semibold text-[#20252C]'>{t('kooraBanner.KooraStarinnumbers') }</h3></div>
                <div className='grid text-white text-center grid-cols-2  md:grid-cols-4 py-8 bg-black'>
                    <div className=' '>
                        <span className='text-[42px] md:text-[52px] font-semibold '>10646</span>
                        <p className='text-xl'>{t("kooraBanner.Clubfoundingdate")} </p>
                    </div>
                    <div className='md:border-l '>
                        <span className='text-[52px] font-semibold '>46</span>
                        <p className='text-xl'>{t("kooraBanner.player")}</p>
                    </div>
                    <div className='md:border-l '>
                        <span className='text-[42px] md:text-[52px] font-semibold '>646</span>
                        <p className='text-xl'>{t("kooraBanner.Playgrounds")}</p>
                    </div>
                    <div className='md:border-l '>
                        <span className='text-[42px] md:text-[52px] font-semibold '>16</span>
                        <p className='text-xl'>{t("kooraBanner.ateam")}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center py-8 text-[#20252C] font-Inter'> <div className='flex items-center'><img className='h-[30px] sm:h-10 md:h-auto' src={imgicon} alt="" />
                    <h2 className='text-[22px] sm:text-3xl md:text-[52px] font-semibold  '> {t("MenuTop.News")}</h2>
                </div> <Link className='flex items-center rtl:flex-row-reverse text-sm sm:text-base  md:text-xl'  to="/News" state={{ category: 'worldcup' }}> <span>{ t("common.SeeAll")}</span> <FaAngleRight /></Link></div>
                <div className='grid  md:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12'>
                    {
                        isDataPresentWorldcup && (dataArrayWorldcup.map((item, index) => (
                            index > -1 &&  (
                                <div className='' key={item.id}>
                                    <img  className='w-full' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="news" />
                                    <Link to={`/NewsDetails/${item.id}`}> <h2 className='text-xl text-[#20252C] font-semibold font-Inter my-4'>{item.heading.substring(0, 30)}...</h2></Link>
                                    <div className='flex justify-between items-center text-[#515151] font-Inter '>
                                        <span><FaRegCalendarAlt className='inline-block' /> {item.date}</span>
                                        <span><RiTimeLine className='inline-block' /> {item.time}</span>
                                    </div>
                                    <Link to={`/NewsDetails/${item.id}`}>
                                        <button className='text-bg-yellow  px-5 mt-4 font-Inter py-2 border border-bg-yellow'>{t("news.Readthenews") }</button>
                                    </Link>
                                </div>
                            )
                        )))
                    }
                </div>
            </div>

        </section>
    );
};

export default Banner;