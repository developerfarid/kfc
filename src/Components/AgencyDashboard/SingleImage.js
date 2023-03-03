import React, { useState } from 'react';
import img from "../../image/Rectangle 25.png"
import { RiThumbDownFill, RiThumbDownLine, RiThumbUpFill, RiThumbUpLine, RiTimeLine } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Modal from 'react-modal';
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
      width: "800px",
      // hight:"400px"
    },
  };
const SingleImage = (item) => {
    const [like, setLike] = useState(false)
    const [unlike, setUnLike] = useState(false)
    let [likeNumber, setLikeNumber] = useState(0)
    let [unlikeNumber, setUnLikeNumber] = useState(0)

    const handleLike = (i) => {
        setLike(!like)
        setUnLike(false)
        setLikeNumber(likeNumber + 1)
        if (unlikeNumber > 0) {
            setUnLikeNumber(unlikeNumber - 1)
        }

    }
    const handleUnLike = (i) => {
        setUnLike(!unlike)
        setLike(false)
        setUnLikeNumber(unlikeNumber + 1)
        if (likeNumber > 0) {
            setLikeNumber(likeNumber - 1)
        }
    }
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    return (
        <div >
        <img onClick={openModal} className='w-full h-[216px] object-cover '  src={img} alt="" />
            <div>
            <div className='flex mt-4 justify-between items-center text-[#515151] font-Inter '>
                                    <span><FaRegCalendarAlt className='inline-block' /> 02/19/2021</span>
                                    <span><RiTimeLine className='inline-block' /> 10:36:22</span>
                                </div>
                <div className='flex items-center space-x-2 text-text-body'>
                    
                <div className='flex space-x-2 items-center  '>
                 
                    {like ? <span > <RiThumbUpFill /> </span> : <span  onClick={() => handleLike()}>
                            <RiThumbUpLine /> </span>}
                            <span className='ltr:border-r-2 rtl:border-l-2 ltr:pr-2 rtl:pl-2'>{likeNumber}</span>

                    </div>
               
                <div className='flex space-x-2 items-center'>

                    {
                        unlike ? <span ><RiThumbDownFill className='' /></span> : <span className='' onClick={() => handleUnLike()}><RiThumbDownLine /></span>
                        }
                        <span className='ltr:border-r-2 rtl:border-l-2 ltr:pr-2 rtl:pl-2 my-2 '>{unlikeNumber}</span>
                </div>
                <div className='flex space-x-2 items-center'>

                    
                            <span><HiOutlineEye  /></span>
                            <span>22K</span>
                    
                </div>
            </div>
        </div>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
       
      >
        <div className='relative w-full h-full'>
        <span onClick={() => setIsOpen(false)} className='cursor-pointer absolute  ltr:-right-[40px] rtl:-left-[40px] -top-[40px] w-12 h-12 flex justify-center items-center text-white border-2 z-50 border-white bg-[#938D4A] rounded-full'><CgClose className='text-2xl transform hover:rotate-90 duration-300' /></span>
        </div>
       
        
        <img className='object-cover' src={img} alt="" />
      </Modal>
</div> 
    );
};

export default SingleImage;