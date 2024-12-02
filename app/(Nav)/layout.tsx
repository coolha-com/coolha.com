
import Header from '@/components/header/Header'
import Navbar from '@/components/header/Navbar'
import NavHeader from '@/components/header/NavHeader'


export default function layout({ children }) {
  return (
    <div id='hometop' className='bg-base-200'>
      <Header />
      <div className="h-0 md:h-16" />
      <NavHeader />
      <div className='mx-auto max-w-3xl min-h-[calc(100dvh-4rem)] flex-1 justify-center'>
        {children}
      </div>
      <Navbar />
    </div>
  )
}
