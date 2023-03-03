import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiTimeLine } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import img from "../image/278579161_675140053739717_2430452831172964698_n.png";
import avt from '../image/anvtor_n.png';

const WorldCupPage = () => {
    const [dataArray, setData] = useState([]);

    const array = Array.from(Array(20).keys())
    const [pageNumber, setPageNumber] = useState(0)
    const dataPerPage = 8;
    const pagesVisited = pageNumber * dataPerPage
    const pageCount = Math.ceil(array.length / dataPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    //const displayData = array.slice(pagesVisited, pagesVisited + dataPerPage).map((item, i) => <PhotoSingleItem  key={i} item={item} /> )
    const displayData = array.slice(pagesVisited, pagesVisited + dataPerPage).map((item, i) => (
        <div className='col-span-1'>
            <div className='relative'>
                <Link to={`/NewsDetails/${i}`}>
                    <img className='w-full h-[27vh] object-cover ' src={img} alt="" />
                </Link>
                <span className='absolute flex justify-center items-center right-16 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span className='absolute flex justify-center items-center right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6667 9.1665H19.1667C19.7189 9.1665 20.1667 9.61422 20.1667 10.1665V17.3332C20.1667 17.8855 19.7189 18.3332 19.1667 18.3332H15.6667C15.1144 18.3332 14.6667 17.8855 14.6667 17.3332V10.1665C14.6667 9.61422 15.1144 9.1665 15.6667 9.1665Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M6.85406 18.3332H10.7056C11.4953 18.3332 12.2673 18.0994 12.9244 17.6614L14.2214 16.7967C14.4996 16.6112 14.6667 16.299 14.6667 15.9647V9.46928C14.6667 9.27185 14.6082 9.07885 14.4987 8.91458L11 3.6665H10.1537C8.5563 3.6665 7.60352 5.44679 8.48959 6.7759L10.0833 9.1665H4.78739C3.37247 9.1665 2.40495 10.5956 2.93044 11.9093L4.99711 17.076C5.30083 17.8353 6.03625 18.3332 6.85406 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </span>
            </div>
            <div className='col-span-5  flex flex-col items-start  space-y-4 '>
                <h2 className=' text-lg md:text-2xl text-[#20252C] font-semibold font-Inter  text-2line mt-4	'> <Link to={`/NewsDetails/${i}`}>AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE</Link></h2>
                <div className='flex items-center text-[#515151] font-Inter '>
                    <span className='text-[18px] flex items-center ltr:mr-3 rtl:ml-3'><FaRegCalendarAlt className='inline-block mr-1' />02/19/2021</span>
                    <span className='text-[18px] flex items-center'><RiTimeLine className='inline-block mr-1' />10:36:22</span>
                </div>

                <div>

                    <div className='flex items-center '>
                        <img className='w-8 h-8 rounded-full mr-3' src={avt} alt="" />
                        <div>
                            <h3><Link className='text-xl font-semibold' to=''> item displayName</Link></h3>
                            <p className='text-[14px]'>Posted a media</p>
                        </div>
                    </div>

                    <Link to={`/NewsDetails/${i}`}>
                        <button className='text-bg-yellow  px-5  font-Inter py-2 mt-4 border border-bg-yellow'>Read more</button>
                    </Link>

                </div>
            </div>




        </div>
    ))


    const { t } = useTranslation()

    return (
        <section className=' font-Inter'>
            <Header />
            <div className='container mb-14'>
                <h2 className='text-[52px] py-5 font-medium'>{t("news.WorldCupNews")}</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[81vh] lg:gap-x-5'>

                    <div className='col-span-1 lg:h-[81vh]' >
                        <div className='relative'>
                            <Link to={`/NewsDetails/1`}>
                                <img className='w-full h-[50vh] object-cover ' src={img} alt="" />
                            </Link>
                            <span className='absolute flex justify-center items-center right-16 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className='absolute flex justify-center items-center right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6667 9.1665H19.1667C19.7189 9.1665 20.1667 9.61422 20.1667 10.1665V17.3332C20.1667 17.8855 19.7189 18.3332 19.1667 18.3332H15.6667C15.1144 18.3332 14.6667 17.8855 14.6667 17.3332V10.1665C14.6667 9.61422 15.1144 9.1665 15.6667 9.1665Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M6.85406 18.3332H10.7056C11.4953 18.3332 12.2673 18.0994 12.9244 17.6614L14.2214 16.7967C14.4996 16.6112 14.6667 16.299 14.6667 15.9647V9.46928C14.6667 9.27185 14.6082 9.07885 14.4987 8.91458L11 3.6665H10.1537C8.5563 3.6665 7.60352 5.44679 8.48959 6.7759L10.0833 9.1665H4.78739C3.37247 9.1665 2.40495 10.5956 2.93044 11.9093L4.99711 17.076C5.30083 17.8353 6.03625 18.3332 6.85406 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </span>
                        </div>
                        <h2 className='text-3xl text-[#20252C] font-semibold font-Inter mb-4  mt-8 text-2line	'> <Link to={`/NewsDetails/1`}>AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE</Link></h2>
                        <div className='flex items-center text-[#515151] font-Inter '>
                            <span className='text-[18px] flex items-center ltr:mr-3 rtl:ml-3'><FaRegCalendarAlt className='inline-block mr-1' />02/19/2021</span>
                            <span className='text-[18px] flex items-center'><RiTimeLine className='inline-block mr-1' />10:36:22</span>
                        </div>
                        <div className='flex items-center py-4'>
                            {/* <img className='w-8 h-8 rounded-full mr-3' src={imgmen} alt="" /> */}

                            <img className='w-8 h-8 rounded-full mr-3' src={img} alt="" />
                            <div>
                                <h3><Link className='text-xl font-semibold' to=''>displayName</Link></h3>
                                <p className='text-[14px]'>Posted a media</p>

                            </div>
                        </div>
                        <div>

                            {/* <div className='flex items-center mt-4'>
                        <img className='w-8 h-8 rounded-full mr-3' src={avt} alt="" />
                        <div>
                            <h3><Link className='text-xl font-semibold' to=''> itemdisplayName</Link></h3>
                            <p className='text-[14px]'>Posted a media</p>
                        </div>
                    </div> */}

                            <Link to={`/NewsDetails/1`}>
                                <button className='text-bg-yellow  px-5  font-Inter py-2 border border-bg-yellow'>Read more</button>
                            </Link>

                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='grid grid-cols-8 bg-white'>
                            <div className='col-span-3'>
                                <div className='relative'>
                                    <Link to={`/NewsDetails/2`}>
                                        <img className='w-full h-[27vh] object-cover ' src={img} alt="" />
                                    </Link>
                                    <span className='absolute flex justify-center items-center right-16 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className='absolute flex justify-center items-center right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.6667 9.1665H19.1667C19.7189 9.1665 20.1667 9.61422 20.1667 10.1665V17.3332C20.1667 17.8855 19.7189 18.3332 19.1667 18.3332H15.6667C15.1144 18.3332 14.6667 17.8855 14.6667 17.3332V10.1665C14.6667 9.61422 15.1144 9.1665 15.6667 9.1665Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6.85406 18.3332H10.7056C11.4953 18.3332 12.2673 18.0994 12.9244 17.6614L14.2214 16.7967C14.4996 16.6112 14.6667 16.299 14.6667 15.9647V9.46928C14.6667 9.27185 14.6082 9.07885 14.4987 8.91458L11 3.6665H10.1537C8.5563 3.6665 7.60352 5.44679 8.48959 6.7759L10.0833 9.1665H4.78739C3.37247 9.1665 2.40495 10.5956 2.93044 11.9093L4.99711 17.076C5.30083 17.8353 6.03625 18.3332 6.85406 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                </div>
                            </div>
                            <div className='banner-item '>
                                <h2 className='text-2xl text-[#20252C] font-semibold font-Inter  text-2line	'> <Link to={`/NewsDetails/2`}>AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE</Link></h2>
                                <div className='flex items-center text-[#515151] font-Inter '>
                                    <span className='text-[18px] flex items-center ltr:mr-3 rtl:ml-3'><FaRegCalendarAlt className='inline-block mr-1' />02/19/2021</span>
                                    <span className='text-[18px] flex items-center'><RiTimeLine className='inline-block mr-1' />10:36:22</span>
                                </div>
                                <div className='flex items-center '>
                                    {/* <img className='w-8 h-8 rounded-full mr-3' src={imgmen} alt="" /> */}

                                    <img className='w-8 h-8 rounded-full mr-3' src={img} alt="" />
                                    <div>
                                        <h3><Link className='text-xl font-semibold' to=''>displayName</Link></h3>
                                        <p className='text-[14px]'>Posted a media</p>

                                    </div>
                                </div>
                                <div>


                                    <Link to={`/NewsDetails/2`}>
                                        <button className='text-bg-yellow  px-5  font-Inter py-2 border border-bg-yellow'>Read more</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className='grid py-2 grid-cols-8 bg-white'>
                            <div className='col-span-3'>
                                <div className='relative'>
                                    <Link to={`/NewsDetails/3`}>
                                        <img className='w-full h-[27vh] object-cover ' src={img} alt="" />
                                    </Link>
                                    <span className='absolute flex justify-center items-center right-16 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className='absolute flex justify-center items-center right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.6667 9.1665H19.1667C19.7189 9.1665 20.1667 9.61422 20.1667 10.1665V17.3332C20.1667 17.8855 19.7189 18.3332 19.1667 18.3332H15.6667C15.1144 18.3332 14.6667 17.8855 14.6667 17.3332V10.1665C14.6667 9.61422 15.1144 9.1665 15.6667 9.1665Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6.85406 18.3332H10.7056C11.4953 18.3332 12.2673 18.0994 12.9244 17.6614L14.2214 16.7967C14.4996 16.6112 14.6667 16.299 14.6667 15.9647V9.46928C14.6667 9.27185 14.6082 9.07885 14.4987 8.91458L11 3.6665H10.1537C8.5563 3.6665 7.60352 5.44679 8.48959 6.7759L10.0833 9.1665H4.78739C3.37247 9.1665 2.40495 10.5956 2.93044 11.9093L4.99711 17.076C5.30083 17.8353 6.03625 18.3332 6.85406 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                </div>
                            </div>
                            <div className='banner-item'>
                                <h2 className='text-2xl text-[#20252C] font-semibold font-Inter  text-2line	'> <Link to={`/NewsDetails/3`}>AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE</Link></h2>
                                <div className='flex items-center text-[#515151] font-Inter '>
                                    <span className='text-[18px] flex items-center ltr:mr-3 rtl:ml-3'><FaRegCalendarAlt className='inline-block mr-1' />02/19/2021</span>
                                    <span className='text-[18px] flex items-center'><RiTimeLine className='inline-block mr-1' />10:36:22</span>
                                </div>
                                <div className='flex items-center '>
                                    {/* <img className='w-8 h-8 rounded-full mr-3' src={imgmen} alt="" /> */}

                                    <img className='w-8 h-8 rounded-full mr-3' src={img} alt="" />
                                    <div>
                                        <h3><Link className='text-xl font-semibold' to=''>displayName</Link></h3>
                                        <p className='text-[14px]'>Posted a media</p>

                                    </div>
                                </div>
                                <div>

                                    {/* <div className='flex items-center mt-4'>
                        <img className='w-8 h-8 rounded-full mr-3' src={avt} alt="" />
                        <div>
                            <h3><Link className='text-xl font-semibold' to=''> itemdisplayName</Link></h3>
                            <p className='text-[14px]'>Posted a media</p>
                        </div>
                    </div> */}

                                    <Link to={`/NewsDetails/3`}>
                                        <button className='text-bg-yellow  px-5  font-Inter py-2 border border-bg-yellow'>Read more</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-8 bg-white'>
                            <div className='col-span-3'>
                                <div className='relative'>
                                    <Link to={`/NewsDetails/4`}>
                                        <img className='w-full h-[27vh] object-cover ' src={img} alt="" />
                                    </Link>
                                    <span className='absolute flex justify-center items-center right-16 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className='absolute flex justify-center items-center right-4 top-4 w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.6667 9.1665H19.1667C19.7189 9.1665 20.1667 9.61422 20.1667 10.1665V17.3332C20.1667 17.8855 19.7189 18.3332 19.1667 18.3332H15.6667C15.1144 18.3332 14.6667 17.8855 14.6667 17.3332V10.1665C14.6667 9.61422 15.1144 9.1665 15.6667 9.1665Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6.85406 18.3332H10.7056C11.4953 18.3332 12.2673 18.0994 12.9244 17.6614L14.2214 16.7967C14.4996 16.6112 14.6667 16.299 14.6667 15.9647V9.46928C14.6667 9.27185 14.6082 9.07885 14.4987 8.91458L11 3.6665H10.1537C8.5563 3.6665 7.60352 5.44679 8.48959 6.7759L10.0833 9.1665H4.78739C3.37247 9.1665 2.40495 10.5956 2.93044 11.9093L4.99711 17.076C5.30083 17.8353 6.03625 18.3332 6.85406 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                </div>
                            </div>
                            <div className='banner-item'>
                                <h2 className='text-2xl text-[#20252C] font-semibold font-Inter  text-2line	'> <Link to={`/NewsDetails/4`}>AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE AFTER A COMFORTABLE WIN OVER THE</Link></h2>
                                <div className='flex items-center text-[#515151] font-Inter '>
                                    <span className='text-[18px] flex items-center ltr:mr-3 rtl:ml-3'><FaRegCalendarAlt className='inline-block mr-1' />02/19/2021</span>
                                    <span className='text-[18px] flex items-center'><RiTimeLine className='inline-block mr-1' />10:36:22</span>
                                </div>
                                <div className='flex items-center '>
                                    {/* <img className='w-8 h-8 rounded-full mr-3' src={imgmen} alt="" /> */}

                                    <img className='w-8 h-8 rounded-full mr-3' src={img} alt="" />
                                    <div>
                                        <h3><Link className='text-xl font-semibold' to=''>displayName</Link></h3>
                                        <p className='text-[14px]'>Posted a media</p>

                                    </div>
                                </div>
                                <div>
                                    <Link to={`/NewsDetails/4`}>
                                        <button className='text-bg-yellow  px-5  font-Inter py-2 border border-bg-yellow'>Read more</button>
                                    </Link>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className='container '>
                <hr />
                <h2 className='text-[52px] py-5 font-medium'>{t("news.MoreNews")}</h2>
            </div>

            <div className='container grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2  lg:grid-cols-4 bg-white mb-12'>
                {displayData}
                {/* {array.map(i => (
                       
                        
                    ))}
                 */}



            </div>
            <div className='container mb-8 '>
                <hr />

            </div>
            <div className='container flex justify-between w-full mb-8  px-12'>
                <p>{t("common.Page")}  {pageNumber + 1} {t("common.of")} {pageCount}</p>
                <ReactPaginate
                    previousLabel={t("common.Previous")}
                    nextLabel={t("common.Next")}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousClassName={"previousClassName"}
                    nextClassName={"nextClassName"}
                    nextLinkClassName={"nextLinkClassName"}
                    previousLinkClassName={"previousLinkClassName"}
                    disabledClassName={"disabledClassName"}
                    activeClassName={"activeClassName"}
                />
            </div>


            <Footer />
        </section>
    );
};

export default WorldCupPage;