import React, { useState } from 'react';
import { CgMenuGridR, CgNotes } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { IoIosArrowRoundForward, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { MdAccountBox } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link, Outlet } from 'react-router-dom';
import logo from "../../../image/logo.png";
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    let navigate = useNavigate();
    function logout() {        
        const token = localStorage.getItem('admin');
		console.log(token);
		$.ajax({
			type: 'POST',
			data: 'token='+token,
			success: function (data) {
                //console.log('Logout->data->' + data);
				var responseObj = JSON.parse(data);                
                localStorage.removeItem("dToken");
                localStorage.removeItem("admin");				
                console.log(responseObj[0]);
                navigate('/Login');
			},
			error: function (html) {
				alert(html);
			},
			url: window.BACK_END_URL+'logout.php',
			cache: false
		});
    }
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [open5, setOpen5] = useState(false)
    const handledrop = (e) => {
        switch (e) {
            case '1':
                setOpen1(!open1)
                setOpen2(false)
                setOpen3(false)
                setOpen4(false)
                setOpen5(false)
                break;
            case '2':
                setOpen1(false)
                setOpen2(!open2)
                setOpen3(false)
                setOpen4(false)
                setOpen5(false)
                break;
            case '3':
                setOpen1(false)
                setOpen2(false)
                setOpen3(!open3)
                setOpen4(false)
                setOpen5(false)
                break;
            case '4':
                setOpen1(false)
                setOpen2(false)
                setOpen3(false)
                setOpen4(!open4)
                setOpen5(false)
                break;
                case '5':
                    setOpen1(false)
                    setOpen2(false)
                    setOpen3(false)
                    setOpen4(false)
                    setOpen5(!open5)
                    break;
        
            default:
                setOpen1(false)
                setOpen2(false)
                setOpen3(false)
                setOpen5(false)
                break;
        }
    }
    console.log(open1);
  

    return (
        <section className='overflow-x-hidden'>
            <div className='bg-bg-body md:flex w-full md:w-screen '>
                <div className='md:w-3/12 sm:w-5/12 relative  h-screen md:min-h-screen bg-[#fdfdfd]'>
                   <div className='md:w-3/12 sm:w-5/12 fixed top-0 left-0 bg-white z-50'> <img className='h-20 md:24  mx-auto block text-center z-20 bg-white ' src={logo} alt="" /></div>
                    <div className=' mt-24  overflow-y-auto hidden  md:block'>
                        <ul>
                            <li className={open5 ? "link-desh text-bg-yellow bg-bg-hover-yellow before:w-1.5 " : "link-desh hover:before:w-1.5"}  onClick={() => handledrop("5")}>
                                <Link className='flex items-center   px-8 py-4 ' to="/Dashboard"> <CgMenuGridR className='text-3xl pr-2' /> <span className=''>Dashboard</span> </Link>
                            </li>
                            <li onClick={() => handledrop("1")} className={open1 ? "link-desh text-bg-yellow bg-bg-hover-yellow before:w-1.5 " : "link-desh hover:before:w-1.5"} >
                                <p className='flex items-center justify-between   px-8 py-4 '>  <span className=' '><RiLogoutBoxRLine className='text-3xl pr-2 inline-block' /> Registration</span> <MdOutlineKeyboardArrowUp className={open1 ? "text-3xl transform rotate-180 " : "text-3xl"} /></p>
                            </li>
                            {
                                open1 && <ul className='border-l-2 ml-10 border-gray-400'>
                                    <li>
                                        <Link className=' text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/CoachList"> <IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Coach</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/AcademyList"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Academy</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/RefereeList"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Referee</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/GymList"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Gym</Link>
                                    </li>
                                </ul>
                            }
                            <li onClick={() => handledrop("2")} className={open2 ? "link-desh text-bg-yellow bg-bg-hover-yellow before:w-1.5 " : "link-desh hover:before:w-1.5"} >
                                <p className='flex items-center justify-between   px-8 py-4 '>  <span className=' '><IoMdCheckmarkCircleOutline className='text-3xl pr-2 inline-block' /> Approval</span> <MdOutlineKeyboardArrowUp className={open2 ? "text-3xl transform rotate-180 " : "text-3xl"} /></p>
                            </li>
                            {
                                open2 && <ul className='border-l-2 ml-10 border-gray-400'>
                                    <li>
                                        <Link className=' text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/Approval/Coach"> <IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Coach</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/Approval/Academy"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Academy</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/Approval/Referee"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Referee</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/Approval/Gym"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Gym</Link>
                                    </li>
                                </ul>
                            }
                            <li onClick={() => handledrop("5")} className={open2 ? "link-desh text-bg-yellow bg-bg-hover-yellow before:w-1.5 " : "link-desh hover:before:w-1.5"} >
                                <p className='flex items-center justify-between   px-8 py-4 '>  <span className=' '><MdAccountBox className='text-3xl pr-2 inline-block' /> Agency</span> <MdOutlineKeyboardArrowUp className={open5 ? "text-3xl transform rotate-180 " : "text-3xl"} /></p>
                            </li>
                            {
                                open5 && <ul className='border-l-2 ml-10 border-gray-400'>                                    
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/Agency/AgencyUser"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Approve User</Link>
                                    </li>
                                    <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/Agency/AgencyList"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />List Users</Link>
                                    </li>
                                </ul>
                            }
                            <li onClick={() => handledrop("3")} className={open3 ? "link-desh text-bg-yellow bg-bg-hover-yellow before:w-1.5 " : "link-desh hover:before:w-1.5"} >
                                <p className='flex items-center justify-between   px-8 py-4 ' >  <span className=' '><HiOutlinePhotograph className='text-3xl pr-2 inline-block' />Gallery</span> <MdOutlineKeyboardArrowUp className={open3 ? "text-3xl transform rotate-180 " : "text-3xl"} /></p>

                            </li>
                            {
                                open3 && <ul className='border-l-2 ml-10 border-gray-400'>
                                    <li>
                                        <Link className=' text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/PhotoApprove"> <IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Pics & Videos</Link>
                                    </li>
                                    {/* <li>
                                        <Link className='text-text-body hover:text-bg-yellow transition duration-300 py-2 text-sm flex justify-start items-center' to="/Dashboard/PhotoAdd/0"><IoIosArrowRoundForward className='-ml-2 text-4xl text-gray-400' />Add Photo</Link>
                                    </li> */}

                                </ul>
                            }
                            <li  className={open4 ? "link-desh text-bg-yellow bg-bg-hover-yellow before:w-1.5 " : "link-desh hover:before:w-1.5"} onClick={() => handledrop("4")} >
                                <Link className='flex items-center px-8 py-4  ' to="/Dashboard/NewsApproved"> <CgNotes className='text-3xl pr-2 inline-block' /> <span className=''>NEWS</span> </Link>
                            </li>
                            
                        </ul>
                        <button onClick={logout} className='text-center absolute bottom-8 left-[50%] transform bg-[#FD9F9F42] rounded-md text-red-500 font-semibold px-5 py-3 -translate-x-[50%]  flex items-center '><FiLogOut className="mr-2 text-2xl" />Logout</button>
                    </div>
                </div>
                <div className='md:w-9/12 lg:w-9/12 w-full z-50 '>
                    {/* <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                        <h2 className='text-lg'>Deshboard</h2>
                        <IoMdNotificationsOutline className='text-lg' />
                    </div>
                    <div className='mt-24'> */}
                        <Outlet /> 
                    {/* </div> */}
                </div>

            </div>
        </section>
    );
};

export default DashboardPage;