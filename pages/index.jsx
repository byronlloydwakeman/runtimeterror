import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import styles from './index.module.scss';
import Preloader from '../components/Preloader/preloader';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (
      async () => {
          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2500)
      }
    )()
  }, [])

  return (
    <div className={styles.main_container}>
      <AnimatePresence>
      {
        isLoading && <Preloader/>
      }
      </AnimatePresence>

      <Navbar />
      <div className={styles.sub_container}>
        <h1 className={styles.page_title}>Homepage</h1>
      </div>
      <NavbarBottom />
    </div>
  )
}

