import { Card, Button, Spin } from 'antd';
import { useParams, Link, useNavigate } from 'react-router';
import { useDeleteMeme, useMeme } from '../../api/memeApi.js';
import saveMeme from '../../utils/saveMemeImage.js';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext.js';

export default function MemeDetail() {
    const navigate = useNavigate();
    const { memeId } = useParams();
    const { meme, loading } = useMeme(memeId);
    const { objectId } = useContext(UserContext);
    const { deleteMeme } = useDeleteMeme();
    const isOwner = objectId === meme.ownerId;
    console.log(isOwner)

    const deleteHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete this meme?`);

        if (!hasConfirm) {
            return;
        };

        await deleteMeme(meme);

        navigate('/catalog');
    };
    return (
        <Card className="meme-detail-card">
            {loading ? (
                <Spin />
            ) : (
                <div className="meme-preview">
                    <img src={meme.imageUrl} alt="Meme" className="meme-image" />
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
            )}

            <div className="action-buttons">

                <Button type="primary" htmlType="button" onClick={() => saveMeme(meme)}>
                    Save
                </Button>

                {isOwner &&
                    <>
                        <Button type="primary" onClick={deleteHandler}>Delete</Button>
                        <Button type="primary" htmlType="button" >
                            <Link to={`/memes/${memeId}/edit`}>Edit</Link>
                        </Button>
                    </>
                }

            </div>
        </Card>
    );
};