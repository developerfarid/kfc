import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import img from '../../image/image 851.png';
import $ from 'jquery';
const customStyles = {
    content: {
        height: '660px',
    },
  };
const HomePageLogin = ({setIsOpen1, setIsOpen2, modalIsOpen2 }) => {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            //console.log('Enter Key Pressed');
            login();
        }
    }
    function login() {
        const formData = { email: email, password: password };
        //console.log(formData);
        $.ajax({
            type: 'POST',
            data: formData,
            success: function (data) {
                //console.log(data);
                var responseObj = JSON.parse(data);
                //console.log(responseObj);
                if (responseObj[0] == 'LOGIN_SUCCESS') {
                    localStorage.setItem('token', email);
                    localStorage.setItem('uToken', responseObj[1]);
                    localStorage.setItem('displayName', responseObj[2]);
                    //window.location.href = '/';
                    setIsOpen2(false);
                } else {
                    alert(responseObj[0]);
                }
            },
            error: function (html) {
                //alert(html);
                console.log(html);
            },
            url: window.BACK_END_URL + 'loginUser.php',
            cache: false
        });
        return false;
    }
    const handleModle = () => {
        setIsOpen1(true);
        setIsOpen2(false);
    }
    return (

        <Modal isOpen={modalIsOpen2}
        style={customStyles}
            onRequestClose={() => setIsOpen2(false)} className='w-11/12 lg:w-2/3 shadow-Tournaments sticky bg-white p-4 md:p-8 h-auto rounded-2xl my-8'>
            <span onClick={() => setIsOpen2(false)} className='cursor-pointer absolute  ltr:right-0 rtl:left-0 top-0 w-12 h-12 flex justify-center items-center text-white border-4 border-white bg-[#3B5998] rounded-full'><CgClose className='text-2xl transform hover:rotate-90 duration-300' /></span>
            <div className='md:grid grid-cols-2 relative items-center'>
                
                <div className='md:flex  items-center '>
                    <img className='w-full p-8 hidden md:block' src={img} alt="" />
                </div>
                <div className='bg-white p-8 rounded-lg font-Inter'>
                    <h1 className='text-center text-3xl font-bold'>{t('loginSystem.Logintoyouraccount')} </h1>
                    {/* <button className='bg-[#3B5998] w-full py-3 rounded-md my-6 text-white'>{t('loginSystem.SignUpwithGoogle')}</button>
                        <p className='relative before:absolute before:w-1/3 before:h-px after:w-1/3 after:h-px after:bg-gray-400 py-4 after:absolute after:right-0 after:top-1/2 text-center   before:bg-gray-400 before:left-0 before:top-1/2'><span className='bg-white px-4 text-gray-400 absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>{t('loginSystem.OrSignUpwithemail')}  </span></p> */}

                    <div className='pb-5'>
                        <label className="block text-[#8A9099] text-base font-medium mb-2" htmlFor="userEmail">
                            {t("common.Email")}
                        </label>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='w-full px-6 py-3 rounded-lg focus:outline-none  bg-[#F7F7F7] focus:ring-indigo-500 placeholder:text-text-body    focus:z-10' id='userEmail' placeholder={t("contact.email")} />
                    </div>

                    <div className='pb-5'>
                        <label className="block text-[#8A9099] text-base font-medium mb-2" htmlFor="password">
                            {t("contact.Password")}
                        </label>
                        <input type='password' value={password} onKeyDown={handleKeyDown} onChange={e => setPassword(e.target.value)} className='w-full px-6 py-3 rounded-lg focus:outline-none  bg-[#F7F7F7] focus:ring-indigo-500 placeholder:text-text-body    focus:z-10' id='password' placeholder={t("contact.YourPassword")} />
                    </div>


                    <Link to='/' className='text-bg-yellow'>{t("contact.Forgotyourpassword")}</Link>


                    <input className='text-center bg-[#3B5998] py-3 rounded-md w-full my-5 text-white cursor-pointer' type="button" onClick={login} value={t("contact.LoginAccount")} />
                    <p className='text-center'> {t("contact.Donthaveanaccount")}  <a onClick={()=> handleModle()}  className='text-bg-yellow cursor-pointer'>{t("common.SignUp")}</a></p>

                </div>

            </div>



        </Modal>
    );
};

export default HomePageLogin;