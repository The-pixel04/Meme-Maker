import { Button } from "antd";
import styles from "./Banner.module.css";
import { Link } from "react-router";

export default function AnimatedBanner({ sessionToken }) {
    return (
        <div className={styles["banner-container"]}>
            <div className={styles["banner-content"]}>
                <h1>
                    Create Hilarious Memes in Seconds
                </h1>
                <p className={styles["emoji-scroll"]}>☝️ Choose an image URL, add your text, and share it with the world 🚀</p>
                <div className={styles["emoji-float"]}>
                    🎨 📸 💡 🏆
                </div>
                {sessionToken &&
                    (<Button type="primary" size="large" className={styles["banner-button"]}>
                        <Link to="/create">Create a Meme Now</Link>
                    </Button>)
                }
            </div>
        </div>
    );
};
