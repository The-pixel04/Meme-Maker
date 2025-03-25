import { Link } from "react-router";

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="quick-links">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="copyright">
                    © 2025 Meme Generator. All rights reserved.
                </div>
            </footer>
        </>
    )
}