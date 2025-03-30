import { Spin } from 'antd';
import { useMemes } from '../../api/memeApi.js';
import MemeCard from '../memeCard/MemeCard.jsx';
import styles from './Catalog.module.css'
import { memo } from 'react';

const Catalog = () => {
    const { memes, loading } = useMemes();

    return (
        <div className={styles["meme-catalog"]}>
            <h1>Meme Catalog</h1>
            <div className={styles["meme-grid"]}>
                {loading
                    ? <div className="spinner-container">
                        <Spin size="large" />
                    </div>
                    : memes.results?.map((meme) => (
                        <div key={meme.objectId} className={styles["meme-card-container"]}>
                            <MemeCard meme={meme} />
                        </div>

                    ))}
            </div>
        </div>
    );
};

export default memo(Catalog);