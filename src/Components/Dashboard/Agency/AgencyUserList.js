import React, { useState, useEffect } from "react";
import { RiAddFill } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import { IoMdNotificationsOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

const AgencyUserList = () => {    
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () => {
        console.log('searchValue->' + searchValue);
        getData();
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
            formData.append('source', 'agency_list');
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
                <h2 className='text-lg'>Approval <span className='text-gray-600'>(AgencyUserList)</span></h2>
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
                                                        <td className='py-3 my-2'>{item.userid}</td>
                                                        <td className='py-3 my-2'>{item.password}</td>                                                        
                                                    </tr>
                                                    <tr><td colSpan={7}>&nbsp;</td></tr>
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

export default AgencyUserList;