import React, { useState, useEffect } from "react";
import demo from "../../../image/278469949_1037683087131716_8148678040115529953_n.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import Modal from "react-modal";
import { RiAddFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Player } from "video-react";
// @import '~video-react/styles/scss/video-react';
import "video-react/dist/video-react.css";
import { CgClose } from "react-icons/cg";
import Items from "./Items";
import vi from '../../../image/2022-06-02 17-09-46.mkv'


const ApprovePhoto = () => {
  let navigate = useNavigate();
  const [dataArray, setData] = useState([]);

  const [image, setImage] = useState("");
  const [imageID, setImageID] = useState(0);
  const [isImagePresent, setIsImagePresent] = useState(false);
  const [isApprove, setIsApprove] = useState(1);

  const handleClick = (imgurl, imageid, isapproved) => {
    // setIsOpen(true);
    setImage(imgurl);
    setImageID(imageid);
    setIsApprove(isapproved);
  };

  useEffect(() => {
    async function fetchData() {
      var formData = new FormData();
      formData.append("source", "dashboard");
      formData.append("token", localStorage.getItem("admin"));
      $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
          console.log(data);
          var responseObj = JSON.parse(data);
          if (responseObj[0] == "SUCCESS") {
            //alert(responseObj[1]);
            if (responseObj[1] == "DATA_FOUND") {
              //console.log(responseObj[2]);
              const fetchedData = responseObj[2];
              setData(fetchedData);
              setIsImagePresent(true);
            } else {
              alert(responseObj[1]);
              setIsImagePresent(false);
            }
          } else {
            alert(responseObj[0]);
            if (responseObj[0] == "Please Login") {
              localStorage.removeItem("dToken");
              localStorage.removeItem("admin");
              navigate("/Login");
            }
          }
        },
        error: function (html) {
          //alert(html);
          console.log(html);
        },
        url: window.BACK_END_URL + "photoGalleryList.php",
        cache: false,
      });
    }
    fetchData();
  }, []);

  

  

  return (
    <>
      <div className="bg-white h-24 flex justify-between px-8 items-center z-50 fixed top-0 left-3/12 right-0 w-9/12">
        <h2 className="text-lg font-semibold">
        Approval<span className="text-gray-600">(Gallery)</span>
        </h2>
        <IoMdNotificationsOutline className="text-lg" />
      </div>
      <div className="mt-24">
      <div className='flex justify-end  px-8 pt-8'>
      
{/* <Link to='/Dashboard/Academy/0' className='btn-update'><IoIosAddCircleOutline className=' mr-3 text-2xl' /> Add Academy</Link> */}
</div>
        <div className=" p-8">
          <div className="bg-bg-gray rounded-2xl">
            <div className="container flex flex-col  justify-center">
              <div className="dashboard-rawper px-0 ">
                <table className="table-auto text-center">
                  <thead className="pb-3 border-b-2">
                    <tr>
                      <th className="pb-3 text-left text-sm md:text-lg font-semibold">
                        Preview
                      </th>
                      <th className="pb-3 text-sm md:text-lg font-semibold">
                        Content
                      </th>
                      <th className="pb-3 text-sm md:text-lg font-semibold">
                        Posted by
                      </th>
                      <th className="pb-3 text-sm md:text-lg font-semibold">
                        Date
                      </th>
                      <th className="pb-3 text-sm md:text-lg font-semibold">
                        Approval Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {dataArray.map((item, index) => <Items key={index} item={item} setData={setData}/> )}
                  </tbody>
                </table>
              </div>

              
              {/* <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >

                                <div className='md:grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                                    {array.map((item, i) => (
                                        <div key={i} className='rounded-2xl relative'>

                                            <img className='w-full h-48 object-cover rounded-xl' src={demo} alt="" />
                                            <span className='flex bg-slate-300 rounded-lg py-3 text-center w-12 absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] justify-between'> <MdOutlineRemoveRedEye className='cursor-pointer text-center block mx-auto   text-white' onClick={() => handleClick(demo)} /></span>
                                        </div>
                                    ))

                                    }
                                    <Modal id={imageID}
                                        className='w-[300px] md:w-[600px] bg-white shadow-lg shadow-slate-300 p-5 rounded-2xl absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] '
                                        isOpen={modalIsOpen} ariaHideApp={false}
                                        onRequestClose={() => setIsOpen(false)}
                                    >
                                        <h3 className='text-xl text-text-body pb-2 flex justify-between items-center  font-semibold'><span>Full View</span> <RiAddFill onClick={() => setIsOpen(false)} className='transform rotate-45 mr-3 text-3xl transition duration-300 cursor-pointer hover:-rotate-45' /> </h3>
                                        <img className=' w-[300px] md:w-[600px] rounded-xl' src={image} alt="" />

                                        <div className='flex space-x-4 mt-5' >
                                            <button onClick={() => deleteFrmoDB('delete')} className=' w-1/2 text-white bg-red-700 flex items-center justify-center  py-3 mr-2 rounded-lg px-6'><RiAddFill className='transform rotate-45 mr-3 text-2xl' /> Delete</button>
                                            <button onClick={() => deleteFrmoDB('approve')} className=' w-1/2  bg-bg-yellow text-text-body flex items-center justify-center  py-3 ml-2 rounded-lg px-6'><BsCheckCircle className=' mr-3 text-2xl' /> {isApprove == 0 ? 'Approve' : 'Reject'}</button>
                                        </div>
                                    </Modal>
                                    {isImagePresent &&
                                        (dataArray.map((item, index) => (
                                            <>
                                                <div key={item.id} className='rounded-2xl relative'>
                                                    <img className='w-full h-100 object-cover rounded-xl' src={`${window.IMG_HOST_URL}${item.img_path}`} alt="" />
                                                    <span className='flex bg-slate-300 rounded-lg py-3 text-center w-12 absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] justify-between'> <MdOutlineRemoveRedEye className='cursor-pointer text-center block mx-auto   text-white' onClick={() => handleClick(`${window.IMG_HOST_URL}${item.img_path}`, item.id, item.isApproved)} /></span>
                                                </div>
                                            </>
                                        )))}
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovePhoto;
