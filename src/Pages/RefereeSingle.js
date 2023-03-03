import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import img1 from "../image/Ellipse 1459.png";
import img from "../image/Rectangle 34624243.png";
import DatePicker from 'react-date-picker';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
import Comfirmed from '../Components/Share/Comfirmed';
import UseTheme from '../Hooks/UseTheme';
import Swal from 'sweetalert2';

const RefereeSingle = () => {
    const [formDate, setFormDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
   const {alartSwweet} =UseTheme()
    const formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        return [year, month, day].join('-');
    }
    function submitRequest(_id) {
        if (localStorage.getItem("uToken") === null) {
            // alert('Please Login');
            closeModal(true)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please Login !',
                showConfirmButton: false,
                timer: 1500
              })
     
        } else {
            console.log('_id->' + _id + ',formDate->' + formatDate(formDate)+ ',toDate->' + formatDate(toDate));
            try {
                var formData = new FormData();
                formData.append('type', 'referees');
                formData.append('token', localStorage.getItem('uToken'));
                formData.append('dbID', _id);
                formData.append('date_from', formatDate(formDate));
                formData.append('date_to', formatDate(toDate));
                $.ajax({
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) {
                        console.log('data->' + data);
                        var responseObj = JSON.parse(data);
                        console.log('responseObj->' + responseObj);
                        if (responseObj['status'] === 'SUCCESS') {
                            // alert(responseObj['message']); 
                            closeModal(true)   
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: responseObj['message'],
                                showConfirmButton: false,
                                timer: 1500
                              })                        
                        } else {
                            // alert(responseObj['status']);
                            closeModal(true)
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: responseObj['status'],
                                showConfirmButton: false,
                                timer: 1500
                              })
                        }
                    },
                    error: function (html) {
                        console.log(html);
                    },
                    url: window.BACK_END_URL + 'userRequestMaster.php',
                    cache: false
                });
            } catch (err) {
                alert('submitRequest()' + err);
            }
        }
    }
    let location = useLocation();
    //console.log('location.state.academy->'+location.state.academy.name);
    const data = location.state.data;
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const { t } = useTranslation();
    return (
        <section className='font-Inter'>
            <Header />
            <div className='container'>
                <div className='flex justify-between items-center py-8'><h3 className='text-xl md:text-4xl font-semibold'>{t("news.RefereeDetails") }</h3>   <span className=' flex justify-center items-center  w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                </div>
                <div className='relative -mb-14 md:-mb-24 before:absolute before:left-0 before:top-0 before:w-full before:h-full overflow-hidden  '>
                    <img className='w-full h-[175px] md:h-[430px] object-cover blur-sm' src={img} alt="" />

                </div>
                <div className='text-center'>
                    <img className=' w-32 h-32 md:w-56 border-2 border-white md:h-56 mx-auto transform rounded-full mb-4  object-cover  md:mb-0' src={`${window.IMG_HOST_URL}${data.img_path}`} alt="" />
                </div>
                <div className='grid md:grid-cols-13 md:py-10'>
                    <div className='py-5 col-span-7 px-5  '>
                        <div className='space-y-1 md:space-y-3'>
                            <h3 className='text-2xl md:text-4xl font-semibold'>{data.name}</h3>
                            <p className='flex items-center text-[#515151] text-lg md:text-2xl'>
                                {t('request.Football')} :   <span className=' font-semibold'> {t("common.Referee")}</span>
                            </p>
                            <p className='flex items-center text-[#515151] text-lg md:text-2xl'>
                                {t("Footer.Match")}  :  <span className='font-semibold'> {data.totalmatch}</span>

                            </p>
                            <div className='grid grid-cols-3  lg:grid-cols-5 items-center'>
                                <div className='text-center ltr:border-r-2 rtl:border-l-2 my-4 space-y-2'>
                                    <h5 className='text-2xl font-semibold'>{data.weight}</h5>
                                    <p className='text-text-body'>{t("request.Weight")} </p>
                                </div>
                                <div className='text-center  ltr:border-r-2 rtl:border-l-2 my-4 space-y-2 px-1'>
                                    <h5 className='text-2xl font-semibold'>{data.height}</h5>
                                    <p className='text-text-body'>{t("request.Height")}</p>
                                </div>
                                <div className='text-center border-r-0 lg:border-r-2 ltr:border-r-2 rtl:lg:border-l-2 my-4 space-y-2'>
                                    <h5 className='text-2xl font-semibold'>{data.city}</h5>
                                    <p className='text-text-body'>{t("request.City")}</p>
                                </div>
                                <div className='text-center ltr:border-r-2 rtl:border-l-2 my-4 space-y-2'>
                                    <h5 className='text-2xl font-semibold'>{getAge(data.dob)}</h5>
                                    <p className='text-text-body'>{t("request.Theage")}</p>
                                </div>
                                <div className='text-center  my-4 space-y-2 px-1'>
                                    <h5 className='text-2xl font-semibold'>{data.totalmatch}</h5>
                                    <p className='text-text-body'>{t("request.Numberofmatches")}</p>
                                </div>

                            </div>
                            <h3 className='text-xl md:text-3xl text-[#20252C] font-semibold'>About judgment</h3>
                            <p className='text-sm md:text-2xl text-text-body my-6'><div dangerouslySetInnerHTML={{ __html: data.description }} /></p>

                        </div>


                    </div>
                    

                </div>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-10'>
                        <div>
                            <DatePicker className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' format="yyyy-MM-dd" onChange={setToDate} value={toDate} />
                        </div>
                        <div>
                            <DatePicker className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' format="yyyy-MM-dd" onChange={setFormDate} value={formDate} />
                        </div>
                        
                    </div>
                
                            {/* <button onClick={() => submitRequest(data.id)} className='btn-update mx-auto mb-8'>{t('request.RequestReferee')}</button> */}
                            <button onClick={() => openModal(true) } className=' px-8 font-semibold flex items-center justify-center  text-base text-[#20252C]  py-3 bg-[#EFDC58]  rounded-xl'>{t('request.RequestReferee')}</button>
                        


                </div>
                <Comfirmed name='Referee' closeModal={closeModal} modalIsOpen={modalIsOpen} fun={()=>submitRequest(data.id)} />
            </div>
            <Footer />
        </section>
    );
};

export default RefereeSingle;