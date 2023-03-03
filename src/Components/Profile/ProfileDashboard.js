import React, { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import { BsInfoCircle } from "react-icons/bs"
import { HiOutlinePhotograph } from "react-icons/hi"

import FileBase64 from 'react-file-base64';
import $ from 'jquery';
import { FiLogOut } from 'react-icons/fi';
import Information from './Information';
import { useTranslation } from 'react-i18next';

const ProfileDashboard = () => {
    const { t } = useTranslation()
    function logout() {
        const token = localStorage.getItem('token');
        console.log(token);
        $.ajax({
            type: 'POST',
            data: 'token=' + token,
            success: function (data) {
                var responseObj = JSON.parse(data);
                localStorage.clear();
                console.log(responseObj[0]);
                Navigate('/Login');
            },
            error: function (html) {
                alert(html);
            },
            url: window.BACK_END_URL + 'logout.php',
            cache: false
        });
    }
    return (
        <section className='bg-gray-100'>
            <Header />
            <div className='container bg-white shadow-Tournaments rounded-2xl my-12 py-8 font-Inter '>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 lg:col-span-3  md:p-5 flex flex-col justify-between    md:my-5 w-full lg:ltr:border-r-2 lg:rtl:border-l-2 '>
                        <ul className='flex justify-between lg:block'>
                            <li>
                                <Link className='py-3 relative after:absolute hover:after:bg-bg-yellow after:w-full lg:after:w-1 lg:after:h-full after:h-[3px] ltr:after:-right-[23px] rtl:after:-left-[23px] lg:after:top-0 after:-bottom-1 flex items-center hover:text-bg-yellow after:rounded-2xl transition duration-300 ease-in-out text-base sm:text-[18px]' to='/Profile/Information'>
                                    <svg className='mr-1 rtl:ml-1 sm:mr-2 sm:rtl:ml-2  w-4 h-4 sm:w-6 sm:h-6'  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z" fill="#515151" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V9C12.75 9.41421 12.4142 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 10.75C12.4142 10.75 12.75 11.0858 12.75 11.5V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V11.5C11.25 11.0858 11.5858 10.75 12 10.75Z" fill="#515151" />
                                    </svg>
                                    {t('news.Information')}
                                </Link>
                            </li>
                            <li>
                                <Link className='py-3 relative after:absolute hover:after:bg-bg-yellow after:w-full lg:after:w-1 lg:after:h-full after:h-[3px] ltr:after:-right-[23px] rtl:after:-left-[23px] lg:after:top-0 after:-bottom-1 flex items-center hover:text-bg-yellow after:rounded-2xl transition duration-300 ease-in-out text-base sm:text-[18px]' to='/Profile/Gallery'>
                                    <svg className='mr-1 rtl:ml-1 sm:mr-2 sm:rtl:ml-2  w-4 h-4 sm:w-6 sm:h-6' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="18" height="18" rx="6" stroke="#515151" strokeWidth="1.5" />
                                        <path d="M19 12L16.7956 10.2365C15.2041 8.96326 12.9097 9.09034 11.4684 10.5316L8.53156 13.4684C7.09034 14.9097 4.79592 15.0367 3.20436 13.7635L1 12" stroke="#515151" strokeWidth="1.5" strokeLinecap="round" />
                                        <circle cx="7" cy="7" r="2" stroke="#515151" strokeWidth="1.5" />
                                    </svg>
                                    {t('MenuTop.Gallery')}
                                </Link>
                            </li>
                            <li>
                                <Link className='py-3 relative after:absolute hover:after:bg-bg-yellow after:w-full lg:after:w-1 lg:after:h-full after:h-[3px] ltr:after:-right-[23px] rtl:after:-left-[23px] lg:after:top-0 after:-bottom-1 flex items-center hover:text-bg-yellow after:rounded-2xl transition duration-300 ease-in-out text-base sm:text-[18px]' to='/Profile/Request'> <svg className='mr-1 rtl:ml-1 sm:mr-2 sm:rtl:ml-2  w-4 h-4 sm:w-6 sm:h-6'  viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 21H15C17.7614 21 20 18.7614 20 16V11.1171C20 10.4606 20.4468 9.88829 21.0838 9.72906C22.2525 9.43687 22.559 7.91925 21.5952 7.1964L15 2.25C13.2222 0.916667 10.7778 0.916667 9 2.25L2.4048 7.1964C1.44099 7.91925 1.74746 9.43687 2.91625 9.72906C3.55318 9.88829 4 10.4606 4 11.1171V16C4 18.7614 6.23858 21 9 21Z" stroke="#515151" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M12 8V16" stroke="#515151" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M16 12L8 12" stroke="#515151" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                    {t('news.MyRequest')}
                                    </Link>
                            </li>

                        </ul>
                        <hr className='lg:hidden h-[3px] bg-gray-300 '  />
                        {/* <button onClick={logout} className='text-center  bottom-8  justify-center  w-48 transform bg-[#FD9F9F42] rounded-md text-red-500 font-semibold px-5 py-3   flex items-center '><FiLogOut className="mr-2 text-2xl" />Sign Out</button> */}


                    </div>
                    <div className='col-span-12  lg:col-span-9 py-6 px-8 w-full '>

                        {<Outlet />}


                    </div>
                </div>

            </div>
            <Footer />
        </section >
    );
};

export default ProfileDashboard;