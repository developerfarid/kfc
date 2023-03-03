import React, { useState, useEffect } from 'react';
import { IoMdNotificationsOutline, IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

const GymList = () => {
    let navigate = useNavigate();
    const [dataArray, setData] = useState([]);
    const [isDataPresent, setIsDataPresent] = useState(false);
    useEffect(() => {
        async function fetchData() {
            var formData = new FormData();
            formData.append('tablename', 'gym');
            formData.append('token', localStorage.getItem('admin'));
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) {
                    console.log(data);
                    var responseObj = JSON.parse(data);
                    if (responseObj[0] == 'SUCCESS') {
                        //alert(responseObj[1]);
                        if (responseObj[1] == 'DATA_FOUND') {
                            console.log(responseObj[2]);
                            const fetchedData = responseObj[2];
                            setData(fetchedData);
                            setIsDataPresent(true);
                        } else {
                            alert(responseObj[1]);
                            setIsDataPresent(false);
                        }
                    } else {
                        alert(responseObj[0]);
                        if (responseObj[0] == 'Please Login') {
                            localStorage.removeItem("dToken");
                            localStorage.removeItem("admin");
                            navigate('/Login');
                        }
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'academyAndGymList.php',
                cache: false
            });
        }
        fetchData();
    }, []);
    return (
        <>
            <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                <h2 className='text-lg'>Registration  <span className='text-gray-600'>(Gym)</span></h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='flex justify-end mb-8 px-8 pt-8'>

                    <Link to='/Dashboard/Gym/0' className='btn-update'><IoIosAddCircleOutline className=' mr-3 text-2xl' /> Add Gym</Link>
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
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Date Started</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Coaches</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Location</th>
                                            <th className='pb-3 text-sm md:text-lg font-semibold'>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>

                                        {isDataPresent && (dataArray.map((item, index) => (
                                            <><tr className='bg-bg-body' key={item.id}>
                                                <td className='py-3 my-2 rounded-l-lg'>{index + 1}</td>
                                                <td className='py-3 my-2'>{item.name}</td>
                                                <td className='py-3 my-2'>{item.datestarted}</td>
                                                <td className='py-3 my-2'>{item.coaches}</td>
                                                <td className='py-3 my-2'>{item.maplocation}</td>
                                                <td className='py-3 my-2 rounded-r-lg '>
                                                    <Link to={`/Dashboard/Gym/${item.id}`}><AiOutlineEdit className='text-center inline-block' /></Link>
                                                </td>
                                            </tr>
                                                <tr><td colSpan='6'>&nbsp;</td></tr>
                                            </>
                                        )))}
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

export default GymList;