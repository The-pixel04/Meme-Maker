import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Card, Button, Spin } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/UserContext.js';
import { useDeleteMeme, useLikeMeme, useMeme } from '../../api/memeApi.js';
import saveMeme from '../../utils/saveMemeImage.js';
import styles from './MemeDetails.module.css'

export default function MemeDetail() {
    const navigate = useNavigate();
    const { memeId } = useParams()
    const { deleteMeme } = useDeleteMeme();
    const { meme, loading } = useMeme(memeId);
    const { objectId } = useContext(UserContext);
    const { like } = useLikeMeme();
    const [likes, setLikes] = useState(0)
    const isOwner = objectId === meme.ownerId;


    useEffect(() => {
        setLikes(meme.likes?.length)
    }, [loading])

    const deleteHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete this meme?`);

        if (!hasConfirm) {
            return;
        };

        await deleteMeme(meme);

        navigate('/catalog');
    };

    const likeMemeHandler = async () => {
        const { createdAt, restMeme } = meme;
        const updatedLikes = [...(meme.likes || []), objectId];
        const updatedMeme = {
            ...restMeme,
            likes: updatedLikes,
        };

        console.log(updatedMeme)
        await like(memeId, updatedMeme);

        setLikes(updatedLikes.length);
    }

    return (
        <Card className={styles["meme-detail-card"]}>
            {loading ? (
                <Spin />
            ) : (
                <div className={styles["meme-preview"]}>
                    <img src={meme.imageUrl} alt="Meme" className={styles["meme-image"]} />
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
            )}

            <div className={styles["action-buttons"]}>

                <Button type="primary" htmlType="button" onClick={() => saveMeme(meme)}>
                    Save
                </Button>

                {isOwner &&
                    <>
                        <Button type="primary" onClick={deleteHandler}>Delete</Button>
                        <Link to={`/memes/${memeId}/edit`}>
                            <Button type="primary" htmlType="button" >
                                Edit
                            </Button>
                        </Link>
                    </>
                }

                {objectId && (
                    meme.likes?.includes(objectId)
                        ?
                        <Button
                            type="primary"
                            icon={<LikeOutlined />}
                            onClick={likeMemeHandler}
                        >
                            {`Liked`}

                        </Button>

                        :
                        <Button
                            type="primary"
                            icon={<LikeOutlined />}
                            onClick={likeMemeHandler}
                        >
                            {`Likes ${likes}`}
                        </Button>
                )}

            </div>
        </Card>
    );
};