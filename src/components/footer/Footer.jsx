import { Link } from "react-router";
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <>
            <footer className={styles["footer"]}>
                <div className={styles["quick-links"]}>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className={styles["copyright"]}>
                    © 2025 Meme Generator. All rights reserved.
                </div>
            </footer>
        </>
    )
}