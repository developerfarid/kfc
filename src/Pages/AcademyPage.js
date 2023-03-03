import React, { useState, useEffect } from "react";
import img from "../image/academynews.png"
import { Link } from 'react-router-dom';
import Header from '../Components/Share/Header';
import Footer from '../Components/Share/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import { useTranslation } from "react-i18next";

const AcademyPage = () => {
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
            formData.append('tablename', 'academy');
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
            alert('newsListDetail->getData()' + err);
        }
    }
    const {  t } = useTranslation()
    return (
        <section className='font-Inter'>
            <Header />
            <div className="container">
                <div className='flex justify-between items-center py-5'><h3 className='text-xl md:text-4xl font-semibold'>{t("common.Academy")} </h3>
                </div>
                <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {isDataPresent &&
                        dataArray.map((item, i) => (

                            <div key={i}>
                                <div className='relative'>
                                    <Link
                                        to={`/AcademyNews/${item.id}`}
                                        state={{ data: item }}> <img className="md:h-[360px] rounded-lg object-cover w-full" src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" /></Link>
                                    <span className='absolute flex justify-center items-center ltr:right-4 rtl:left-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>

                                    {/* <FiShare2 className='absolute right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9] inline-block text-xl' /> */}
                                </div>
                                <div className='py-3 flex justify-between items-start '>
                                    <div className='space-y-3'>
                                        <h3 className='text-2xl text-2line font-semibold'><Link
                                            to={`/AcademyNews/${item.id}`}
                                            state={{ data: item }}>
                                            {item.name}
                                        </Link>
                                        </h3>
                                        <p className='flex items-center text-[#515151] text-[18px]'><svg className='ltr:mr-2 rtl:ml-2' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8" cy="8" r="2" stroke="#515151" strokeWidth="1.5" />
                                            <path d="M15 8C15 11.63 11.2667 15.8246 9.25293 17.8233C8.55016 18.5208 7.44984 18.5208 6.74707 17.8233C4.73328 15.8246 1 11.63 1 8C1 3.02944 4.13401 1 8 1C11.866 1 15 3.02944 15 8Z" stroke="#515151" strokeWidth="1.5" />
                                        </svg>

                                            {item.maplocation}
                                        </p>
                                        <p className='flex items-center text-[#515151] text-[18px]'><svg className='ltr:mr-2 rtl:ml-2' width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 15C6.5 15.8284 5.82843 16.5 5 16.5C4.17157 16.5 3.5 15.8284 3.5 15C3.5 14.1716 4.17157 13.5 5 13.5C5.82843 13.5 6.5 14.1716 6.5 15Z" fill="#515151" />
                                            <path d="M14 4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4C12 3.44772 12.4477 3 13 3C13.5523 3 14 3.44772 14 4Z" fill="#515151" />
                                            <path d="M8.25 15C8.25 15.9255 7.81301 17.2902 7.11052 18.4365C6.76437 19.0014 6.37713 19.4738 5.98913 19.7966C5.59574 20.1238 5.26059 20.25 5 20.25V21.75C5.73941 21.75 6.40426 21.4024 6.94837 20.9498C7.49787 20.4927 7.98563 19.8793 8.38948 19.2203C9.18699 17.9189 9.75 16.2836 9.75 15H8.25ZM5 20.25C4.73941 20.25 4.40426 20.1238 4.01087 19.7966C3.62287 19.4738 3.23563 19.0014 2.88948 18.4365C2.18699 17.2902 1.75 15.9255 1.75 15H0.25C0.25 16.2836 0.813014 17.9189 1.61052 19.2203C2.01437 19.8793 2.50213 20.4927 3.05163 20.9498C3.59574 21.4024 4.26059 21.75 5 21.75V20.25ZM1.75 15C1.75 13.2051 3.20507 11.75 5 11.75V10.25C2.37665 10.25 0.25 12.3766 0.25 15H1.75ZM5 11.75C6.79493 11.75 8.25 13.2051 8.25 15H9.75C9.75 12.3766 7.62335 10.25 5 10.25V11.75Z" fill="#515151" />
                                            <path d="M15.25 4C15.25 4.37483 15.0836 4.88252 14.7633 5.47646C14.4519 6.05377 14.0371 6.63645 13.637 7.14066L14.8121 8.07302C15.2415 7.53179 15.7145 6.87256 16.0834 6.18857C16.4434 5.52122 16.75 4.74822 16.75 4H15.25ZM12.2726 7.18811C11.887 6.73791 11.4969 6.21666 11.2065 5.68135C10.9118 5.13828 10.75 4.63596 10.75 4.20914H9.25C9.25 4.98677 9.53406 5.74428 9.88807 6.39672C10.2463 7.05692 10.7077 7.66685 11.1333 8.1638L12.2726 7.18811ZM10.75 4.20914C10.75 3.26038 11.0342 2.66982 11.4006 2.31472C11.773 1.95382 12.3192 1.75 13 1.75V0.25C12.0239 0.25 11.0701 0.54618 10.3567 1.23757C9.63735 1.93475 9.25 2.94876 9.25 4.20914H10.75ZM13 1.75C13.6818 1.75 14.2366 1.95484 14.6132 2.30168C14.9797 2.63921 15.25 3.17738 15.25 4H16.75C16.75 2.82262 16.3487 1.86079 15.6294 1.19832C14.9202 0.54516 13.9751 0.25 13 0.25V1.75ZM13.637 7.14066C13.2681 7.60569 12.6346 7.61084 12.2726 7.18811L11.1333 8.1638C12.1328 9.33094 13.88 9.24771 14.8121 8.07302L13.637 7.14066Z" fill="#515151" />
                                            <path d="M13.75 11C13.75 10.5858 13.4142 10.25 13 10.25C12.5858 10.25 12.25 10.5858 12.25 11H13.75ZM10 20.25C9.58579 20.25 9.25 20.5858 9.25 21C9.25 21.4142 9.58579 21.75 10 21.75V20.25ZM12.25 11V12H13.75V11H12.25ZM16 15.75H17V14.25H16V15.75ZM17 20.25H10V21.75H17V20.25ZM19.25 18C19.25 19.2426 18.2426 20.25 17 20.25V21.75C19.0711 21.75 20.75 20.0711 20.75 18H19.25ZM17 15.75C18.2426 15.75 19.25 16.7574 19.25 18H20.75C20.75 15.9289 19.0711 14.25 17 14.25V15.75ZM12.25 12C12.25 14.0711 13.9289 15.75 16 15.75V14.25C14.7574 14.25 13.75 13.2426 13.75 12H12.25Z" fill="#515151" />
                                        </svg>
                                            5203.29 Km
                                        </p>
                                        <p className='flex items-center text-[#515151] text-[18px]'><svg className='mr-2' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.38585 0.690984C8.68521 -0.230327 9.98862 -0.230328 10.288 0.690982L11.8066 5.36474C11.9404 5.77677 12.3244 6.05573 12.7576 6.05573H17.6719C18.6406 6.05573 19.0434 7.29534 18.2597 7.86474L14.284 10.7533C13.9335 11.0079 13.7868 11.4593 13.9207 11.8713L15.4393 16.5451C15.7386 17.4664 14.6841 18.2325 13.9004 17.6631L9.9247 14.7746C9.57421 14.5199 9.09961 14.5199 8.74913 14.7746L4.77339 17.6631C3.98967 18.2325 2.93519 17.4664 3.23454 16.5451L4.75314 11.8713C4.88702 11.4593 4.74036 11.0079 4.38987 10.7533L0.414132 7.86475C-0.369582 7.29534 0.0331932 6.05573 1.00192 6.05573H5.9162C6.34943 6.05573 6.73338 5.77677 6.86726 5.36474L8.38585 0.690984Z" fill="#EFB23C" />
                                        </svg>
                                            <span>4.5</span>
                                        </p>
                                    </div>
                                    <div className='text-center border border-[#BABBBE]  rounded-lg p-3'>
                                        <p className='text-[15px] text-bg-yellow'>SAR400</p>
                                        <p className='text-[13px] whitespace-nowrap text-[#515151]'>{t("common.Permatch") }</p>

                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default AcademyPage;