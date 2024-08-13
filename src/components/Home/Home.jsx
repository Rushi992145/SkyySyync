import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';
import logo from '../../assets/SkyySyync_logo.svg';


function Home() {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [isGetCords, setIsGetCords] = useState(false)
    const [city, setCity] = useState('')
    const [isGetCity, setIsGetCity] = useState(false)

    function getWeatherUpdate() {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setIsGetCords(true)
        })
    }

    return (
        <div className='flex flex-col min-h-screen justify-between items-center font-mono bg-slate-900'>
            <ul className="flex flex-col justify-center items-center text-white font-medium lg:flex-row lg:space-x-8 lg:mt-0 p-1">
                <img className='w-52' src={logo} alt="" />
                <li>
                    <button onClick={getWeatherUpdate} className='bg-cyan-500 shadow-sm shadow-cyan-500/50 rounded-full p-2 m-3 hover:focus:bg-cyan-950'>Current Location</button>
                </li>
                <li>
                    <input value={city} onChange={e => setCity(e.target.value)} className='bg-cyan-500 shadow-sm shadow-cyan-500/50 rounded-l-full p-2 focus:bg-cyan-950 placeholder-white font-mono' type="text" placeholder='eg. Mumbai' />
                    <label className='bg-slate-600 z-10 rounded-r-full p-[10px] shadow-sm shadow-slate-600 hover:bg-cyan-950'>
                        <button onClick={() => {
                            setLatitude('')
                            setLongitude('')
                            setIsGetCity(true)
                        }}>Get</button>
                    </label>
                </li>
            </ul>

            <div className='flex-grow flex flex-col md:flex-row justify-start items-center gap-10 p-3'>
                
                {isGetCords && <Card
                    latitude={latitude}
                    longitude={longitude}
                    wcity={""}
                />}
                {isGetCity && city && <Card
                    latitude={""}
                    longitude={""}
                    wcity={city}
                />}
            </div>

            <div className='p-3'>
                <p className='text-white'>Made by <span className='text-green-400'>Rushikesh Hiray</span></p>
            </div>
        </div>
    )
}

export default Home;
