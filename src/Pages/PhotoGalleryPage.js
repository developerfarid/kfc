import React, { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import $ from 'jquery';
import PhotoSingleItem from './PhotoSingleItem';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PhotoGalleryPage = () => {
    let navigate = useNavigate();
    const [dataArray, setData] = useState([]);
    const [isImagePresent, setIsImagePresent] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
    const dataPerPage = 6;
    const pagesVisited = pageNumber * dataPerPage

    //const displayData = array.slice(pagesVisited, pagesVisited + dataPerPage).map((item, i) => <PhotoSingleItem  key={i} item={item} /> )
    const displayData = dataArray.slice(pagesVisited, pagesVisited + dataPerPage).map((item, i) => <PhotoSingleItem  key={i} item={item} /> )

    const pageCount = Math.ceil(dataArray.length / dataPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        async function fetchData() {
            var formData = new FormData();
            formData.append('tablename', 'photo_gallery');
            formData.append('token', 'token');
            formData.append('source', 'homepage');
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {
                    console.log('data->'+data);
                    var responseObj = JSON.parse(data);
                    if (responseObj[0] == 'SUCCESS') {
                        //alert(responseObj[1]);
                        if (responseObj[1] == 'DATA_FOUND') {
                            //console.log(responseObj[2]);
                            const fetchedData = responseObj[2];
                            setData(fetchedData);
                            setIsImagePresent(true);
                        } else {
                            alert(responseObj[1]);                            
                            setIsImagePresent(false);
                        }
                    } else {
                        alert(responseObj[0]);
                        if (responseObj[0] == 'Please Login') {
                            localStorage.clear();
                            navigate('/Login');
                        }
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'photoGalleryList.php',
                cache: false
            });
        }
        fetchData();
    }, []);
    const {  t } = useTranslation()
    return (
        <section>
            <Header />
            <div className='container font-Inter'>
                <div className='flex md:justify-center items-center py-5 md:py-8'><h3 className='text-xl md:text-4xl font-semibold'>{t("MenuTop.PhotoGallery")} </h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    { isImagePresent ? displayData : '' }

                </div>
                <div className='flex justify-between w-full mb-8  px-12'>
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

            </div>
            <Footer />
        </section>
    );
};

export default PhotoGalleryPage;