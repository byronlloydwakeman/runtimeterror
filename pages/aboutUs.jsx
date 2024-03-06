import * as React from 'react';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import styles from './aboutUs.module.css';

export default function Challenges() {
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
