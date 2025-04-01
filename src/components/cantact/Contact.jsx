import { Layout, Typography, Row, Col, Card, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './Contact.module.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Contact() {
    return (
        <Layout className={styles["contact-layout"]}>
            <Content className="contact-content">
                {/* Header Section */}
                <Row justify="center" className={styles["header-section"]}>
                    <Col span={24}>
                        <Title level={1} className={styles["header-title"]}>Contact Us</Title>
                        <Paragraph className={styles["header-description"]}>
                            Reach out to our team in Varna, Bulgaria
                        </Paragraph>
                    </Col>
                </Row>

                {/* Contact Information */}
                <Row gutter={[24, 24]} justify="center" className={styles["contact-info-section"]}>
                    <Col xs={24} md={12} lg={8}>
                        <Card className={styles["contact-card"]}>
                            <div className={styles["contact-item"]}>
                                <EnvironmentOutlined className="contact-icon" />
                                <div>
                                    <Title level={4} className={styles["contact-title"]}>Our Location</Title>
                                    <Paragraph>ул. „Шейново“, Varna 9000, Bulgaria</Paragraph>
                                </div>
                            </div>

                            <Divider />

                            <div className={styles["contact-item"]}>
                                <PhoneOutlined className="contact-icon" />
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

                    {/* Google Maps Card */}
                    <Col xs={24} md={12} lg={16}>
                        <Card className={styles["map-card"]}>
                            <Title level={4} className={styles["map-title"]}>Find Us in Varna</Title>
                            <div className={styles["map-container"]}>
                                <iframe
                                    title="Varna Office Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.123073847372!2d27.917503315845794!3d43.2040489791383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a45476c5c2f0a5%3A0x3a8a7b3f0f4b3b1a!2sul.%20%22Sheynovo%22%202%2C%209000%20Hristo%20Botev%2C%20Varna!5e0!3m2!1sen!2sbg!4v1620000000000!5m2!1sen!2sbg"
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