import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiAddFill } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import $ from 'jquery';
import DatePicker from "react-date-picker";
import { useNavigate, useParams } from 'react-router-dom';


const Referee = () => {
    let navigate = useNavigate();
    let name = React.createRef();
    let image = React.createRef();
    let salary = React.createRef();
    let totalmatch = React.createRef();
    let noofteams = 0;
    let city = React.createRef();
    let weight = React.createRef();
    let height = React.createRef();
    let dob = React.createRef();
    let isPhotoAttached = 'NO';
    let photo = null;
    let dbID = 0;
    const { id } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('NA');
    const [isImagePresent, setIsImagePresent] = useState(false);
    const [descVal, setDescVal] = useState();
    const handleDescChange = (event) => {
        setDescVal(event.target.value);
    };
    const formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        return [year, month, day].join('-');
    }

    useEffect(() => {
        dbID = id;
        console.log('dbID->' + dbID);

        async function fetchData() {
            if (id > 0) {
                var formData = new FormData();
                formData.append('tablename', 'referees');
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                $.ajax({
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) {
                        //console.log(data);
                        var responseObj = JSON.parse(data);
                        if (responseObj[0] == 'SUCCESS') {
                            //alert(responseObj[1]);
                            if (responseObj[1] == 'DATA_FOUND') {
                                //console.log(responseObj[2]);
                                const detail = responseObj[2][0];
                                console.log('detail->' + detail);
                                name.current.value = detail.name;
                                name.current.focus();
                                salary.current.value = detail.salary;
                                totalmatch.current.value = detail.totalmatch;
                                city.current.value = detail.city;
                                height.current.value = detail.height;
                                weight.current.value = detail.weight;
                                if (detail.dob == '0000-00-00') {
                                    //setStartDate(null);
                                } else {
                                    console.log('detail.dob->' + detail.dob);
                                    setStartDate(new Date(detail.dob));
                                }
                                setDescVal(detail.description);

                                if (detail.img_path.length > 10) {
                                    setIsImagePresent(true);
                                    console.log(window.IMG_HOST_URL + detail.img_path);
                                    setImageURL(window.IMG_HOST_URL + detail.img_path);
                                } else {
                                    setIsImagePresent(false);
                                    setImageURL('NA');
                                }
                            } else {
                                alert(responseObj[1]);
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
                    url: window.BACK_END_URL + 'coachAndRefDetail.php',
                    cache: false
                });
            }
        }
        fetchData();
    }, []);
    const checkFileSize = (event) => {
        console.log(event.target.files[0]);
        var file = event.target.files[0];
        if (file) {
            var imgSize = (file.size / 1024);
            if (imgSize > (window.MAX_IMAGE_SIZE - 1)) {
                alert('Image size must be less than ' + window.MAX_IMAGE_SIZE + 'kb');
                image.current.value = "";
                setSelectedImage(null);
            } else {
                setSelectedImage(event.target.files[0]);
            }
        }
    };
    function addToDB() {
        try {
            let _crud = 'create';
            if (id > 0) {
                _crud = 'update';
            }

            if (name.current.value.length < 3) {
                alert('Please Enter Refree Name');
                return false;
            }
            console.log('startDate->' + startDate);
            var _dob = '0000-00-00';
            if (typeof startDate == 'undefined') {
                //console.log('Ayyappa->_dob->undefined' + _dob);
                _dob = '0000-00-00';
            } else {
                _dob = formatDate(startDate);
            }
            console.log('_dob->' + _dob);

            if (image.current.files[0] === 'undefined' || image.current.value.length < 3) {
                console.log("image.current.files[0] === 'undefined'");
                isPhotoAttached = 'NO';
                photo = null;
            }
            else {
                isPhotoAttached = 'YES';
                photo = image.current.files[0];
            }
            var formData = new FormData();
            formData.append('crud', _crud);
            formData.append('tablename', 'referees');
            formData.append('token', localStorage.getItem('admin'));
            formData.append('dbID', id);
            formData.append('name', name.current.value);
            formData.append('isPhotoAttached', isPhotoAttached);
            formData.append('image', photo);
            formData.append('salary', salary.current.value);
            formData.append('totalmatch', totalmatch.current.value);
            formData.append('noofteams', noofteams);
            formData.append('city', city.current.value);
            formData.append('weight', weight.current.value);
            formData.append('height', height.current.value);
            formData.append('dob', _dob);
            formData.append('description', descVal);


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
                        navigate('/Dashboard/RefereeList');
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
                url: window.BACK_END_URL + 'coachAndRefMaster.php',
                cache: false
            });
        } catch (err) {
            alert(err);
        }
    }
    function deleteFrmDB() {
        try {
            let _crud = 'create';
            if (id > 0) {
                _crud = 'delete';
                var formData = new FormData();
                formData.append('crud', _crud);
                formData.append('tablename', 'referees');
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                formData.append('name', '');
                formData.append('isPhotoAttached', 'NO');
                formData.append('salary', 0);
                formData.append('totalmatch', 0);
                formData.append('noofteams', 0);
                formData.append('city', '');
                formData.append('weight', 0);
                formData.append('height', 0);
                formData.append('dob', '');
                formData.append('description', '');
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
                            navigate('/Dashboard/RefereeList');
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
                    url: window.BACK_END_URL + 'coachAndRefMaster.php',
                    cache: false
                });
            }
        } catch (err) {
            alert(err);
        }
    }
    return (
        <>
            <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                <h2 className='text-lg'>Registration  <span className='text-gray-600'>(Referee)</span></h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='mt-24 p-8'>
                    <div className=' bg-bg-gray rounded-2xl'>
                        <div className='container flex flex-col  justify-center'>
                            <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >

                                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                <div className='md:grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="name">
                                            Name
                                        </label>
                                        {/* <input className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='username' placeholder="Janson king" {...register("displayName", { required: true })} /> */}
                                        <input ref={name} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='name' placeholder="Name" />
                                        {/* {errors?.displayName && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="image">
                                            Image
                                        </label>
                                        {/* <input type='file' className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='Image'  {...register("image", { required: true })} />
                                        {errors?.image && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={image} onChange={checkFileSize} type='file' accept="image/*" className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='image' />
                                        {selectedImage && (
                                            <div>
                                                <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                                <br />
                                                <button onClick={() => { setSelectedImage(null); image.current.value = ""; }}>Remove</button>
                                            </div>
                                        )}
                                        {isImagePresent && (
                                            <div>
                                                <img src={`${imageURL}`} alt="existing image" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="salary">
                                            Salary
                                        </label>
                                        {/* <input type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='Salary' placeholder="SAR 3500" {...register("salary", { required: true })} />
                                        {errors?.displayName && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={salary} type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='salary' placeholder="Salary" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="totalmatch">
                                            Total Match
                                        </label>
                                        {/* <input type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='match' placeholder="5" {...register("match", { required: true })} />
                                        {errors?.match && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={totalmatch} type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='totalmatch' placeholder="" />
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="city">
                                            City
                                        </label>
                                        {/* <input className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='city' placeholder="Sunamganj" {...register("city", { required: true })} />
                                        {errors?.city && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={city} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='city' placeholder="City" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="weight">
                                            Weight
                                        </label>
                                        {/* <input type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='weight' placeholder="80" {...register("weight", { required: true })} />
                                        {errors?.weight && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={weight} type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='weight' placeholder="kg" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="height">
                                            Height
                                        </label>
                                        {/* <input type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='height' placeholder="5" {...register("height", { required: true })} />
                                        {errors?.height && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={height} type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='height' placeholder="cm" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="dob">
                                            Dob
                                        </label>
                                        {/* <input type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='dob' placeholder="5" {...register("dob", { required: true })} />
                                        {errors?.dob && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        {/* <DatePicker ref={dob} id="dob" dateFormat="yyyy-MM-dd"  showMonthDropdown showYearDropdown adjustDateOnChange selected={startDate} onChange={(date) => setStartDate(date)} placeholder="Pick a date" className='px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' /> */}
                                        <DatePicker ref={dob} format="yyyy-MM-dd" onChange={setStartDate} value={startDate} />
                                    </div>
                                    <div className=' col-span-full'>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="description">
                                            Description
                                        </label>
                                        {/* <textarea className='w-full h-36 px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='description' placeholder="Textarea" {...register("description", { required: true })} />
                                        {errors?.description && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <textarea value={descVal} onChange={handleDescChange} className='w-full h-36 px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='description' placeholder="Information about Refreee" />
                                    </div>
                                    {id == 0 && (
                                        <button onClick={addToDB} className='w-full font-semibold flex items-center justify-center col-span-full text-base text-[#20252C]  py-3 bg-[#EFDC58] mt-8 rounded-xl'><MdOutlineSaveAlt className='mr-2 text-2xl' />Save</button>
                                    )}
                                    {id > 0 && (
                                        <div className='flex space-x-4 mt-5 '>
                                            <button onClick={deleteFrmDB} className=' w-1/2 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6'><RiAddFill className='transform rotate-45 mr-3 text-2xl' /> Delete</button>
                                            <button onClick={addToDB} className=' w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6'><BsCheckCircle className=' mr-3 text-2xl' /> Update</button>
                                        </div>
                                    )}
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Referee;