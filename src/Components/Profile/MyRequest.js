import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import img from "../../image/academynews.png"
import { FaRegCalendarAlt } from 'react-icons/fa';
import $ from 'jquery';

const MyRequest = () => {
    const array = Array.from(Array(3).keys())
    const { t } = useTranslation()
    let navigate = useNavigate();
    const [academyReqArray, setAcademyReqArray] = useState([]);
    const [isAcademyReqPresent, setIsAcademyReqPresent] = useState(false);
    const [coachReqArray, setCoachReqArray] = useState([]);
    const [isCoachReqPresent, setIsCoachReqPresent] = useState(false);
    const [gymReqArray, setGymReqArray] = useState([]);
    const [isGymReqPresent, setIsGymReqPresent] = useState(false);
    const [photoReqArray, setPhotoReqArray] = useState([]);
    const [isPhotoReqPresent, setIsPhotoReqPresent] = useState(false);
    const [refereeReqArray, setRefereeReqArray] = useState([]);
    const [isRefereeReqPresent, setIsRefereeReqPresent] = useState(false);
    useEffect(() => {
        async function fetchData() {
            getData();
        }
        fetchData();
    }, []);

    function getData() {
        try {
            var formData = new FormData();
            formData.append('type', 'user');
            formData.append('token', localStorage.getItem('uToken'));

            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {
                    //console.log(data);
                    var responseObj = JSON.parse(data);
                    console.log(responseObj);
                    if (responseObj['status'] === 'SUCCESS') {
                        if (responseObj['message_academy'] === 'DATA_FOUND') {
                            const fetchedData = responseObj['data_academy'];
                            setAcademyReqArray(fetchedData);
                            setIsAcademyReqPresent(true);
                        } else {
                            console.log(responseObj['message_academy']);
                            setIsAcademyReqPresent(false);
                        }

                        if (responseObj['message_coach'] === 'DATA_FOUND') {
                            const fetchedData = responseObj['data_coach'];
                            setCoachReqArray(fetchedData);
                            setIsCoachReqPresent(true);
                        } else {
                            console.log(responseObj['message_coach']);
                            setIsCoachReqPresent(false);
                        }

                        if (responseObj['message_gym'] === 'DATA_FOUND') {
                            const fetchedData = responseObj['data_gym'];
                            setGymReqArray(fetchedData);
                            setIsGymReqPresent(true);
                        } else {
                            console.log(responseObj['message_gym']);
                            setIsGymReqPresent(false);
                        }

                        if (responseObj['message_photo'] === 'DATA_FOUND') {
                            const fetchedData = responseObj['data_photo'];
                            setPhotoReqArray(fetchedData);
                            setIsPhotoReqPresent(true);
                        } else {
                            console.log(responseObj['message_photo']);
                            setIsPhotoReqPresent(false);
                        }

                        if (responseObj['message_referee'] === 'DATA_FOUND') {
                            const fetchedData = responseObj['data_referee'];
                            setRefereeReqArray(fetchedData);
                            setIsRefereeReqPresent(true);
                        } else {
                            console.log(responseObj['message_referee']);
                            setIsRefereeReqPresent(false);
                        }

                    } else {
                        alert(responseObj['status']);
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'userRequestList.php',
                cache: false
            });
        } catch (err) {
            alert('MyRequest->getData()' + err);
        }
    }
    console.log(academyReqArray, "isAcademyReqPresent");
    console.log(coachReqArray, "isCoachReqPresent");

    return (
        <>
            <div className='flex justify-between items-center py-5'>{isAcademyReqPresent ? 'Academy Request' : ''}</div>
            {
                isAcademyReqPresent && academyReqArray.map((item, i) => (
                    <div className='flex justify-between items-center mb-5' key={i}>
                        <div className='sm:flex'>
                            <img className='w-52 object-cover' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" />
                            <div className='py-3 pl-5 rtl:pr-5 flex justify-between items-start '>
                                <div className='space-y-3'>
                                    <h3 className='text-2xl font-semibold'>{item.name}</h3>
                                    <p className='flex items-center text-[#515151] text-[18px]'><svg className='mr-2 rtl:ml-2' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="2" stroke="#515151" strokeWidth="1.5" />
                                        <path d="M15 8C15 11.63 11.2667 15.8246 9.25293 17.8233C8.55016 18.5208 7.44984 18.5208 6.74707 17.8233C4.73328 15.8246 1 11.63 1 8C1 3.02944 4.13401 1 8 1C11.866 1 15 3.02944 15 8Z" stroke="#515151" strokeWidth="1.5" />
                                    </svg>
                                        {item.maplocation}
                                    </p>
                                    <span className='text-[18px] flex items-center'><FaRegCalendarAlt className='inline-block ltr:mr-1 rtl:ml-1' />{item.booking_date}</span>
                                    <span className={` w-42 font-semibold  ${item.isApproved == '0' ? "bg-[#FF7F7F]" : "bg-[#39B54A]"} text-text-body flex items-center justify-center  py-2 rounded-sm px-6 font-Inter`}>{item.isApproved == '1' ? 'Approved' : 'Approval Pending'}</span>
                                </div>

                            </div>

                        </div>
                        <div className='text-center border border-[#BABBBE]  rounded-lg p-3'>
                            <p className='text-[15px] text-bg-yellow'>SAR400</p>
                            <p className='text-[13px] text-[#515151]'>
                                Per Hour
                            </p>
                        </div>
                    </div>
                ))
            }
            <div className='flex justify-between items-center py-5'>{isCoachReqPresent ? 'Coach Request' : ''}</div>
            {
                isCoachReqPresent && coachReqArray.map((item, i) => (
                    <div className='flex justify-between items-center mb-5' key={i}>
                        <div className='sm:flex'>
                            <img className='w-52 object-cover' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" />
                            <div className='py-3 pl-5 rtl:pr-5 flex justify-between items-start '>
                                <div className='space-y-3'>
                                    <h3 className='text-2xl font-semibold'>{item.name}</h3>
                                    <p className='flex items-center text-[#515151] text-[18px]'><svg className='mr-2' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="2" stroke="#515151" strokeWidth="1.5" />
                                        <path d="M15 8C15 11.63 11.2667 15.8246 9.25293 17.8233C8.55016 18.5208 7.44984 18.5208 6.74707 17.8233C4.73328 15.8246 1 11.63 1 8C1 3.02944 4.13401 1 8 1C11.866 1 15 3.02944 15 8Z" stroke="#515151" strokeWidth="1.5" />
                                    </svg>
                                        {item.city}
                                    </p>
                                    <span className='text-[18px] flex items-center'><FaRegCalendarAlt className='inline-block ltr:mr-1 rtl:ml-1' /> From-{item.date_from} : To-{item.date_to}</span>
                                    <span className={` w-42 font-semibold  ${item.isApproved == '0' ? "bg-[#FF7F7F]" : "bg-[#39B54A]"} text-text-body flex items-center justify-center  py-2 rounded-sm px-6 font-Inter`}>{item.isApproved == '1' ? 'Approved' : 'Approval Pending'}</span>
                                </div>

                            </div>

                        </div>
                        <div className='text-center border border-[#BABBBE]  rounded-lg p-3'>
                            <p className='text-[15px] text-bg-yellow'>SAR{item.salary}</p>
                            <p className='text-[13px] text-[#515151]'>
                                Per Day
                            </p>
                        </div>
                    </div>
                ))
            }

            <div className='flex justify-between items-center py-5'>{isGymReqPresent ? 'Gym Request' : ''}</div>
            {
                isGymReqPresent && gymReqArray.map((item, i) => (
                    <div className='flex justify-between items-center mb-5' key={i}>
                        <div className='sm:flex'>
                            <img className='w-52' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" />
                            <div className='py-3 pl-5 rtl:pr-5 flex justify-between items-start '>
                                <div className='space-y-3'>
                                    <h3 className='text-2xl font-semibold'>{item.name}</h3>
                                    <p className='flex items-center text-[#515151] text-[18px]'><svg className='mr-2' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="2" stroke="#515151" strokeWidth="1.5" />
                                        <path d="M15 8C15 11.63 11.2667 15.8246 9.25293 17.8233C8.55016 18.5208 7.44984 18.5208 6.74707 17.8233C4.73328 15.8246 1 11.63 1 8C1 3.02944 4.13401 1 8 1C11.866 1 15 3.02944 15 8Z" stroke="#515151" strokeWidth="1.5" />
                                    </svg>
                                        {item.maplocation}
                                    </p>
                                    <span className='text-[18px] flex items-center'><FaRegCalendarAlt className='inline-block ltr:mr-1 rtl:ml-1' />{item.booking_date}</span>
                                    <span className={` w-42 font-semibold  ${item.isApproved == '0' ? "bg-[#FF7F7F]" : "bg-[#39B54A]"} text-text-body flex items-center justify-center  py-2 rounded-sm px-6 font-Inter`}>{item.isApproved == '1' ? 'Approved' : 'Approval Pending'}</span>
                                </div>

                            </div>

                        </div>
                        <div className='text-center border border-[#BABBBE]  rounded-lg p-3'>
                            <p className='text-[15px] text-bg-yellow'>SAR{item.fees}</p>
                            <p className='text-[13px] text-[#515151]'>
                                Per Day
                            </p>
                        </div>
                    </div>
                ))
            }

            <div className='flex justify-between items-center py-5'>{isPhotoReqPresent ? 'Photo Request' : ''}</div>
            {
                isPhotoReqPresent && photoReqArray.map((item, i) => (
                    <div className='flex justify-between items-center mb-5' key={i}>
                        <div className='sm:flex'>
                            <img className='w-52' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" />
                            <div className='py-3 pl-5 rtl:pr-5 flex justify-between items-start '>
                                <div className='space-y-3'>
                                    <h3 className='text-2xl font-semibold'>{item.name}</h3>                                    
                                    <span className='text-[18px] flex items-center'><FaRegCalendarAlt className='inline-block ltr:mr-1 rtl:ml-1' />{item.date}&nbsp;&nbsp;&nbsp;{item.time}</span>
                                    <span className={` w-42 font-semibold  ${item.isApproved == '0' ? "bg-[#FF7F7F]" : "bg-[#39B54A]"} text-text-body flex items-center justify-center  py-2 rounded-sm px-6 font-Inter`}>{item.isApproved == '1' ? 'Approved' : 'Approval Pending'}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                ))
            }

            <div className='flex justify-between items-center py-5'>{isRefereeReqPresent ? 'Referee Request' : ''}</div>
            {
                isRefereeReqPresent && refereeReqArray.map((item, i) => (
                    <div className='flex justify-between items-center mb-5' key={i}>
                        <div className='sm:flex'>
                            <img className='w-52' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" />
                            <div className='py-3 pl-5 rtl:pr-5 flex justify-between items-start '>
                                <div className='space-y-3'>
                                    <h3 className='text-2xl font-semibold'>{item.name}</h3>
                                    <p className='flex items-center text-[#515151] text-[18px]'><svg className='mr-2' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="2" stroke="#515151" strokeWidth="1.5" />
                                        <path d="M15 8C15 11.63 11.2667 15.8246 9.25293 17.8233C8.55016 18.5208 7.44984 18.5208 6.74707 17.8233C4.73328 15.8246 1 11.63 1 8C1 3.02944 4.13401 1 8 1C11.866 1 15 3.02944 15 8Z" stroke="#515151" strokeWidth="1.5" />
                                    </svg>
                                        {item.city}
                                    </p>
                                    <span className='text-[18px] flex items-center'><FaRegCalendarAlt className='inline-block ltr:mr-1 rtl:ml-1' /> From-{item.date_from} : To-{item.date_to}</span>
                                    <span className={` w-42 font-semibold  ${item.isApproved == '0' ? "bg-[#FF7F7F]" : "bg-[#39B54A]"} text-text-body flex items-center justify-center  py-2 rounded-sm px-6 font-Inter`}>{item.isApproved == '1' ? 'Approved' : 'Approval Pending'}</span>
                                </div>

                            </div>

                        </div>
                        <div className='text-center border border-[#BABBBE]  rounded-lg p-3'>
                            <p className='text-[15px] text-bg-yellow'>SAR{item.salary}</p>
                            <p className='text-[13px] text-[#515151]'>
                                Per Day
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default MyRequest;