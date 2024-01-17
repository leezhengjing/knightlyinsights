import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import { GiMountedKnight } from 'react-icons/gi';
import Link from 'next/link';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow">
            <Link href="/openings"><SideBarIcon icon={<GiMountedKnight size="40" />} /></Link>
            <Divider />
            <SideBarIcon icon={<BsPlus size="28" />} />
            <SideBarIcon icon={<BsFillLightningFill size="28" />} />
            <SideBarIcon icon={<FaPoo size="28" />} />
            <Divider />
            <SideBarIcon icon={<BsGearFill size="28" />} />
        </div>
    )
};

const SideBarIcon = ({ icon, text = 'tooltip ' }: any) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
)

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;