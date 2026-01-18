
import Linknav from './Linknav';


export default function HomeLayout({ children }) {

  return (
    <div>

        <Linknav />
        {children}

    </div>
  )
}


