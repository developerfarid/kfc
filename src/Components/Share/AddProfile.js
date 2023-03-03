import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import anvtor from '../../image/anvtor_n.png'
import { BsCamera } from 'react-icons/bs';
import FileBase64 from 'react-file-base64';
import { CgClose } from 'react-icons/cg'

const AddProfile = ({ setIsOpen, modalIsOpen }) => {
    const [images, setImages] = useState('')
    console.log(images);


    return (

        <Modal isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)} className='container todo bg-bg-yellow p-12 rounded-2xl my-8' >
            <div className='flex justify-center items-center relative '>
                <span onClick={() => setIsOpen(false)} className='cursor-pointer absolute -right-14 -top-14 w-12 h-12 flex justify-center items-center text-white border-4 border-white bg-[#3B5998] rounded-full'><CgClose className='text-2xl transform hover:rotate-90 duration-300' /></span>

                <div className=' relative h-[200px]  w-[200px] md:h-[300px] md:w-[300px]'>
                    <img className='rounded-full h-[200px]  w-[200px] md:h-[300px] md:w-[300px] bg-white ' src={`${images ? images : anvtor}`} alt="" />
                    <div className='absolute okk bottom-4 right-4 bg-[#3B5998] w-12 h-12 rounded-full text-white '><BsCamera className='mt-3 text-center inline-block ml-3 text-2xl' />
                        <FileBase64

                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setImages(base64)} />
                    </div>

                    <h3 className='text-center text-3xl text-text-body font-bold py-20 '>Display Name</h3>
                    <button className='bg-white text-center mx-auto block  px-16 py-3 text-text-body rounded-md'>Confirm</button>
                </div>



            </div>



        </Modal>
    );
};

export default AddProfile;