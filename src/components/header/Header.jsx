import { Link, useLocation } from 'react-router';
import { Menu } from 'antd';
import { HomeOutlined, BookOutlined, FormOutlined, KeyOutlined, LoginOutlined, LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth.js';
import styles from './Header.module.css';
import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <div className={styles["nav-container"]}>
                <div className={styles["logo"]}>
                    <Link to="/" onClick={closeMenu}>
                        <img
                            src="https://cdn.pixabay.com/photo/2024/05/31/18/54/meme-8801100_1280.png"
                            alt="Meme Maker Logo"
                            className={styles["logo-image"]}
                        />
                        <span className={styles["logo-text"]}>MM</span>
                    </Link>
                </div>

                <button className={styles['burger-menu']} onClick={toggleMenu}>
                    <MenuOutlined />
                </button>

                <Menu
                    mode={menuOpen ? 'vertical' : "horizontal"}
                    selectedKeys={[getSelectedKey(location)]}
                    className={`${styles['nav-menu']} ${menuOpen ? styles.active : ''}`}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/" onClick={closeMenu}>Home</Link>
                    </Menu.Item>

                    <Menu.Item key="catalog" icon={<BookOutlined />}>
                        <Link to="/catalog" onClick={closeMenu}>Catalog</Link>
                    </Menu.Item>

                    {isAuthenticated ? (
                        <>
                            <Menu.Item key="profile" icon={<UserOutlined />}>
                                <Link to="/profile" onClick={closeMenu}>Profile</Link>
                            </Menu.Item>
                            <Menu.Item key="create" icon={<FormOutlined />}>
                                <Link to="/create" onClick={closeMenu}>Create Meme</Link>
                            </Menu.Item>
                            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                <Link to="/logout" onClick={closeMenu}>Logout</Link>
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="register" icon={<KeyOutlined />}>
                                <Link to="/register" onClick={closeMenu}>Register</Link>
                            </Menu.Item>
                            <Menu.Item key="login" icon={<LoginOutlined />}>
                                <Link to="/login" onClick={closeMenu}>Login</Link>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </div>
        </header>
    );
}

function getSelectedKey(location) {
    const path = location.pathname;

    if (path === '/') return 'home';
    if (path.startsWith('/catalog')) return 'catalog';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/create')) return 'create';
    if (path.startsWith('/register')) return 'register';
    if (path.startsWith('/login')) return 'login';
    if (path.startsWith('/logout')) return 'logout';
    return null;
}
