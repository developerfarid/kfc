import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiAddFill } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';

const Academy = () => {
    let navigate = useNavigate();
    let academyname = React.createRef();
    let image = React.createRef();
    let contactno = React.createRef();
    let address = React.createRef();
    let maplocation = React.createRef();
    let isPhotoAttached = 'NO';
    let photo = null;
    let dbID = 0;
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('NA');
    const [isImagePresent, setIsImagePresent] = useState(false);
    const [descVal, setDescVal] = useState();
    const handleDescChange = (event) => {
        setDescVal(event.target.value);
    };
    useEffect(() => {
        dbID = id;
        console.log('dbID->' + dbID);

        async function fetchData() {
            if (id > 0) {
                var formData = new FormData();
                formData.append('tablename', 'academy');
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
                                console.log('name->' + detail.name);
                                academyname.current.value = detail.name;
                                academyname.current.focus();
                                contactno.current.value = detail.contactno;
                                address.current.value = detail.address;
                                maplocation.current.value = detail.maplocation;
                                setDescVal(detail.description);
                                if (detail.img_path.length > 10) {
                                    setIsImagePresent(true);
                                    console.log(window.IMG_HOST_URL+detail.img_path);
                                    setImageURL(window.IMG_HOST_URL+detail.img_path);
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
                    url: window.BACK_END_URL + 'academyAndGymDetail.php',
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
            if (imgSize > (window.MAX_IMAGE_SIZE-1)) {
                alert('Image size must be less than '+window.MAX_IMAGE_SIZE+'kb');
                image.current.value = "";
                setSelectedImage(null);
            } else {
                setSelectedImage(event.target.files[0]);
            }
        }
    };

    function addAcademy() {
        try {
            let _crud = 'create';
            if (id > 0) {
                _crud = 'update';
            }

            console.log(academyname.current.value);
            //console.log(image.current.value);
            //console.log(image.current.files[0]);            
            if (academyname.current.value.length < 3) {
                alert('Please Enter Coach Name');
                return false;
            }
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
            formData.append('token', localStorage.getItem('admin'));
            formData.append('dbID', id);
            formData.append('academyname', academyname.current.value);
            formData.append('isPhotoAttached', isPhotoAttached);
            formData.append('image', photo);
            formData.append('contactno', contactno.current.value);
            formData.append('address', address.current.value);
            formData.append('maplocation', maplocation.current.value);
            formData.append('description', descVal);

            console.log(formData);
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
                        navigate('/Dashboard/AcademyList');
                    } else {
                        alert(responseObj[0]);
                        if (responseObj[0] == 'Please Login') {
                            localStorage.removeItem("dToken");
                                localStorage.removeItem("admin");
                            window.location.href = "/Login";
                        }
                    }
                },
                error: function (html) {
                    //alert(html);
                    console.log(html);
                },
                url: window.BACK_END_URL + 'academyMaster.php',
                cache: false
            });
        } catch (err) {
            alert(err);
        }
    }

    function deleteAcademy() {
        try {
            let _crud = 'create';
            if (id > 0) {
                _crud = 'delete';
                var formData = new FormData();
                formData.append('crud', _crud);
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                formData.append('academyname', '');
                formData.append('isPhotoAttached', '');
                formData.append('contactno', '');
                formData.append('address', '');
                formData.append('maplocation', '');
                formData.append('description', '');
    
                console.log(formData);
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
                            navigate('/Dashboard/AcademyList');
                        } else {
                            alert(responseObj[0]);
                            if (responseObj[0] == 'Please Login') {
                                localStorage.removeItem("dToken");
                                localStorage.removeItem("admin");
                                window.location.href = "/Login";
                            }
                        }
                    },
                    error: function (html) {
                        //alert(html);
                        console.log(html);
                    },
                    url: window.BACK_END_URL + 'academyMaster.php',
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
                <h2 className='text-lg'>Registration  <span className='text-gray-600'>(Academy)</span></h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='mt-24 p-8'>
                    <div className='bg-bg-gray rounded-2xl'>
                        <div className='container flex flex-col  justify-center'>
                            <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >

                                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                <div className='md:grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="academyname">
                                            Name
                                        </label>
                                        {/* <input className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='username' placeholder="Janson king" {...register("displayName", { required: true })} />
                                    {errors?.displayName && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={academyname} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='academyname' placeholder="Academy Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="image">
                                            Image
                                        </label>
                                        {/* <input type='file' className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='Image'  {...register("image", { required: true })} />
                                    {errors?.image && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={image} onChange={checkFileSize} type='file' className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='image' />
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
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="contactno">
                                            Contact No
                                        </label>
                                        {/* <input type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='contact' placeholder="SAR 3500" {...register("contact", { required: true })} />
                                    {errors?.contact && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={contactno} type='number' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='contactno' placeholder="contact number" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="address">
                                            Address
                                        </label>
                                        {/* <input type='text' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='address' placeholder="5" {...register("address", { required: true })} />
                                    {errors?.address && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={address} type='text' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='address' placeholder="Address" />
                                    </div>
                                    <div className=' col-span-full'>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="maplocation">
                                            Map Location
                                        </label>
                                        {/* <input type='text' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='maplocation' placeholder="5" {...register("maplocation", { required: true })} />
                                    {errors?.maplocation && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <input ref={maplocation} type='text' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='maplocation' placeholder="map location" />
                                    </div>
                                    <div className=' col-span-full'>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="description">
                                            Description
                                        </label>
                                        {/* <textarea className='w-full h-36 px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='description' placeholder="Textarea" {...register("description", { required: true })} />
                                    {errors?.description && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                                        <textarea  value={descVal} onChange={handleDescChange} className='w-full h-36 px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='description' placeholder="More details about academy" />
                                    </div>

                                    {id == 0 && (
                                        <button onClick={addAcademy} className='w-full font-semibold flex items-center justify-center col-span-full text-base text-[#20252C]  py-3 bg-[#EFDC58] mt-8 rounded-xl'><MdOutlineSaveAlt className='mr-2 text-2xl' />Save</button>
                                    )}
                                    {id > 0 && (
                                        <div className='flex space-x-4 mt-5 '>
                                            <button onClick={deleteAcademy} className=' w-1/2 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6'><RiAddFill className='transform rotate-45 mr-3 text-2xl' /> Delete</button>
                                            <button onClick={addAcademy} className=' w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6'><BsCheckCircle className=' mr-3 text-2xl' /> Update</button>
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

export default Academy;