
import ButtonList from '../home/_contexts/ButtonList';
import { OrderByProvider } from '../home/_contexts/OrderByContext';
import Linknav from './Linknav';


export const metadata = {
  title: 'Find',
};

export default function HomeLayout({ children }) {
  return (
    <>
      <OrderByProvider>
        <Linknav />
        <div className='w-full'>
          {children}
        </div>
      </OrderByProvider>


    </>

  )
}


