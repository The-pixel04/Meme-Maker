import { Card } from 'antd';
import { Link } from 'react-router-dom';

const MemeCard = ({ meme }) => {
    return (
        <Link to={`/memes/${meme.objectId}/details`}>
            <Card className="meme-card" hoverable>
                <div className="meme-preview">
                    <img
                        src={meme.imageUrl}
                        alt="Meme"
                        className="meme-image"
                    />
                    <div
                        className="top-text"
                        style={{ fontSize: `${meme.textSize}px`, color: meme.topTextColor }}
                    >
                        {meme.topText}
                    </div>
                    <div
                        className="bottom-text"
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