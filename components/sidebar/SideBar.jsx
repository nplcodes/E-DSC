import Link from 'next/link'
import Image from 'next/image'
import { MdDashboard } from "react-icons/md";
import { TbMessage2Check } from "react-icons/tb";


const Sidebar = () => {
  return (
    <div className='px-6 py-3'>
        <div className="img-title flex gap-2 pb-6">
            <Image src='/noimage.png' width={50} height={50} className='rounded-full'/>
            <div className='flex flex-col'>
                <p>John </p>
                <p className='text-gray-500 text-sm'>Modirator</p>
            </div>
        </div>
        <div className="menus">
            <nav>
                <Link href='/panel' className='flex items-center px-4 py-2 text-sm font-medium hover:bg-blue-500 hover:text-white hover:rounded-md'>
                  <MdDashboard className='mr-2'/>Dashboard
                </Link>
                <Link href='/#' className='flex items-center px-4 py-2 text-sm font-medium hover:bg-blue-500 hover:text-white hover:rounded-md'>
                  <TbMessage2Check className='mr-2'/>My Discusion
                </Link>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar