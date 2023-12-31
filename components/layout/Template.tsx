import React from 'react'
import CollectivLogoHorizontal from '../svg/logo/CollectivLogoHorizontal';
import cn from "clsx";
import { inter } from '@/utils/constants/fonts';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEnforceLocation } from '@/hooks/useEnforceLocation';

interface Props extends React.PropsWithChildren {}

const Template: React.FC<Props> = ({ children }) => {
  const { locationId, locationName } = useEnforceLocation();

  return (
    <>
    <nav className="bg-primary-300 h-[60px] w-full flex items-center justify-between px-6">
        <CollectivLogoHorizontal colorCode="primary-800" size='md'/>
        <ul className={cn("text-primary-800 font-medium text-base flex gap-14 w-auto", inter.className)}>
            <Link href="/trending">Trending Posts</Link>
            {locationName && <Link href={`/location/${locationId}`}>{locationName} Events</Link>}
        </ul>
        <div className='w-auto'></div>
    </nav>
    <main>
        { children }
    </main>
    <ToastContainer />
    </>
  )
}

export default Template