import { Card } from 'antd';
import styles from './MemePreview.module.css'

export default function MemePreviw({ imageUrl, textSize, topText, topTextColor, bottomText, bottomTextColor }) {
    return (
        <Card className={styles["preview-card"]}>
            {imageUrl && (
                <div className="meme-preview">
                    <img
                        src={imageUrl}
                        alt="Meme Preview"
                        className={styles["meme-image"]}
                    />
                    <div
                        className={styles["top-text"]}
                        style={{ fontSize: `${textSize}px`, color: topTextColor }}
                    >
                        {topText}
                    </div>
                    <div
                        className={styles["bottom-text"]}
                        style={{ fontSize: `${textSize}px`, color: bottomTextColor }}
                    >
                        {bottomText}
                    </div>
                </div>
            )}
        </Card>
    );
}