import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { useForm } from 'react-hook-form';
import Modal from "react-modal";
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';

const PhotoAdd = () => {
    // const { handleSubmit, formState: { errors } } = useForm();

    // const [images, setImages] = useState('')
    // const [modalIsOpen, setIsOpen] = useState(false);
    // const onSubmit = data => {
    //     data['images'] = images
    //     console.log(data);
    // };
    const { id } = useParams();
    let navigate = useNavigate();
    let image = React.createRef();
    let name = React.createRef();
    let isPhotoAttached = 'NO';
    let photo = null;
    let dbID = 0;
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageData, setData] = useState([]);
    const [isImagePresent, setIsImagePresent] = useState(false);

    useEffect(() => {
        dbID = id;
        console.log('dbID->' + dbID);

        async function fetchData() {
            if (id > 0) {
                var formData = new FormData();
                formData.append('tablename', 'photo_gallery');
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
                                console.log('id->' + detail.id);

                                if (detail.image.length > 10) {
                                    setIsImagePresent(true);
                                    setData(detail.image);
                                } else {
                                    setIsImagePresent(false);
                                    setData([]);
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
                    url: window.BACK_END_URL + 'photoDetail.php',
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

            if (image.current.files[0] === 'undefined' || image.current.value.length < 3) {
                console.log("image.current.files[0] === 'undefined'");
                isPhotoAttached = 'NO';
                photo = null;
            } else {
                isPhotoAttached = 'YES';
                photo = image.current.files[0];
                var formData = new FormData();
                formData.append('crud', _crud);
                formData.append('tablename', 'photo_gallery');
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                formData.append('isPhotoAttached', isPhotoAttached);
                formData.append('isApproved', 0);
                formData.append('image', photo);
                formData.append('name', name.current.value);

                $.ajax({
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) {
                        console.log(data);
                        var responseObj = JSON.parse(data);
                        if (responseObj[0] == 'SUCCESS') {
                            setSelectedImage(null);
                            document.getElementById('image').value = '';
                            document.getElementById('name').value = '';
                            alert(responseObj[1]);
                            navigate('/Dashboard/PhotoAdd/0');
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
                    url: window.BACK_END_URL + 'photoMaster.php',
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
                <h2 className='text-lg'>Photo Gallery  <span className='text-gray-600'>(Add Photo)</span></h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='mt-24 p-8'>
                    <div className='bg-bg-gray rounded-2xl'>
                        <div className='container flex flex-col  justify-center'>
                            <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >
                                <div className='md:grid md:grid-cols-2 gap-5'>
                                    <div className='col-span-full'>
                                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="name">
                                            Title
                                        </label>
                                        <input ref={name} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='name' placeholder="Image Title" />
                                    </div>
                                    <div className='col-span-full'>
                                    <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="image">
                                            Photo
                                        </label>
                                        <input ref={image} onChange={checkFileSize} type='file' accept="image/*" className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='image' />
                                        {selectedImage && (
                                            <div className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10'>
                                                <img className='w-[300px] md:w-[600px] rounded-xl' alt="image" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                                <div className='flex space-x-4 mt-5' >
                                                    <button className=' w-1/2 bg-red-600  text-white   flex items-center justify-center  py-3  rounded-lg px-6' onClick={() => { setSelectedImage(null); image.current.value = ""; }}>Remove</button>
                                                    <button onClick={addToDB} className='text-w w-1/2 bg-bg-yellow text-text-body flex items-center justify-center  py-3 rounded-lg px-6'> Save</button>

                                                </div>
                                            </div>
                                        )}
                                        {isImagePresent && (
                                            <div className='w-full px-6 py-2 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10'>
                                                <img className='w-[300px] md:w-[600px] rounded-xl' src={`data:image/png;base64,${imageData}`} alt="existing image" />
                                            </div>
                                        )}
                                    </div>
                                                                       
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhotoAdd;