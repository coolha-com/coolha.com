'use client';


import { useRouter } from "next/navigation";
import Coolha小 from '@/public//logo/Coolha小.png'
import Image from "next/image";
export function Signup() {
    const router = useRouter()
    return (
        <div className=" w-full h-full fixed inset-0 flex justify-center items-center  z-50   transition-opacity duration-300 ease-in-out   bg-black bg-opacity-90" onClick={() => { router.back() }}>

            <div className=" w-11/12 md:w-[450px] rounded-2xl max-w-md  scale-95  transition-transform duration-300 ease-in-out transform bg-base-100     z-auto border " onClick={(e) => e.stopPropagation()} >
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <div className="btn btn-circle btn-sm btn-primary text-lg" onClick={() => { router.back() }}>✕</div>
                </div>

                signup

            </div>
        </div>
    );
}
