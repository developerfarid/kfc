import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import i18n from '../i18n';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.css'

const Theme = () => {
    const [languages, setLanguages] = useState(localStorage.getItem("i18nextLng"));
    useEffect(() => {
        const themeValue = localStorage?.getItem("i18nextLng")

        if (!themeValue) {
            console.log("yes");
            i18next.changeLanguage("en")
            // document.body.dir = 'ltr'
        }

    }, [])

    useEffect(()=>{

    }, [])
   
    // const handleTheme = (value) => {

    //     if (value === "light") {
    //         setCheck(false)
    //         localStorage.setItem("theme", "light")
    //         setLocal("light")
    //     }
    //     else {
    //         setCheck(true)
    //         localStorage.setItem("theme", "dark")
    //         setLocal("dark")
    //     }
    //     localStorage?.getItem("theme") === "dark" ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    // }


    // const language = localStorage?.getItem("i18nextLng");
    // console.log(language, "language");



    // useEffect(() => {
    //     if (language?.length !== 2) {
    //         // console.log(localStorage.getItem("i18nextLng"), "okk");
    //         i18next.changeLanguage("en")
    //     }
    // }, [])

    const handleLanguageChange = (e) => {
        if (e==='en') {
            i18n.changeLanguage(e)
            document.body.dir = 'ltr'

        }else{
            i18n.changeLanguage(e)
            document.body.dir = 'rtl'
        }
       
        setLanguages(!languages)
    }

    useEffect(() => {
     setLanguages(localStorage?.getItem("i18nextLng"))
        // console.log(localStorage.getItem("i18nextLng"), "okk");
        // local === 'en' ? document.body.dir = 'ltr' : document.body.dir = 'rtl'
    }, [languages])

 const alartSwweet=(b, c)=>{
    Swal.fire(
       
        b,
        c,
    
      )
 }
   
    return {
        handleLanguageChange, languages, alartSwweet
    }
};

export default Theme;