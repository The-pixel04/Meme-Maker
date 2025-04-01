import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.js';
import { Row, Col, Spin } from 'antd';
import { useLast3Memes } from '../../api/memeApi.js';
import MemeCard from '../memeCard/MemeCard.jsx';
import AnimatedBanner from './banner/Banner.jsx';
import styles from './HomePage.module.css'

export default function HomePage() {
    const { last3Memes, loading } = useLast3Memes();
    const { sessionToken } = useContext(UserContext);

    return (
        <div className={styles["home-page"]}>

            <AnimatedBanner sessionToken={sessionToken} />

            {/* Featured Memes Section */}
            <section className={styles["featured-memes"]}>
                <h2>Last Memes</h2>
                <div className={styles["meme-grid"]}>
                    {loading
                        ? <Spin size='large' />
                        :
                        last3Memes.map((meme) => (
                            <div key={meme.objectId} className={styles["meme-card-container"]}>
                                <MemeCard meme={meme} />
                            </div>
                        ))
                    }

                </div>
            </section>

            {/* How It Works Section */}
            <section className={styles["how-it-works"]}>
                <h2>How It Works</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <div className={styles["step"]}>
                            <h3>1. Upload an Image</h3>
                            <p>Choose an image and use a URL.</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div className={styles["step"]}>
                            <h3>2. Add Text</h3>
                            <p>Add top and bottom text to your meme.</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div className={styles["step"]}>
                            <h3>3. Customize</h3>
                            <p>Adjust text size and color.</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div className={styles["step"]}>
                            <h3>4. Save & Share</h3>
                            <p>Post your meme and download it.</p>
                        </div>
                    </Col>
                </Row>
            </section>

            {/* Footer */}

        </div>
    );
};
