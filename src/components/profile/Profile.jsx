import { useContext } from "react";
import { Card, Avatar, Row, Col, Typography, Divider, Spin } from "antd";
import { UserContext } from "../../contexts/UserContext.js";
import { useUserMemes } from "../../api/memeApi.js";
import MemeCard from "../memeCard/MemeCard.jsx";
import styles from "./Profile.module.css";

const { Title, Text, Paragraph } = Typography;

export default function Profile() {
    const { username, email, objectId } = useContext(UserContext);
    const { userMemes, loading } = useUserMemes(objectId);

    return (
        <div className={styles["profile-container"]}>
            <Card className={styles["user-card"]}>
                <Row align="middle" gutter={16}>
                    <Col>
                        <Avatar
                            size={64}
                            style={{
                                backgroundColor: "#1890ff",
                                fontSize: "24px",
                                fontWeight: "bold",
                            }}
                        >
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                    </Col>
                    <Col>
                        <Title level={4} style={{ marginBottom: 0 }}>{username}</Title>
                        <Text type="secondary">{email}</Text>
                        <Paragraph>
                            <Text strong>{userMemes.results?.length || 0}</Text> memes created
                        </Paragraph>
                    </Col>
                </Row>
            </Card>

            <Divider orientation="left">
                <Title level={5}>Memes by {username}</Title>
            </Divider>

            {loading
                ? <Spin />
                : userMemes.results?.length > 0 ? (
                    <div className={styles["meme-grid"]}>
                        {userMemes.results.map((meme) => (
                            <div key={meme.objectId} className={styles["meme-card-container"]}>
                                <MemeCard meme={meme} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <Text type="secondary">No memes created yet</Text>
                    </Card>
                )}
        </div>
    );
};
