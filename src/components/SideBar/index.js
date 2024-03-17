import { RiPieChartLine } from "react-icons/ri";
import { LuTags } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const SideBar = (props) => {

    const {displayState} = props


    return (
        <div className={`max-sm:${displayState} max-sm:w-1/2 lg:block lg:w-1/6 bg-black text-white min-h-screen rounded-xl p-5 flex flex-col justify-between`}>
            <div>
                <h1 className="text-white text-3xl font-bold mt-4 mb-6">Board.</h1>
                <div>
                    <div className="flex flex-row  items-center mt-5 font-bold text-lg">
                        <RiPieChartLine className="mr-3" />
                        <p>Dashboard</p>
                    </div>
                    <div className="flex flex-row  items-center mt-5 font-normal">
                        <LuTags className="mr-3 text-lg" />
                        <p>Transactions</p>
                    </div>
                    <div className="flex flex-row  items-center mt-5 font-normal">
                        <CiCalendar className="mr-3 text-lg" />
                        <p>Schedules</p>
                    </div>
                    <div className="flex flex-row  items-center mt-5 font-normal">
                        <FaRegUserCircle className="mr-3 text-lg" />
                        <p>Users</p>
                    </div>
                    <div className="flex flex-row  items-center mt-5 font-normal">
                        <IoSettingsOutline className="mr-3 text-lg" />
                        <p>Accounts</p>
                    </div>
                    
                </div>
            </div>
            <div className="text-white font-light">
                <p>Help</p>
                <p>Contact Us</p>
            </div>
        </div>
    )

}

export default SideBar