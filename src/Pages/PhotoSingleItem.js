import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imgmen from "../image/Ellipse 1457.png";
import img from "../image/Rectangle 34624226.png";
import { RiThumbDownFill, RiThumbDownLine, RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';



const PhotoSingleItem = ({ item, i }) => {
    
    const [like, setLike] = useState(false)
    const [unlike, setUnLike] = useState(false)
    let [likeNumber, setLikeNumber] = useState(item.likes)
    let [unlikeNumber, setUnLikeNumber] = useState(item.dislikes)

    const handleLike = (i,dbid) => {
        setLike(!like)
        setUnLike(false)
        setLikeNumber(likeNumber + 1)
        if (unlikeNumber > 0) {
            setUnLikeNumber(unlikeNumber - 1)
        }

    }
    const handleUnLike = (i,dbid) => {
        setUnLike(!unlike)
        setLike(false)
        setUnLikeNumber(unlikeNumber + 1)
        if (likeNumber > 0) {
            setLikeNumber(likeNumber - 1)
        }
    }

    return (
        <div className=' mb-5 '>
        <Link to=''>
            <img className='w-full rounded-lg' src={`${item.src}`} alt="" />
        </Link>
        <div className='flex justify-between py-4'>
            <div className='flex items-center'>
                {/* <img className='w-8 h-8 rounded-full mr-3' src={imgmen} alt="" /> */}
                <img className='w-10 h-10 rounded-full mr-3 rtl:ml-3' src={`${window.IMG_HOST_URL}${item.avatar}`} alt="" />
                <div>
                    <h3><Link className='text-xl font-semibold' to=''>{item.name}</Link></h3>
                    <p className='text-[14px]'>Posted a media</p>

                </div>
            </div>
            <div className='flex items-center space-x-2 text-text-body'>
                <div className='flex space-x-2 items-center  '>
                    <span>{likeNumber}</span>
                    {like ? <span className='ltr:border-r-2 rtl:border-l-2 pr-2 rtl:pl-2 '> <RiThumbUpFill /> </span> : <span className='ltr:border-r-2 rtl:border-l-2 pr-2 rtl:pl-2 ' onClick={() => handleLike(i,item.id)}>
                        <RiThumbUpLine /> </span>}

                </div>
                <div className='flex space-x-2 items-center'><span>{unlikeNumber}</span>
                    {
                        unlike ? <span className='  pr-2 rtl:pl-2'><RiThumbDownFill className='' /></span> : <span className=' pr-2 rtl:pl-2 ' onClick={() => handleUnLike(i,item.id)}><RiThumbDownLine /></span>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default PhotoSingleItem;