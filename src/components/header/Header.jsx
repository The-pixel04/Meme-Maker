import { Link, useLocation } from 'react-router';
import { Menu } from 'antd';
import { HomeOutlined, BookOutlined, FormOutlined, KeyOutlined, LoginOutlined, LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth.js';
import styles from './Header.module.css'
import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <div className={styles["nav-container"]}>

                <div className={styles["logo"]}>
                    <Link to="/">
                        <img src="https://cdn.pixabay.com/photo/2024/05/31/18/54/meme-8801100_1280.png" alt="Meme Maker Logo" className={styles["logo-image"]} />
                        <span className={styles["logo-text"]}>MM</span>
                    </Link>
                </div>

                <button className={styles['burger-menu']} onClick={toggleMenu}>
                <MenuOutlined />
            </button>

                <Menu
                    mode={menuOpen ? 'vertical' : "horizontal"}
                    selectedKeys={getSelectedKey(location)}
                    className={`${styles['nav-menu']} ${menuOpen ? styles.active : ''}`}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    <Menu.Item key="catalog" icon={<BookOutlined />}>
                        <Link to="/catalog">Catalog</Link>
                    </Menu.Item>
                    {isAuthenticated
                        ? (<>
                            <Menu.Item key="profile" icon={<UserOutlined />}>
                                <Link to='/profile'>Profile </Link>
                            </Menu.Item>
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

function getSelectedKey() {
    const path = location.pathname;

    if (path === '/') return 'home';
    if (path.startsWith('/catalog')) return 'catalog';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/create')) return 'create';
    if (path.startsWith('/register')) return 'register';
    if (path.startsWith('/login')) return 'login';
    if (path.startsWith('/logout')) return 'logout';
    if (path.startsWith('/memes/')) return null
    if (path.startsWith('/aboutus')) return null
    if (path.startsWith('/contactus')) return null
    return 'home';
}
