import { Card } from 'antd';
import { Link } from 'react-router-dom';
import styles from './MemeCard.module.css'

const MemeCard = ({ meme }) => {
    return (
        <Link to={`/memes/${meme.objectId}/details`}>
            <Card className={styles["meme-card"]} hoverable>
                <div className="meme-preview">
                    <img
                        src={meme.imageUrl}
                        alt="Meme"
                        className={styles["meme-image"]}
                    />
                    <div
                        className={styles["top-text"]}
                        style={{ fontSize: `${meme.textSize}px`, color: meme.topTextColor }}
                    >
                        {meme.topText}
                    </div>
                    <div
                        className={styles["bottom-text"]}
                        style={{ fontSize: `${meme.textSize}px`, color: meme.bottomTextColor }}
                    >
                        {meme.bottomText}
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default MemeCard;