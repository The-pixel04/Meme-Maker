import { Pagination, Spin } from 'antd';
import { useMemes } from '../../api/memeApi.js';
import MemeCard from '../memeCard/MemeCard.jsx';
import styles from './Catalog.module.css'
import { memo, useState } from 'react';

const Catalog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { memes, loading } = useMemes(currentPage, 10); 

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update the current page
    };

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

            <Pagination
                current={currentPage}
                pageSize={10} // Number of memes per page
                total={memes.count || 0} // Total number of memes
                onChange={handlePageChange}
                className={styles["pagination"]}
            />
        </div>
    );
};

export default memo(Catalog);