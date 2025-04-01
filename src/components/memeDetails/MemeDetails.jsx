import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Card, Button, Spin } from 'antd';
import { UserContext } from '../../contexts/UserContext.js';
import { useDeleteMeme, useMeme } from '../../api/memeApi.js';
import saveMeme from '../../utils/saveMemeImage.js';
import styles from './MemeDetails.module.css'

export default function MemeDetail() {
    const navigate = useNavigate();
    const { memeId } = useParams();
    const { deleteMeme } = useDeleteMeme();
    const { meme, loading } = useMeme(memeId);
    const { objectId } = useContext(UserContext);
    const isOwner = objectId === meme.ownerId;

    const deleteHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete this meme?`);

        if (!hasConfirm) {
            return;
        };

        await deleteMeme(meme);

        navigate('/catalog');
    };
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

            </div>
        </Card>
    );
};