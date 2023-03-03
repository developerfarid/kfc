import React from 'react';
import img from "../../image/footer-phone-removebg-preview (1).png";
import logo from "../../image/logo.png";
import { FaGooglePlay } from 'react-icons/fa'
import { AiFillApple } from 'react-icons/ai'
import { useTranslation } from 'react-i18next';

const AppStore = () => {
    const {  t } = useTranslation()
    return (
        <section className='font-Inter '>
            <div className='container relative'>
                <div className='absolute ltr:right-0 rtl:left-0 top-5 blur-[180px] w-64 h-56 bg-[#59EF83]'></div>
                <div className='absolute rtl:right-0 ltr:left-0 bottom-5  w-[340px] h-[210px] blur-[120px] bg-[#E3DD5D]'></div>
              
                <div className='grid grid-cols-12 items-center py-5'>
                    <div className='col-span-5'>
                        <div className='space-y-3 md:space-y-6'>
                            <img className='h-14 sm:h-20 md:h-30' src={logo} alt="" />
                            <h3 className=' sm:text-xl md:text-[36px] font-semibold'>{t("SocialApp.dowanloadApp")}</h3>
                            <div className='md:flex  gap-4'>
                                <button className='flex items-center border-2 rounded-md bg-white z-20 border-[#515151] px-4 md:px-6 py-2 mb-4 md:mb-0'>
                                    <FaGooglePlay className=' ltr:mr-2 rtl:ml-2 md:ltr:mr-3 md:rtl:ml-3 text-lg sm:text-xl md:text-2xl' /> <div className='ltr:text-left rtl:text-right'>
                                        <p className='text-xs md:text-base text-[#515151]'>{t("SocialApp.PlayStore")}</p>
                                        <h6 className='text-sm md:text-xl'>{t("SocialApp.Download")} </h6>
                                    </div>
                                </button>
                                <button className='flex items-center border-2 rounded-md bg-white z-20 border-[#515151]  px-4 md:px-6 py-2'>

                                    <AiFillApple className=' ltr:mr-2 rtl:ml-2 md:ltr:mr-3 md:rtl:ml-3 text-2xl' />
                                    <div className=' ltr:text-left rtl:text-right'>
                                        <p className=' text-xs md:text-base md:text-[#515151]'>{t("SocialApp.AppleStore")}</p>
                                        <h6 className='text-sm md:text-xl'>{t("SocialApp.Download")} </h6>
                                    </div>
                                </button>



                            </div>
                        </div>
                    </div>
                    <div className='col-span-7 relative'>
                        <img className='w-full  top-[50%] left-[50%] -translate-x-1/2 transform -translate-y-1/2  md:w-10/12 absolute ' src={img} alt="" />

                        <div className=' w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[600px] lg:h-[600px] bg-bg-yellow ltr:ml-auto rtl:mr-auto rounded-full'></div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default AppStore;