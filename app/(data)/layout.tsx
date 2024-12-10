
import Sidebar from '@/components/header/Sidebar'



export default function layout({ children }) {
  return (
    <div className='bg-base-200 flex'>
      <div className="w-56">
        <Sidebar />
      </div>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}