import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputRange from "react-input-range";
import img from "../../image/image 828.png";
import ReactRange from "./ReactRange";
import $ from 'jquery';

const EditProfile = () => {
  const { t } = useTranslation();

  const [profileImage, setProfileImage] = useState(null);
  const [img_path, setImgPath] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
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
      formData.append('bio','');
      formData.append('isPhotoAttached', 'NO');
      formData.append('img_path', 'NA');
      formData.append('name', 'NA');
      formData.append('email', 'NA');
      formData.append('mobile', 'NA');
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
          //console.log(data);
          var responseObj = JSON.parse(data);
          console.log(responseObj);
          if (responseObj['status'] == 'SUCCESS') {
            //alert(responseObj[1]);
            if (responseObj['message'] == 'DATA_FOUND') {
              console.log(responseObj['data']);
              const fetchedData = responseObj['data'];
              setImgPath(fetchedData['img_path']);
              setBio(fetchedData['bio']);
              setName(fetchedData['name']);
              setMobile(fetchedData['mobile']);
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
            } else {
              alert(responseObj['message']);
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

  const checkFileSize = (event) => {
    console.log(event.target.files[0]);
    var file = event.target.files[0];
    if (file) {
      var imgSize = (file.size / 1024);
      if (imgSize > (window.MAX_IMAGE_SIZE - 1)) {
        alert('Image size must be less than ' + window.MAX_IMAGE_SIZE + 'kb');
        event.target.value = "";
        setProfileImage(null);
      } else {
        setProfileImage(event.target.files[0]);
      }
    }
  };

  function updateData() {
    try {
      var formData = new FormData();
      formData.append('crud', 'update');
      formData.append('token', localStorage.getItem('uToken'));
      let isPhotoAttached = 'NO';
      let photo = null;
      if (profileImage === null ) {
        console.log("profileImage === null");
        isPhotoAttached = 'NO';
        photo = null;
      }
      else {
        isPhotoAttached = 'YES';
        photo = profileImage;
      }
      formData.append('isPhotoAttached', isPhotoAttached);
      formData.append('image', photo);
      formData.append('bio',bio);
      formData.append('name', name);
      formData.append('mobile', mobile);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('country', country);
      formData.append('age', age);
      formData.append('height', height);
      formData.append('foot', foot);
      formData.append('primary_position', primaryPosition);
      formData.append('secondary_position', secondaryPosition);
      formData.append('contract_status', contractStatus);
      formData.append('playing_status', playingStatus);
      formData.append('dribbling', dribbling);
      formData.append('speed', speed);
      formData.append('shooting', shooting);
      formData.append('technique', technique);
      formData.append('passing', passing);
      formData.append('tackling', tackling);
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
          console.log(data);
          var responseObj = JSON.parse(data);
          console.log(responseObj);
          if (responseObj['status'] == 'SUCCESS') {            
            localStorage.setItem('displayName', name);
            alert(responseObj['message']);
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
    <div>
      <div className="relative inline-block md:block  ">
        <p className="text-[#20252C] font-semibold  text-xl py-10">
          {t('profile.EditInformation')}
        </p>
        <img 
          className=" w-[196px] h-[196px]  rounded-xl bg-[#E5DDDB] object-contain"
          src={profileImage ? URL.createObjectURL(profileImage) : `${window.IMG_HOST_URL}${img_path}`}
          alt=""
        />
        <div className="absolute ltr:right-4 rtl:left-4 md:ltr:left-[120px] md:rtl:right-[120px]   flex items-center justify-center bottom-2 w-16 h-16 rounded-full bg-white">
          <input
            type="file" accept="image/*"
            className="w-full absolute h-full opacity-0 cursor-pointer  okk"
            onInput={checkFileSize}
          />
          <svg
            className=""
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="15.5006"
              cy="15.4996"
              r="3.78571"
              stroke="black"
              strokeWidth="1.5"
            />
            <circle cx="15.5007" cy="6.66669" r="1.2619" fill="black" />
            <path
              d="M26.8578 18.0237V12.9761C26.8578 9.49144 24.033 6.66657 20.5483 6.66657H20.3893C19.829 4.4895 17.8527 2.88086 15.5007 2.88086C13.1487 2.88086 11.1724 4.4895 10.6121 6.66657H10.4531C6.96842 6.66657 4.14355 9.49144 4.14355 12.9761V18.0237C4.14355 21.5084 6.96842 24.3332 10.4531 24.3332H20.5483C24.033 24.3332 26.8578 21.5084 26.8578 18.0237Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className=" mt-8 md:mt-12 space-y-3">
        <h2 className="text-lg font-bold font-robotoSlab md:inline-block text-[#676767]">
          {t("news.Bio")}
        </h2>
        <textarea value={bio} onChange={(e) => { setBio(e.target.value); }}
          type="text"
          placeholder="Bios are written in the third person and are typically one or two paragraphs, depending on your level of experience. Your bio should start with your name"
          className="text-text-body focus:outline-none rounded-md border p-4 w-full rtl:md:pl-[40%] ltr:md:pr-[40%] h-28 "
        ></textarea>
      </div>
      <div className="w-ful  mt-8 md:mt-12 space-y-3">
        <h2 className="text-lg font-bold  text-[#676767] md:inline-block   ">
          {t("news.PersonalInfo")}
        </h2>
        <table className="w-full">
          <tr className="border p-4 block rounded-md mb-3">
            <td className="flex items-center  ltr:mr-5 rtl:ml-5 text-[#414754]">
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

              <input value={name} onChange={(e) => { setName(e.target.value); }}
                className="w-full focus:outline-none"
                type="text"
                name=""
                id=""
                placeholder="Sang Nguyen"
              />
            </td>
          </tr>
          <tr className="border p-4 block rounded-md mb-3">
            <td className="flex items-center  ltr:mr-5 rtl:ml-5 text-[#414754]">
            <svg  className="mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="5.3335" y="2.6665" width="21.3333" height="26.6667" rx="4" stroke="black" strokeWidth="1.5"/>
<path d="M20.6668 6.6665H11.3335C10.2289 6.6665 9.3335 7.56194 9.3335 8.66651V9.99984C9.3335 11.1044 10.2289 11.9998 11.3335 11.9998H20.6668C21.7714 11.9998 22.6668 11.1044 22.6668 9.99984V8.6665C22.6668 7.56193 21.7714 6.6665 20.6668 6.6665Z" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
<ellipse cx="21.3333" cy="15.9998" rx="1.33333" ry="1.33333" fill="black"/>
<ellipse cx="21.3333" cy="19.9998" rx="1.33333" ry="1.33333" fill="black"/>
<ellipse cx="21.3333" cy="23.9998" rx="1.33333" ry="1.33333" fill="black"/>
<ellipse cx="16.0003" cy="19.9998" rx="1.33333" ry="1.33333" fill="black"/>
<circle cx="16.0003" cy="15.9998" r="1.33333" fill="black"/>
<ellipse cx="10.6668" cy="19.9998" rx="1.33333" ry="1.33333" fill="black"/>
<ellipse cx="16.0003" cy="23.9998" rx="1.33333" ry="1.33333" fill="black"/>
<circle cx="10.6668" cy="15.9998" r="1.33333" fill="black"/>
<ellipse cx="10.6668" cy="23.9998" rx="1.33333" ry="1.33333" fill="black"/>
</svg>


              <input value={mobile} onChange={(e) => { setMobile(e.target.value); }}
                className="w-full focus:outline-none"
                type="mobile"
                name=""
                id=""
                placeholder="+9661234567" readOnly
              />
            </td>
          </tr>
          <tr className="border p-4 block rounded-md mb-3">
            <td className="flex items-center  ltr:mr-5 rtl:ml-5 text-[#414754]">
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
              <input value={email} onChange={(e) => { setEmail(e.target.value); }}
                className="w-full focus:outline-none"
                type="email"
                name=""
                id=""
                placeholder="sangnguyen@gmail.com"
              />
            </td>
          </tr>
          <tr className="border p-4 block rounded-md mb-3">
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
              <input value={address} onChange={(e) => { setAddress(e.target.value); }}
                className="w-full focus:outline-none"
                type="text"
                name=""
                id=""
                placeholder="4140 Parker Rd. Allentown,"
              />
            </td>
          </tr>
        </table>
        <div>
          <label
            className="block text-[#8A9099] text-base font-semibold mt-6 mb-3"
            htmlFor="Country"
          >
            {t("profile.Country")}
          </label>
          <input value={country} onChange={(e) => { setCountry(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="Country"
            placeholder={"Saudi"}
          />
          <label
            className="block text-[#8A9099] text-base font-semibold mt-6 mb-3"
            htmlFor="Age"
          >
            {t("profile.Age")}
          </label>
          <input value={age} onChange={(e) => { setAge(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="Age"
            placeholder={"23"}
          />
          <label
            className="block text-[#8A9099] text-base font-semibold  my-3"
            htmlFor="name"
          >
            {t("profile.Height")}
          </label>
          <input value={height} onChange={(e) => { setHeight(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="name"
            placeholder={"5’8”"}
          />
          <label
            className="block text-[#8A9099] text-base font-semibold mt-6 mb-3"
            htmlFor="name"
          >
            {t("profile.Preferredfoot")}

          </label>
          <input value={foot} onChange={(e) => { setFoot(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="name"
            placeholder={"Right"}
          />
          <label
            className="block text-[#8A9099] text-base font-semibold mt-6 mb-3"
            htmlFor="name"
          >
            {t("profile.PrimaryPosition")}
          </label>
          <input value={primaryPosition} onChange={(e) => { setPrimaryPosition(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="name"
            placeholder={"Left Centre Forward"}
          />
          <label
            className="block text-[#8A9099] text-base font-semibold mt-6 mb-3"
            htmlFor="name"
          >
            {t("profile.SecondaryPosition")}
          </label>
          <input value={secondaryPosition} onChange={(e) => { setSecondaryPosition(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="name"
            placeholder={"Left Midfield"}
          />
          <label
            className="block text-[#8A9099] text-base font-semibold mt-6 mb-3"
            htmlFor="name"
          >
            {t("profile.ContractStatus")}
          </label>
          <input value={contractStatus} onChange={(e) => { setContractStatus(e.target.value); }}
            className="w-full px-6 py-3 rounded-lg focus:outline-none border bg-[#FBFBFB] text-[#171D2E] focus:ring-indigo-500   focus:z-10"
            id="name"
            placeholder={"On Contract"}
          />
        </div>


        <div className="py-8">
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.PlayingStatus")} </p>
            <InputRange maxValue={100} minValue={0} value={playingStatus} onChange={value => { setPlayingStatus(value); }} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Dribbling")} </p>
            <InputRange maxValue={100} minValue={0} value={dribbling} onChange={value => { setDribbling(value); }} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Speed")}</p>
            <InputRange maxValue={100} minValue={0} value={speed} onChange={value => { setSpeed(value); }} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Shooting")}</p>
            <InputRange maxValue={100} minValue={0} value={shooting} onChange={value => { setShooting(value); }} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Technique")}</p>
            <InputRange maxValue={100} minValue={0} value={technique} onChange={value => { setTechnique(value); }} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Passing")}</p>
            <InputRange maxValue={100} minValue={0} value={passing} onChange={value => { setPassing(value); }} />
          </div>
          <div className="mb-5">
            <p className="text-[#757877]">{t("profile.Tackling")}</p>
            <InputRange maxValue={100} minValue={0} value={tackling} onChange={value => { setTackling(value); }} />
          </div>
        </div>
        <button onClick={updateData} className=' btn-update w-full md:w-auto md:mx-auto   mt-16 block  md:px-16'> {t("common.update")}</button>
      </div>
    </div>
  );
};

export default EditProfile;
