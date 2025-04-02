import { Alert } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./ErrorPopup.module.css";

const ErrorPopup = ({ message, onClose }) => {

    return (
        <div className={styles["error-popup-container"]}>
            <Alert
                message={
                    <div className={styles["error-content"]}>
                        <ExclamationCircleFilled className={styles["error-icon"]} />
                        <span className={styles["error-message"]}>{message}</span>
                    </div>
                }
                type="error"
                showIcon={false}
                closable
                onClose={onClose}
                className={styles["auto-close-alert"]}
            />
        </div>
    );
};

export default ErrorPopup;
