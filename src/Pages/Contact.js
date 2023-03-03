import React from 'react';
import Header from '../Components/Share/Header';
import Footer from '../Components/Share/Footer';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const {  t } = useTranslation()
    return (
        <section>
            <Header />
            <div className='container mb-16'>
                <h3 className='text-xl md:text-4xl py-5 md:my-10 md:text-center text-[#20252C] font-semibold'>{t("contact.title")} </h3>
                <form>
                    <div className='md:p-12  md:shadow-lg md:border  md:drop-shadow-sm md:rounded-lg md:grid space-y-4 md:space-y-0 md:grid-cols-2 gap-4'>
                        <input className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='username' placeholder={t("contact.fname")} />
                        <input className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='username' placeholder={t("contact.lname")} />
                        <input className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10 col-span-2' id='username' placeholder={t("contact.email")} />
                        <textarea name="" id="" placeholder={t("contact.message")} className='w-full col-span-2 px-6 py-3  rounded-lg focus:outline-none border mb-8 placeholder-gray-500 focus:ring-indigo-500   focus:z-10' cols="20" rows="5"></textarea>
                        <button className='w-full md:w-36  mx-auto text-center block col-span-2 cursor-pointer  bg-bg-yellow text-text-body font-semibold  py-3 mt-16  rounded-lg px-6'>{t("common.sent")}</button>
                    </div>
                  
                </form>
            </div>
            <Footer />
        </section>
    );
};

export default Contact;