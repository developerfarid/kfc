import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline, IoMdNotificationsOutline } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import './new.css'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const NewsApproved = () => {
    let navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);

    const [checkId, setCheckId] = useState(null);

    const [isDataPresent, setIsDataPresent] = useState(false);
    const [open, setOpen] = useState('');
    const [o, setO] = useState(false);
    //const [data, setData] = useState(array);
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 5;
    const pagesVisited = pageNumber * dataPerPage;
    let searchInput = React.createRef();


    const onDisableCheckboxChange = (id) => (e) => {
        let isNewsActive = 0;
        if (e.target.type === 'checkbox' && !e.target.checked) {
            console.log('Cb Checked -> Enable: id->' + id);
            isNewsActive = 1;


        } else {
            console.log('Not Checked -> Disable: id->' + id);
            isNewsActive = 0;


        }
        activateOrDeactivateNews(id, isNewsActive);
        window.location.reload();
    }

    const goToEditPage = (id) => {
        console.log('Going To Call Edit Page with ID=' + id);
        navigate('/Dashboard/NewsAdd/' + id);
    }

    function searchForNews() {
        getData(searchInput.current.value);
    }

    function activateOrDeactivateNews(id, isNewsActive) {
        try {
            let _crud = 'create';
            if (id > 0) {
                _crud = 'isactive';
                var formData = new FormData();
                formData.append('crud', _crud);
                formData.append('tablename', 'news');
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                formData.append('heading', '');
                formData.append('isPhotoAttached', 'NO');
                formData.append('subheading', '');
                formData.append('news_full', '');
                formData.append('isActive', isNewsActive);
                formData.append('language', '');
                formData.append('category', '');
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
                    url: window.BACK_END_URL + 'newsMaster.php',
                    cache: false
                });
            }
        } catch (err) {
            alert('activateOrDeactivateNews()' + err);
        }
    }

    useEffect(() => {
        async function fetchData() {
            getData('');
        }
        fetchData();
    }, []);

    function getData(_searchfor) {
        try {
            var formData = new FormData();
            formData.append('tablename', 'news');
            formData.append('token', localStorage.getItem('admin'));
            formData.append('searchfor', _searchfor);
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
                            setDataArray(fetchedData);
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
                url: window.BACK_END_URL + 'newsList.php',
                cache: false
            });
        } catch (err) {
            alert('getData()' + err);
        }
    }

    const displayData = dataArray.slice(pagesVisited, pagesVisited + dataPerPage).map((item, index) => {
        return (
            <>
                <tr key={item.id} className='bg-bg-body pb-5'>
                    <td className='py-3  my-2 rounded-l-lg'>{item.heading}</td>
                    <td className='py-3 my-2'>{item.modifiedon}</td>
                    <td className='py-3 my-2'>

                        <div className="flex items-center justify-center -z-0 w-full">
                            <label htmlFor={item.id} className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id={item.id} defaultChecked={item.isActive == '1' ? false : true} className="sr-only" onClick={onDisableCheckboxChange(item.id)} />
                                    <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                                    <div className={`  ${item.isActive == '1' ? " bg-[#39B54A]" : "bg-red-600"} dot absolute left-1 top-1 w-6 h-6 rounded-full transition  `}></div>
                                </div>
                            </label>
                        </div>

                    </td>
                    <td className='py-3 my-2 rounded-r-lg relative'><AiOutlineEdit onClick={() => goToEditPage(item.id)} className='ext-2xl z-0 cursor-pointer ' /></td>
                </tr>
            </>
        )
    })





    const handleClick = (id) => {
        setOpen(id)
        setO(!o)
    }

    const pageCount = Math.ceil(dataArray.length / dataPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)

    }
    return (
        <>
            <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                <h2 className='text-lg'>All News</h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='mt-24 p-8'>
                    <div className='flex justify-between mb-8'>
                        <div className="relative text-gray-600  focus-within:text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <button onClick={searchForNews} className="p-1  focus:outline-none focus:shadow-outline">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </span>
                            <input ref={searchInput} type="search" name="q" className="py-4 text-sm text-white  rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search property" autoComplete="off" />
                        </div>
                        <Link className='w-48  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6' to="/Dashboard/NewsAdd/0"><IoIosAddCircleOutline className='mr-3 text-2xl' />Add News</Link>
                    </div>

                    <div className='bg-bg-gray rounded-2xl'>
                        <div className='container flex flex-col  justify-center'>

                            <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >

                                <table className="table-auto text-center">
                                    <thead className='pb-3'>
                                        <tr>

                                            <th className='pb-3 text-lg font-semibold'>News Heading</th>
                                            <th className='pb-3 text-lg font-semibold'>Modified</th>
                                            <th className='pb-3 text-lg font-semibold'>Active</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {isDataPresent && displayData}

                                    </tbody>

                                </table>
                            </div>
                            <div className='flex justify-between w-full mb-8 -mt-8 px-12'>
                                <p>Page {pageNumber + 1} of {pageCount}</p>
                                <ReactPaginate
                                    previousLabel={"< Previous"}
                                    nextLabel={"Next >"}
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
                            {/* <div className='flex justify-center -mt-5 mb-12'>
                                <button className=' w-48 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6'> Reject</button>
                                <button className=' w-48  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6'>Approve</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsApproved;
