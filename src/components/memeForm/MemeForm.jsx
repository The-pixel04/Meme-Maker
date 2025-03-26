import { Card, Input, Slider, Button, Radio } from 'antd';
import styles from './MemeForm.module.css'

export default function MemeForm({ handleAction, topText, handleInputChange,
    imageUrl, topTextColor, bottomText, bottomTextColor,
    textSize, setTextSize, setBottomTextColor, setTopTextColor
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
                    />
                    <label>Top Text</label>
                    <Input
                        name="topText"
                        value={topText}
                        onChange={handleInputChange}
                        placeholder="Top Text"
                    />
                    <label>Top Text Color</label>
                    <Radio.Group
                        name="topTextColor"
                        value={topTextColor}
                        onChange={(e) => setTopTextColor(e.target.value)}
                    >
                        <Radio value="#000000">Black</Radio>
                        <Radio value="#FFFFFF">White</Radio>
                    </Radio.Group>
                    <label>Bottom Text</label>
                    <Input
                        name="bottomText"
                        value={bottomText}
                        onChange={handleInputChange}
                        placeholder="Bottom Text"
                    />
                    <label>Bottom Text Color</label>
                    <Radio.Group
                        name="bottomTextColor"
                        value={bottomTextColor}
                        onChange={(e) => setBottomTextColor(e.target.value)}
                    >
                        <Radio value="#000000">Black</Radio>
                        <Radio value="#FFFFFF">White</Radio>
                    </Radio.Group>
                    <label>Text Size</label>
                    <Slider
                        value={textSize}
                        onChange={setTextSize}
                        min={10}
                        max={100}
                    />
                    <Button type="primary" htmlType="submit">
                        Save to collection
                    </Button>
                </div>
            </form>
        </Card>
    );
}