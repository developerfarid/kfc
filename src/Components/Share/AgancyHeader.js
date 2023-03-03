import i18next from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineChevronDown } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import logo from "../../image/logo.png";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "0%",
    width: "300px",
  },
};
const AgencyHeader = () => {
  let navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [forgetBtn, setForgetBtn] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [siginUp, setSiginUp] = useState(false);
  const [none, setNone] = useState(false);
  const [agencyProfileOpen, setagencyProfileOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hight, setHight] = useState(null);
  const [nati, setNati] = useState(false);
  const [languages, setLanguages] = useState(true);
  const token = localStorage.getItem("agencyToken");
  const agencyDisplayName = localStorage.getItem("agencyDisplayName");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  function login() {
    const formData = { uname: userId, password: password };
    //console.log(formData);
    $.ajax({
      type: 'POST',
      data: formData,
      success: function (data) {
        console.log(data);
        var responseObj = JSON.parse(data);
        console.log(responseObj);
        if (responseObj[0] == 'LOGIN_SUCCESS') {
          localStorage.setItem('userId', JSON.stringify(userId));
          localStorage.setItem('agencyToken', responseObj[1]);
          localStorage.setItem('agencyDisplayName', responseObj[2]);
          navigate("/Agency");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // alert(responseObj[0]);
          Swal.fire({
            position: "center",
            icon: "error",
            title: responseObj[0],
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: function (html) {
 
        Swal.fire({
          position: "center",
          icon: "error",
          title: html,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      url: window.BACK_END_URL + 'loginAgency.php',
      cache: false
    });
  }

  function registerAccount() {
    console.log('Register Account');

    if (name.length > 3 && email.length > 3 && mobile.length > 3) {
      if (validateEmail(email)) {
        const formData = { name: name, email: email, mobile: mobile };
        console.log(formData);
        $.ajax({
          type: "POST",
          data: formData,
          success: function (data) {
            console.log(data);
            var responseObj = JSON.parse(data);
            console.log(responseObj['message']);
            
            Swal.fire({
              position: "center",
              icon: "success",
              title: responseObj["message"],
              showConfirmButton: false,
              timer: 1500,
            });
            setSiginUp(false);
            //setNone(true);
            setLoginOpen(true);

          },
          error: function (html) {
            alert(html);
          },
          url: window.BACK_END_URL + "agencyRegister.php",
          cache: false,
        });
      } else {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'Email id is not valid'});
      }
    } else {
      Swal.fire({icon: 'error', title: 'Oops...', text: 'All fields are required'});
    }

  }

  

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setHight(true);
      } else {
        setHight(false);
      }
    });
  }, []);

  function goToStore() {
    window.location.href = "/store/";
    return false;
  }
  // i18next all code here
  const { t } = useTranslation();

  const language = localStorage?.getItem("i18nextLng");

  useEffect(() => {
    if (language?.length !== 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguage = (e) => {
    i18n.changeLanguage(e);
    setLanguages(!languages);
  };

  useEffect(() => {
    language === "en"
      ? (document.body.dir = "ltr")
      : (document.body.dir = "rtl");
  }, [language]);

  const hangleLogout = () => {
    logout();
  };

  const handlePopup = () => {
    setSiginUp(true);
    setNone(false);
    setLoginOpen(false);
  };
  const handlePopupSign = () => {
    setSiginUp(false);
    setNone(false);
    setLoginOpen(true);
  };
  const handleForgetBtn = () => {
    setNone(false);
    setLoginOpen(false);
    setForgetBtn(true);
  };
  function logout() {
    const token = localStorage.getItem("agencyToken");
    console.log(token);
    $.ajax({
      type: "POST",
      data: "token=" + token,
      success: function (data) {
        var responseObj = JSON.parse(data);
        localStorage.removeItem("userId");
        localStorage.removeItem("agencyToken");
        localStorage.removeItem("agencyDisplayName");
        console.log(responseObj[0]);
        navigate("/AgencyLanding");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: function (html) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: html,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      url: window.BACK_END_URL + "logout.php",
      cache: false,
    });
  }

 function handleEmail () {
  const formData = { email: email };
  setEmailSent(true)
  setForgetBtn(false)


 }

  const handleClick = () => {
    console.log("okk");
    setLoginOpen(false);
  };

  console.log(loginOpen, "loginOpen");
  console.log(siginUp, "siginUp");
  console.log(forgetBtn, "forgetBtn");
  console.log(none, "none");

  return (
    <header className="  w-full bg-[#dadadd] font-Inter">
      <div
        className={`  z-30 text-center bg-[#dadadd] m-auto left-[50%] transform -translate-x-1/2 top-0 w-full py-2  fixed  `}
      >
        <div className="flex justify-between items-center container">
          <div className="flex items-center">
            <FiMenu
              onClick={() => setMenu(!menu)}
              className={`mx-2 block ${
                hight ? "lg:hidden" : "block md:hidden"
              } lg:hidden text-2xl cursor-pointer`}
            />
            <Link to="/">
              <img
                className="h-[30px] sm:h-[40px] md:h-[50px] xl:h-[60px]  z-50"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <nav className={`hidden lg:block `}>
            <ul className=" h-[60px] flex font-semibold lg:space-x-4 text-black  items-center">
              <li>
                <Link
                  className="menu-item-btn text-[#515151] hover:text-black rtl:ml-6"
                  to="/News"
                  state={{ category: "" }}
                >
                  {t("MenuTop.News")}
                </Link>
              </li>
              <li>
                <Link
                  className="menu-item-btn text-[#515151] hover:text-black"
                  to="/Tournaments"
                >
                  {t("MenuTop.Tournaments")}{" "}
                </Link>
              </li>
              <li className="relative menu-item py-3 menu-item-btn text-[#515151] hover:text-black">
                <Link to="/" className=" flex items-center">
                  {t("MenuTop.Request")}{" "}
                  <BsChevronDown className="  rtl:mr-2 ltr:ml-2" />
                </Link>
                <ul className="absolute invisible text-left  opacity-0 transform translate-y-10 transition-all duration-300 w-36  ease-in-out z-50 left-0 top-full bg-black px-6 py-4 border-slate-600 border rounded-lg space-y-3 ">
                  <li>
                    <Link className="menu-sub-item" to="/AcademyInfo">
                      {t("common.Academy")}{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-sub-item" to="/RefereeInfo">
                      {t("common.Referee")}{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-sub-item" to="/GymInfo">
                      {t("common.Gym")}
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-sub-item" to="/CoachInfo">
                      {t("common.Coach")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative menu-item text-[#515151] hover:text-black py-3 menu-item-btn">
                <Link className=" flex items-center" to="/PhotoGallary">
                  {t("MenuTop.PhotoGallery")}{" "}
                  <BsChevronDown className="   rtl:mr-2 ltr:ml-2" />
                </Link>
                {token && (
                  <ul className="absolute invisible  text-left  opacity-0 transform translate-y-10 transition duration-300  ease-in-out z-50 left-0 top-full bg-black px-6 w-36 py-4 border-slate-600 border rounded-lg space-y-3 ">
                    <li>
                      <Link className="menu-sub-item" to="/PhotoGallary">
                        {t("MenuTop.Gallery")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="menu-sub-item" to="/AddImage">
                        {t("MenuTop.AddPhotos")}{" "}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  className="menu-item-btn text-[#515151] hover:text-black"
                  to="/Login"
                >
                  {t("MenuTop.Store")}{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="menu-item-btn text-[#515151] hover:text-black"
                  to="/Contact"
                >
                  {t("MenuTop.ContactUs")}{" "}
                </Link>
              </li>

              <li></li>
              <li></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-2">
            {language === "en" ? (
              <span
                className="cursor-pointer"
                onClick={() => handleLanguage("ar")}
              >
                العربية
              </span>
            ) : (
              <span
                className="cursor-pointer rtl:px-1"
                onClick={() => handleLanguage("en")}
              >
                English
              </span>
            )}
            <span className="relative" onClick={() => setNati(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3375 2.76303C15.4685 2.37008 15.8932 2.15771 16.2862 2.28869L16.4402 2.34001C18.4557 3.01187 20.0374 4.5935 20.7092 6.60908L20.7605 6.76303C20.8915 7.15599 20.6792 7.58073 20.2862 7.71172C19.8932 7.8427 19.4685 7.63033 19.3375 7.23737L19.2862 7.08342C18.7636 5.51575 17.5335 4.28559 15.9658 3.76303L15.8119 3.71172C15.4189 3.58073 15.2065 3.15599 15.3375 2.76303Z"
                  fill="#515151"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.76014 2.76303C8.62915 2.37008 8.20441 2.15771 7.81145 2.28869L7.6575 2.34001C5.64192 3.01187 4.06029 4.5935 3.38843 6.60908L3.33711 6.76303C3.20613 7.15599 3.4185 7.58073 3.81145 7.71172C4.20441 7.8427 4.62915 7.63033 4.76014 7.23737L4.81145 7.08342C5.33401 5.51575 6.56417 4.28559 8.13185 3.76303L8.2858 3.71172C8.67875 3.58073 8.89112 3.15599 8.76014 2.76303Z"
                  fill="#515151"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.29829 4.54969C9.5073 3.24601 10.6373 2.25 11.9999 2.25C13.3625 2.25 14.4924 3.24601 14.7014 4.54969C16.5693 5.35443 17.9746 6.99155 18.2047 9.01871L18.596 12.4663C18.6488 12.9315 18.8459 13.3854 19.1792 13.777C19.8759 14.5954 19.8978 15.6243 19.4437 16.4246C18.9969 17.2119 18.114 17.75 17.0549 17.75H6.94482C5.88575 17.75 5.00283 17.2119 4.55606 16.4246C4.10189 15.6243 4.12386 14.5954 4.82056 13.777C5.15385 13.3854 5.35096 12.9315 5.40376 12.4663L5.79505 9.01871C6.02513 6.99155 7.43041 5.35443 9.29829 4.54969ZM11.9999 3.75C11.3171 3.75 10.7637 4.30347 10.7637 4.9862V5.07695C10.7637 5.39753 10.5599 5.68267 10.2566 5.78652C8.60728 6.35122 7.45836 7.66468 7.28548 9.18787L6.89419 12.6354C6.80605 13.412 6.47939 14.1424 5.96278 14.7493C5.69959 15.0584 5.69821 15.398 5.86063 15.6843C6.03046 15.9835 6.40406 16.25 6.94482 16.25H17.0549C17.5957 16.25 17.9693 15.9835 18.1391 15.6843C18.3015 15.398 18.3001 15.0584 18.0369 14.7493C17.5203 14.1424 17.1937 13.412 17.1055 12.6354L16.7142 9.18787C16.5414 7.66468 15.3924 6.35122 13.7431 5.78652C13.4398 5.68267 13.2361 5.39753 13.2361 5.07695V4.9862C13.2361 4.30347 12.6826 3.75 11.9999 3.75Z"
                  fill="#515151"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.8477 19C10.8477 19.6904 11.4073 20.25 12.0977 20.25C12.788 20.25 13.3477 19.6904 13.3477 19H14.8477C14.8477 20.5188 13.6164 21.75 12.0977 21.75C10.5789 21.75 9.34766 20.5188 9.34766 19H10.8477Z"
                  fill="#515151"
                />
              </svg>
              {/* info modal */}

              {nati && (
                <div className="absolute ltr:right-0 rtl:left-0  top-12 w-[300px] sm:w-[464px] bg-white p-3 rounded-lg">
                  <div className="flex justify-between">
                    <h3>Notification</h3>
                  </div>
                  <div>
                    <button className="bg-[#F4F4F4] text-[#848A96] font-semibold text-[14px] transition duration-300 ease-in-out hover:bg-bg-yellow hover:text-black px-4 py-3 rounded-md ltr:mr-4 rtl:ml-4">
                      All
                    </button>
                    <button className="bg-[#F4F4F4] text-[#848A96] font-semibold text-[14px] transition duration-300 ease-in-out hover:bg-bg-yellow hover:text-black px-4 py-3 rounded-md ltr:mr-4 rtl:ml-4">
                      Like
                    </button>
                    <button className="bg-[#F4F4F4] text-[#848A96] font-semibold text-[14px] transition duration-300 ease-in-out hover:bg-bg-yellow hover:text-black px-4 py-3 rounded-md ">
                      Follower
                    </button>
                  </div>
                </div>
              )}
            </span>

            {token && (
              <span
                onClick={() => setagencyProfileOpen(!agencyProfileOpen)}
                className="flex cursor-pointer items-center relative"
              >
                {agencyDisplayName} <BsChevronDown className="rtl:mr-2 ltr:ml-2" />
                {agencyProfileOpen && (
                  <ul className="absolute  transform mt-3 transition duration-300 w-36  ease-in-out z-50 right-0 top-full bg-black px-6 py-4 border-slate-600 border text-left rounded-lg space-y-3">
                    <li>
                      <Link className="menu-sub-item" to="/Profile">
                        {t("common.Profile")}{" "}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => hangleLogout()}
                        className="menu-sub-item"
                      >
                        {t("common.Logout")}{" "}
                      </button>
                    </li>
                  </ul>
                )}
              </span>
            )}
            {token ? (
              <img
                className="w-[43px] h-[43px] rounded-full  "
                src={logo}
                alt=""
              />
            ) : (
              <div className="sm:relative ">
                <div
                  className="flex items-center"
                  onClick={() => setLoginOpen(true)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.38566 15.6959C6.19864 16.2895 5.75 16.9706 5.75 17.5C5.75 18.0294 6.19864 18.7105 7.38566 19.3041C8.52782 19.8751 10.1582 20.25 12 20.25C13.8418 20.25 15.4722 19.8751 16.6143 19.3041C17.8014 18.7105 18.25 18.0294 18.25 17.5C18.25 16.9706 17.8014 16.2895 16.6143 15.6959C15.4722 15.1249 13.8418 14.75 12 14.75C10.1582 14.75 8.52782 15.1249 7.38566 15.6959ZM6.71484 14.3543C8.10618 13.6586 9.97582 13.25 12 13.25C14.0242 13.25 15.8938 13.6586 17.2852 14.3543C18.6316 15.0275 19.75 16.0964 19.75 17.5C19.75 18.9036 18.6316 19.9725 17.2852 20.6457C15.8938 21.3414 14.0242 21.75 12 21.75C9.97582 21.75 8.10618 21.3414 6.71484 20.6457C5.36836 19.9725 4.25 18.9036 4.25 17.5C4.25 16.0964 5.36836 15.0275 6.71484 14.3543Z"
                      fill="#515151"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7Z"
                      fill="#515151"
                    />
                  </svg>
                  <HiOutlineChevronDown
                    className={`${
                      loginOpen || forgetBtn || siginUp
                        ? "transform rotate-180"
                        : ""
                    }`}
                  />
                </div>
                {loginOpen && (
                  <div
                    className={`${none
                        ? "hidden"
                        : "absolute sm:w-[481px] w-screen h-screen  sm:h-auto bg-white ltr:right-0 rtl:left-0 px-6 drop-shadow-2xl rounded-md top-0 sm:top-16 py-5"
                    }`}
                  >
                    <div>
                      <div className="flex mb-9 justify-between items-center">
                        <h2 className="text-2xl text-[#20252C] text-left rtl:text-right ">
                          Login to your Agency account
                        </h2>
                        <span
                          onClick={() => handleClick()}
                          className="h-[28px] flex justify-center items-center w-[28px] rounded-full bg-[#EEEEEE] hover:bg-red-500 transition-all ease-linear duration-150 hover:text-white "
                        >
                          <AiOutlineClose />
                        </span>
                      </div>
                      <div className="relative  flex w-full flex-wra border rounded-xl border-[#D3D3D3] items-stretch mb-6">
                        <span className="z-10 rounded-l-xl h-full leading-snug font-normal border-r border-[#D3D3D3]  text-center text-slate-300 absolute bg-transparent  text-base items-center justify-center w-13 bg-[#F9F9F9] px-3 inline-block py-2">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.45703 11.6665C1.45703 7.31726 4.98279 3.7915 9.33203 3.7915H18.6654C23.0146 3.7915 26.5404 7.31726 26.5404 11.6665V16.3332C26.5404 20.6824 23.0146 24.2082 18.6654 24.2082H9.33203C4.98279 24.2082 1.45703 20.6824 1.45703 16.3332V11.6665ZM9.33203 5.5415C5.94929 5.5415 3.20703 8.28376 3.20703 11.6665V16.3332C3.20703 19.7159 5.94929 22.4582 9.33203 22.4582H18.6654C22.0481 22.4582 24.7904 19.7159 24.7904 16.3332V11.6665C24.7904 8.28376 22.0481 5.5415 18.6654 5.5415H9.33203Z"
                              fill="#7D7D7D"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.48083 9.95342C7.78272 9.57607 8.33335 9.51489 8.7107 9.81677L11.6288 12.1512C13.0136 13.2591 14.9813 13.2591 16.3661 12.1512L19.2842 9.81677C19.6615 9.51489 20.2121 9.57607 20.514 9.95342C20.8159 10.3308 20.7547 10.8814 20.3774 11.1833L17.4593 13.5178C15.4354 15.1369 12.5595 15.1369 10.5356 13.5178L7.61749 11.1833C7.24013 10.8814 7.17895 10.3308 7.48083 9.95342Z"
                              fill="#7D7D7D"
                            />
                          </svg>
                        </span>
                        <input
                          onChange={(e) => setUserId(e.target.value)}
                          type="text"
                          placeholder="User ID"
                          className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                        />
                      </div>
                      <div className="relative flex rounded-xl border border-[#D3D3D3] w-full flex-wrap items-stretch mb-6">
                        <span className="z-10 h-full rounded-l-xl leading-snug font-normal border-r border-[#D3D3D3]  text-center text-slate-300 absolute bg-transparent  text-base items-center justify-center w-13 bg-[#F9F9F9] px-3 inline-block py-2">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.79297 12.8332C3.79297 9.77259 6.27406 7.2915 9.33464 7.2915H18.668C21.7285 7.2915 24.2096 9.77259 24.2096 12.8332V19.8332C24.2096 22.8938 21.7285 25.3748 18.668 25.3748H9.33464C6.27406 25.3748 3.79297 22.8937 3.79297 19.8332V12.8332ZM9.33464 9.0415C7.24056 9.0415 5.54297 10.7391 5.54297 12.8332V19.8332C5.54297 21.9273 7.24056 23.6248 9.33464 23.6248H18.668C20.7621 23.6248 22.4596 21.9273 22.4596 19.8332V12.8332C22.4596 10.7391 20.7621 9.0415 18.668 9.0415H9.33464Z"
                              fill="#7D7D7D"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.0013 14.875C13.1959 14.875 12.543 15.5279 12.543 16.3333C12.543 17.1387 13.1959 17.7917 14.0013 17.7917C14.8067 17.7917 15.4596 17.1387 15.4596 16.3333C15.4596 15.5279 14.8067 14.875 14.0013 14.875ZM10.793 16.3333C10.793 14.5614 12.2294 13.125 14.0013 13.125C15.7732 13.125 17.2096 14.5614 17.2096 16.3333C17.2096 18.1052 15.7732 19.5417 14.0013 19.5417C12.2294 19.5417 10.793 18.1052 10.793 16.3333Z"
                              fill="#7D7D7D"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.9987 4.375C11.9046 4.375 10.207 6.07259 10.207 8.16667H8.45703C8.45703 5.10609 10.9381 2.625 13.9987 2.625C17.0593 2.625 19.5404 5.10609 19.5404 8.16667H17.7904C17.7904 6.07259 16.0928 4.375 13.9987 4.375Z"
                              fill="#7D7D7D"
                            />
                          </svg>
                        </span>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl  text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                        />
                      </div>
                      <button
                        onClick={() => handleForgetBtn()}
                        className="ml-auto block underline text-lg  font-Inter"
                      >
                        Forgot Password
                      </button>

                      <button
                        type="submit"
                        onClick={login}
                        className="btn-update w-full text-2xl mt-6"
                      >
                        Sign In
                      </button>
                    </div>

                    <p className="mt-4 text-[#7D7D78]">
                      Dont have an account?{" "}
                      <span
                        className="text-[#3d3d3b] cursor-pointer "
                        onClick={() => handlePopup()}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                )}

                {forgetBtn && (
                  <div
                    className={`${
                      none
                        ? "hidden"
                        : "absolute sm:w-[481px] w-screen h-screen  sm:h-auto bg-white ltr:right-0 rtl:left-0 px-6 drop-shadow-2xl rounded-md top-0 sm:top-16 py-5"
                    }`}
                  >
                    <div>
                      <div className="flex mb-3 justify-between items-center">
                        <h2 className="text-2xl text-[#20252C] text-left rtl:text-right ">
                          Login to your Agency account
                        </h2>
                        <span
                          onClick={() => setForgetBtn(false)}
                          className="h-[28px]  flex justify-center items-center w-[28px] rounded-full bg-[#EEEEEE] hover:bg-red-500 transition-all ease-linear duration-150 hover:text-white "
                        >
                          <AiOutlineClose />
                        </span>
                      </div>
                      <p className="text-sm text-left mb-6 w-2/3 text-[#525D6D] ">
                        Enter you registered email address, we will send you
                        login credentials.
                      </p>
                      <div className="relative  flex w-full flex-wra border rounded-xl border-[#D3D3D3] items-stretch mb-6">
                        <span className="z-10 rounded-l-xl h-full leading-snug font-normal border-r border-[#D3D3D3]  text-center text-slate-300 absolute bg-transparent  text-base items-center justify-center w-13 bg-[#F9F9F9] px-3 inline-block py-2">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.45703 11.6665C1.45703 7.31726 4.98279 3.7915 9.33203 3.7915H18.6654C23.0146 3.7915 26.5404 7.31726 26.5404 11.6665V16.3332C26.5404 20.6824 23.0146 24.2082 18.6654 24.2082H9.33203C4.98279 24.2082 1.45703 20.6824 1.45703 16.3332V11.6665ZM9.33203 5.5415C5.94929 5.5415 3.20703 8.28376 3.20703 11.6665V16.3332C3.20703 19.7159 5.94929 22.4582 9.33203 22.4582H18.6654C22.0481 22.4582 24.7904 19.7159 24.7904 16.3332V11.6665C24.7904 8.28376 22.0481 5.5415 18.6654 5.5415H9.33203Z"
                              fill="#7D7D7D"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.48083 9.95342C7.78272 9.57607 8.33335 9.51489 8.7107 9.81677L11.6288 12.1512C13.0136 13.2591 14.9813 13.2591 16.3661 12.1512L19.2842 9.81677C19.6615 9.51489 20.2121 9.57607 20.514 9.95342C20.8159 10.3308 20.7547 10.8814 20.3774 11.1833L17.4593 13.5178C15.4354 15.1369 12.5595 15.1369 10.5356 13.5178L7.61749 11.1833C7.24013 10.8814 7.17895 10.3308 7.48083 9.95342Z"
                              fill="#7D7D7D"
                            />
                          </svg>
                        </span>
                        <input
                         type="email"
                         onChange={(e) => setEmail(e.target.value)}
                          
                          placeholder="Email Address"
                          className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                        />
                      </div>

                      <div className="sm:flex">
                        <button
                          onClick={() => setForgetBtn(false)}
                          className="btn-update w-full text-2xl text-black bg-transparent border-2 mt-6"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          // 
                          onClick={()=> handleEmail()}
                          className="btn-update text-black w-full text-2xl mt-6"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {emailSent && (
                  <div
                    className={`${
                      none
                        ? "hidden"
                        : "absolute sm:w-[481px] w-screen h-screen  sm:h-auto bg-white ltr:right-0 rtl:left-0 px-6 drop-shadow-2xl rounded-md top-0 sm:top-16 py-5"
                    }`}
                  >
                    <div>
                      <div className="flex mb-3 justify-between items-center">
                        <h2 className="text-2xl text-[#20252C] text-left rtl:text-right ">
                        Check in your mail!
                        </h2>
                        <span
                          onClick={() => setEmailSent(false)}
                          className="h-[28px]  flex justify-center items-center w-[28px] rounded-full bg-[#EEEEEE] hover:bg-red-500 transition-all ease-linear duration-150 hover:text-white "
                        >
                          <AiOutlineClose />
                        </span>
                      </div>
                      <p className="text-sm text-left mb-6 w-2/3 text-[#525D6D] ">
                      We just emailed you your login credentials.
                      </p>
                      <div className=" bg-[#E9ECF1] p-6 text-center space-y-3 ">
  <p className="text-sm text-[#525D6D] mx-auto w-2/3 ">For any questions or problems please email us at</p>
  <h5 className="">helpdesk@koora-stars.com</h5>
  <button onClick={()=> setEmailSent(false)} className="btn-update mx-auto block bg-white border text-black">Ok</button>
                      </div>

                      
                    </div>
                  </div>
                )}
                {siginUp && (
                  <div className="absolute sm:w-[481px] w-screen h-screen sm:h-auto bg-white ltr:right-0 rtl:left-0 px-6 shadow-md rounded-md top-0 sm:top-16 py-5">
                    <div className="flex mb-9 justify-between items-center">
                      <h2 className="text-2xl text-[#20252C] text-left rtl:text-right ">
                        Sign up to your Agency account
                      </h2>
                      <span
                        onClick={() => setSiginUp(false)}
                        className="h-[28px] flex justify-center items-center w-[28px] rounded-full bg-[#EEEEEE] hover:bg-red-500 transition-all ease-linear duration-150 hover:text-white "
                      >
                        <AiOutlineClose />
                      </span>
                    </div>
                    <div className="relative flex w-full flex-wra border rounded-xl border-[#D3D3D3] items-stretch mb-6">
                      <span className="z-10 rounded-l-xl h-full leading-snug font-normal border-r border-[#D3D3D3]  text-center text-slate-300 absolute bg-transparent  text-base items-center justify-center w-13 bg-[#F9F9F9] px-3 inline-block py-2">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.9987 4.375C11.9046 4.375 10.207 6.07259 10.207 8.16667C10.207 10.2607 11.9046 11.9583 13.9987 11.9583C16.0928 11.9583 17.7904 10.2607 17.7904 8.16667C17.7904 6.07259 16.0928 4.375 13.9987 4.375ZM8.45703 8.16667C8.45703 5.10609 10.9381 2.625 13.9987 2.625C17.0593 2.625 19.5404 5.10609 19.5404 8.16667C19.5404 11.2272 17.0593 13.7083 13.9987 13.7083C10.9381 13.7083 8.45703 11.2272 8.45703 8.16667Z"
                            fill="#7D7D7D"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.7513 17.2085C6.97939 17.2085 5.54297 18.6449 5.54297 20.4168C5.54297 22.1887 6.97939 23.6252 8.7513 23.6252H19.2513C21.0232 23.6252 22.4596 22.1887 22.4596 20.4168C22.4596 18.6449 21.0232 17.2085 19.2513 17.2085H8.7513ZM3.79297 20.4168C3.79297 17.6784 6.01289 15.4585 8.7513 15.4585H19.2513C21.9897 15.4585 24.2096 17.6784 24.2096 20.4168C24.2096 23.1552 21.9897 25.3752 19.2513 25.3752H8.7513C6.01289 25.3752 3.79297 23.1552 3.79297 20.4168Z"
                            fill="#7D7D7D"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                      />
                    </div>
                    <div className="relative flex rounded-xl border border-[#D3D3D3] w-full flex-wrap items-stretch mb-6">
                      <span className="z-10 h-full rounded-l-xl leading-snug font-normal border-r border-[#D3D3D3]  text-center text-slate-300 absolute bg-transparent  text-base items-center justify-center w-13 bg-[#F9F9F9] px-3 inline-block py-2">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.45703 11.6665C1.45703 7.31726 4.98279 3.7915 9.33203 3.7915H18.6654C23.0146 3.7915 26.5404 7.31726 26.5404 11.6665V16.3332C26.5404 20.6824 23.0146 24.2082 18.6654 24.2082H9.33203C4.98279 24.2082 1.45703 20.6824 1.45703 16.3332V11.6665ZM9.33203 5.5415C5.94929 5.5415 3.20703 8.28376 3.20703 11.6665V16.3332C3.20703 19.7159 5.94929 22.4582 9.33203 22.4582H18.6654C22.0481 22.4582 24.7904 19.7159 24.7904 16.3332V11.6665C24.7904 8.28376 22.0481 5.5415 18.6654 5.5415H9.33203Z"
                            fill="#7D7D7D"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.48083 9.95342C7.78272 9.57607 8.33335 9.51489 8.7107 9.81677L11.6288 12.1512C13.0136 13.2591 14.9813 13.2591 16.3661 12.1512L19.2842 9.81677C19.6615 9.51489 20.2121 9.57607 20.514 9.95342C20.8159 10.3308 20.7547 10.8814 20.3774 11.1833L17.4593 13.5178C15.4354 15.1369 12.5595 15.1369 10.5356 13.5178L7.61749 11.1833C7.24013 10.8814 7.17895 10.3308 7.48083 9.95342Z"
                            fill="#7D7D7D"
                          />
                        </svg>
                      </span>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl  text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                      />
                    </div>
                    <div className="relative flex rounded-xl border border-[#D3D3D3] w-full flex-wrap items-stretch mb-6">
                      <span className="z-10 h-full rounded-l-xl leading-snug font-normal border-r border-[#D3D3D3]  text-center text-slate-300 absolute bg-transparent  text-base items-center justify-center w-13 bg-[#F9F9F9] px-3 inline-block py-2">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="4.66797"
                            y="2.3335"
                            width="18.6667"
                            height="23.3333"
                            rx="4"
                            stroke="#7D7D7D"
                            stroke-width="1.5"
                          />
                          <path
                            d="M17.8346 5.8335H10.168C9.0634 5.8335 8.16797 6.72893 8.16797 7.8335V8.50016C8.16797 9.60473 9.0634 10.5002 10.168 10.5002H17.8346C18.9392 10.5002 19.8346 9.60473 19.8346 8.50016V7.8335C19.8346 6.72893 18.9392 5.8335 17.8346 5.8335Z"
                            stroke="#7D7D7D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <circle
                            cx="18.6667"
                            cy="14.0002"
                            r="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="18.6667"
                            cy="17.5002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="18.6667"
                            cy="21.0002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="14.0026"
                            cy="17.5002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                          <circle
                            cx="14.0026"
                            cy="14.0002"
                            r="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="9.33463"
                            cy="17.5002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="14.0026"
                            cy="21.0002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="9.33463"
                            cy="14.0002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                          <ellipse
                            cx="9.33463"
                            cy="21.0002"
                            rx="1.16667"
                            ry="1.16667"
                            fill="#7D7D7D"
                          />
                        </svg>
                      </span>

                      <input
                        type="mobile"
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile"
                        className="px-5 py-3 placeholder-[#7D7D7D] text-slate-600 relative bg-white  rounded-xl  text-sm border-0  outline-none focus:outline-none  w-full rtl:pr-16 ltr:pl-16"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={registerAccount}
                      className="btn-update w-full text-2xl mt-6"
                    >
                      Submit
                    </button>
                    <p className="mt-4 text-[#7D7D78]">
                      Already have an account?{" "}
                      <span
                        className="text-[#3d3d3b] cursor-pointer "
                        onClick={() => handlePopupSign()}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AgencyHeader;
