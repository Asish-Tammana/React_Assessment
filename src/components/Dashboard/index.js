import { FaRegBell } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { LuTags } from "react-icons/lu";
import { FiActivity } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "../SideBar"
import BitcoinLineChart from "../BitcoinLineChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";


const Dashboard = () => {

    const [bitcoinData, updateBitcoinData] = useState({})
    const [chartData, updateChartData] = useState([])
    const [displayState, updateDisplayState] = useState('hidden')
    const navigate = useNavigate()

    const checkLogin = () => {
        const jwtToken = Cookies.get('dashboard')

    if (jwtToken === undefined) {
      navigate('/login')
    }
    }

    const updateSideBar = () => {
        if(displayState === 'hidden'){
            updateDisplayState('fixed')
        }else{
            updateDisplayState('hidden')
        }
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const getChartData = async () => {
        try {
            const url = 'https://api.coincap.io/v2/assets/bitcoin/history?interval=d1';
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            const responseData = data.data.splice(0,10);

            const convertedData = responseData.map(item => ({
                ...item,
                date: formatDate(item.date)
            }));

            updateChartData(convertedData)

        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };
    const getDetails = async () => {
        try {
            const url = 'https://api.coincap.io/v2/assets/bitcoin';
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            updateBitcoinData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    const fetchData = async () => {
        await checkLogin()
        await getDetails();
        await getChartData()
    }

    useEffect(() => {
        fetchData()
    }, []);


    return (
        <div className="flex flex-row items-start p-6 bg-gray-100">
            <SideBar displayState={displayState}  />
            <div className="max-sm:w-full md:w-5/6 p-6 overflow-y-auto">
                <div className="flex flex-row justify-between items-center">
                    
                    <h1 className="font-bold text-2xl">Bitcoin Dashboard</h1>
                    <button onClick={updateSideBar} className="md:hidden" ><GiHamburgerMenu /></button>
                    <div className="flex flex-row justify-around items-center w-1/4 max-sm:hidden ">
                        <input type="search" className="outline-none rounded w-1/2 p-1" placeholder="Search..." />
                        <FaRegBell className="text-xl" />
                        <img className="rounded-2xl" src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1710686326/image_1_ixmjkl.png" alt="user" />
                    </div>
                </div>
                {/* ------------ */}
                <div className="flex flex-row justify-around items-center p-5 flex-wrap">
                    <div className="flex flex-row justify-between m-3 max-sm:w-full lg:w-1/5 p-3 rounded-md bg-green-100">
                        <div className="self-end mt-4">
                            <p className="font-normal">Price</p>
                            <h1 className="font-bold">$ {parseFloat(bitcoinData.priceUsd).toFixed(2)}</h1>
                        </div>
                        <FaBitcoin className="text-3xl" />
                    </div>

                    <div className="flex flex-row justify-between m-3 max-sm:w-full lg:w-1/5 p-3 rounded-md bg-orange-50">
                        <div className="self-end mt-4">
                            <p className="font-normal">Supply</p>
                            <h1 className="font-bold"> {parseInt(bitcoinData.supply)}</h1>
                        </div>
                        <BsCashStack className="text-3xl" />
                    </div>

                    <div className="flex flex-row justify-between m-3 max-sm:w-full lg:w-1/5 p-3 rounded-md bg-red-100">
                        <div className="self-end mt-4">
                            <p className="font-normal">Market Cap</p>
                            <h1 className="font-bold">$ {parseFloat(bitcoinData.marketCapUsd/1000).toFixed(2)}</h1>
                        </div>
                        <LuTags className="text-3xl" />
                    </div>

                    <div className="flex flex-row justify-between m-3 max-sm:w-full lg:w-1/5 p-3 rounded-md bg-indigo-100">
                        <div className="self-end mt-4">
                            <p className="font-normal">Price Change</p>
                            <h1 className="font-bold">$ {parseFloat(bitcoinData.changePercent24Hr).toFixed(2)}</h1>
                        </div>
                        <FiActivity className="text-3xl" />
                    </div>
                </div>

                {/* ------------- */}
                <BitcoinLineChart data={chartData} />
            </div>

        </div>
    )

}

export default Dashboard