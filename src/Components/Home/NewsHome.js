import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import img from "./../../image/278656519_5392361964121059_3218951083182227482_n.png"
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiTimeLine } from 'react-icons/ri';
import imgicon from "../../image/Screenshot_20220508_123158 1.png"

const NewsHome = () => {
    const array= [
        {
            id:"1",
            img: img,
            text:"His Royal Highness Prince Sattam bin Khalid bin..."
        },
        {
            id:"2",
            img: img,
            text:"His Royal Highness Prince Sattam bin Khalid bin..."
        },
        {
            id:"3",
            img: img,
            text:"His Royal Highness Prince Sattam bin Khalid bin..."
        },
        {
            id:"4",
            img: img,
            text:"His Royal Highness Prince Sattam bin Khalid bin..."
        }
    ]

  
    
 
    return (
        <section>
            <div className='container'>
                <div className='flex justify-between items-center py-8 text-[#20252C] font-Inter'> <div className='flex'><img className='' src={imgicon} alt="" />
                <h2 className='text-[52px] font-semibold  '> News</h2>
                </div> <p className='flex items-center text-xl'>See All <FaAngleRight /></p></div>
                <div className='grid  md:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12'>
                    {
                        array.map((item) => (
                            <div className='' key={item.id}>
                                <img className='w-full' src={item?.img} alt="" />
                                <h2 className='text-xl text-[#20252C] font-semibold font-Inter my-4'>{ item.text}</h2>
                                <div className='flex justify-between items-center text-[#515151] font-Inter '>
                                    <span><FaRegCalendarAlt className='inline-block' /> 02/19/2021</span>
                                    <span><RiTimeLine className='inline-block' /> 10:36:22</span>
                                </div>
                                <button className='text-bg-yellow  px-5 mt-8  font-Inter py-2 border border-bg-yellow'>Read more</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default NewsHome;