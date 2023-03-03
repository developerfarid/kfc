import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutHome = () => {
    const {  t } = useTranslation()
    return (
        <section className='bg-hero-pattern bg-no-repeat bg-cover bg-center'>
            <div className='container'>
                <div className='w-full mx-auto text-center text-white md:w-9/12 py-12 font-Inter space-y-4'><h3 className='font-semibold text-[22px] sm:text-2xl md:text-[52px]'>{t("common.AboutUs")}</h3>
                <p className='text-sm sm:text-base md:text-xl'>There is a proven fact for a long time that the readable content of a page will distract the reader from focusing on the external appearance of the text or the shape of the paragraphs placed on the page he is reading. Therefore, the Lorem Ipsum method is used because it gives a somewhat normal distribution of characters rather than using "here there is textual content, here there is text content" making it look (i.e. letters) as if it is readable text.</p></div>
            </div>
        </section>
    );
};

export default AboutHome;