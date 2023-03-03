import React, { useState, useEffect } from 'react';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import ReactPaginate from 'react-paginate';
import NewsSingleItem from './NewsSingleItem';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NewsPage = () => {
    let location = useLocation();
    const category = location?.state?.category;
    console.log('category->'+category);
    const language = localStorage?.getItem("i18nextLng");
    useEffect(() => {
        if(language){
            async function fetchData() {
                getData('', 24);
            }
            fetchData()
            window.scroll(0, 0);
        }        
    }, [language]);
    
    function getData(_searchfor, _limit) {
        try {
            var formData = new FormData();
            formData.append('tablename', 'news');
            formData.append('token', localStorage.getItem('token'));
            formData.append('searchfor', _searchfor);
            formData.append('limit', _limit);
            formData.append('getFullNews', 'NO');
            formData.append('language', language);
            formData.append('category', category);
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
                            setDataArray(fetchedData);
                            setIsDataPresent(true);
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

    let navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);
    const [isDataPresent, setIsDataPresent] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
    const dataPerPage = 8;
    const pagesVisited = pageNumber * dataPerPage    
    const displayData = dataArray.slice(pagesVisited, pagesVisited + dataPerPage).map((item, i) => <NewsSingleItem  key={i} item={item} /> )

    const pageCount = Math.ceil(dataArray.length / dataPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const {  t } = useTranslation()
    
    return (
        <section>
            <Header />
            <div className='container font-Inter'>
                <div className='flex justify-center items-center py-8 text-[#20252C] '><h2 className='text-[52px] font-medium'>{t("MenuTop.News")}</h2></div>
                <div className='grid  md:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6  md:pb-12'>
                    {
                       displayData 
                    }
                    
                </div>
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
                <hr className='md:hidden' />
                <button className='md:hidden text-bg-yellow rounded-md mb-4 text-center block mx-auto   px-10 mt-4 font-Inter py-2 border border-bg-yellow'>{t("common.see") }</button>
            </div>
            <Footer />

        </section>
    );
};

export default NewsPage;