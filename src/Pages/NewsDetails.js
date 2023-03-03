import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiTimeLine } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import NewsSingleItem from './NewsSingleItem';

const NewsDetails = () => {
    const language = localStorage?.getItem("i18nextLng");
    const { id } = useParams();
    let navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);
    const [isDataPresent, setIsDataPresent] = useState(false);

    const [newsDetail, setNewsDetail] = useState([]);
    const [isNewsPresent, setIsNewsPresent] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
    const dataPerPage = 4;
    const pagesVisited = pageNumber * dataPerPage;    
    const displayData = dataArray.slice(pagesVisited, pagesVisited + dataPerPage).map((item, i) => <NewsSingleItem key={i} item={item} />);
    const pageCount = Math.ceil(dataArray.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        if(id){
            async function fetchData() {
                console.log('useEffect');
                getData('', 16);
            }
            fetchData();
            window.scrollTo(0, 0);
        }
    }, [id]);

    function getData(_searchfor, _limit) {
        try {
            console.log('getData=>id=' + id);
            var formData = new FormData();
            formData.append('tablename', 'news');
            formData.append('token', localStorage.getItem('token'));
            formData.append('searchfor', _searchfor);
            formData.append('limit', _limit);
            formData.append('getFullNews', 'YES');
            formData.append('dbID', id);
            formData.append('language', language);
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {
                    //console.log(data);
                    var responseObj = JSON.parse(data);
                    //console.log(responseObj);
                    if (responseObj['status'] == 'SUCCESS') {
                        //alert(responseObj[1]);
                        if (responseObj['message'] == 'DATA_FOUND') {
                            console.log(responseObj['data']);
                            const fetchedData = responseObj['data'];
                            setNewsDetail(fetchedData);
                            setIsNewsPresent(true);
                        } else {
                            alert(responseObj['message']);
                            setIsNewsPresent(false);
                        }

                        if (responseObj['message_related'] == 'DATA_FOUND') {
                            console.log(responseObj['data_related']);
                            const fetchedData = responseObj['data_related'];
                            setDataArray(fetchedData);
                            setIsDataPresent(true);
                        } else {
                            alert(responseObj['message_related']);
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
                url: window.BACK_END_URL + 'newsListDetail.php',
                cache: false
            });
        } catch (err) {
            alert('newsListDetail->getData()' + err);
        }
    }

    const { t } = useTranslation()

    return (
        <section>
            <Header />
            <div className='container py-5 md:py-24 font-Inter'>
                <div>
                    {isNewsPresent && (
                        <>
                            <img className='ltr:md:float-left rounded-lg rtl:md:float-right w-full md:w-2/5 ltr:mr-12 rtl:ml-12 mb-6' src={`${window.IMG_HOST_URL}${newsDetail[0].img_path}`} alt="" />
                            <div className='space-y-3 md:space-y-6'>
                        <p  className='text-[18px]   text-[#515151]'>{t("news.NewsDetails")}</p>
                        <h2 className='text-2xl'>{newsDetail[0].heading}</h2>
                        <div className='flex   items-center text-[#515151] font-Inter '>
                            <span className='text-[18px] flex items-center'><FaRegCalendarAlt className='inline-block ltr:mr-1 rtl:ml-1' />{newsDetail[0].date}</span>
                            <span className='text-[18px] flex mx-3 items-center'><RiTimeLine className='inline-block ltr:mr-1 rtl:ml-1' />{newsDetail[0].time}</span>
                        </div>
                        <hr />
                        <div className="text-xl" dangerouslySetInnerHTML={{ __html: newsDetail[0].news_full.replace(/\n/g,"<br />")}} />
                    </div>
                        </>
                    )

                    }

                </div>
            </div>
            <div className='container font-Inter'>
                <div className='flex  items-center py-8 text-[#20252C] '><h2 className='text-2xl md:text-[42px] font-medium'>{t("news.Youmightalsolike") }</h2></div>
                <div className='grid  md:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12'>
                    {isDataPresent &&
                        displayData
                    }

                </div>
                <hr className='mb-6 h-2' />
                <div className='hidden md:flex justify-between w-full mb-8  px-12'>
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
              
                <button className='md:hidden text-bg-yellow rounded-md mb-4 text-center block mx-auto   px-10 mt-4 font-Inter py-2 border border-bg-yellow'>{t("common.see") }</button>
            </div>


            <Footer />

        </section>
    );
};

export default NewsDetails;