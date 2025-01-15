
import { OrderByProvider } from './_contexts/OrderByContext';
import ButtonList from './_contexts/ButtonList';
import Linknav from './Linknav';


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


