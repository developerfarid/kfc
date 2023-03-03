import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputRange from "react-input-range";
import img from "../../image/image 828.png";
import "react-input-range/lib/css/index.css";
import { Link } from "react-router-dom";
import $ from 'jquery';
const Information = () => {
  const { t } = useTranslation();
  const [img_path, setImgPath] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [foot, setFoot] = useState('');
  const [primaryPosition, setPrimaryPosition] = useState('');
  const [secondaryPosition, setSecondaryPosition] = useState('');
  const [contractStatus, setContractStatus] = useState('');
  const [dribbling, setDribbling] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [shooting, setShooting] = useState(0);
  const [technique, setTechnique] = useState(0);
  const [passing, setPassing] = useState(0);
  const [tackling, setTackling] = useState(0);
  const [playingStatus, setPlayingStatus] = useState(0);
  const [followers, setfollowers] = useState(0);
  const [following, setfollowing] = useState(0);
  const [posts, setposts] = useState(0);
  const [completed, setcompleted] = useState(0);


  useEffect(() => {
    async function fetchData() {
      console.log('useEffect');
      getData();
    }
    fetchData();
    window.scrollTo(0, 0);
  }, []);
  function getData() {
    try {
      var formData = new FormData();
      formData.append('crud', 'read');
      formData.append('token', localStorage.getItem('uToken'));
      formData.append('isPhotoAttached', 'NO');
      formData.append('bio', '');
      formData.append('name', 'NA');
      formData.append('email', 'NA');
      formData.append('address', 'NA');
      formData.append('country', 'NA');
      formData.append('age', '0');
      formData.append('height', 'NA');
      formData.append('foot', 'NA');
      formData.append('primary_position', 'NA');
      formData.append('secondary_position', 'NA');
      formData.append('contract_status', 'NA');
      formData.append('playing_status', '0');
      formData.append('dribbling', '0');
      formData.append('speed', '0');
      formData.append('shooting', '0');
      formData.append('technique', '0');
      formData.append('passing', '0');
      formData.append('tackling', '0');
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
          console.log(data);
          var responseObj = JSON.parse(data);
          //console.log(responseObj);
          if (responseObj['status'] == 'SUCCESS') {
            //alert(responseObj[1]);
            if (responseObj['message'] == 'DATA_FOUND') {
              //console.log(responseObj['data']);
              const fetchedData = responseObj['data'];
              setImgPath(fetchedData['img_path']);
              setBio(fetchedData['bio']);
              setName(fetchedData['name']);
              setEmail(fetchedData['email']);
              setAddress(fetchedData['address']);
              setCountry(fetchedData['country']);
              setAge(fetchedData['age']);
              setHeight(fetchedData['height']);
              setFoot(fetchedData['foot']);
              setPrimaryPosition(fetchedData['primary_position']);
              setSecondaryPosition(fetchedData['secondary_position']);
              setContractStatus(fetchedData['contract_status']);
              setPlayingStatus(fetchedData['playing_status']);
              setDribbling(fetchedData['dribbling']);
              setSpeed(fetchedData['speed']);
              setShooting(fetchedData['shooting']);
              setTechnique(fetchedData['technique']);
              setPassing(fetchedData['passing']);
              setTackling(fetchedData['tackling']);
              setMobile(fetchedData['mobile']);
              // setfollowers(fetchedData['followers']);
              // setfollowing(fetchedData['following']);
              // setposts(fetchedData['posts']);
              // setcompleted(fetchedData['completed']);
            } else {
              console.log(responseObj['message']);
            }
            if (responseObj['message_profile'] == 'DATA_FOUND') {
              const fetchedData = responseObj['data_profile'];
              setfollowers(fetchedData['followers']);
              setfollowing(fetchedData['following']);
              setposts(fetchedData['posts']);
              setcompleted(fetchedData['completed']);
            }
          } else {
            alert(responseObj['status']);
          }
        },
        error: function (html) {
          //alert(html);
          console.log(html);
        },
        url: window.BACK_END_URL + 'userProfileCRUD.php',
        cache: false
      });
    } catch (err) {
      alert('getData()' + err);
    }
  }
  return (
    <>
      <div className="md:flex justify-between">
        <div className="text-center md:flex">
          <div className="relative inline-block md:block  ">
            <img
              className=" w-[196px] h-[196px] mx-auto rounded-xl bg-[#E5DDDB] object-contain"
              src={img_path === 'NA' ? '' : `${window.IMG_HOST_URL}${img_path}`}
              alt=""
            />
          </div>

          <div className="px-5 flex w-72 mx-auto md:w-auto flex-col">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <div className="flex gap-4 py-5">
              <div className="w-16 flex flex-col justify-center items-center rounded-lg h-14 border">
                <span className="text-xl">{posts}</span>
                <p className="text-[12px] text-[#515151]">
                  {t("kooraBanner.Post")}
                </p>
              </div>
              <div className="w-16 flex flex-col justify-center items-center rounded-lg h-14 border">
                <span className="text-xl">{following}</span>
                <p className="text-[12px] text-[#515151]">
                  {t("kooraBanner.Following")}
                </p>
              </div>
              <div className="w-16 flex flex-col justify-center items-center rounded-lg h-14 border">
                <span className="text-xl">{followers}</span>
                <p className="text-[12px] text-[#515151]">
                  {t("kooraBanner.Followers")}
                </p>
              </div>
            </div>
            {/* <div className={`w-54 bg-[#EDEBDF] h-2 rounded-full relative after:absolute after:left-0 after:top-0 after:bg-bg-yellow after:w-[${completed}%] after:h-full after:rounded-full`}></div> */}
            <ProgressBar
              bgColor="#34BA28"
              height="6px"
              isLabelVisible={false}
              baseBgColor="#D8F1D6"
              progress
              completed={completed}
            />
            <p className="text-text-body py-3">{completed}{t("news.Completeprofile")}</p>
          </div>
        </div>
        <div className="flex md:block justify-center lg:flex  ">
          <Link to='/Profile/Edit' className="text-bg-yellow ml-4 rtl:mr-4  whitespace-nowrap  w-42 h-12 rounded-md flex items-center justify-center    px-5 mt-8     font-Inter py-2 border border-bg-yellow">
            {" "}
            <svg
              className="mr-2 rtl:ml-2"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.6759 2.7255C13.4813 1.92004 14.7872 1.92004 15.5927 2.7255C16.3981 3.53095 16.3981 4.83686 15.5927 5.64231L9.4395 11.7955C9.18969 12.0453 8.8799 12.2268 8.53982 12.3225L5.9649 13.0471C5.76903 13.1022 5.55866 13.0473 5.41477 12.9034C5.27089 12.7595 5.21593 12.5491 5.27106 12.3533L5.99571 9.77835C6.09142 9.43828 6.27287 9.12849 6.52268 8.87869L12.6759 2.7255ZM14.7972 3.52099C14.4311 3.15488 13.8375 3.15488 13.4714 3.52099L7.31817 9.67418C7.20463 9.78773 7.12215 9.92854 7.07864 10.0831L6.62574 11.6924L8.23506 11.2395C8.38964 11.196 8.53045 11.1136 8.644 11L14.7972 4.84682C15.1633 4.4807 15.1633 3.88711 14.7972 3.52099Z"
                fill="#EFDC59"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4053 3.69287H5.0625C3.09499 3.69287 1.5 5.28786 1.5 7.25537V13.2554C1.5 15.2229 3.09499 16.8179 5.0625 16.8179H11.0625C13.03 16.8179 14.625 15.2229 14.625 13.2554V7.91264L13.5 9.03764V13.2554C13.5 14.6016 12.4087 15.6929 11.0625 15.6929H5.0625C3.71631 15.6929 2.625 14.6016 2.625 13.2554V7.25537C2.625 5.90918 3.71631 4.81787 5.0625 4.81787H9.28032L10.4053 3.69287Z"
                fill="#EFDC59"
              />
            </svg>
            {t("kooraBanner.EditProfile")}
          </Link>
          <button className="text-bg-yellow ml-4 whitespace-nowrap rtl:mr-4 rounded-md  w-42 h-12 flex items-center justify-center    px-5 mt-8 md:mt-4 lg:mt-8     font-Inter py-2 border border-bg-yellow">
            <svg
              className="mr-2 rtl:ml-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4871 4.50645C10.8565 5.24381 11.6191 5.75 12.5 5.75C13.7426 5.75 14.75 4.74264 14.75 3.5C14.75 2.25736 13.7426 1.25 12.5 1.25C11.2574 1.25 10.25 2.25736 10.25 3.5C10.25 3.86178 10.3354 4.20361 10.4871 4.50645ZM10.4871 4.50645L5.5129 6.99355M5.5129 9.00645C5.66462 8.70361 5.75 8.36178 5.75 8C5.75 7.63822 5.66462 7.29639 5.5129 6.99355M5.5129 9.00645C5.1435 9.74381 4.38086 10.25 3.5 10.25C2.25736 10.25 1.25 9.24264 1.25 8C1.25 6.75736 2.25736 5.75 3.5 5.75C4.38086 5.75 5.1435 6.25619 5.5129 6.99355M5.5129 9.00645L10.4871 11.4935M10.4871 11.4935C10.3354 11.7964 10.25 12.1382 10.25 12.5C10.25 13.7426 11.2574 14.75 12.5 14.75C13.7426 14.75 14.75 13.7426 14.75 12.5C14.75 11.2574 13.7426 10.25 12.5 10.25C11.6191 10.25 10.8565 10.7562 10.4871 11.4935Z"
                stroke="#EFDC59"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("kooraBanner.Share")}
          </button>
        </div>
      </div>
      <div className="w-[100%] md:w-[60%] lg:w-1/2 mt-8 md:mt-12 space-y-3">
        <h2 className='text-lg font-bold font-robotoSlab md:inline-block relative after:absolute ltr:after:left-10 rtl:after:right-24 transform after:-translate-y-[50%] after:bg-[#DFE1E3] after:h-0.5 after:rounded-md after:content-[""] after:w-full md:after:w-48  after:top-[50%]  overflow-hidden   '>
          {t("news.Bio")}
        </h2>
        <div className="text-text-body">
          <div dangerouslySetInnerHTML={{ __html: bio.replace(/\n/g, "<br />") }} />
        </div>
      </div>
      <div className="w-[100%] md:w-[50%] mt-8 md:mt-12 space-y-3">
        <h2 className='text-lg font-bold font-robotoSlab md:inline-block relative after:absolute ltr:after:left-32 rtl:after:right-32 transform after:-translate-y-[50%] after:bg-[#DFE1E3] after:h-0.5 after:rounded-md after:content-[""] after:w-full md:after:w-48 overflow-hidden  after:top-[50%] '>
          {t("news.PersonalInfo")}
        </h2>
        <table>
          <tbody>
            <tr>
              <td className="flex items-center mb-6 ltr:mr-5 rtl:ml-5 text-[#414754]">
                <svg
                  className="mr-2 rtl:ml-2"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99984 3.125C8.50407 3.125 7.2915 4.33756 7.2915 5.83333C7.2915 7.3291 8.50407 8.54167 9.99984 8.54167C11.4956 8.54167 12.7082 7.3291 12.7082 5.83333C12.7082 4.33756 11.4956 3.125 9.99984 3.125ZM6.0415 5.83333C6.0415 3.64721 7.81371 1.875 9.99984 1.875C12.186 1.875 13.9582 3.64721 13.9582 5.83333C13.9582 8.01946 12.186 9.79167 9.99984 9.79167C7.81371 9.79167 6.0415 8.01946 6.0415 5.83333Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.25016 12.2915C4.98451 12.2915 3.9585 13.3175 3.9585 14.5832C3.9585 15.8488 4.98451 16.8748 6.25016 16.8748H13.7502C15.0158 16.8748 16.0418 15.8488 16.0418 14.5832C16.0418 13.3175 15.0158 12.2915 13.7502 12.2915H6.25016ZM2.7085 14.5832C2.7085 12.6272 4.29415 11.0415 6.25016 11.0415H13.7502C15.7062 11.0415 17.2918 12.6272 17.2918 14.5832C17.2918 16.5392 15.7062 18.1248 13.7502 18.1248H6.25016C4.29415 18.1248 2.7085 16.5392 2.7085 14.5832Z"
                    fill="black"
                  />
                </svg>
                {t("kooraBanner.Name")} :
              </td>
              <td>{name}</td>
            </tr>
            <tr className="">
              <td className="flex items-center  ltr:mr-5 rtl:ml-5 text-[#414754]">
                <svg className="mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5.3335" y="2.6665" width="21.3333" height="26.6667" rx="4" stroke="black" strokeWidth="1.5" />
                  <path d="M20.6668 6.6665H11.3335C10.2289 6.6665 9.3335 7.56194 9.3335 8.66651V9.99984C9.3335 11.1044 10.2289 11.9998 11.3335 11.9998H20.6668C21.7714 11.9998 22.6668 11.1044 22.6668 9.99984V8.6665C22.6668 7.56193 21.7714 6.6665 20.6668 6.6665Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <ellipse cx="21.3333" cy="15.9998" rx="1.33333" ry="1.33333" fill="black" />
                  <ellipse cx="21.3333" cy="19.9998" rx="1.33333" ry="1.33333" fill="black" />
                  <ellipse cx="21.3333" cy="23.9998" rx="1.33333" ry="1.33333" fill="black" />
                  <ellipse cx="16.0003" cy="19.9998" rx="1.33333" ry="1.33333" fill="black" />
                  <circle cx="16.0003" cy="15.9998" r="1.33333" fill="black" />
                  <ellipse cx="10.6668" cy="19.9998" rx="1.33333" ry="1.33333" fill="black" />
                  <ellipse cx="16.0003" cy="23.9998" rx="1.33333" ry="1.33333" fill="black" />
                  <circle cx="10.6668" cy="15.9998" r="1.33333" fill="black" />
                  <ellipse cx="10.6668" cy="23.9998" rx="1.33333" ry="1.33333" fill="black" />
                </svg>

                {t("profile.MobileNo")} :
              </td>
              <td className="">{mobile}</td>
            </tr>
            <tr className="">
              <td className="flex items-center py-6 ltr:mr-5 rtl:ml-5 text-[#414754]">
                <svg
                  className="mr-2 rtl:ml-2"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.0415039 7C0.0415039 3.27208 2.5599 0.25 5.6665 0.25H12.3332C15.4398 0.25 17.9582 3.27208 17.9582 7V11C17.9582 14.7279 15.4398 17.75 12.3332 17.75H5.6665C2.5599 17.75 0.0415039 14.7279 0.0415039 11V7ZM5.6665 1.75C3.25026 1.75 1.2915 4.10051 1.2915 7V11C1.2915 13.8995 3.25026 16.25 5.6665 16.25H12.3332C14.7494 16.25 16.7082 13.8995 16.7082 11V7C16.7082 4.10051 14.7494 1.75 12.3332 1.75H5.6665Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.34499 5.53151C4.56062 5.20806 4.95393 5.15562 5.22347 5.41438L7.30781 7.41535C8.29695 8.36492 9.70245 8.36492 10.6916 7.41535L12.7759 5.41438C13.0455 5.15562 13.4388 5.20806 13.6544 5.53151C13.87 5.85495 13.8263 6.32692 13.5568 6.58568L11.4724 8.58666C10.0268 9.97449 7.9726 9.97449 6.52694 8.58665L4.4426 6.58568C4.17306 6.32692 4.12936 5.85495 4.34499 5.53151Z"
                    fill="black"
                  />
                </svg>
                {t("common.Email")} :
              </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td className="flex items-center ltr:mr-5 rtl:ml-5 text-[#414754]">
                <svg
                  className="mr-2 rtl:ml-2"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.3008 4.40426C5.39687 5.24534 4.7915 6.56573 4.7915 8.5C4.7915 10.4025 5.66238 12.5297 6.81597 14.1978C7.38897 15.0264 8.01392 15.7153 8.60198 16.1899C9.2113 16.6816 9.69579 16.875 9.99984 16.875C10.3039 16.875 10.7884 16.6816 11.3977 16.1899C11.9858 15.7153 12.6107 15.0264 13.1837 14.1978C14.3373 12.5297 15.2082 10.4025 15.2082 8.5C15.2082 6.56573 14.6028 5.24534 13.6989 4.40426C12.7866 3.55545 11.4952 3.125 9.99984 3.125C8.50451 3.125 7.21303 3.55545 6.3008 4.40426ZM5.4493 3.48914C6.64832 2.37348 8.27351 1.875 9.99984 1.875C11.7262 1.875 13.3514 2.37348 14.5504 3.48914C15.7577 4.61252 16.4582 6.29214 16.4582 8.5C16.4582 10.7396 15.454 13.1125 14.2118 14.9088C13.5869 15.8124 12.8837 16.5969 12.1827 17.1626C11.503 17.7112 10.7375 18.125 9.99984 18.125C9.26222 18.125 8.49671 17.7112 7.81696 17.1626C7.11596 16.5969 6.41278 15.8124 5.78787 14.9088C4.54563 13.1125 3.5415 10.7396 3.5415 8.5C3.5415 6.29214 4.24197 4.61252 5.4493 3.48914Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 6.4585C8.96447 6.4585 8.125 7.29796 8.125 8.3335C8.125 9.36903 8.96447 10.2085 10 10.2085C11.0355 10.2085 11.875 9.36903 11.875 8.3335C11.875 7.29796 11.0355 6.4585 10 6.4585ZM6.875 8.3335C6.875 6.60761 8.27411 5.2085 10 5.2085C11.7259 5.2085 13.125 6.60761 13.125 8.3335C13.125 10.0594 11.7259 11.4585 10 11.4585C8.27411 11.4585 6.875 10.0594 6.875 8.3335Z"
                    fill="black"
                  />
                </svg>
                {t("news.Address")}
              </td>
              <td>{address}</td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto ">
          <tbody className="space-y-3">
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.Country")} </td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">{country}</td>
            </tr>
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.Age")} </td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">{age}</td>
            </tr>
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.Height")} </td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">{height}</td>
            </tr>
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.Preferredfoot")}</td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">{foot}</td>
            </tr>
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.PrimaryPosition")}</td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">
                {primaryPosition}
              </td>
            </tr>
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.SecondaryPosition")}</td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">{secondaryPosition}</td>
            </tr>
            <tr className="text-[#757877] ">
              <td className="pb-3">{t("profile.ContractStatus")}</td>
              <td className="px-8 pb-3">:</td>
              <td className="text-[#232C35] font-semibold pb-3">
                {contractStatus}
              </td>
            </tr>
            <tr className="text-[#757877] ">
              <td>{t("profile.PlayingStatus")}</td>
              <td className="px-8">:</td>
              <td>
                <ProgressBar
                  bgColor="#34BA28"
                  height="6px"
                  isLabelVisible={false}
                  baseBgColor="#D8F1D6"
                  progress
                  completed={playingStatus}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Dribbling")}</p>
            <InputRange maxValue={100} minValue={0} value={dribbling} disabled />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Speed")}</p>
            <InputRange maxValue={100} minValue={0} value={speed} disabled />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Shooting")}</p>
            <InputRange maxValue={100} minValue={0} value={shooting} disabled />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Technique")}</p>
            <InputRange maxValue={100} minValue={0} value={technique} disabled />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Passing")}</p>
            <InputRange maxValue={100} minValue={0} value={passing} disabled />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Tackling")}</p>
            <InputRange maxValue={100} minValue={0} value={tackling} disabled />
          </div>

        </div>
      </div>
    </>
  );
};

export default Information;
