import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import { AiFillStar } from "react-icons/ai";
import icons from "../../image/Mask group.png";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputRange from "react-input-range";
import { FiChevronDown } from "react-icons/fi";

const CommonProfile = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState(false);
  return (
    <>
      <div className="lg:ltr:ml-[206px] lg:rtl:mr-[206px] grid grid-cols-1 md:grid-cols-2   2xl:grid-cols-3  md:mt-32  md:m-8   ">
        <div className="bg-white items-center p-4 md:p-8 md:border-r-2 w-full ">
          <h1 className="text-[#757877] font-semibold py-4">
            {t("agency.PlayersDetails")}
          </h1>
          <div className="flex items-center">
            <img
              className="bg-[#E5DDDB] md:w-[135px] lg:max-w-[165px] max-h-[165px] rounded-lg "
              src={icons}
              alt=""
            />
            <div className=" pl-4 2xl:pl-8 rtl:pr-4 2xl:rtl:pr-8 ">
              <h2 className="text-[36px] font-semibold py-3 text-[#31362C]">
                Abdulla
              </h2>
              <table class="table-auto">
                <tbody className="space-y-3">
                  <tr className="text-[#757877] font-semibold">
                    <td>{t("agency.Favorite")} </td>
                    <td className="px-2 xl:px-8">:</td>
                    <td className="text-center text-[#EFDC59] text-2xl ">
                      <AiFillStar />
                    </td>
                  </tr>
                  <tr className="text-[#757877] font-semibold">
                    <td> {t("profile.Country")}</td>
                    <td className="px-2 xl:px-8">:</td>
                    <td>Saudi</td>
                  </tr>
                  <tr className="text-[#757877] font-semibold">
                    <td>{t("profile.Age")}</td>
                    <td className="px-2 xl:px-8">:</td>
                    <td>23</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mx-auto items-center flex xl:border-r-2 w-full bg-white ">
          <table class="table-auto mx-4 md:mx-auto">
            <tbody className="">
              <tr className="text-[#757877]  font-semibold">
                <td className="">{t("profile.Height")}</td>
                <td className="px-2 xl:px-8 ">:</td>
                <td className=" ">5’8”</td>
              </tr>
              <tr className="text-[#757877]  font-semibold">
                <td className="py-3">{t("profile.Preferredfoot")}</td>
                <td className="px-2 xl:px-8 py-3">:</td>
                <td className="py-3">Right</td>
              </tr>
              <tr className="text-[#757877] font-semibold">
                <td>{t("profile.PrimaryPosition")}</td>
                <td className="px-2 xl:px-8 ">:</td>
                <td>Left Centre Forward</td>
              </tr>
              <tr className="text-[#757877] font-semibold">
                <td className="py-3">{t("profile.SecondaryPosition")}</td>
                <td className="px-2 xl:px-8 py-3">:</td>
                <td className="py-3">On Contract</td>
              </tr>
              <tr className="text-[#757877] font-semibold">
                <td>{t("profile.ContractStatus")}</td>
                <td className="px-2 xl:px-8">:</td>
                <td>Left Midfield</td>
              </tr>
              <tr className="text-[#757877] font-semibold">
                <td className="py-3">{t("profile.PlayingStatus")}</td>
                <td className="px-2 xl:px-8 py-3">:</td>
                <td className="py-3">
                  <ProgressBar
                    bgColor="#34BA28"
                    height="6px"
                    isLabelVisible={false}
                    baseBgColor="#D8F1D6"
                    progress
                    completed={50}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mx-auto items-center  lg:px-12 xl:px-16 2xl:px-24 py-8 px-4 w-full  bg-white ">
          <div className="mb-3">
            <p className="text-[#757877]">{t("profile.Dribbling")}</p>
            <InputRange maxValue={100} minValue={0} value={50} />
          </div>
          <div className="mb-3">
            <p className="text-[#757877]">{t("profile.Speed")}</p>
            <InputRange maxValue={100} minValue={0} value={90} />
          </div>
          <div className="mb-3">
            <p className="text-[#757877]">{t("profile.Shooting")}</p>
            <InputRange maxValue={100} minValue={0} value={80} />
          </div>
          <div className="mb-3">
            <p className="text-[#757877]">{t("profile.Technique")}</p>
            <InputRange maxValue={100} minValue={0} value={10} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Passing")}</p>
            <InputRange maxValue={100} minValue={0} value={40} />
          </div>
          <div className="mb-3">
            <p className="text-[#757877]">{t("profile.Tackling")}</p>
            <InputRange maxValue={100} minValue={0} value={0} />
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] ltr:ml-[206px] lg:rtl:mr-[206px] lg:rtl:ml-0 h-24 flex box  box-border px-8 items-center justify-between  w-full">
        <div className="  text-center bg-white  w-full flex justify-between items-center">
          <div className="flex items-center justify-between w-full space-x-4 ">
            <div className="flex justify-between items-center w-full mr-[100px] rtl:ml-[100px]">
             <div className="flex">
             <Link
                to="/Agency/PlayersDetails"
                className=" btn-update bg-[#F8F8F8] hover:bg-[#EFDC59] duration-300 transition ease-in-out"
              >
                {t("agency.Images")}
              </Link>
              <Link
                to="/Agency/PlayersDetails/Video"
                className=" btn-update bg-[#F8F8F8] hover:bg-[#EFDC59] duration-300 transition ease-in-out"
              >
                {t("profile.Videos")}
              </Link>
             </div>
             <div onClick={()=> setSearch(!search)} className="relative text-sm   px-3 w-28  py-2.5  rounded-md text-gray-600 border-2 border-[#CAD2E8] focus-within:text-gray-400">
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

             {search && <div className='absolute bg-white z-[100000] p-4 drop-shadow-2xl rounded-xl w-28 top-[110%] right-0'>
                <ul className='space-y-2'>
                  <li>Date</li>
               
                  <li>Likes</li>
                </ul>
              </div>}
            </div>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default CommonProfile;
