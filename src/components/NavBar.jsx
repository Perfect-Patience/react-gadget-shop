import styles from './NavBar.module.css';
import {Link} from 'react-router-dom';


export default function NavBar(){
    return (

        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <i className="bi bi-headset"></i>
            </div>
            <ul className="navbar__links">
                <li><Link to="/">Home</Link></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div className={styles.search}>
                <input type="text" placeholder="Search..." />
                <button type="submit"><i className="bi bi-search"></i></button></div>
            <div className={styles.cart}>
               <Link to="/cart"><i className="bi bi-cart-fill"></i> Cart</Link></div>
            </nav>
            );
}