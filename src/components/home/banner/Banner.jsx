import { Button } from "antd";
import styles from "./Banner.module.css";
import { Link, useNavigate } from "react-router";

export default function AnimatedBanner({ sessionToken }) {
    const navigate = useNavigate();
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
                    (<Button type="primary" size="large" className={styles["banner-button"]} onClick={() => navigate("/create")}>
                        Create a Meme Now
                    </Button>)
                }
            </div>
        </div>
    );
};
