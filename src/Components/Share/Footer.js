import React from 'react';
import { FaRegEnvelope, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import { useTranslation } from 'react-i18next';


const Footer = () => {
  const {t} = useTranslation()
    return (
        <footer className='bg-bg-hover-yellow font-Inter pt-6 md:pt-12'>
            <div className='container'>
                <div className='md:flex items-center justify-between'>
                    <div className='lg:w-full xl:w-3/4 2xl:w-2/4 '>
                        <h3 className='text-[22px] md:text-3xl font-bold'>{t("Footer.Subscribe")} </h3>
                        <p className='text-sm md:text-lg text-[#515151] py-2 md:py-4 w-1/2 sm:w-1/3 md:w-8/12 lg:w-6/12  xl:w-2/5' >{t("Footer.Subscribeto")}</p>
                        <div className='flex mb-4 md:mb-8'>
                            <div className="relative text-gray-600 w-full border rounded-md focus-within:text-gray-400">
                                <span className="absolute inset-y-0  ltr:left-0 rtl:right-0 flex items-center rtl:pr-2 ltr:pl-2">
                                    <button type="submit" className="p-1  focus:outline-none focus:shadow-outline">
                                        <FaRegEnvelope />
                                    </button>
                                </span>
                                <input type="search" name="q" className="py-4 text-sm text-white w-full  rounded-md ltr:pl-10 rtl:pr-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder={t("common.Email")} autoComplete="off" />
                            </div>
                            <button className='  btn-update ltr:ml-6 rtl:mr-6 px-12'> {t("common.sent")}</button>
                        </div>

                    </div>
                    <div className=''></div>
                    <div className=' md:ltr:ml-10 md:rtl:mr-10 mb-5 md:mb-0'>
                        <h4 className='text-lg md:text-2xl  text-[#20252C] font-semibold mb-5'>{t("Footer.Follow")}</h4>
                        <div className='flex '>
                            <span className='socialicon'>
                         
                                <FaFacebook />
                            </span>
                            <span className='socialicon'>
                                <RiInstagramFill />
                            </span>
                            <span className='socialicon'>
                                <FaLinkedin />
                            </span>
                            <span className='socialicon'>
                                <AiFillTwitterCircle />
                            </span>

                        </div>
                    </div>
                </div>
                <hr className='mb-6 bg-[#EAE9DA] h-[2px] hidden md:block' />
                <div>
                    <img className='h-[72px] md:h-[116px]' src={logo} alt="" />
                </div>
                <div className=' ml-5 mt-4 md:mt-8 grid grid-cols-2  md:grid-cols-4   gap-y-4'>
                   
                    <div>
                        <h3 className=' md:text-2xl font-medium'>{t("MenuTop.PhotoGallery")}</h3>
                        <ul className='mt-1'>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59] '><Link to='/AddImage' > {t("MenuTop.AddPhotos")}</Link></li>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/PhotoGallary' >{t("MenuTop.PhotoGallery")}</Link></li>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/Store' >{t("MenuTop.Store")} </Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='md:text-2xl font-medium'>{t("MenuTop.News")} </h3>
                        <ul className='mt-1'>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/News' >{t("Footer.ReadNews")}</Link></li>
                         
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/Tournaments' >{t("MenuTop.Tournaments")} </Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='md:text-2xl font-medium'>{t("MenuTop.Request")}</h3>
                        <ul className='mt-1'>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/RefereeInfo' >{t("common.Referee")}</Link></li>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/AcademyInfo' >{t("common.Academy")}</Link></li>
                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/CoachInfo' >{t("common.Coach")}</Link></li>

                            <li className='pt-1 text-sm md:text-base duration-200 ease-in-out text-[#515151] hover:text-[#efdc59]'><Link to='/GymInfo' >{t("common.Gym")}</Link></li>

                        </ul>
                    </div>
                    <div>
                        <h3 className='md:text-2xl font-medium'>{t("Footer.Others")}</h3>
                        <ul className='mt-1'>

                            <li className='pt-1 text-sm md:text-base  text-[#515151]'>{t("Footer.Match")}</li>
                          
                            <li className='pt-1 text-sm md:text-base  text-[#515151]'>{t("Footer.Brokerageoffice")}</li>
                            <li className='pt-1 text-sm md:text-base  text-[#515151]'>{t("Footer.Player")}</li>
                           
                        </ul>
                    </div>

                </div>
                <hr className='mt-5 bg-[#EAE9DA] h-[2px]' />
                <div className='flex justify-between py-3 px-5 text-xs md:text-base'>
                    <span>{new Date().getFullYear()} ©{t("Footer.KooraStars")}   </span>
                    <Link to="/"> {t("Footer.PrivacyPolicy")}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;