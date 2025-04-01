import { Layout, Typography, Row, Col, Card, Avatar, Divider } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import styles from './AboutUs.module.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function AboutUs() {
    const teamMembers = [
        { name: 'Kristian', role: 'Founder & Developer', avatar: 'https://www.vhv.rs/dpng/d/123-1231425_memes-meme-dankmemes-pepethefrog-funny-group-chat-profile.png' },
    ];

    return (
        <Layout className={styles["about-layout"]}>
            <Content className={styles["about-content"]}>
                {/* Hero Section */}
                <Row justify="center" className={styles["hero-section"]}>
                    <Col span={24}>
                        <Title level={1} className={styles["hero-title"]}>About Meme Maker</Title>
                        <Paragraph className={styles["hero-description"]}>
                            We’re on a mission to spread joy, one meme at a time.
                        </Paragraph>
                    </Col>
                </Row>

                {/* Features Section */}
                <Row gutter={[24, 24]} className={styles["features-section"]}>
                    <Col xs={24} sm={12} md={8}>
                        <Card hoverable className={styles["feature-card"]}>
                            <RocketOutlined className={styles["feature-icon"]} />
                            <Title level={3}>Easy to Use</Title>
                            <Paragraph>Choose image Url, add text, and customize memes in seconds.</Paragraph>
                        </Card>
                    </Col>
                    {/* ...other feature cards... */}
                </Row>

                {/* Team Section */}
                <Divider orientation="center" className={styles["team-divider"]}>
                    <Title level={2}>Meet the Team</Title>
                </Divider>
                <Row gutter={[24, 24]} justify="center" className={styles["team-section"]}>
                    {teamMembers.map((member, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6}>
                            <Card hoverable className={styles["team-card"]}>
                                <Avatar size={120} src={member.avatar} className={styles["team-avatar"]} />
                                <Title level={3} className={styles["team-name"]}>{member.name}</Title>
                                <Paragraph type="secondary" className={styles["team-role"]}>{member.role}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};
