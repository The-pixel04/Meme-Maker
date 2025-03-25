import { Card } from 'antd';

export default function MemePreviw({imageUrl, textSize, topText, topTextColor, bottomText, bottomTextColor}) {
    return (
        <Card className="preview-card">
            {imageUrl && (
                <div  className="meme-preview">
                    <img
                        src={imageUrl}
                        alt="Meme Preview"
                        className="meme-image"
                    />
                    <div
                        className="top-text"
                        style={{ fontSize: `${textSize}px`, color: topTextColor }}
                    >
                        {topText}
                    </div>
                    <div
                        className="bottom-text"
                        style={{ fontSize: `${textSize}px`, color: bottomTextColor }}
                    >
                        {bottomText}
                    </div>
                </div>
            )}
        </Card>
    );
}