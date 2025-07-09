
import ButtonList from '../(home)/home/_contexts/ButtonList';
import { OrderByProvider } from '../(home)/home/_contexts/OrderByContext';
import Linknav from './Linknav';


export const metadata = {
  title: 'Find',
};

export default function HomeLayout({ children }) {
  return (
    <>
      <OrderByProvider>
        <Linknav />
        {children}
      </OrderByProvider>


    </>

  )
}


