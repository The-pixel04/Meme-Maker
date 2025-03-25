import { Input, Button, Typography, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useActionState, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext.js';
import { useLogin } from '../../api/authApi.js';

const { Title } = Typography;

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const formValues = Object.fromEntries(formData);
        
        const authData = await login(formValues.email, formValues.password);
        userLoginHandler(authData);

        navigate('/catalog');
        return formValues
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <div className="login-container">
            <Title level={2} className="form-title">Welcome Back</Title>

            <form  className="login-form" action={loginAction}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        prefix={<UserOutlined />}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input.Password
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        prefix={<LockOutlined />}
                        required
                        minLength={6}
                    />
                </div>

                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="login-button"
                    disabled={isPending}
                >
                    Log In
                </Button>

                <div className="register-link">
                    Don't have an account? <a href="/register">Sign up</a>
                </div>
            </form>
        </div>
    );
};