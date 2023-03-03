import React, { useState, useEffect } from "react";
import { RiAddFill } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import { IoMdNotificationsOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

const AgencyUser = () => {
    const [open, setOpen] = useState('')
    const [o, setO] = useState(false)
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = (id) => {
        setOpen(id)
        setO(!o)
    }
    const array = [
        {
            Name: "Total Football",
            Booking: "20-04-22",
            Requested: "Jijo",

        },
        {
            Name: "Total Football",
            Booking: "20-04-22",
            Requested: "Jijo",

        },
        {
            Name: "Total Football",
            Booking: "20-04-22",
            Requested: "Jijo",

        },
        {
            Name: "Total Football",
            Booking: "20-04-22",
            Requested: "Jijo",

        },
    ]
    let navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () => {
        console.log('searchValue->' + searchValue);
        getData();
    }
    const approveOrReject = (id, isRequestApproved, email, mobile) => {
        console.log('Approval Or Reject: id->' + id + ' isRequestApproved->' + isRequestApproved);
        approveOrRejectRequest(id, isRequestApproved, email, mobile);
    }

    function approveOrRejectRequest(id, isRequestApproved, email, mobile) {
        try {
            if (id > 0) {
                var formData = new FormData();
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                formData.append('isApproved', isRequestApproved);
                formData.append('source', 'agency_user');
                formData.append('searchVal', searchValue);
                formData.append('userid', userId);
                formData.append('password', password);
                formData.append('email', email);
                formData.append('mobile', mobile);
                $.ajax({
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) {
                        console.log(data);
                        var responseObj = JSON.parse(data);
                        if (responseObj[0] == 'SUCCESS') {
                            alert(responseObj[1]);
                            if (responseObj[2] == 'DATA_FOUND') {
                                const fetchedData = responseObj[3];
                                setUserId("");
                                setPassword("");
                                setDataArray(fetchedData);
                                setIsDataPresent(true);                                
                            } else {
                                setUserId("");
                                setPassword("");
                                setDataArray([]);
                                setIsDataPresent(false);                                
                                console.log(responseObj[2]);
                            }
                        } else {
                            alert(responseObj[0]);                            
                        }
                    },
                    error: function (html) {
                        //alert(html);
                        console.log(html);
                    },
                    url: window.BACK_END_URL + 'requestApproveReject.php',
                    cache: false
                });
            }
        } catch (err) {
            alert('approveOrRejectRequest()' + err);
        }
    }
    const [dataArray, setDataArray] = useState([]);
    const [isDataPresent, setIsDataPresent] = useState(false);
    useEffect(() => {
        async function fetchData() {
            console.log('useEffect');
            getData();
        }
        fetchData();
        window.scrollTo(0, 0);
    }, []);
    function getData() {
        try {
            var formData = new FormData();
            formData.append('source', 'agency_user');
            formData.append('token', localStorage.getItem('admin'));
            formData.append('searchVal', searchValue);
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {
                    //console.log(data);
                    var responseObj = JSON.parse(data);
                    console.log(responseObj);
                    if (responseObj[0] == 'SUCCESS') {
                        //alert(responseObj[1]);
                        if (responseObj[1] == 'DATA_FOUND') {
                            console.log(responseObj[2]);
                            const fetchedData = responseObj[2];
                            setDataArray(fetchedData);
                            setIsDataPresent(true);
                        } else {
                            console.log(responseObj[1]);
                            setIsDataPresent(false);
                        }
                    } else {
                        alert(responseObj[0]);
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'requestApproveList.php',
                cache: false
            });
        } catch (err) {
            alert('getData()' + err);
        }
    }
    return (
        <>
            <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                <h2 className='text-lg'>Approval <span className='text-gray-600'>(AgencyUser)</span></h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='flex justify-between mb-8 px-8 pt-8'>
                    <div className="relative text-gray-600   focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button onClick={handleSearch} type="button" className="p-1  focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </span>
                        <input value={searchValue} onInput={e => setSearchValue(e.target.value)} type="search" name="q" className="py-4 text-sm text-white  rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="By Email" autoComplete="off" />
                    </div>
                </div>
                <div className='px-8'>
                    <div className='bg-bg-gray rounded-2xl'>
                        <div className='container px-0 flex flex-col  justify-center'>
                            <div className='dashboard-rawper ' >

                                <table className="table-auto text-center">
                                    <thead className='pb-3'>
                                        <tr>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>No</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Name</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Email</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Mobile</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Date</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Userid</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Passowrd</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Approve?</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>

                                        {isDataPresent &&
                                            dataArray.map((item, index) => (
                                                <>
                                                    <tr className='bg-bg-body'>
                                                        <td className='py-3 my-2 rounded-l-lg'>{index + 1}</td>
                                                        <td className='py-3 my-2'>{item.name}</td>
                                                        <td className='py-3 my-2'>{item.email}</td>
                                                        <td className='py-3 my-2'>{item.mobile}</td>
                                                        <td className='py-3 my-2'>{item.rdate}</td>
                                                        <td className='py-3 my-2'>
                                                            <input
                                                                onChange={(e) => setUserId(e.target.value)}
                                                                type="text"
                                                                placeholder="User ID"
                                                                className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                                                            />
                                                        </td>
                                                        <td className='py-3 my-2'>
                                                            <input
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                type="text"
                                                                placeholder="Password"
                                                                className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl  text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                                                            />
                                                        </td>
                                                        <td className='py-3 my-2 '>
                                                            {/* <input type="checkbox" className="form-checkbox accent-[#5C31D7] w-6 mb-0 h-6" /> */}
                                                            {/* <IoIosCheckmarkCircleOutline className='w-6 mb-0 h-6' /> */}
                                                            <div className="flex space-x-4 mt-5">
                                                                <button onClick={() => approveOrReject(item.id, 2,item.email,item.mobile)} className=" text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6">
                                                                    <RiAddFill className="transform rotate-45 mr-3 text-2xl" />{" "}
                                                                </button>
                                                                <button onClick={() => approveOrReject(item.id, 1,item.email,item.mobile)} className=" w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6">
                                                                    <BsCheckCircle className=" mr-3 text-2xl" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr><td colSpan={8}>&nbsp;</td></tr>
                                                </>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgencyUser;