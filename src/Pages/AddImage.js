import $ from 'jquery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Share/Footer';
import Header from '../Components/Share/Header';
import imgicn from '../image/Frame 10222.png';

const AddImage = () => {
    const { t } = useTranslation();
    let navigate = useNavigate();
    let name = React.createRef();
    let image = React.createRef();
    let isPhotoAttached = 'NO';
    let photo = null;
    function addToDB() {
        try {
            if (localStorage.getItem("uToken") === null) {
                alert('Please Login');
            } else {
                let _crud = 'create';
                if (image.current.files[0] === 'undefined' || image.current.value.length < 3) {
                    console.log("image.current.files[0] === 'undefined'");
                    isPhotoAttached = 'NO';
                    photo = null;
                } else {
                    photo = image.current.files[0];
                    var formData = new FormData();
                    formData.append('token', localStorage.getItem('uToken'));
                    formData.append('image', photo);
                    formData.append('name', name.current.value);

                    $.ajax({
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function (data) {
                            var responseObj = JSON.parse(data);
                            if (responseObj[0] === 'SUCCESS') {
                                document.getElementById('image').value = '';
                                alert(responseObj[1]);
                                navigate('/Addimage');
                            } else {
                                alert(responseObj[0]);
                            }
                        },
                        error: function (html) {
                            //alert(html);
                            console.log(html);
                        },
                        url: window.BACK_END_URL + 'userPhotoUpload.php',
                        cache: false
                    });
                }
            }

        } catch (err) {
            alert(err);
        }
    }
    return (
        <section>
            <Header />
            <div className='container font-Inter'>
                <div className='flex md:justify-center items-center py-4 md:pt-12 md:pb-8'><h3 className='text-xl md:text-4xl font-semibold'>{t("MenuTop.AddImage")} </h3>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 bg-white   pb-16'>
                    <div className=' flex flex-col justify-center gap-6'>
                        <div className='rounded-lg w-full md:w-[354px] p-2 h-[254px] border'>
                        <div className='relative w-full md:w-[336px]   flex-col flex justify-center items-center p-3 h-[236px] rounded-lg border-2 text-center border-red-400 border-dashed gap-2 '>
                                <img className='w-12  h-12 inline-block' src={imgicn} alt="" />
                                <h3 >
                                    {t("kooraBanner.UploadImage")}

                                </h3>
                                <p className='text-[14px]  text-text-body '>{t("kooraBanner.Acceptedfill")}</p>
                                <input type="file" ref={image} accept="image/*" className='opacity-0 cursor-pointer absolute left-0 top-0 w-full h-full' id="image" />
                            </div>
                        </div>

                        <input ref={name} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='imageTitle' placeholder="Image Title" type="text" name="" />
                        <button onClick={addToDB} className='btn-update w-48 btn-update '>{t("common.sent")}</button>
                    </div>

                </div>

            </div>
            <Footer />

        </section>
    );
};

export default AddImage;