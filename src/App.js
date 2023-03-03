import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DashboardPage from './Components/Dashboard/DashboardPage/DashboardPage';
import Dashboard from './Components/Dashboard/DashboardPage/Dashboard';
import Coach from './Components/Dashboard/Register/Coach';
import Gym from './Components/Dashboard/Register/Gym';
import Referee from './Components/Dashboard/Register/Referee';
import Academy from './Components/Dashboard/Register/Academy';
import ApprovalCoach from './Components/Dashboard/Approval/Coach';
import ApprovalGym from './Components/Dashboard/Approval/Gym';
import AgencyUser from './Components/Dashboard/Agency/AgencyUser';
import AgencyList from './Components/Dashboard/Agency/AgencyUserList';
import ApprovalReferee from './Components/Dashboard/Approval/Referee';
import ApprovalAcademy from './Components/Dashboard/Approval/Academy';
import PhotoAdd from './Components/Dashboard/PhotoGallery/PhotoAdd';
import PhotoApprove from './Components/Dashboard/PhotoGallery/ApprovePhoto';
import NewsAdd from './Components/Dashboard/News/NewsAdd';
import NewsApproved from './Components/Dashboard/News/NewsApproved';
import Login from './Components/LoginSystem/Login';
import LoginUser from './Components/LoginSystem/HomePageLogin';
import PrivateRoute from './Components/LoginSystem/PrivateRoute';
import Home from './Components/Home/Home';
import Contact from './Pages/Contact';
import AcademyNewsSingle from './Pages/AcademyNewsSingle';
import AcademyPage from './Pages/AcademyPage';
import CoachList from './Components/Dashboard/Register/CoachList';
import AcademyList from './Components/Dashboard/Register/AcademyList';
import RefereeList from './Components/Dashboard/Register/RefereeList';
import GymList from './Components/Dashboard/Register/GymList';
import { FaLongArrowAltUp } from 'react-icons/fa';
import RefereePage from './Pages/RefereePage';
import RefereeSingle from './Pages/RefereeSingle';
import GymPage from './Pages/GymPage';
import GymSingle from './Pages/GymSingle';
import CoachPage from './Pages/CoachPage';
import CoachSingle from './Pages/CoachSingle';
import PhotoGalleryPage from './Pages/PhotoGalleryPage';
import AddImage from './Pages/AddImage';
import ProfileDashboard from './Components/Profile/ProfileDashboard';
import Information from './Components/Profile/Information';
import GalleryProfile from './Components/Profile/GalleryProfile';
import MyRequest from './Components/Profile/MyRequest';
import NewsPage from './Pages/NewsPage';
import NewsDetails from './Pages/NewsDetails';
import Tournaments from './Pages/Tournaments';
import WorldCupPage from './Pages/WorldCupPage';
import  AgencyDashboard  from './Components/AgencyDashboard/AgencyDashboard';
import Players from './Components/AgencyDashboard/Players';
import PlayersDetails from './Components/AgencyDashboard/PlayersDetails';
import EditProfile from './Components/Profile/EditProfile';
import AgancyHome from './Components/AgencyLanding/AgancyHome';
import GalleryVideo from './Components/Profile/GalleryVideo';
import GalleryImage from './Components/Profile/GalleryImage';
import Image from './Components/AgencyDashboard/Image';
import Video from './Components/AgencyDashboard/Video';
import ThemeContext from './Context/ThemeContext';
import AgencyPrivateRoute from './Components/LoginSystem/AgencyPrivateRoute';
import Comfirmed from './Components/Share/Comfirmed';

