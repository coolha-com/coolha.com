'use client'
import Sidebar from '@/components/header/Sidebar';
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from 'react-icons/ri'



export default function layout({ children }) {

  const router = useRouter();

  return (
    <div className='bg-base-200 flex flex-col  '>


      <div className="md:w-20 xl:w-56">
        <Sidebar />
      </div>

      <div className='w-full  mx-auto max-w-3xl'>
        <div className="navbar p-0 px-2 bg-base-100">
          <div className=" navbar-start">
            <button className="btn btn-square btn-ghost" onClick={() => router.back()} >
              <RiArrowLeftLine size={24} />
            </button>
          </div>
          <div className=" navbar-center"></div>
          <div className=" navbar-end"></div>
        </div>
      </div>

      <div className="flex flex-1 bg-base-200">
        {children}
      </div>

      <div className="lg:w-20 xl:w-32" />


    </div>
  )
}