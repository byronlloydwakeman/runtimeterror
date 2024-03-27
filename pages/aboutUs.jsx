import * as React from 'react';
import Navbar from '../components/Navbars/Navbar';
import NavbarBottom from '../components/Navbars/NavbarBottom';
import styles from './aboutUs.module.scss';

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className={styles.main_container}>
        <h1 className={styles.page_title}>About us</h1>
      </div>
      <NavbarBottom />
    </div>
  );
}
