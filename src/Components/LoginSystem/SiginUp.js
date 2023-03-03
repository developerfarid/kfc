import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import img from '../../image/image 851.png';
import { CgClose } from 'react-icons/cg'
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
import Swal from 'sweetalert2';
const customStyles = {
    content: {
        height: '660px',
    },
  };
const SiginUp = ({ setIsOpen1, setIsOpen2, modalIsOpen1 }) => {

    const { t } = useTranslation()
    const handleModle = () => {
        setIsOpen2(true);
        setIsOpen1(false);
     
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function signup() {
        if (name.length < 3) {
       
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: t('alart.PleaseEnterName'),
               
              }) 
             

        } else {
            if (validateEmail(email)) {
                if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
                    if (checked) {
                        const formData = {token : 'token', name: name, email: email, password: password };
                        //console.log(formData);
                        $.ajax({
                            type: 'POST',
                            data: formData,
                            success: function (data) {
                                //console.log(data);
                                var responseObj = JSON.parse(data);
                                //console.log(responseObj);                                
                                if (responseObj[0] === 'SUCCESS') {
                                    // alert(responseObj[1]);
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title:responseObj[1],
                                     
                                      })  
                                    setIsOpen1(false)
                                    setIsOpen2(true);                          
                                } else {
                                    // alert(responseObj[0]);
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title:responseObj[0],
                                       
                                      }) 
                                }
                            },
                            error: function (html) {
                                //alert(html);
                                console.log(html);
                            },
                            url: window.BACK_END_URL + 'signup.php',
                            cache: false
                        });
                    } else {
                        // alert('Please accept Terms & Conditions');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: t('alart.PleaseacceptTerms&Conditions'),
                     
                          }) 
                    }
                } else {
                    // alert('Passwords are not equal');
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: t('alart.Passwordsarenotequal'),
                    
                      }) 
                }

            } else {
                // alert(email + ' is not valid email');
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: email +" "+ t("alart.isnotvalidemail"),
                
                  }) 
                 
            }
        }
        return false;
    }
    return (

        <Modal isOpen={modalIsOpen1}
        style={customStyles}
            contentLabel="Modal"
            onRequestClose={() => setIsOpen1(false)} className='  shadow-Tournaments w-11/12 lg:w-2/3 sticky bg-white p-8 h-auto rounded-2xl my-6 '>
            <span onClick={() => setIsOpen1(false)} className='cursor-pointer absolute ltr:right-0 rtl:left-0 -top-0 w-12 h-12 flex justify-center items-center text-white border-4 border-white bg-[#3B5998] rounded-full z-50 overflow-hidden'><CgClose className='text-2xl transform hover:rotate-90 duration-300' /> </span>

            <div className='md:grid grid-cols-2 relative'>
                
                <div className='md:flex  items-center '>
                    <img className='w-full p-6 hidden md:block' src={img} alt="" />
                </div>
                <div className='bg-white p-6 rounded-lg font-Inter'>
                    <h1 className='text-center text-3xl font-bold'>{t("loginSystem.CreateAccount")}</h1>
                    <div className='pb-2'>
                        <label className="block text-[#8A9099] text-base font-medium mb-2" htmlFor="username">
                            {t("loginSystem.FullName")}
                        </label>
                        <input value={name} onChange={e => setName(e.target.value)} className='w-full px-6 py-3 rounded-lg focus:outline-none  bg-[#F7F7F7] focus:ring-indigo-500 placeholder:text-gray-400     focus:z-10' id='username' placeholder={t("loginSystem.YourName")} />

                    </div>
                    <div className='pb-2'>
                        <label className="block text-[#8A9099] text-base font-medium mb-2" htmlFor="username">
                            {t("contact.email")}
                        </label>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='w-full px-6 py-3 rounded-lg focus:outline-none  bg-[#F7F7F7] focus:ring-indigo-500 placeholder:text-gray-400    focus:z-10' id='email' />

                    </div>
                    <div className='pb-2'>
                        <label className="block text-[#8A9099] text-base font-medium mb-2" htmlFor="password">
                            {t("contact.Password")}
                        </label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='w-full px-6 py-3 rounded-lg focus:outline-none  bg-[#F7F7F7] focus:ring-indigo-500 placeholder:text-gray-400     focus:z-10' id='password' placeholder={t("contact.YourPassword")} />

                    </div>
                    <div className='pb-2'>
                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="confirm">
                            {t("loginSystem.ConfirmPassword")}
                        </label>
                        <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-400 focus:ring-indigo-500   focus:z-10' id='username' placeholder={t("loginSystem.ConfirmPassword")} />

                    </div>

                    <p> <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="form-checkbox accent-bg-yellow text-white w-4 mb-0 h-4" />  {t("loginSystem.Iaccept")}  <span className='text-bg-yellow'>   {t("loginSystem.TermsandConditions")} </span></p>

                    <input className='text-center bg-[#3B5998] py-3 rounded-md w-full my-5 text-white cursor-pointer' type="button" onClick={signup} value={t("loginSystem.CreateAccount")} />
                    <p className='text-center'> {t("loginSystem.Alreadyhaveanaccount")} <a onClick={() => handleModle()} className='text-bg-yellow cursor-pointer' >{t("common.login")}</a></p>

                </div>

            </div>



        </Modal>
    );
};
Modal.setAppElement('body')
export default SiginUp;