import React, { useState } from 'react';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import img from "../image/academynews.png"
import Calendar from 'react-calendar';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
import Comfirmed from '../Components/Share/Comfirmed';
import Swal from 'sweetalert2';

const GymSingle = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    let location = useLocation();
    //console.log('location.state.academy->'+location.state.academy.name);
    const data = location.state.data;
    const formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        return [year, month, day].join('-');
    }
    function submitRequest(_id){
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
        }else{
            var selDate = formatDate(selectedDate);
            console.log('_id->'+_id + ',selDate->' + selDate);
            try {
                var formData = new FormData();
                formData.append('type', 'gym');
                formData.append('token', localStorage.getItem('uToken'));
                formData.append('dbID', _id);
                formData.append('date_from', selDate);
                formData.append('date_to', '');
                $.ajax({
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) {
                        console.log('data->'+ data);
                        var responseObj = JSON.parse(data);
                        console.log('responseObj->'+responseObj);
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
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const {  t } = useTranslation()
    return (
        <section>
            <Header />
            <div className='container'>
                <div className='flex justify-between items-center py-5'><h3 className='text-xl md:text-4xl font-semibold'>{t("request.GymDetails")} </h3>   <span className=' flex justify-center items-center  w-[36px] h-[36px] rounded-full p-1 text-white bg-[#879ba9]  text-xl'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0398 6.73011C14.4913 7.63133 15.4234 8.25 16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 5.94217 13.8544 6.35997 14.0398 6.73011ZM14.0398 6.73011L7.96021 9.76989M7.96021 12.2301C8.14564 11.86 8.25 11.4422 8.25 11C8.25 10.5578 8.14564 10.14 7.96021 9.76989M7.96021 12.2301C7.50872 13.1313 6.57661 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.48122 3.98122 8.25 5.5 8.25C6.57661 8.25 7.50872 8.86867 7.96021 9.76989M7.96021 12.2301L14.0398 15.2699M14.0398 15.2699C13.8544 15.64 13.75 16.0578 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C15.4234 13.75 14.4913 14.3687 14.0398 15.2699Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3  md:gap-4'>
                    <div className='col-span-2'><img className='w-full mb-4 md:mb-0' src={`${window.IMG_HOST_URL}${data.img_path}`} alt="" /></div>
                    <div className='col-span-1 grid gap-y-4'><img className=' w-full ' src={`${window.IMG_HOST_URL}${data.img_path}`} alt="" /><img className='w-full' src={`${window.IMG_HOST_URL}${data.img_path}`} alt="" /></div>
                </div>
                <div className='grid md:grid-cols-12 py-10'>
                    <div className='py-5 col-span-12 md:col-span-7  md:px-5  '>
                        <div className='space-y-3'>
                            <h3 className='text-4xl font-semibold'>{data.name}</h3>
                            <p className='flex items-center text-[#515151] text-[18px]'><svg className='mr-2 rtl:ml-2' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="2" stroke="#515151" strokeWidth="1.5" />
                                <path d="M15 8C15 11.63 11.2667 15.8246 9.25293 17.8233C8.55016 18.5208 7.44984 18.5208 6.74707 17.8233C4.73328 15.8246 1 11.63 1 8C1 3.02944 4.13401 1 8 1C11.866 1 15 3.02944 15 8Z" stroke="#515151" strokeWidth="1.5" />
                            </svg>

                            {data.maplocation}
                            </p>
                            <div className='grid grid-cols-3  lg:grid-cols-3 items-center'>
                                <div className='text-center border-r-2 my-4 space-y-2'>
                                    <h5 className='text-lg md:text-2xl font-semibold'>{data.datestarted}</h5>
                                    <p className='text-text-body text-sm md:text-base'>{t("request.DateofEstablishment")}  </p>
                                </div>
                                <div className='text-center  border-r-2 my-4 space-y-2 px-1'>
                                    <h5 className='text-lg md:text-2xl font-semibold'> 12</h5>
                                    <p className='text-text-body text-sm md:text-base'>{t("request.Length")}  </p>
                                </div>
                              
                                <div className='text-center  my-4 space-y-2 px-1'>
                                    <h5 className='text-lg md:text-2xl font-semibold'>40</h5>
                                    <p className='text-sm md:text-base text-text-body'> {t("request.Subscriptionprice")} </p>
                                </div>

                            </div>
                            <h3 className='text-xl md:text-3xl text-[#20252C] font-semibold'>About Sport Club</h3>
                            <p className='text-sm md:text-2xl text-text-body my-6'><div dangerouslySetInnerHTML={{ __html: data.description}} /></p>

                        </div>


                    </div>
                    <div className='col-span-12 md:col-span-5'>
                        <div className='bg-bg-hover-yellow p-4 md:p-8'>
                            <h3 className='font-semibold text-2xl text-text-body mb-5'>{t("request.SelectDate")} </h3>
                            <div>
                            <Calendar className='w-full' onChange={setSelectedDate} value={selectedDate} />
</div>
                            <div className='flex justify-between mt-8'>
                            <button onClick={() => openModal(true) } className=' px-8 font-semibold flex items-center justify-center  text-base text-[#20252C]  py-3 bg-[#EFDC58]  rounded-xl'>{t("news.SendRequest")}</button>
                                {/* <button onClick={() => submitRequest(data.id)} className='btn-update w-full'>{t("news.SendRequest")}</button> */}
                                <br />
                                <div className='text-center w-36 border border-[#BABBBE]  rounded-lg p-3'>
                                    <p className='text-[15px] text-bg-yellow'>SAR400</p>
                                    <p className='text-[13px] text-[#515151] whitespace-nowrap'>{t('common.Permatch')}</p>

                                </div>
                            </div>
                            <Comfirmed name='Gym' closeModal={closeModal} modalIsOpen={modalIsOpen} fun={()=>submitRequest(data.id)} />
                        </div>

                    </div>

                </div>


            </div>
            <Footer />
        </section>
    );
};

export default GymSingle;