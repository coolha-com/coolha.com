

import Linknav from './Linknav';


export const metadata = {
  title: 'Find',
};

export default function HomeLayout({ children }) {
  return (
    <>
      <Linknav />
      {children}


    </>

  )
}


