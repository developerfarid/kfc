import React from "react";
import img from "../../image/MacBook Pro 16.png";
import img1 from "../../image/MacBook Pro 16 (1).png";
import img2 from "../../image/Vector 2471.png";
import img3 from "../../image/Rectangle 34624246 (1).png";

const Hero = () => {
  return (
    <>
      <section className="bg-hero-Agancy z-10 h-[450px] sm:h-[550px] md:h-[75vh] lg:h-[80vh] xl:h-[90vh] bg-cover bg-no-repeat bg-center relative after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[#0000008c] after:-z-10">
        <div className="container z-20 relative">
          <div className="w-4/5 mx-auto pt-12 pb-8 md:py-16 flex justify-center items-center flex-col  ">
            <h1 className="md:text-[77px] text-[30px] md:leading-[5rem] mt-8 md:mt-16 font-Coolvetica text-white  text-center  ">
              FIND Best Player for your_ dream Match
            </h1>
            <p className="md:text-[28px] text-base text-white text-center md:px-5 pt-7">
              Finding football for matches has never been so easy. Use our
              search engin and see ho easy it is!
            </p>
          </div>
          <div className="absolute">
            <img className=" " src={img} alt="" />
            <div className="absolute bg-[#768399] w-full rounded-full h-[121px] -bottom-5 blur-[121px]"></div>
          </div>
        </div>
      </section>
      <section className="xl:py-48 py-12 sm:py-16 md:py-20  "></section>
      <section>
        <div className="container  grid grid-cols-1 md:grid-cols-2 py-12 items-center ">
          <div>
            <h2 className="text-[32px] md:text-6xl text-[#080A3C] font-Odor text-center rtl:text-right ltr:md:text-left md:leading-[78px]">
              Quickly get player
              <br />
              <span className="text-[#EFDC59]">By Short by</span>
            </h2>
            <p className="md:text-3xl text-base leading-[32px] md:leading-10 mt-3">
              Refine your Short by and look for players of specific positions,
              contries, leagues, ages, and matches played.
            </p>
          </div>
          <div className=" relative bgstyle bg-opacity-80    bg:blur-3xl bg-contain w-full  bg-no-repeat bg-right ">
            <img className="mt-8" src={img1} alt="" />
          </div>
        </div>
      </section>
      <section className="bg-hero-gallary w-[100vw] bg-cover overflow-hidden   bg-no-repeat   bg-center h-[720px] md:h-[1900px] lg:h-[1500px]  xl:h-[1600px] relative after:bg-white after:w-[120%] after:h-[400px] md:after:h-[590px]  after:left-0 after:-top-[320px] after:absolute transform after:skew-y-[13deg] before:bg-white before:w-[120%] before:h-[200px] md:before:h-[300px]  before:left-0 before:-bottom-[170px] before:absolute  before:skew-y-[8deg] ">
        <img className="sm:w-full absolute left-0 top-0" src={img2} alt="" />
        <div className="container relative font-Coolvetica  ">
          <div className="lg:w-4/5 xl:w-3/5 mt-32 rtl:mr-auto md:mt-[300px] mb-8 ">
            <h2 className="text-[32px] md:text-6xl text-white font-normal text-center rtl:text-right ltr:md:text-left leading-snug ">
              INTERACT WITH PLAYERS, VIEW MEDIA, AND ADD PLAYERS TO YOUR
              FAVOURITE LIST
            </h2>
            <p className="md:text-xl text-base text-center  text-white font-dash my-10 lg:w-4/5 xl:w-3/5 md:text-justify">
              View the profiles of every single player, watch all available
              media, and shortlist as many as you'd like.
            </p>
          </div>
          <img className="w-11/12  absolute left-[50%] transform -translate-x-[50%] " src={img3} alt="" />
        </div>
      </section>
      <section>
  
      </section>
    </>
  );
};

export default Hero;
