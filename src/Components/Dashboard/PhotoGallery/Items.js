import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import Modal from "react-modal";
import { RiAddFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { Player } from "video-react";
// @import '~video-react/styles/scss/video-react';
import "video-react/dist/video-react.css";
import { CgClose } from "react-icons/cg";
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "28px",
    width: "660px",
    hight: "400px",

  },
};
const customStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "28px",
    width: "660px",
    //   hight:"400px"
  },
};

const Items = ({ item, setData }) => {
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  function openModal1() {
    setIsOpen1(true);
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  function closeModal1() {
    setIsOpen1(false);
  }
  const approveOrReject = (id, isRequestApproved) => {
    console.log('Approval Or Reject: id->' + id + ' isRequestApproved->' + isRequestApproved);
    approveOrRejectRequest(id, isRequestApproved);
  }

  function approveOrRejectRequest(id, isRequestApproved) {
    try {
      if (id > 0) {
        var formData = new FormData();
        formData.append('token', localStorage.getItem('admin'));
        formData.append('dbID', id);
        formData.append('isApproved', isRequestApproved);
        formData.append('source', 'gallery');
        formData.append('searchVal', '');
        $.ajax({
          type: 'POST',
          contentType: false,
          processData: false,
          data: formData,
          success: function (data) {
            console.log(data);
            var responseObj = JSON.parse(data);
            if (responseObj[0] == 'SUCCESS') {
              alert(responseObj[1]);
              closeModal();
              closeModal1();
              if (responseObj[2] == 'DATA_FOUND') {
                const fetchedData = responseObj[3];
                setData(fetchedData);
              } else {
                setData([]);
                console.log(responseObj[2]);
              }
            } else {
              alert(responseObj[0]);
              if (responseObj[0] == 'Please Login') {
                localStorage.removeItem("dToken");
                localStorage.removeItem("admin");
                navigate('/Login');
              }
            }
          },
          error: function (html) {
            //alert(html);
            console.log(html);
          },
          url: window.BACK_END_URL + 'requestApproveReject.php',
          cache: false
        });
      }
    } catch (err) {
      alert('approveOrRejectRequest()' + err);
    }
  }

  return (
    <>
      <tr>
        <td className="py-3 text-left  my-2">
          {item.type === "image" ? (
            <img
              onClick={openModal}
              id={item.id}
              className="w-[93px]  block cursor-pointer h-[93px] rounded-xl object-cover  "
              src={item?.src}
              alt=""
            />
          ) : (
            <div className="relative block z-0   w-[93px] h-[93px] ">
              <img
                className="w-[93px] block    h-[93px] rounded-xl object-cover  "
                src="https://i.ibb.co/bgmp7nV/Rectangle-900.png"
                alt=""
              />
              <span
                onClick={openModal1}
                className="absolute z-20 animation-my flex justify-center items-center rounded-full cursor-pointer text-[#F8F8F8] w-[30px] object-cover h-[30px] bg-[#5b5447]  left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] "
              >
                <FaPlay className="text-sm" />
              </span>
            </div>
          )}
        </td>
        <td className="py-3 my-2">{item.type}</td>
        <td className="py-3 my-2">{item.name}</td>
        <td className="py-3 my-2">{item.date}</td>
        <td
          className={`${item.isApproved === 1
            ? "text-[#27BA47]"
            : item.isApproved === 2
              ? "text-[#F54D4D]"
              : "text-[#4D90F5]"
            } `}
        >
          {item.isApproved === 1 ? "Approved" : item.isApproved === 2 ? " Rejected" : "Pending"}
        </td>
        {/* <td className="py-3 my-2 ">
          <div className="flex items-center justify-center -z-0 w-full">
            <label htmlFor={item.id} className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id={item.id} defaultChecked={item.isApproved === 0 ? false : true} className="sr-only" onClick={onDisableCheckboxChange(item.id)} />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div className={` ${item.isApproved === 0 ? "bg-red-600" : "bg-[#39B54A]"} dot absolute left-1 top-1 w-6 h-6 rounded-full transition  `}></div>
              </div>
            </label>
          </div>
        </td> */}
      </tr>
      {item?.type === "image" ? (
        <>
        
          <Modal
            htmlFor={item.id}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="relative rounded-3xl   w-full h-full">
              {/* <RiAddFill onClick={() => setIsOpen(false)} className='transform rotate-45 mr-3 text-3xl transition duration-300 cursor-pointer hover:-rotate-45' /> */}
              <h3 className="text-xl text-text-body pb-6 flex justify-between items-center  font-semibold">
                <span>Full View</span>{" "}
              </h3>
              <span
                onClick={() => setIsOpen(false)}
                className="cursor-pointer absolute  -right-[40px] rtl:-left-[10px] -top-[40px] w-12 h-12 flex justify-center items-center text-white border-2 z-50 border-white bg-[#938D4A] rounded-full"
              >
                <CgClose className="text-2xl transform hover:rotate-90 duration-300" />
              </span>
            </div>

            <img
              className="object-cover w-[600px] h-[400px] overflow-hidden rounded-3xl"
              src={item?.src}
              alt=""
            />
            <div className="flex space-x-4 mt-5">
              <button onClick={() => approveOrReject(item.id, 2)} className=" w-1/2 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6">
                <RiAddFill className="transform rotate-45 mr-3 text-2xl" />{" "}
                Reject
              </button>
              <button onClick={() => approveOrReject(item.id, 1)} className=" w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6">
                <BsCheckCircle className=" mr-3 text-2xl" /> Approve
              </button>
            </div>
          </Modal>{" "}
        </>
      ) : (
        <>
      
          <Modal
            isOpen={modalIsOpen1}
            onRequestClose={closeModal1}
            style={customStyles1}
            contentLabel="Example Modal"
          >
            <div className="relative w-full h-full">
              <h3 className="text-xl text-text-body pb-6 flex justify-between items-center  font-semibold">
                <span>Full Video</span>{" "}
              </h3>
              <span
                onClick={() => setIsOpen1(false)}
                className="cursor-pointer absolute  -right-[40px] rtl:-left-[10px] -top-[40px] w-12 h-12 flex justify-center items-center text-white border-2 z-50 border-white bg-[#938D4A] rounded-full"
              >
                <CgClose className="text-2xl transform hover:rotate-90 duration-300" />
              </span>
            </div>

            <Player autoplay={true} className="rounded-md overflow-hidden">

              <source autoplay={true} src={item?.src} />
            </Player>
            <div className="flex space-x-4 mt-5">
              <button onClick={() => approveOrReject(item.id, 2)} className=" w-1/2 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6">
                <RiAddFill className="transform rotate-45 mr-3 text-2xl" />{" "}
                Reject
              </button>
              <button onClick={() => approveOrReject(item.id, 1)} className=" w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6">
                <BsCheckCircle className=" mr-3 text-2xl" /> Approve
              </button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Items;
