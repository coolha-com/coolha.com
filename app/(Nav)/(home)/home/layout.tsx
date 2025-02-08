
import { OrderByProvider } from './_contexts/OrderByContext';
import Linknav from './Linknav';


export default function HomeLayout({ children }) {

  return (
    <div>

      <OrderByProvider>
        <Linknav />
        {children}
      </OrderByProvider>

    </div>
  )
}


