import { Layout, Typography, Row, Col, Card, Divider } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import styles from "./Contact.module.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Contact() {
    return (
        <Layout className={styles["contact-layout"]}>
            <Content className={styles["contact-content"]}>

                <Row justify="center" className={styles["header-section"]}>
                    <Col span={24}>
                        <Title level={1} className={styles["header-title"]}>Contact Us</Title>
                        <Paragraph className={styles["header-description"]}>
                            Reach out to our team in Varna, Bulgaria
                        </Paragraph>
                    </Col>
                </Row>

                <Row gutter={[24, 24]} justify="center" className={styles["contact-info-section"]}>
                    <Col xs={24} lg={8} className={styles['contact-credentials']}>
                        <Card className={styles["contact-card"]} >
                            <div className={styles["contact-item"]}>
                                <EnvironmentOutlined className={styles["contact-icon"]} />
                                <div>
                                    <Title level={4} className={styles["contact-title"]}>Our Location</Title>
                                    <Paragraph>ул. „Шейново“, Varna 9000, Bulgaria</Paragraph>
                                </div>
                            </div>

                            <Divider />

                            <div className={styles["contact-item"]}>
                                <PhoneOutlined className={styles["contact-icon"]} />
                                <div>
                                    <Title level={4} className={styles["contact-title"]}>Call Us</Title>
                                    <Paragraph>+359 123 456 789</Paragraph>
                                </div>
                            </div>

                            <Divider />

                            <div className={styles["contact-item"]}>
                                <MailOutlined className={styles["contact-icon"]} />
                                <div>
                                    <Title level={4} className={styles["contact-title"]}>Email Us</Title>
                                    <Paragraph>contact@mememaker.bg</Paragraph>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={12} lg={16}>
                        <Card className={styles["map-card"]}>
                            <Title level={4} className={styles["map-title"]}>Find Us in Varna</Title>
                            <div className={styles["map-container"]}>
                                <iframe
                                    title="Varna Office Location"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=27.9150,43.2030,27.9200,43.2050&layer=mapnik&marker=43.204049,27.917503"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
