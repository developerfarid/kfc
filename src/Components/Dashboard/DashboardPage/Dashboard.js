import React from 'react';
import { IoMdNotificationsOutline} from 'react-icons/io';

const Dashboard = () => {
    const dashboardData = [
        {
            id: "5",
            number: "58",
            category: "Academy Request"
        },
        {
            id: "1",
            number: "51",
            category: "Gym Request"
        },
        {
            id: "2",
            number: "80",
            category: "Coach Request"
        },
        {
            id: "3",
            number: "50",
            category: "Referee Request"
        },
        {
            id: "4",
            number: "49",
            category: "Photo Upload"
        },

    ]
    return (
        <>
            <div className='bg-white h-24 flex justify-between px-8 items-center fixed top-0 left-3/12 right-0 w-9/12'>
                <h2 className='text-lg'>Dashboard</h2>
                <IoMdNotificationsOutline className='text-lg' />
            </div>
            <div className='mt-24'>
                <div className='mt-24 p-8'>
                    <div className='  md:grid md:grid-cols-2 lg:grid-cols-3  gap-5 px-2 md:px-8 '>
                        {dashboardData.map(item => (<div key={item.id} className='bg-bg-yellow rounded-lg space-y-4 my-4 md:my-0   text-white text-center px-5 py-8 w-full mx-auto sm:w-3/4 md:w-full '>
                            <span className='text-5xl'>{item?.number}</span>
                            <h3 className='text-lg'>{item?.category}</h3>
                            <button className='w-full border border-gray-200 py-2 rounded-md'>View Full</button>
                        </div>))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;