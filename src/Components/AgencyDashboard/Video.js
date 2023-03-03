import React from "react";
import VideoSingle from "../Profile/VideoSingle";
import CommonProfile from "./CommonProfile";

const Video = () => {
  const array = Array.from(Array(10).keys());
  return (
    <div>
      <CommonProfile />
      <div className="lg:ltr:ml-[206px] mx-8 lg:rtl:mr-[206px] grid md:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
        {array.map(() => (
          <VideoSingle />
        ))}
      </div>
    </div>
  );
};

export default Video;
