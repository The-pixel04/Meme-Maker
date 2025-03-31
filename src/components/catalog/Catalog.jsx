import { Pagination, Spin } from 'antd';
import { useMemes } from '../../api/memeApi.js';
import MemeCard from '../memeCard/MemeCard.jsx';
import styles from './Catalog.module.css'
import { memo, useState } from 'react';

const Catalog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { memes, count, loading } = useMemes(currentPage, 12);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles["meme-catalog"]}>
            <h1>Meme Catalog</h1>
            <div className={styles["meme-grid"]}>
                {loading
                    ? <div className="spinner-container">
                        <Spin size="large" />
                    </div>
                    : memes.map((meme) => (
                        <div key={meme.objectId} className={styles["meme-card-container"]}>
                            <MemeCard meme={meme} />
                        </div>

                    ))}
            </div>

            <Pagination
                current={currentPage}
                pageSize={12} // Number of memes per page
                total={count} // Total number of memes
                onChange={handlePageChange}
                className={styles["pagination"]}
            />
        </div>
    );
};

export default memo(Catalog);