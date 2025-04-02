import { memo, useCallback, useState, useEffect } from "react";
import { Pagination, Spin } from "antd";
import { useMemes } from "../../api/memeApi.js";
import MemeCard from "../memeCard/MemeCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Catalog.module.css";

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const { memes, count, loading } = useMemes(currentPage, 12);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        setSearchParams({ page });
    }, [setSearchParams]);

    useEffect(() => {
        navigate(`/catalog?page=${currentPage}`, { replace: true });
    }, [currentPage, navigate]);

    return (
        <div className={styles["meme-catalog"]}>
            <h1>Meme Catalog</h1>
            <div className={styles["meme-grid"]}>
                {loading ? (
                    <div className="spinner-container">
                        <Spin size="large" />
                    </div>
                ) : (
                    memes.map((meme) => (
                        <div key={meme.objectId} className={styles["meme-card-container"]}>
                            <MemeCard meme={meme} />
                        </div>
                    ))
                )}
            </div>

            <Pagination
                current={currentPage}
                pageSize={12}
                total={count}
                onChange={handlePageChange}
                className={styles.pagination}
            />
        </div>
    );
};

export default memo(Catalog);
