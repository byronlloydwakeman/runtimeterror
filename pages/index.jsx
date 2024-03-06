import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import styles from './index.module.css';

const Home = () => (
  <div className={styles.main_container}>
    <Navbar />
    <h1>What Can I Deploy to Static Apps?</h1>
    <NavbarBottom />
  </div>
);

export default Home;
