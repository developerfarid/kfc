import React from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "930px",
    borderRadius:"20px",
    
    boxShadow:'5px 5px 20px 20px red',

    
    // hight:"400px"
  },
};
const Comfirmed = ({name, fun, closeModal,modalIsOpen}) => {



  return (
    <>

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
   
    >
      <div className="text-center px-16 py-12   overflow-hidden ">
        <h3 className="text-[50px] text-[#20252C]">Request send to join {name}</h3>
        <p className="text-[31px] txt-[#20252C] pt-7 pb-20">Are you sure to send for join {name}</p>
        <div className="flex gap-4  ">
          <button
            onClick={closeModal}
            className="btn-update w-full border border-[#D20013] duration-300 ease-in-out transition text-[#D20013] hover:text-[#ffff] hover:bg-[#D20013] bg-transparent text-2xl mt-6"
          >
            Cancel
          </button>
          <button
            type="submit"
      onClick={()=>fun()}
            className="btn-update w-full hover:bg-transparent duration-300 ease-in-out transition hover:border-[#efdc59] hover:border text-2xl mt-6"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default Comfirmed;
