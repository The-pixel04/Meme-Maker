import { useState, useContext, useActionState } from "react";
import { useNavigate } from "react-router";
import { useCreateMeme, useGenerateIdea } from "../../api/memeApi.js";
import MemeForm from "../memeForm/MemeForm.jsx";
import MemePreview from "../memePreview/MemePreview.jsx";
import { UserContext } from "../../contexts/UserContext.js";
import styles from "./MemeGenerator.module.css";
import { Button, Input, Spin } from "antd";

export default function MemeGenerator() {
    const [imageUrl, setImageUrl] = useState("");
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [textSize, setTextSize] = useState(30);
    const [topTextColor, setTopTextColor] = useState("#000000");
    const [bottomTextColor, setBottomTextColor] = useState("#000000");
    const { objectId } = useContext(UserContext);
    const { create } = useCreateMeme();
    const navigate = useNavigate();

    const { generateIdea } = useGenerateIdea();
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState(null);
    const [generatePending, setGeneratePending] = useState(false);

    const handleGenerateMeme = async () => {
        if (prompt.trim()) {
            setGeneratePending(true);
            try {
                const result = await generateIdea(prompt);
                setResponse(result.choices[0].message.content);
                console.log(result.choices[0].message.content);
            } finally {
                setGeneratePending(false);
            }
        }
    };

    const handleAction = async (_, formData) => {
        const memeData = Object.fromEntries(formData);

        const result = await create({ ...memeData, textSize }, objectId);

        if (!result) {
            return null;
        }

        navigate("/catalog");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "imageUrl") {
            setImageUrl(value);
        };

        if (name === "topText") {
            setTopText(value);
        };

        if (name === "bottomText") {
            setBottomText(value);
        };
    };

    const [, formAction, isPending] = useActionState(handleAction, { imageUrl, topText, bottomText, topTextColor, bottomTextColor, textSize });

    return (
        <>
            <div className={styles["meme-ideas-generator"]}>
                <div className={styles["content"]}>
                    <h2>Meme Ideas Generator</h2>
                    <Input
                        type="text"
                        placeholder="Enter your meme prompt..."
                        name="generate"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button type="primary" index={styles["generate-button"]} onClick={handleGenerateMeme} loading={generatePending} disabled={generatePending}>
                        {generatePending ? "Generating..." : "View response"}
                    </Button>

                    {isPending ?
                        <div className="spinner-container">
                            <Spin size="large" />
                        </div>
                        : (
                            <div className={styles["response-container"]}>
                                <p>{response}</p>
                            </div>
                        )}
                </div>
            </div>

            <div className="meme-generator-container">
                <MemeForm handleAction={formAction} toptext={topText} handleInputChange={handleInputChange} imageUrl={imageUrl} topTextColor={topTextColor} bottomText={bottomText} bottomTextColor={bottomTextColor} textSize={textSize} setTextSize={setTextSize} setBottomTextColor={setBottomTextColor} setTopTextColor={setTopTextColor} pending={isPending} />
                <MemePreview imageUrl={imageUrl} textSize={textSize} topText={topText} topTextColor={topTextColor} bottomText={bottomText} bottomTextColor={bottomTextColor} />
            </div>
        </>
    );
};
