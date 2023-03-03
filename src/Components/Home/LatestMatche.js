import React, { useState, useEffect } from 'react';
import icon from '../../image/278693113_415039269957608_8391190177219528907_n.png'
import icon1 from '../../image/277993204_472069158022788_4784317908931732947_n.png'
import { RiTimeLine } from 'react-icons/ri';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useTranslation } from 'react-i18next';


const LatestMatche = () => {
    let myRef = React.createRef();
    const [loaded, setLoaded] = useState(false);
    const [games, setGames] = useState([]);
    const {  t } = useTranslation()
    const Score = (props) => {
        const { game: { fixture: { date }, score: { fulltime }, teams } } = props;


        return (
            <div className="score">
                <div className="score-date">{new Date(date).toLocaleString()}</div>
                <div className="score-grid">
                    <div>{teams.home.name}</div>
                    <div>{teams.away.name}</div>
                    <div>{fulltime.home}</div>
                    <div>{fulltime.away}</div>
                </div>
            </div>
        );
    };
    function format_time(s) {
        return new Date(s * 1e3).toISOString().slice(-13, -5);
    }
    useEffect(() => {
        fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "b0bbec6a37029dcb3d763c7311e306cd"
            }
        })
            .then(response => response.json())
            .then(data => { console.log(data); setGames(data.response) });
    }, []);


    return (
        <section className='md:m-14'>
            <div className='container '>
                <div className='bg-white font-Inter rounded-xl shadow-Tournaments pb-14'>
                    <h3 className='md:text-[52px] font-semibold text-center py-10 '>{ t("common.Latestmatches")}</h3>
                    {games.map((item, i) => (<div key={Math.random()} className='  flex flex-wrap justify-between items-center mx-3  shad md:p-5 mb-6 md:mx-4 lg:mx-16 rounded-lg'>
                        <div className='-order-2 xl:order-first mx-2 xl:w-4/12 space-y-2'>
                            <div className='flex items-center text-[#515151] '>
                                <img className='w-5 h-5 md:w-8 md:h-8 ltr:mr-3 rtl:ml-3 rounded-full ' src={item.league.flag} alt="" />
                                <p className='text-sm md:text-base'>{item.league.country} - {item.league.name} <br /> {item.league.round}</p>
                            </div>
                        </div>
                        <div className='w-full xl:w-6/12 flex items-center  justify-center'>

                            <div className=' relative mx-3  md:mx-5 justify-center '>
                                <button className='w-32 md:w-auto flex absolute top-0 h-full  ltr:right-full rtl:left-full text-center items-center rounded-md bg-bg-yellow  '>
                                    <div className='hidden md:flex justify-center w-full px-8 bg-bg-yellow items-center '>
                                        <span className='ltr:mr-2 rtl:ml-2 text-text-body md:whitespace-nowrap  font-semibold '>{item.teams.home.name}</span> <img className='w-6 h-6 ' src={item.teams.home.logo} alt="" />
                                    </div>
                                </button>

                                <div >
                                <p className='font-semibold text-center'>
                                    {item.goals.home} - {item.goals.away}
                                </p>
                                <p className='flex items-center text-bg-yellow'><RiTimeLine className='mx-3' /> <span>{new Date(item.fixture.timestamp).toLocaleTimeString()}</span> <span className='mx-3'>{item.fixture.status.elapsed}’</span></p>
                                </div>

                                <button className='w-32 md:w-auto flex top-0  py-3   ltr:left-full rtl:right-full absolute items-center rounded-md bg-[#FFC6CB]'>
                                    <div className='flex justify-center w-full px-3 md:px-8  items-center'>
                                        <img className='w-6 h-6 ' src={item.teams.away.logo} alt="" />
                                        <span className=' text-sm md:text-base ltr:ml-2 rtl:mr-2 text-text-body md:whitespace-nowrap font-semibold '>{item.teams.away.name}</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className='xl:w-1/12 -order-1 xl:order-last'>
                        <span className=' w-[36px] h-[36px] md:w-[56px] md:h-[56px] mr-5 mt-4 md:mt-0 flex justify-center items-center rounded-full bg-[#F7F7F7] text-center text-[#515151]'><IoIosInformationCircleOutline className='text-xl md:text-3xl font-semibold' /></span>
                    </div>
                    </div>))}

                    {/* <div>
                        <h1 style={{ textAlign: 'center' }}>Games</h1>
                        <div className="games">
                            {games.map((game) => {
                                const { fixture: { id } } = game;
                                return (
                                    <Score key={id} game={game} />
                                );
                            })}
                        </div>
                    </div> */}
                </div>


            </div>
        </section>
    );
};

export default LatestMatche;