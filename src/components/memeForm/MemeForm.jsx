import { Card, Input, Button } from "antd";
import styles from "./MemeForm.module.css";

export default function MemeForm({
    handleAction,
    topText,
    bottomText,
    imageUrl,
    topTextColor,
    bottomTextColor,
    setTopTextColor,
    setBottomTextColor,
    handleInputChange,
    pending,
}) {
    return (
        <Card className={styles["controls-card"]}>
            <form action={handleAction}>
                <div className={styles["controls-container"]}>
                    <label>Image URL</label>
                    <Input
                        name="imageUrl"
                        value={imageUrl}
                        onChange={handleInputChange}
                        placeholder="Enter image URL"
                        required
                    />

                    <label>Top Text</label>
                    <Input
                        name="topText"
                        value={topText}
                        minLength={1}
                        maxLength={50}
                        onChange={handleInputChange}
                        placeholder="Top Text"
                        required
                    />

                    <label>Top Text Color</label>
                    <div className={styles["color-picker-container"]}>
                        <input
                            type="color"
                            value={topTextColor}
                            name="topTextColor"
                            onInput={(e) => setTopTextColor(e.target.value)}
                            onChange={(e) => setTopTextColor(e.target.value)}
                            className={styles["color-input"]}
                        />
                        <span className={styles["color-value"]}>
                            {topTextColor}
                        </span>
                    </div>

                    <label>Bottom Text</label>
                    <Input
                        name="bottomText"
                        value={bottomText}
                        minLength={1}
                        maxLength={50}
                        onChange={handleInputChange}
                        placeholder="Bottom Text"
                        required
                    />

                    <label>Bottom Text Color</label>
                    <div className={styles["color-picker-container"]}>
                        <input
                            type="color"
                            value={bottomTextColor}
                            onInput={(e) => setBottomTextColor(e.target.value)}
                            onChange={(e) => setBottomTextColor(e.target.value)}
                            className={styles["color-input"]}
                            name="bottomTextColor"
                        />
                        <span className={styles["color-value"]}>
                            {bottomTextColor}
                        </span>
                    </div>

                    <Button type="primary" htmlType="submit" disabled={pending}>
                        {pending ? "Saving..." : "Save to collection"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
