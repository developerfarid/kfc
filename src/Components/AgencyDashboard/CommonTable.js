import React from 'react';
import { AiFillStar } from "react-icons/ai";
import ProgressBar from "@ramonak/react-progress-bar";

const CommonTable = ({item,index}) => {
    return (
        <tr className={`${index % 2 === 0 ? 'text-center bg-[#ffffff] ' :  " "} text-center font-semibold cursor-pointer duration-300 transition ease-in-out hover:bg-gray-200`}>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                                <AiFillStar className={`${index % 2 === 0 ? 'text-[#34BA28]' :"text-[#C2C2C2]"}  black text-center mx-auto text-2xl  `} />
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`} >
                              Abdulla
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              23
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              Saudi
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              Riyadh
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              5’8”
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              Right
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              Left Centre Forward
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              On Contract
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              Left Midfield
                              </td>
                              <td className={`${index % 2 === 0 ? 'border-r border-[#e9eaed]' :""} agency`}>
                              <ProgressBar bgColor="#34BA28" height="6px" isLabelVisible={false} baseBgColor="#D8F1D6"  progress completed={50} />
                              </td>
                            </tr>
    );
};

export default CommonTable;