function App() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  useEffect(() => {
    //document.title = "Koora-Stars";
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  // const { i18n } = useTranslation()


  // const language = localStorage?.getItem("i18nextLng")


  // useEffect(() => {
  //   if (language?.length > 2) {
  //     i18next.changeLanguage("en")
  //   }
  // }, [])


  // const handleLanguage = (e) => {
  //   i18n.changeLanguage(e)
  // }
  // useEffect(() => {
  //   console.log(localStorage.getItem("i18nextLng"), "okk");
  //   language === 'en' ? document.body.dir = 'ltr' : document.body.dir = 'rtl'
  // }, [language])



  return (
   
     <ThemeContext>
        <BrowserRouter>
        <a href='#' target='_parent' className={`${showTopBtn ? "fixed right-5 z-[5000000] bottom-5 w-12 h-12 bg-black text-white  rounded-full flex justify-center items-center duration-300 translate-y-2 opacity-1 transition ease-in-out transform " : " absolute -right-50 transform  opacity-0 invisible  -translate-y-16 z-50 "} `}><FaLongArrowAltUp /></a>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/AgencyLanding' element={<AgancyHome />} />
          <Route path='/requestModal' element={<Comfirmed />} />
          {/* <Route path='/ar' element={<Contact />} /> */}
          <Route path='/Contact' element={<Contact />} />
          <Route path='/World' element={<WorldCupPage />} />
          {/* <Route path='/s' element={<RefereePage />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/LoginUser' element={<LoginUser />} />
          <Route path='/News' element={<NewsPage />} />
          <Route path='/NewsDetails/:id' element={<NewsDetails />} />
          <Route path='/Tournaments' element={<Tournaments />} />
          {/* Request route  */}
          <Route path='/AcademyInfo' element={<AcademyPage />} />
          <Route path='/AcademyNews/:id' element={<AcademyNewsSingle />} />
          <Route path='/RefereeInfo' element={<RefereePage />} />
          <Route path='/RefereeInfo/:id' element={<RefereeSingle />} />
          <Route path='/GymInfo' element={<GymPage />} />
          <Route path='/GymInfo/:id' element={<GymSingle />} />
          <Route path='/CoachInfo' element={<CoachPage />} />
          <Route path='/CoachInfo/:id' element={<CoachSingle />} />
          {/* profile dashboard route */}
          {/* <Route path='/Profile' element={<ProfileDashboard />}>
          <Route path='/Profile/Information' element={<Information />} />
          <Route path='/Profile' element={<Information />} />
          <Route path='/Profile/Gallery' element={<GalleryProfile />} />
          <Route path='/Profile/Request' element={<MyRequest />} />
        </Route> */}
 
            <Route path='/Profile' element={<ProfileDashboard />}>
              <Route path='/Profile/Information' element={<Information />} />
              <Route path='/Profile' element={<Information />} />
              <Route path='/Profile/Gallery' element={<GalleryProfile />} />
              <Route index path='/Profile/Gallery' element={<GalleryImage />} />
              <Route path='/Profile/Gallery/Video' element={<GalleryVideo />} />
             
              <Route path='/Profile/Request' element={<MyRequest />} />
              <Route path='/Profile/Edit' element={<EditProfile />} />
            </Route>
      

          {/* Photo gallery route */}
          <Route path='/PhotoGallary' element={<PhotoGalleryPage />} />
          <Route path='/AddImage' element={<AddImage />} />
          {/* dashboard */}
          <Route path='/' element={<PrivateRoute />} >
            <Route path="/Dashboard" element={<DashboardPage />}>
              <Route path="/Dashboard" element={<Dashboard />} />
              {/* Register */}
              <Route path="/Dashboard/Coach/:id" element={<Coach />} />
              <Route path="/Dashboard/CoachList" element={<CoachList />} />
              <Route path="/Dashboard/GymList" element={<GymList />} />
              <Route path="/Dashboard/Gym/:id" element={<Gym />} />              
              <Route path="/Dashboard/Academy/:id" element={<Academy />} />
              <Route path="/Dashboard/AcademyList" element={<AcademyList />} />
              <Route path="/Dashboard/RefereeList" element={<RefereeList />} />
              <Route path="/Dashboard/Referee/:id" element={<Referee />} />
              {/* Agency */}
              <Route path="/Dashboard/Agency/AgencyUser" element={<AgencyUser />} />
              <Route path="/Dashboard/Agency/AgencyList" element={<AgencyList />} />
              {/* {/*Approval   */}
              <Route path="/Dashboard/Approval/Coach" element={<ApprovalCoach />} />
              <Route path="/Dashboard/Approval/Gym" element={<ApprovalGym />} />
              <Route path="/Dashboard/Approval/Academy" element={<ApprovalAcademy />} />
              <Route path="/Dashboard/Approval/Referee" element={<ApprovalReferee />} />
              {/* Photo Gallery */}
              {/* <Route path="/Dashboard/PhotoAdd" element={<PhotoAdd />} /> */}
              <Route path="/Dashboard/PhotoAdd/:id" element={<PhotoAdd />} />
              <Route path="/Dashboard/PhotoApprove" element={<PhotoApprove />} />
              {/* News */}
              <Route path="/Dashboard/NewsAdd/:id" element={<NewsAdd />} />
              <Route path="/Dashboard/NewsApproved" element={<NewsApproved />} />
            </Route>
          </Route>
          {/* dashboard */}
          {/* Agancy Dashboard */}
         <Route path='/' element={< AgencyPrivateRoute />}>
         <Route path="/Agency" element={<AgencyDashboard />}>
          <Route index path="/Agency" element={<Players />} />
              <Route path="Players" element={<Players />} />
              

              <Route path="/Agency/PlayersDetails" element={<PlayersDetails />} />
              <Route index path="/Agency/PlayersDetails" element={<Image />} />
              <Route path="/Agency/PlayersDetails/Video" element={<Video />} />

          </Route>
          </Route> 
              
         

        </Routes>

      </BrowserRouter>
     </ThemeContext>


  );
}

export default App;
