import { useContext, useActionState } from "react";
import { useNavigate } from "react-router";
import { Input, Button, Typography } from "antd";
import { useRegister } from "../../api/authApi.js";
import { UserContext } from "../../contexts/UserContext.js";
import { ErrorContext } from "../../contexts/ErrorContext.js";
import styles from "./Register.module.css";

const { Title } = Typography;

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const { errorHandler } = useContext(ErrorContext);

    const registerHandler = async (_, formData) => {
        let values = formData;
        if (formData instanceof FormData) {
            values = Object.fromEntries(formData);
        }

        const { userName, email, password } = values || {};
        const confirmPassword = values?.confirmPassword;

        if (!userName || !email || !password || !confirmPassword) {
            errorHandler("Please fill all required fields");
            return null;
        }

        if (password !== confirmPassword) {
            errorHandler("Password miss match");
            return null;
        }

        const result = await register(userName, email, password);

        const authData = { ...result, username: userName, email };
        userLoginHandler(authData);
        navigate(-1);
        return authData;
    };

    const [_, registerAction, isPending] = useActionState(registerHandler, { userName: "", email: "", password: "" });

    return (
        <div className={styles["register-container"]}>
            <Title level={2} className={styles["form-title"]}>Create Account</Title>

            <form className={styles["register-form"]} action={registerAction}>
                <div className={styles["form-group"]}>
                    <label htmlFor="username">Username</label>
                    <Input name="userName" id="username" placeholder="Enter your username" required minLength={3} />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <Input name="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="password">Password</label>
                    <Input.Password name="password" placeholder="Create a password" required minLength={6} />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input.Password name="confirmPassword" placeholder="Repeat your password" required />
                </div>

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles["register-button"]}
                    disabled={isPending}
                    loading={isPending}
                >
                    Register
                </Button>

                <div className={styles["login-link"]}>
                    Already have an account? <a onClick={() => navigate("/login")}>Login here</a>
                </div>
            </form>
        </div>
    );
};
