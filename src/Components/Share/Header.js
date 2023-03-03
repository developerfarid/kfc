import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsChevronDown } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import logo from '../../image/logo.png';
import HomePageLogin from '../LoginSystem/HomePageLogin';
import SiginUp from '../LoginSystem/SiginUp';
import AddProfile from './AddProfile';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

const customStyles = {
    content: {
        top: '0%',
        width: '300px',


    },
};
const Header = () => {
    let navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen1, setIsOpen1] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const [hight, setHight] = useState(null);
    const [info, setInfo] = useState(false);
    const [languages, setLanguages] = useState(true);
    const token = localStorage.getItem('token');
    const displayName = localStorage.getItem('displayName');

    let menuRef = useRef();
    let infoRef = useRef();
    console.log(menu);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setHight(true);
            } else {
                setHight(false);
            }
        });
    }, []);

    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })
    // useEffect((event) => {
    //     commonFun(event, menuRef)
    // })

    // const commonFun = (event, ref) => {
    //     let handler = (event) => {
    //         if (!ref.current.contains(event.target)) {
    //             setProfileOpen(false)
    //         }
    //     }
    //     document.addEventListener("mousedown", handler)
    //     return () => {
    //         document.removeEventListener("mousedown", handler)
    //     }
    // }

    function goToStore() {
        window.location.href = '/store/';
        return false;
    }

    // i18next all code here
    const { t } = useTranslation()
    const language = localStorage?.getItem("i18nextLng");
    useEffect(() => {
        if (language?.length !== 2) {
            // console.log(localStorage.getItem("i18nextLng"), "okk");
            i18next.changeLanguage("en")
        }
    }, [])

    const handleLanguage = (e) => {
        i18n.changeLanguage(e)
        setLanguages(!languages)
    }

    useEffect(() => {
        language === 'en' ? document.body.dir = 'ltr' : document.body.dir = 'rtl'
    }, [language])

    const hangleLogout = () => {
        console.log("logout");
        logout();
    }

    function logout() {
        const token = localStorage.getItem('uToken');
        console.log(token);
        $.ajax({
            type: 'POST',
            data: 'token=' + token,
            success: function (data) {
                //console.log('Logout->data->' + data);
                var responseObj = JSON.parse(data);
                //console.log(responseObj);              
                localStorage.removeItem("token");
                localStorage.removeItem("uToken");
                localStorage.removeItem("displayName");
                console.log(responseObj[0]);
                //window.location.href = '/';
                navigate('/');
            },
            error: function (html) {
                alert(html);
            },
            url: window.BACK_END_URL + 'logout.php',
            cache: false
        });
    }

    return (
        <header className='  w-full bg-white font-Inter'>

            <div ref={menuRef} className={`${hight ? ' z-30 text-center bg-white m-auto left-[50%] transform -translate-x-1/2 top-0 w-full  fixed py-4  ' : " py-4  "}`} >
                <div className='flex justify-between items-center container'>
                    <div className='flex items-center'><FiMenu onClick={() => setMenu(!menu)} className={`mx-2 block ${hight ? "lg:hidden" : "block md:hidden"} lg:hidden text-2xl cursor-pointer`} /><Link to='/'><img className='h-[30px] sm:h-[40px] md:h-[50px] lg:h-[60px] z-50' src={logo} alt="" /></Link> </div>
                    <nav className={`${hight ? 'hidden lg:block' : "hidden"} `}>
                        <ul className=' h-[60px] flex font-semibold lg:space-x-4 text-black  items-center'>
                            <li >
                                <Link className='menu-item-btn rtl:ml-6' to="/News" state={{ category: '' }}>{t("MenuTop.News")}</Link>
                            </li>
                            <li>
                                <Link className='menu-item-btn' to="/Tournaments">{t("MenuTop.Tournaments")} </Link>
                            </li>
                            <li className='relative menu-item py-3 menu-item-btn'>
                                <Link to='/' className=' flex items-center'>{t("MenuTop.Request")} <BsChevronDown className='  rtl:mr-2 ltr:ml-2' /></Link>
                                <ul className='absolute invisible text-left  opacity-0 transform translate-y-10 transition-all duration-300 w-36  ease-in-out z-50 left-0 top-full bg-black px-6 py-4 border-slate-600 border rounded-lg space-y-3 '>
                                    <li>
                                        <Link className='menu-sub-item' to='/AcademyInfo'>{t("common.Academy")} </Link>

                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/RefereeInfo'>{t("common.Referee")} </Link>

                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/GymInfo'>{t("common.Gym")}</Link>

                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/CoachInfo'> {t("common.Coach")}</Link>

                                    </li>

                                </ul>
                            </li>
                            <li>
                                <Link className='menu-item-btn' to='/PhotoGallary'>{t("MenuTop.Gallery")} </Link>
                            </li>
                            {/* <li className='relative menu-item py-3 menu-item-btn'>
                                <Link className=' flex items-center' to='/PhotoGallary'>{t("MenuTop.PhotoGallery")}  <BsChevronDown className='   rtl:mr-2 ltr:ml-2' /></Link>
                                {token && <ul className='absolute invisible  text-left  opacity-0 transform translate-y-10 transition duration-300  ease-in-out z-50 left-0 top-full bg-black px-6 w-36 py-4 border-slate-600 border rounded-lg space-y-3 '>
                                    <li>
                                        <Link className='menu-sub-item' to='/PhotoGallary'> {t("MenuTop.Gallery")} </Link>

                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/AddImage'>{t("MenuTop.AddPhotos")} </Link>

                                    </li>


                                </ul>}
                            </li> */}
                            <li>
                                <Link onClick={goToStore} className='menu-item-btn' to="/store/"> {t("MenuTop.Store")}</Link>
                            </li>
                            <li>
                                <Link className='menu-item-btn' to='/Contact'>{t("MenuTop.ContactUs")} </Link>
                            </li>


                            <li>

                            </li>
                            <li>

                            </li>

                        </ul>
                        <SiginUp setIsOpen1={setIsOpen1} modalIsOpen1={modalIsOpen1} />
                        <AddProfile setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
                    </nav>
                    <div className='flex items-center space-x-2'>
                        {/* <select value={value} onChange={(e) => setValue(e.target.value)} className='bg-transparent outline-none' name="" id="">
                            <option value="english">English</option>
                            <option value="arabic">العربية</option>
                        </select> */}
                        {language === "en" ? <span className='cursor-pointer' onClick={() => handleLanguage("ar")}>العربية</span> : <span className='cursor-pointer rtl:px-1' onClick={() => handleLanguage("en")}>English</span>}
                        <span className='relative' onClick={() => setInfo(!info)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.3375 2.76303C15.4685 2.37008 15.8932 2.15771 16.2862 2.28869L16.4402 2.34001C18.4557 3.01187 20.0374 4.5935 20.7092 6.60908L20.7605 6.76303C20.8915 7.15599 20.6792 7.58073 20.2862 7.71172C19.8932 7.8427 19.4685 7.63033 19.3375 7.23737L19.2862 7.08342C18.7636 5.51575 17.5335 4.28559 15.9658 3.76303L15.8119 3.71172C15.4189 3.58073 15.2065 3.15599 15.3375 2.76303Z" fill="#515151" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.76014 2.76303C8.62915 2.37008 8.20441 2.15771 7.81145 2.28869L7.6575 2.34001C5.64192 3.01187 4.06029 4.5935 3.38843 6.60908L3.33711 6.76303C3.20613 7.15599 3.4185 7.58073 3.81145 7.71172C4.20441 7.8427 4.62915 7.63033 4.76014 7.23737L4.81145 7.08342C5.33401 5.51575 6.56417 4.28559 8.13185 3.76303L8.2858 3.71172C8.67875 3.58073 8.89112 3.15599 8.76014 2.76303Z" fill="#515151" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.29829 4.54969C9.5073 3.24601 10.6373 2.25 11.9999 2.25C13.3625 2.25 14.4924 3.24601 14.7014 4.54969C16.5693 5.35443 17.9746 6.99155 18.2047 9.01871L18.596 12.4663C18.6488 12.9315 18.8459 13.3854 19.1792 13.777C19.8759 14.5954 19.8978 15.6243 19.4437 16.4246C18.9969 17.2119 18.114 17.75 17.0549 17.75H6.94482C5.88575 17.75 5.00283 17.2119 4.55606 16.4246C4.10189 15.6243 4.12386 14.5954 4.82056 13.777C5.15385 13.3854 5.35096 12.9315 5.40376 12.4663L5.79505 9.01871C6.02513 6.99155 7.43041 5.35443 9.29829 4.54969ZM11.9999 3.75C11.3171 3.75 10.7637 4.30347 10.7637 4.9862V5.07695C10.7637 5.39753 10.5599 5.68267 10.2566 5.78652C8.60728 6.35122 7.45836 7.66468 7.28548 9.18787L6.89419 12.6354C6.80605 13.412 6.47939 14.1424 5.96278 14.7493C5.69959 15.0584 5.69821 15.398 5.86063 15.6843C6.03046 15.9835 6.40406 16.25 6.94482 16.25H17.0549C17.5957 16.25 17.9693 15.9835 18.1391 15.6843C18.3015 15.398 18.3001 15.0584 18.0369 14.7493C17.5203 14.1424 17.1937 13.412 17.1055 12.6354L16.7142 9.18787C16.5414 7.66468 15.3924 6.35122 13.7431 5.78652C13.4398 5.68267 13.2361 5.39753 13.2361 5.07695V4.9862C13.2361 4.30347 12.6826 3.75 11.9999 3.75Z" fill="#515151" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.8477 19C10.8477 19.6904 11.4073 20.25 12.0977 20.25C12.788 20.25 13.3477 19.6904 13.3477 19H14.8477C14.8477 20.5188 13.6164 21.75 12.0977 21.75C10.5789 21.75 9.34766 20.5188 9.34766 19H10.8477Z" fill="#515151" />
                            </svg>
                            {/* info modal */}

                            {info && <div ref={infoRef} className='absolute ltr:right-0 rtl:left-0  top-4 w-[464px] bg-white p-3 rounded-lg'>
                                <div className='flex justify-between'>
                                    <h3>Notification</h3> <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="#2B3039" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.75 11.25L11.25 18.75" stroke="#2B3039" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.25 11.25L18.75 18.75" stroke="#2B3039" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                                <div className='space-x-3'>
                                    <button className='bg-[#F4F4F4] text-[#848A96] font-semibold text-[14px] transition duration-300 ease-in-out hover:bg-bg-yellow hover:text-black px-4 py-3 rounded-md'>All</button>
                                    <button className='bg-[#F4F4F4] text-[#848A96] font-semibold text-[14px] transition duration-300 ease-in-out hover:bg-bg-yellow hover:text-black px-4 py-3 rounded-md'>Like</button>
                                    <button className='bg-[#F4F4F4] text-[#848A96] font-semibold text-[14px] transition duration-300 ease-in-out hover:bg-bg-yellow hover:text-black px-4 py-3 rounded-md'>Follower</button>

                                </div>

                            </div>}

                        </span>

                        {!token && <button className='font-semibold border hidden md:block text-black py-2 px-6 rounded-lg border-c-#BABBBE transition duration-300 ease-in-out hover:text-text-body hover:bg-c-#EFDC59 hover:border-c-#EFDC59 ' onClick={() => setIsOpen2(true)}>{t("common.SignIn")} </button>}
                        {token && <span onClick={() => setProfileOpen(!profileOpen)} className='flex cursor-pointer items-center relative'>{displayName} <BsChevronDown className='rtl:mr-2 ltr:ml-2' />


                            {profileOpen && <ul className='absolute  transform mt-3 transition duration-300 w-36  ease-in-out z-50 right-0 top-full bg-black px-6 py-4 border-slate-600 border text-left rounded-lg space-y-3'>
                                <li>
                                    <Link className='menu-sub-item' to='/Profile'>{t('common.Profile')} </Link>

                                </li>
                                <li>
                                    <button onClick={() => hangleLogout()} className='menu-sub-item'>{t('common.Logout')} </button>

                                </li>
                                {/* <li>
                                    <Link className='menu-sub-item' to='/MyGallery'>My Gallery</Link>
                                   
                                </li>
                                <li>
                                    <Link className='menu-sub-item' to='/MyRequest'>My Request</Link>
                                   
                                </li>
                                 */}

                            </ul>}
                        </span>}
                        {token ? <img className='w-[43px] h-[43px] rounded-full  ' src={logo} alt="" /> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.38566 15.6959C6.19864 16.2895 5.75 16.9706 5.75 17.5C5.75 18.0294 6.19864 18.7105 7.38566 19.3041C8.52782 19.8751 10.1582 20.25 12 20.25C13.8418 20.25 15.4722 19.8751 16.6143 19.3041C17.8014 18.7105 18.25 18.0294 18.25 17.5C18.25 16.9706 17.8014 16.2895 16.6143 15.6959C15.4722 15.1249 13.8418 14.75 12 14.75C10.1582 14.75 8.52782 15.1249 7.38566 15.6959ZM6.71484 14.3543C8.10618 13.6586 9.97582 13.25 12 13.25C14.0242 13.25 15.8938 13.6586 17.2852 14.3543C18.6316 15.0275 19.75 16.0964 19.75 17.5C19.75 18.9036 18.6316 19.9725 17.2852 20.6457C15.8938 21.3414 14.0242 21.75 12 21.75C9.97582 21.75 8.10618 21.3414 6.71484 20.6457C5.36836 19.9725 4.25 18.9036 4.25 17.5C4.25 16.0964 5.36836 15.0275 6.71484 14.3543Z" fill="#515151" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7Z" fill="#515151" />
                        </svg>
                        }



                    </div>
                </div>

            </div>
            <div className='  bg-black  w-full'>
                <div className=' flex container justify-between items-center'>
                    <nav className={`${menu ? "opacity-100 visible duration-300 transition ease-in h-full fixed bg-white z-50 w-[300px]  ltr:left-0 rtl:right-0 top-0 bottom-0" : '  hidden  md:block '}`}>
                        <ul className={`${menu ? " px-4 py-10 " : 'md:h-[60px] md:flex font-semibold  text-c-#BABBBE  items-center'}`} >



                            <RiAddFill onClick={() => setMenu(false)} className={`${menu ? 'rtl:ml-6 transform rotate-45 text-2xl cursor-pointer transition hover:rotate-0 duration-300 mb-3 hover:text-[#FF272785]' : "hidden"}`} />

                            <li className={`${menu ? 'border   border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow hover:text-bg-yellow ' : "lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8 "}`} >
                                <Link className='menu-item-btn' to="/News" state={{ category: '' }}>{t("MenuTop.News")} </Link>
                            </li>
                            <li className={`${menu ? 'border  border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow hover:text-bg-yellow ' : "lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8"}`}>
                                <Link className='menu-item-btn' to="/Tournaments">{t("MenuTop.Tournaments")}</Link>
                            </li>
                            <li className={`${menu ? 'border  border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow transition-all duration-300 ease-in-out  hover:text-bg-yellow btn-hover-menu' : "relative menu-item py-3 menu-item-btn lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8"}`}>
                                <button className=' flex items-center '>{t("MenuTop.Request")}  <BsChevronDown className='ltr:ml-2 rtl:mr-2' /></button>
                                <ul className={`${menu ? "open hidden" : 'absolute invisible  ltr:text-left rtl:text-right   opacity-0 transform translate-y-10 transition duration-300 w-36  ease-in-out z-50  ltr:left-0 rtl:right-0 top-full bg-black px-6 py-4 border-slate-600 border rounded-lg space-y-3 '}`} >
                                    <li>
                                        <Link className='menu-sub-item' to='/AcademyInfo'>{t("common.Academy")} </Link>
                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/RefereeInfo'>{t("common.Referee")}</Link>
                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/GymInfo'>{t("common.Gym")}</Link>
                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/CoachInfo'>{t("common.Coach")}</Link>
                                    </li>

                                </ul>
                            </li>
                            <li className={`${menu ?'border   border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow hover:text-bg-yellow ':"lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8" }`}>
                                <Link className=  'menu-item-btn' to='/PhotoGallary'>{t("MenuTop.Gallery")}</Link>
                            </li>
                            {/* <li className={`${menu ? 'border  border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow  hover:text-bg-yellow btn-hover-menu' : "relative menu-item py-3 menu-item-btn lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8"}`}>
                                <button className=' flex items-center' >{t("MenuTop.PhotoGallery")} </button>
                                {token && <ul className={`${menu ? "open hidden" : 'absolute invisible  ltr:text-left rtl:text-right   opacity-0 transform translate-y-10 transition duration-300 w-36  ease-in-out z-50  ltr:left-0 rtl:right-0 top-full bg-black px-6 py-4 border-slate-600 border rounded-lg space-y-3 '}`} >
                                    <li>
                                        <Link className='menu-sub-item' to='/PhotoGallary'>{t("MenuTop.Gallery")} </Link>

                                    </li>
                                    <li>
                                        <Link className='menu-sub-item' to='/AddImage'>{t("MenuTop.AddPhotos")} </Link>
                                    </li>
                                </ul>}
                            </li> */}
                            <li className={`${menu ? 'border  border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow hover:text-bg-yellow ' : "lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8"}`}>
                                <Link onClick={goToStore} className='menu-item-btn' to="/store/"> {t("MenuTop.Store")}</Link>
                            </li>
                            <li className={`${menu ? 'border  border-[#E4E7EA] px-3 py-2.5 rounded-md mb-3 hover:border-bg-yellow hover:text-bg-yellow ' : "lg:mr-8 md:mr-4 rtl:md:ml-4 rtl:lg:ml-8"}`}>
                                <Link className='menu-item-btn' to='/Contact'>{t("MenuTop.ContactUs")}</Link>
                            </li>
                            {token ? <button onClick={() => hangleLogout()} className={`${menu ? "menu-sub-item flex bg-[#ff272712] border text-[#FF272785] border-[#FF272785] px-4 py-2 rounded-xl items-center absolute bottom-5 ltr:left-5 rtl:right-5" : 'hidden'}`} ><svg className='mr-2 rtl:ml-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 6.5L16.5 9M16.5 9L14 11.5M16.5 9H6.5" stroke="#FF2727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.5 5.25V5.25C11.5 3.17893 9.82107 1.5 7.75 1.5H5.5C3.29086 1.5 1.5 3.29086 1.5 5.5V12.5C1.5 14.7091 3.29086 16.5 5.5 16.5H7.75C9.82107 16.5 11.5 14.8211 11.5 12.75V12.75" stroke="#FF2727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                                {t('common.Logout')} </button> : <button className={`${menu ? 'menu-sub-item flex bg-[#ff272712] border text-[#FF272785] hover:text-[#FF272785]  border-[#FF272785] px-4 py-2 rounded-xl items-center absolute bottom-5  ltr:left-5 rtl:right-5' : "hidden"}`} onClick={() => setIsOpen1(true)}>
                                {t("MenuTop.RegisterasAgency")} </button>}
                        </ul>
                        {/* <SiginUp setIsOpen1={setIsOpen1} setIsOpen2={setIsOpen2} modalIsOpen1={modalIsOpen1} />/  */}
                        <HomePageLogin setIsOpen1={setIsOpen1} setIsOpen2={setIsOpen2} modalIsOpen2={modalIsOpen2} />
                        <AddProfile setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
                    </nav>
           
                        <div className='flex'>


                            {/* <button className='font-semibold border hidden md:block text-c-#BABBBE py-2 px-6 rounded-lg border-c-#BABBBE transition duration-300 ease-in-out hover:text-text-body hover:bg-c-#EFDC59 hover:border-c-#EFDC59 mr-5' onClick={() => setIsOpen2(true)}>Log in </button> */}
                            <Link to='/AgencyLanding' className='font-semibold border hidden md:block text-c-#BABBBE py-2 px-6 rounded-lg border-c-#BABBBE transition duration-300 ease-in-out hover:text-text-body hover:bg-c-#EFDC59 hover:border-c-#EFDC59 ltr:mr-5 rtl:ml-5'>{t("MenuTop.RegisterasAgency")}</Link>

                            {/* <button className='font-semibold' >Sign up</button> */}
                        </div>
                    
                </div>

            </div>

        </header>
    );
};

export default Header;