import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}> City Grocery Shop </h1> <span>🛒</span>
            <nav className={styles.nav}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
        </header>
    );
}