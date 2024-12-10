
import Sidebar from '@/components/header/Sidebar'
import Navbar from '@/components/header/Navbar'
import NavFooter from '@/components/header/NavFooter'


export default function layout({ children }) {
  return (
    <div id='hometop' className='bg-base-200  min-h-dvh flex'>

      <div className="md:w-20 xl:w-56">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
      <Navbar />
        <div className="flex-1">
          {children}
        </div>
      <NavFooter />
      </div>

      <div className="lg:w-20 xl:w-32"/>

    </div>
  )
}
