import React, { useState } from "react";
import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
  RiTimeLine,
} from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import { FaRegCalendarAlt, FaPlay } from "react-icons/fa";
import img from "../../image/Rectangle 25.png";
// import ModalVideo from 'react-modal-video'
import Modal from "react-modal";
import { Player } from "video-react";
// @import '~video-react/styles/scss/video-react';
import "video-react/dist/video-react.css";
import { CgClose } from "react-icons/cg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "660px",
    // hight:"400px"
  },
};
const VideoSingle = () => {
  const [like, setLike] = useState(false);
  const [unlike, setUnLike] = useState(false);
  let [likeNumber, setLikeNumber] = useState(0);
  let [unlikeNumber, setUnLikeNumber] = useState(0);
  let [views, setViews] = useState();

  const handleLike = (i) => {
    setLike(!like);
    setUnLike(false);
    setLikeNumber(likeNumber + 1);
    if (unlikeNumber > 0) {
      setUnLikeNumber(unlikeNumber - 1);
    }
  };
  const handleUnLike = (i) => {
    setUnLike(!unlike);
    setLike(false);
    setUnLikeNumber(unlikeNumber + 1);
    if (likeNumber > 0) {
      setLikeNumber(likeNumber - 1);
    }
  };
  // const [isOpen, setOpen] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className="relative ">
        <img className="w-full h-[216px] -z-20    object-cover" src={img} alt="" />
        <span
          onClick={openModal}
          className="absolute z-20 animation-my flex justify-center items-center rounded-full cursor-pointer text-[#F8F8F8] w-[52px] object-cover h-[52px] bg-[#c1b6a1] left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] "
        >
          <FaPlay />
        </span>
      </div>
      <div>
        <div className="flex  mt-4 justify-between items-center text-[#515151] font-Inter ">
          <span>
            {" "}
            02/19/2021{" "}
            <FaRegCalendarAlt className="inline-block ltr:mr-1 rtl:ml-1" />
          </span>
          <span>
          {" "}
            10:36:22{" "}
            <RiTimeLine className="inline-block ltr:mr-1 rtl:ml-1" />
          </span>
        </div>
        <div className="flex items-center space-x-2 text-text-body">
          <div className="flex space-x-2 items-center  ">
            {like ? (
              <span>
                {" "}
                <RiThumbUpFill />{" "}
              </span>
            ) : (
              <span onClick={() => handleLike()}>
                <RiThumbUpLine />{" "}
              </span>
            )}
            <span className="ltr:border-r-2 rtl:border-l-2 pr-2 rtl:pl-2">
              {likeNumber}
            </span>
          </div>

          <div className="flex space-x-2 items-center">
            {unlike ? (
              <span>
                <RiThumbDownFill className="" />
              </span>
            ) : (
              <span className="" onClick={() => handleUnLike()}>
                <RiThumbDownLine />
              </span>
            )}
            <span className="ltr:border-r-2 rtl:border-l-2 pr-2 rtl:pl-2 my-2 ">
              {unlikeNumber}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="rtl:ml-2">
              <HiOutlineEye />
            </span>
            <span className="mr-2 ">{views}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-text-body">
          <button className=" w-42 font-semibold  bg-bg-yellow text-text-body flex items-center justify-center  py-2 rounded-sm px-6 font-Inter">
            {" "}
            Approved
          </button>
        </div>
      </div>
      {/* <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} /> */}
      {/* { isOpen &&  <div className="absolute  left-[50%] bg-white w-[500px]  top-[50%] transform z-20 -translate-x-[50%] -translate-y-[50%]">
      <div className='relative w-full h-full'>
      <span onClick={() => setOpen(false)} className='cursor-pointer absolute  ltr:-right-[20px] rtl:-left-[20px] -top-[20px] w-12 h-12 flex justify-center items-center text-white border-2 z-50 border-white bg-[#938D4A] rounded-full'><CgClose className='text-2xl transform hover:rotate-90 duration-300' /></span>
      </div>
   
           <Player>
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    </Player>
     
      </div>} */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
       
      >
        <div className='relative w-full h-full'>
        <span onClick={() => setIsOpen(false)} className='cursor-pointer absolute  ltr:-right-[40px] rtl:-left-[40px] -top-[40px] w-12 h-12 flex justify-center items-center text-white border-2 z-50 border-white bg-[#938D4A] rounded-full'><CgClose className='text-2xl transform hover:rotate-90 duration-300' /></span>
        </div>
       
        
        <Player autoplay={true}  className="rounded-md overflow-hidden">
          <source autoplay={true} src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player>
      </Modal>
    </div>
    
  );
};

export default VideoSingle;
