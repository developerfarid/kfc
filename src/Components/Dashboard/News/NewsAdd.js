import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiAddFill } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';

const NewsAdd = () => {
    let navigate = useNavigate();
    let heading = React.createRef();
    let image = React.createRef();
    let subheading = React.createRef();
    let isPhotoAttached = 'NO';
    let photo = null;
    let dbID = 0;
    const [direction, setDirection] = useState('ltr');
    const [align, setAlign] = useState('left');
    const [isArabic, setIsArabic] = useState(false);
    const [language, setLanguage] = useState('en');
    const handleLanguageSelection = (e) => {
        setLanguageParams(e.target.value);
    }
    const [category, setCategory] = useState('general');
    const handleCategorySelection = (e) => {
        setCategory(e.target.value);
    }
    const { id } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('NA');
    const [isImagePresent, setIsImagePresent] = useState(false);
    const [news_full, setNewsFullVal] = useState();
    const handleNewscChange = (event) => {
        setNewsFullVal(event.target.value);
    };
    const formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        return [year, month, day].join('-');
    }

    function setLanguageParams(_lang) {
        if (_lang == 'ar') {
            setDirection('rtl');
            setIsArabic(true);
            setLanguage('ar');
            setAlign('right');
        } else {
            setDirection('ltr');
            setIsArabic(false);
            setLanguage('en');
            setAlign('left');
        }
    }

    useEffect(() => {
        dbID = id;
        console.log('dbID->' + dbID);

        async function fetchData() {
            if (id > 0) {
                var formData = new FormData();
                formData.append('tablename', 'news');
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
                                console.log('heading->' + detail.heading);
                                heading.current.value = detail.heading;
                                heading.current.focus();
                                subheading.current.value = detail.subheading;
                                setNewsFullVal(detail.news_full);
                                setLanguageParams(detail.language);
                                setCategory(detail.category);

                                if (detail.img_path.length > 10) {
                                    setIsImagePresent(true);
                                    //console.log(window.IMG_HOST_URL+detail.img_path);
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
                    url: window.BACK_END_URL + 'newsDetail.php',
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

            if (heading.current.value.length < 3) {
                alert('Please Enter Heading');
                return false;
            }

            if (image.current.files[0] === 'undefined' || image.current.value.length < 3) {
                console.log("image.current.files[0] === 'undefined'");
                isPhotoAttached = 'NO';
                photo = null;
            } else {
                isPhotoAttached = 'YES';
                photo = image.current.files[0];
            }
            var formData = new FormData();
            formData.append('crud', _crud);
            formData.append('tablename', 'news');
            formData.append('token', localStorage.getItem('admin'));
            formData.append('dbID', id);
            formData.append('heading', heading.current.value);
            formData.append('isPhotoAttached', isPhotoAttached);
            formData.append('image', photo);
            formData.append('subheading', subheading.current.value);
            formData.append('news_full', news_full);
            formData.append('isActive', 1);
            formData.append('language', language);
            formData.append('category', category);
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
                        navigate('/Dashboard/NewsApproved');
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
                formData.append('tablename', 'news');
                formData.append('token', localStorage.getItem('admin'));
                formData.append('dbID', id);
                formData.append('heading', '');
                formData.append('isPhotoAttached', '');
                formData.append('subheading', '');
                formData.append('news_full', '');
                formData.append('isActive', 1);
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
                            navigate('/Dashboard/NewsApproved');
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
            alert(err);
        }
    }
    return (
        <>
            <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                <h2 className='text-lg'>News <span className='text-gray-600'>(Add News)</span></h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='mt-24 p-8'>
                    <div className='bg-bg-gray rounded-2xl'>
                        <div className='container flex flex-col  justify-center'>
                            <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >
                                <div className='md:grid md:grid-cols-2 gap-5'>
                                    <div align={align}>
                                        <label className="block  text-gray-600 text-base font-semibold mb-3 " htmlFor="Language">
                                            Language(لغة)&nbsp;&nbsp;&nbsp;
                                        </label>
                                        <select id="Language" value={language} onChange={e => handleLanguageSelection(e)}>
                                            <option value="en">English</option>
                                            <option value="ar">العربية</option>
                                        </select>
                                    </div>
                                    <div align={align}>
                                        <label className="block  text-gray-600 text-base font-semibold mb-3 " htmlFor="Category">
                                            {isArabic ? 'الفئة' : 'Category'}
                                        </label>
                                        <select id="Category" value={category} onChange={e => handleCategorySelection(e)}>
                                            <option value="general">{isArabic ? 'جنرال لواء' : 'General'}</option>
                                            <option value="worldcup">{isArabic ? 'كأس العالم' : 'World Cup'}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={isArabic ? 'block text-gray-600 text-base font-semibold mb-3 float-right' : 'block text-gray-600 text-base font-semibold mb-3 float-left'} htmlFor="heading">
                                            {isArabic ? 'عنوان' : 'Heading'}
                                        </label>
                                        <input ref={heading} dir={direction} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='heading' placeholder={isArabic ? 'عناوين الأخبار' : 'News Heading'} />
                                    </div>
                                    <div>
                                        <label className={isArabic ? 'block text-gray-600 text-base font-semibold mb-3 float-right' : 'block text-gray-600 text-base font-semibold mb-3 float-left'} htmlFor="Image">
                                            {isArabic ? 'صورة إخبارية' : 'News Image'}
                                        </label>
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
                                    <div className=' col-span-full'>
                                        <label className={isArabic ? 'block text-gray-600 text-base font-semibold mb-3 float-right' : 'block text-gray-600 text-base font-semibold mb-3 float-left'} htmlFor="subHeading">
                                            {isArabic ? 'العنوان الفرعي' : 'Sub Heading'}
                                        </label>
                                        <input ref={subheading} dir={direction} type='text' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='subHeading' placeholder={isArabic ? 'لمعاينة الأخبار' : 'For News Preview'} />
                                    </div>
                                    <div className=' col-span-full'>
                                        <label className={isArabic ? 'block text-gray-600 text-base font-semibold mb-3 float-right' : 'block text-gray-600 text-base font-semibold mb-3 float-left'} htmlFor="description">
                                            {isArabic ? 'الإخبارية' : 'News'}
                                        </label>
                                        <textarea value={news_full} dir={direction} onChange={handleNewscChange} className='w-full h-36 px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='description' placeholder={isArabic ? 'محتوى إخباري كامل' : 'Full News Content'} />
                                    </div>
                                    {id == 0 && (
                                        <button onClick={addToDB} className='w-full flex items-center justify-center col-span-full text-base text-[#20252C]  py-3 bg-[#EFDC58] mt-8 rounded-xl' type='submit'><MdOutlineSaveAlt className='mr-2' /> {isArabic ? 'حفظ' : 'Save'}</button>
                                    )}
                                    {id > 0 && (
                                        <div className='flex space-x-4 mt-5 '>
                                            <button onClick={deleteFrmDB} className=' w-1/2 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6'><RiAddFill className='transform rotate-45 mr-3 text-2xl' /> {isArabic ? 'حذف' : 'Delete'}</button>
                                            <button onClick={addToDB} className=' w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6'><BsCheckCircle className=' mr-3 text-2xl' /> {isArabic ? 'تحديث' : 'Update'}</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsAdd;