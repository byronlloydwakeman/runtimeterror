import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import styles from './index.module.css';

const Home = () => (
  <div className={styles.main_container}>
    <Navbar />
    <div className={styles.sub_container}>
      <h1 className={styles.page_title}>Homepage</h1>
    </div>
    <NavbarBottom />
  </div>
);

export default Home;
