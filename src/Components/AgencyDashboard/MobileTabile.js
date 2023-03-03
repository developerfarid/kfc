import React from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import ProgressBar from "@ramonak/react-progress-bar";

const MobileTabile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#F8F8F8] rounded-lg py-4 mb-4  ">
      <div className="grid grid-cols-4 text-center border-b-2 pb-1 text-[#6D6E71] text-xs font-semibold ">
        <span className="">Favorit</span>
        <span>Name</span>
        <span>Age</span>
        <span>
          <FiChevronDown
            onClick={() => setOpen(!open)}
            className={`${
              open ? "transform rotate-180" : ""
            } inline-block text-xl `}
          />
        </span>
      </div>
      <div className="grid grid-cols-4 text-center pt-2 text-[#20252C] text-sm font-semibold">
        <span>
          <AiFillStar className="inline-block text-xl text-[#34BA28]" />
        </span>
        <span>Abdulla</span>
        <span>23</span>
        <span></span>
      </div>
      {open && (
        <div className="p-4">
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Country</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">Saudi</h3>
          </div>
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>City</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">Riyadh</h3>
          </div>
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Height</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">5’8”</h3>
          </div>
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Preferred foot</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">Right</h3>
          </div>
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Primary position</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">Left Centre Forward</h3>
          </div>
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Secondary Position</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">On Contract</h3>
          </div>
          <div className="grid grid-cols-2 font-semibold mb-3">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Contract Status</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] ">Left Midfield</h3>
          </div>
         
          <div className="grid grid-cols-2 font-semibold ">
            <div className="flex justify-between ltr:pr-6 rtl:pl-6 text-xs text-[#6D6E71] ">
              <h3>Playing Status</h3> <span>:</span>
            </div>
            <h3 className="text-sm text-[#20252C] "> <ProgressBar bgColor="#34BA28" height="6px" isLabelVisible={false} baseBgColor="#D8F1D6"  progress completed={50} /> </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileTabile;
