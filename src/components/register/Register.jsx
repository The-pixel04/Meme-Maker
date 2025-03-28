import { Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useRegister } from '../../api/authApi.js';
import { UserContext } from '../../contexts/UserContext.js';
import { useContext } from 'react';
import styles from './Register.module.css'

const { Title } = Typography;

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);

    const registerHandler = async (formData) => {
        const { userName, email, password } = Object.fromEntries(formData);

        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            console.log('Password missmatch')
            return;
        }

        let authData = await register(userName, email, password);
        authData= { ...authData, username: userName, email: email };
        userLoginHandler(authData)
        navigate('/');
    }
    return (
        <div className={styles["register-container"]}>
            <Title level={2} className={styles["form-title"]}>Create Account</Title>

            <form className={styles["register-form"]} action={registerHandler}>
                <div className={styles["form-group"]}>
                    <label htmlFor="username">Username</label>
                    <Input
                        name="userName"
                        id="username"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="password">Password</label>
                    <Input.Password
                        name="password"
                        id="password"
                        placeholder="Create a password"
                        required
                        minLength={6}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input.Password
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Repeat your password"
                        required
                    />
                </div>

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles["register-button"]}
                >
                    Register
                </Button>

                <div className={styles["login-link"]}>
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </form>
        </div>
    );
};