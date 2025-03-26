import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, BookOutlined, FormOutlined, KeyOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth.js';
import styles from './Header.module.css'

const NavigationMenu = () => {
    const { email, isAuthenticated } = useAuth();
    return (
        <header>
            <div className={styles["nav-container"]}>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    className={styles["nav-menu"]}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item> */}
                    <Menu.Item key="catalog" icon={<BookOutlined />}>
                        <Link to="/catalog">Catalog</Link>
                    </Menu.Item>
                    {isAuthenticated
                        ? (<>
                            <Menu.Item key="create" icon={<FormOutlined />}>
                                <Link to="/create">Create Meme</Link>
                            </Menu.Item>
                            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                <Link to="/logout">Logout</Link>
                            </Menu.Item>
                        </>
                        )
                        : (<>
                            <Menu.Item key="register" icon={<KeyOutlined />}>
                                <Link to="/register">Register</Link>
                            </Menu.Item>
                            <Menu.Item key="login" icon={<LoginOutlined />}>
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                        </>
                        )
                    }
                </Menu>
            </div>
        </header>
    );
};

export default NavigationMenu;