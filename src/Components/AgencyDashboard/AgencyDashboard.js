import React, { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import i18next from "i18next";
import i18n from "../../i18n";
import { FiMenu } from "react-icons/fi";
import logo from "../../image/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import $ from "jquery";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

const AgencyDashboard = () => {
  const [languages, setLanguages] = useState(true);
  const language = localStorage?.getItem("i18nextLng");
  const [menu, setMenu] = useState(false);
  const [sitting, setSitting] = useState(false);
  
  const [mobileMenu, setMobileMenu] = useState(false);
  console.log(language, "language");
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
  let menuRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const { t } = useTranslation();
  let navigate = useNavigate();
  const logout = () => {
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
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: function (html) {
        alert(html);
      },
      url: window.BACK_END_URL + "logout.php",
      cache: false,
    });
  };

  const handleProfile = () => {
    setMobileMenu(false);
    setSitting(true);
  };
  console.log(mobileMenu, "mobileMenu");
  return (
    <>
      <section className=" w-full overflow-x-hidden ">
        <div className="bg-[#F8F8F8] flex w-full    ">

          <div>
          <div
            className={`${
              mobileMenu
                ? "block top-0 bottom-0 fixed z-[11111111111] w-[326px] drop-shadow-lg "
                : " hidden lg:block top-24 "
            } lg:w-[206px]  fixed z-[10000] ltr:left-0 rtl:right-0 bottom-0 h-[100vh]  md:h-[100vh-100px] bg-[#ffffff]`}
          >
            <div>
              <ul>
                <span
                  onClick={() => setMobileMenu(false)}
                  className="lg:hidden text-2xl mt-8 pl-8 inline-block"
                >
                  <IoMdClose />
                </span>
                <li
                  onClick={() => setMobileMenu(false)}
                  className={`${
                    mobileMenu ? "border mx-6 mt-4 rounded-md" : ""
                  } link-desh`}
                >
                  <Link
                    className="flex items-center text-[15px]  px-8 py-4 "
                    to="Players"
                  >
                    <svg
                      width="24"
                      className="ltr:mr-2 rtl:ml-2"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.21187 5.23111C7.94411 5.50923 7.75 6.0265 7.75 7.0625C7.75 7.94485 7.93333 8.77196 8.30386 9.35274C8.6488 9.89343 9.16756 10.25 10 10.25C10.8324 10.25 11.3512 9.89343 11.6961 9.35274C12.0667 8.77196 12.25 7.94485 12.25 7.0625C12.25 6.0265 12.0559 5.50923 11.7881 5.23111C11.5271 4.95995 11.034 4.75 10 4.75C8.96604 4.75 8.47293 4.95995 8.21187 5.23111ZM7.13128 4.19076C7.81793 3.47755 8.82482 3.25 10 3.25C11.1752 3.25 12.1821 3.47755 12.8687 4.19076C13.5487 4.89702 13.75 5.911 13.75 7.0625C13.75 8.11314 13.5379 9.25479 12.9607 10.1595C12.3579 11.1043 11.3767 11.75 10 11.75C8.6233 11.75 7.64206 11.1043 7.03929 10.1595C6.4621 9.25479 6.25 8.11314 6.25 7.0625C6.25 5.911 6.45132 4.89702 7.13128 4.19076Z"
                        fill="#8d8d8d"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.33083 13.75C4.90548 13.75 3.75 14.9055 3.75 16.3308V16.5C3.75 18.0188 4.98122 19.25 6.5 19.25H13.5C15.0188 19.25 16.25 18.0188 16.25 16.5V16.3308C16.25 14.9055 15.0945 13.75 13.6692 13.75C13.4331 13.75 13.2062 13.8412 13.0358 14.0045L11.9027 15.0903C10.839 16.1097 9.16096 16.1097 8.09726 15.0903L6.96421 14.0045C6.79379 13.8412 6.56687 13.75 6.33083 13.75ZM2.25 16.3308C2.25 14.077 4.07705 12.25 6.33083 12.25C6.95365 12.25 7.5524 12.4906 8.00206 12.9215L9.13512 14.0074C9.61862 14.4707 10.3814 14.4707 10.8649 14.0074L11.9979 12.9215C12.4476 12.4906 13.0464 12.25 13.6692 12.25C15.923 12.25 17.75 14.077 17.75 16.3308V16.5C17.75 18.8472 15.8472 20.75 13.5 20.75H6.5C4.15279 20.75 2.25 18.8472 2.25 16.5V16.3308Z"
                        fill="#8d8d8d"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.6959 9.21413C14.561 9.70898 14.3783 10.1811 14.1426 10.6137C14.4004 10.7015 14.686 10.75 14.9995 10.75C16.0326 10.75 16.7625 10.2236 17.1962 9.49523C17.6059 8.80711 17.7495 7.95465 17.7495 7.1875C17.7495 6.35753 17.6172 5.57142 17.1096 5.00653C16.583 4.42048 15.8185 4.25 14.9995 4.25C14.8707 4.25 14.7433 4.25421 14.6179 4.2636C14.7844 4.6914 14.8928 5.18541 14.9501 5.75028C14.9663 5.75009 14.9827 5.75 14.9995 5.75C15.6533 5.75 15.8887 5.89202 15.9939 6.0091C16.1181 6.14733 16.2495 6.45497 16.2495 7.1875C16.2495 7.80106 16.1294 8.35485 15.9074 8.72781C15.7092 9.06053 15.4391 9.25 14.9995 9.25C14.8879 9.25 14.7872 9.23779 14.6959 9.21413Z"
                        fill="#8d8d8d"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.9993 17.1775V18C18.9993 18.2462 18.9771 18.4872 18.9345 18.7211C20.5237 18.5085 21.7493 17.1474 21.7493 15.5C21.7493 13.7051 20.2943 12.25 18.4993 12.25H18.0818C17.7738 12.25 17.4715 12.3143 17.1934 12.4365C17.7497 12.7448 18.2132 13.2003 18.5313 13.7503C19.483 13.7673 20.2493 14.5442 20.2493 15.5C20.2493 16.2928 19.7222 16.9624 18.9993 17.1775Z"
                        fill="#8d8d8d"
                      />
                    </svg>
                    <span className="">{t("agency.Players")} </span>
                  </Link>
                </li>
                <li
                  onClick={() => setMobileMenu(false)}
                  className={`${
                    mobileMenu ? "border mx-6 mt-3 rounded-md" : ""
                  } link-desh`}
                >
                  <Link
                    className="flex items-center text-[15px]  px-8 py-4 "
                    to="PlayersDetails"
                  >
                    <svg
                      width="24"
                      height="24"
                      className="ltr:mr-2 rtl:ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17C3 15.8954 3.89543 15 5 15H5.17157C5.70201 15 6.21071 15.2107 6.58579 15.5858V15.5858C7.36684 16.3668 8.63316 16.3668 9.41421 15.5858V15.5858C9.78929 15.2107 10.298 15 10.8284 15H11C12.1046 15 13 15.8954 13 17V18C13 19.1046 12.1046 20 11 20H5C3.89543 20 3 19.1046 3 18V17Z"
                        stroke="#676767"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="8"
                        cy="11"
                        r="2"
                        stroke="#676767"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 6V5C8 4.44772 8.44772 4 9 4H21C21.5523 4 22 4.44772 22 5V15C22 15.5523 21.5523 16 21 16H15.7397"
                        stroke="#676767"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 8L18 8"
                        stroke="#676767"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 12L18 12"
                        stroke="#676767"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="">{t("agency.PlayersDetails")} </span>{" "}
                  </Link>
                </li>
                <li
                  onClick={() => handleProfile()}
                  className={`${
                    mobileMenu ? "border mx-6 mt-3 rounded-md" : ""
                  } link-desh lg:hidden`}
                >
                  <button className="flex items-center text-[15px]  px-8 py-4 ">
                    <FiSettings className="text-xl mr-2 rtl:ml-2" />
                    <span className="">Setting </span>
                  </button>
                </li>
              </ul>

              <button className="text-center absolute bottom-16 lg:bottom-32 left-[50%] transform bg-[#FD9F9F42] rounded-md text-red-500 font-semibold px-5 py-3 -translate-x-[50%]  flex items-center ">
                <FiLogOut className="mr-2 text-2xl" />
                Logout
              </button>
            </div>
           
          </div>
          {sitting && (
            <ul className=" w-[326px] h-screen z-[10000000] fixed top-0 left-0 shadow-lg shadow-gray-400  bg-white px-6 py-6   rounded-lg space-y-3">
              <div className="flex mt-4 px-4 justify-between ">
                <h2 className="text-2xl font-semibold">Stting</h2>
                <span
                  onClick={() => setSitting(false)}
                  className="lg:hidden text-2xl  inline-block"
                >
                  <IoMdClose />
                </span>
              </div>
              <li >
                <Link
                  className="menu-sub-item text-[#757877] flex items-center border py-2 px-3 mb-3 rounded-md  hover:text-black"
                  to="/Profile"
                >
                  <svg
                    width="24"
                    height="24"
                    className="mx-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7Z"
                      fill="#757877"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.15273 17.5263C5.8348 17.9554 5.75 18.2506 5.75 18.375C5.75 18.4459 5.78565 18.6033 6.04765 18.8356C6.30878 19.0671 6.72942 19.3098 7.3136 19.5289C8.4764 19.965 10.1331 20.25 12 20.25C13.8669 20.25 15.5236 19.965 16.6864 19.5289C17.2706 19.3098 17.6912 19.0671 17.9524 18.8356C18.2144 18.6033 18.25 18.4459 18.25 18.375C18.25 18.2506 18.1652 17.9554 17.8473 17.5263C17.5463 17.12 17.0925 16.671 16.5114 16.2524C15.3469 15.4135 13.747 14.75 12 14.75C10.253 14.75 8.65313 15.4135 7.48863 16.2524C6.90749 16.671 6.45374 17.12 6.15273 17.5263ZM6.61188 15.0353C7.98087 14.0491 9.88098 13.25 12 13.25C14.119 13.25 16.0191 14.0491 17.3881 15.0353C18.0737 15.5292 18.6451 16.0834 19.0525 16.6333C19.443 17.1604 19.75 17.7746 19.75 18.375C19.75 19.0289 19.3939 19.5622 18.9475 19.958C18.5001 20.3545 17.8957 20.6774 17.2131 20.9334C15.8424 21.4474 13.9991 21.75 12 21.75C10.0009 21.75 8.1576 21.4474 6.78691 20.9334C6.10433 20.6774 5.49985 20.3545 5.05254 19.958C4.6061 19.5622 4.25 19.0289 4.25 18.375C4.25 17.7746 4.55695 17.1604 4.94746 16.6333C5.35489 16.0834 5.92626 15.5292 6.61188 15.0353Z"
                      fill="#757877"
                    />
                  </svg>
                  {t("common.Profile")}
                </Link>
              </li>
              <li>
                <Link
                  className="menu-sub-item text-[#757877] flex items-center border py-2 px-3 mb-8 rounded-md  hover:text-black"
                  to="/Profile"
                >
                  <svg
                    width="22"
                    height="18"
                    className="mx-1"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 17H5C2.79086 17 1 15.2091 1 13V5C1 2.79086 2.79086 1 5 1H17C19.2091 1 21 2.79086 21 5V10"
                      stroke="#757877"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      r="1"
                      transform="matrix(1 0 0 -1 5 5)"
                      fill="#757877"
                    />
                    <circle
                      r="2"
                      transform="matrix(1 0 0 -1 11 9)"
                      stroke="#757877"
                      strokeWidth="1.5"
                    />
                    <circle
                      r="2"
                      transform="matrix(1 0 0 -1 17 13)"
                      stroke="#757877"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M20 17C19.4012 15.8044 18.2819 15 17 15C15.7181 15 14.5988 15.8044 14 17"
                      stroke="#757877"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {t("agency.ManageSubscription")}
                </Link>
              </li>
    
              <button onClick={() => logout()} className="text-center  transform bg-[#FD9F9F42] rounded-md text-red-500 font-semibold px-5 py-3  flex items-center justify-center mx-auto  ">
                <FiLogOut className="mr-2 text-2xl" />
                {t("common.Logout")}
              </button>
            </ul>
            
          )}
          </div>

          
          <div className="w-full  ">
            <div className="bg-[#ffffff] h-20 lg:h-24 flex z-[10000] px-4  sm:px-8 items-center justify-between fixed top-0  w-full   right-0 ">
              <div className="  text-center bg-white z-50 w-full  flex md:justify-between items-center">
                <div className="flex items-center w-full sm:space-x-4">
                  <FiMenu
                    onClick={() => setMobileMenu(true)}
                    className={`block lg:hidden text-3xl ltr:mr-3 rtl:ml-3 cursor-pointer `}
                  />
                  <img
                    className="h-10 sm:h-14 lg:h-20  sm:ltr:mr-7 sm:rtl:ml-7  mx-auto block text-center z-20 bg-white "
                    src={logo}
                    alt=""
                  />
                  <div className="flex justify-start flex-row-reverse md:flex-row md:justify-between items-center w-full">
                    <div className="flex ">
                      <div className="relative    rounded-md text-gray-600 md:border-2 border-[#CAD2E8]  focus-within:text-gray-400">
                        <span className="absolute inset-y-0 ltr:left-0  rtl:right-0 flex items-center pl-2">
                          <button
                            type="submit"
                            className="p-1  focus:outline-none focus:shadow-outline"
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="w-6 h-6"
                            >
                              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                          </button>
                        </span>
                        <input
                          type="search"
                          name="q"
                          className="py-3 text-sm w-5   md:w-40 lg:w-60 xl:w-80 text-white  rounded-md ltr:pl-10 rtl:pr-10 focus:outline-none focus:bg-white focus:text-gray-900"
                          placeholder="Search"
                          autoComplete="off"
                        />
                      </div>
                      <button className="  md:px-8 text-sm md:text-base font-semibold text-text-body flex items-center justify-center  py-3 mx-1 rounded-lg md:bg-[#EFDC59]">
                        <svg
                          className=" md:ltr:mr-3 md:rtl:ml-3"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.71825 5.44206C7.83749 5.83874 7.61259 6.25698 7.21591 6.37622C6.35011 6.63649 5.69324 6.95208 5.26949 7.27584C4.8362 7.60689 4.75 7.86024 4.75 7.99999C4.75 8.12269 4.81363 8.32938 5.12623 8.60653C5.43796 8.88291 5.93183 9.16607 6.60649 9.41906C7.95026 9.92298 9.85699 10.25 12 10.25C14.143 10.25 16.0497 9.92298 17.3935 9.41906C18.0682 9.16607 18.562 8.88291 18.8738 8.60653C19.1864 8.32938 19.25 8.12269 19.25 7.99999C19.25 7.86024 19.1638 7.60689 18.7305 7.27584C18.3068 6.95208 17.6499 6.63649 16.7841 6.37622C16.3874 6.25698 16.1625 5.83874 16.2818 5.44206C16.401 5.04538 16.8192 4.82048 17.2159 4.93972C18.179 5.22925 19.0222 5.61097 19.6412 6.08392C20.2507 6.54958 20.75 7.19234 20.75 7.99999C20.75 11.856 18.7347 15.2347 15.75 16.8125V18.7639C15.75 19.8055 15.1615 20.7578 14.2298 21.2236L12.2298 22.2236C10.4014 23.1378 8.25 21.8082 8.25 19.7639V16.8125C5.26529 15.2347 3.25 11.856 3.25 7.99999C3.25 7.19234 3.74934 6.54958 4.35882 6.08392C4.97784 5.61097 5.82096 5.22925 6.78409 4.93972C7.18076 4.82048 7.599 5.04538 7.71825 5.44206ZM5.05075 10.3597C5.68948 12.7976 7.28977 14.7429 9.31083 15.6632C9.57832 15.785 9.75 16.0519 9.75 16.3458V19.7639C9.75 20.6931 10.7279 21.2975 11.559 20.882L13.559 19.882C13.9825 19.6702 14.25 19.2374 14.25 18.7639V16.3458C14.25 16.0519 14.4217 15.785 14.6892 15.6632C16.7102 14.7429 18.3105 12.7976 18.9492 10.3597C18.6338 10.5313 18.2878 10.6857 17.9202 10.8236C16.3685 11.4054 14.2753 11.75 12 11.75C9.72474 11.75 7.63146 11.4054 6.0798 10.8236C5.7122 10.6857 5.36616 10.5313 5.05075 10.3597Z"
                            fill="black"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14 4.25C14.4142 4.25 14.75 4.58579 14.75 5V7C14.75 7.41421 14.4142 7.75 14 7.75C13.5858 7.75 13.25 7.41421 13.25 7V5C13.25 4.58579 13.5858 4.25 14 4.25Z"
                            fill="black"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 6.25C10.4142 6.25 10.75 6.58579 10.75 7V8C10.75 8.41421 10.4142 8.75 10 8.75C9.58579 8.75 9.25 8.41421 9.25 8V7C9.25 6.58579 9.58579 6.25 10 6.25Z"
                            fill="black"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 1.25C10.4142 1.25 10.75 1.58579 10.75 2V4C10.75 4.41421 10.4142 4.75 10 4.75C9.58579 4.75 9.25 4.41421 9.25 4V2C9.25 1.58579 9.58579 1.25 10 1.25Z"
                            fill="black"
                          />
                        </svg>
                        <span className="hidden md:block">
                          {" "}
                          {t("agency.Filter")}
                        </span>
                      </button>
                      <button className="  md:px-8 text-sm md:text-base font-semibold text-text-body flex items-center justify-center  py-3 mx-1 rounded-lg md:bg-[#EFDC59]">
                        <svg
                          className="ltr:mr-3 rtl:ml-3"
                          width="18"
                          height="22"
                          viewBox="0 0 18 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="16"
                            height="20"
                            rx="4"
                            stroke="black"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M11 11V7C11 5.89543 10.1046 5 9 5V5C7.89543 5 7 5.89543 7 7V11"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M7 9H11"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 14L13 14"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 17L13 17"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="hidden md:block">
                          {" "}
                          {t("agency.Export")}{" "}
                        </span>
                      </button>
                    </div>

                    <div className="flex md:space-x-3">
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
                      <span className="font-semibold hidden lg:block ml-2 rtl:mr-2">
                        Logo
                      </span>
                      <div className="relative">
                        <FiMenu
                          onClick={() => setMenu(!menu)}
                          className={` hidden lg:block text-2xl cursor-pointer `}
                        />

                        {menu && (
                          <ul
                            ref={menuRef}
                            className="absolute  transform mt-3 transition duration-300 w-64  ease-in-out z-50 shadow-lg shadow-gray-400 right-0 top-full bg-white px-6 py-6  text-left rounded-lg space-y-3"
                          >
                            <li>
                              <Link
                                className="menu-sub-item text-[#757877] flex items-center  hover:text-black"
                                to="/Agency"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  className="mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7Z"
                                    fill="#757877"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.15273 17.5263C5.8348 17.9554 5.75 18.2506 5.75 18.375C5.75 18.4459 5.78565 18.6033 6.04765 18.8356C6.30878 19.0671 6.72942 19.3098 7.3136 19.5289C8.4764 19.965 10.1331 20.25 12 20.25C13.8669 20.25 15.5236 19.965 16.6864 19.5289C17.2706 19.3098 17.6912 19.0671 17.9524 18.8356C18.2144 18.6033 18.25 18.4459 18.25 18.375C18.25 18.2506 18.1652 17.9554 17.8473 17.5263C17.5463 17.12 17.0925 16.671 16.5114 16.2524C15.3469 15.4135 13.747 14.75 12 14.75C10.253 14.75 8.65313 15.4135 7.48863 16.2524C6.90749 16.671 6.45374 17.12 6.15273 17.5263ZM6.61188 15.0353C7.98087 14.0491 9.88098 13.25 12 13.25C14.119 13.25 16.0191 14.0491 17.3881 15.0353C18.0737 15.5292 18.6451 16.0834 19.0525 16.6333C19.443 17.1604 19.75 17.7746 19.75 18.375C19.75 19.0289 19.3939 19.5622 18.9475 19.958C18.5001 20.3545 17.8957 20.6774 17.2131 20.9334C15.8424 21.4474 13.9991 21.75 12 21.75C10.0009 21.75 8.1576 21.4474 6.78691 20.9334C6.10433 20.6774 5.49985 20.3545 5.05254 19.958C4.6061 19.5622 4.25 19.0289 4.25 18.375C4.25 17.7746 4.55695 17.1604 4.94746 16.6333C5.35489 16.0834 5.92626 15.5292 6.61188 15.0353Z"
                                    fill="#757877"
                                  />
                                </svg>
                                {t("common.Profile")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="menu-sub-item text-[#757877] flex items-center  hover:text-black"
                                to="/Agency"
                              >
                                <svg
                                  width="22"
                                  height="18"
                                  className="mx-1"
                                  viewBox="0 0 22 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11 17H5C2.79086 17 1 15.2091 1 13V5C1 2.79086 2.79086 1 5 1H17C19.2091 1 21 2.79086 21 5V10"
                                    stroke="#757877"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                  <circle
                                    r="1"
                                    transform="matrix(1 0 0 -1 5 5)"
                                    fill="#757877"
                                  />
                                  <circle
                                    r="2"
                                    transform="matrix(1 0 0 -1 11 9)"
                                    stroke="#757877"
                                    strokeWidth="1.5"
                                  />
                                  <circle
                                    r="2"
                                    transform="matrix(1 0 0 -1 17 13)"
                                    stroke="#757877"
                                    strokeWidth="1.5"
                                  />
                                  <path
                                    d="M20 17C19.4012 15.8044 18.2819 15 17 15C15.7181 15 14.5988 15.8044 14 17"
                                    stroke="#757877"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                {t("agency.ManageSubscription")}
                              </Link>
                            </li>
                            <li
                              onClick={() => logout()}
                              className="menu-sub-item text-[#757877] flex items-center  hover:text-black"
                            >
                              <svg
                                width="24"
                                height="24"
                                className="mx-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M17.4697 14.5303C17.1768 14.2374 17.1768 13.7626 17.4697 13.4697L18.7626 12.1768C18.8602 12.0791 18.8602 11.9209 18.7626 11.8232L17.4697 10.5303C17.1768 10.2374 17.1768 9.76256 17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967L19.8232 10.7626C20.5066 11.446 20.5066 12.554 19.8232 13.2374L18.5303 14.5303C18.2374 14.8232 17.7626 14.8232 17.4697 14.5303Z"
                                  fill="#757877"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.25 12C12.25 11.5858 12.5858 11.25 13 11.25L19 11.25C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75L13 12.75C12.5858 12.75 12.25 12.4142 12.25 12Z"
                                  fill="#757877"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.30663 3.96328C8.13732 3.40948 9.25 4.00497 9.25 5.00334V19.5293C9.25 20.5276 8.13732 21.1231 7.30663 20.5693L5.30662 19.236C4.95888 19.0042 4.75 18.6139 4.75 18.1959V17.2663V7.26631V6.33668C4.75 5.91873 4.95888 5.52845 5.30662 5.29661L7.30663 3.96328ZM3.25 7.26631V17.2663V18.1959C3.25 19.1154 3.70953 19.974 4.47457 20.4841L6.47458 21.8174C8.16252 22.9427 10.3797 21.9111 10.7085 20.0163H14C15.5188 20.0163 16.75 18.7851 16.75 17.2663V16.2663H15.25V17.2663C15.25 17.9567 14.6904 18.5163 14 18.5163H10.75V6.01631H14C14.6904 6.01631 15.25 6.57595 15.25 7.26631V8.26634H16.75V7.26631C16.75 5.74753 15.5188 4.51631 14 4.51631H10.7085C10.3797 2.62156 8.16252 1.58991 6.47458 2.7152L4.47457 4.04854C3.70953 4.55857 3.25 5.4172 3.25 6.33668V7.26631Z"
                                  fill="#757877"
                                />
                              </svg>
                              {t("common.Logout")}
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default AgencyDashboard;
