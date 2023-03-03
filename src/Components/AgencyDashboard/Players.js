import React, { useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiMenu, FiChevronDown, FiChevronsDown } from "react-icons/fi";
import logo from "../../image/logo.png";
import i18next from "i18next";
import i18n from "../../i18n";
import {
  IoMdNotificationsOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import CommonTable from "./CommonTable";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MobileTabile from "./MobileTabile";

const Players = () => {
  const [languages, setLanguages] = useState(true);
  const [search, setSearch] = useState(false);
  const array = Array.from(Array(15).keys());
  const language = localStorage?.getItem("i18nextLng");
  const [menu, setMenu] = useState(false);
  console.log(language, "language");
  useEffect(() => {
    if (language?.length !== 2) {
      // console.log(localStorage.getItem("i18nextLng"), "okk");
      i18next.changeLanguage("en");
    }
  }, []);
  const handleLanguage = (e) => {
    i18n.changeLanguage(e);
    setLanguages(!languages);
  };

  useEffect(() => {
    // console.log(localStorage.getItem("i18nextLng"), "okk");
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
  return (
    <>
      <div className="mt-24 bg-white lg:ltr:ml-[206px] lg:rtl:mr-[206px]">
        <div className="mt-24 p-4 md:p-8">
          <div className="flex justify-between mb-8 ">
            <h2 className="font-semibold text-[#20252C]">
              Players List
              <span className="font-normal text-[#7C8294] ml-3">
                My Favorit
              </span>
            </h2>
            <div onClick={()=> setSearch(!search)} className="relative text-sm  px-3 w-28  py-2.5  rounded-md text-gray-600 border-2 border-[#CAD2E8] focus-within:text-gray-400">
              {/* <input
                type="search"
                name="q"
                className="py-2 px-3 text-sm   md:w-24 text-white  rounded-md  focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search"
                autoComplete="off"
              /> */}
              Sort By
              <span className="absolute inset-y-0 ltr:right-0  rtl:right-2 flex items-center pl-2 m-2.5">
                <FiChevronDown className={`${search ? 'transform rotate-180' :""} text-xl`} />
              </span>

             {search && <div className='absolute bg-white p-4 drop-shadow-2xl rounded-xl w-28 top-[110%] right-0'>
                <ul className='space-y-2'>
                  <li>Name</li>
                  <li>Age</li>
                  <li>Likes</li>
                </ul>
              </div>}
            </div>
          </div>

          <div className="overflow-x-auto hidden md:block  ">
            <table className="whitespace-nowrap w-full   overflow-hidden ">
              <thead className=" bg-[#fdfbeb] ">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("agency.Favorite")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.Name")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.Age")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.Country")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("request.City")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.Height")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.Preferredfoot")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.PrimaryPosition")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.SecondaryPosition")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.ContractStatus")}
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-semibold border-r border-[#e9eaed] text-gray-900 px-6 py-4 text-center"
                  >
                    {t("profile.PlayingStatus")}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {array.map((item, index) => (
                  <CommonTable item={item} index={index} />
                ))}
              </tbody>
            </table>
          </div>
          {/* mobile Design */}
          <div className="block md:hidden">
            {array.map((item) => (
              <MobileTabile key={item} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Players;
