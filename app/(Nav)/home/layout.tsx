
import { OrderByProvider } from './_contexts/OrderByContext';
import ButtonList from './_contexts/ButtonList';
import Linknav from './Linknav';


export default function HomeLayout({ children }) {

  return (
    <div className="mx-auto max-w-3xl lg:justify-center pb-14 flex flex-col ">


      <Linknav />

      <OrderByProvider>
        <ButtonList />
        <div className=''>
          {children}
        </div>
      </OrderByProvider>


    </div>
  )
}


