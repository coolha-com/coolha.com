
import Header from '@/components/header/Header'
import Navbar from '@/components/header/Navbar'
import NavHeader from '@/components/header/NavHeader'


export default function layout({ children }) {
  return (
    <div id='hometop' className='bg-base-200'>
      <Header />
      <NavHeader />
      <div className=' min-h-[100svh]  justify-center pt-0 md:pt-16 '>
        {children}
      </div>
      <Navbar />
    </div>
  )
}
