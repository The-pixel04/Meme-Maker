import { useState, useEffect, useActionState } from "react";
import { useNavigate, useParams } from "react-router";
import { Spin } from "antd";
import { useEditMeme, useMeme } from "../../api/memeApi.js";
import MemeForm from "../memeForm/MemeForm.jsx";
import MemePreview from "../memePreview/MemePreview.jsx";

export default function MemeEdit() {
    const { memeId } = useParams();
    const { meme, loading } = useMeme(memeId);
    const [imageUrl, setImageUrl] = useState("");
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [textSize, setTextSize] = useState(30);
    const [topTextColor, setTopTextColor] = useState("#000000");
    const [bottomTextColor, setBottomTextColor] = useState("#000000");
    const { edit } = useEditMeme();
    const navigate = useNavigate();

    useEffect(() => {
        setImageUrl(meme.imageUrl);
        setTopText(meme.topText);
        setBottomText(meme.bottomText);
        setTextSize(meme.textSize);
        setTopTextColor(meme.topTextColor);
        setBottomTextColor(meme.bottomTextColor);
    }, [loading]);

    const handleAction = (_, formData) => {
        const memeData = Object.fromEntries(formData);

        const result = edit(memeId, { ...memeData, textSize });

        if (!result) {
            return null;
        }

        navigate(`/memes/${memeId}/details`);
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
        <div className="meme-generator-container">
            {loading
                ? <div className="spinner-container">
                    <Spin size="large" />
                </div>
                : <>
                    <MemeForm handleAction={formAction} topText={topText} handleInputChange={handleInputChange} imageUrl={imageUrl} topTextColor={topTextColor} bottomText={bottomText} bottomTextColor={bottomTextColor} textSize={textSize} setTextSize={setTextSize} setBottomTextColor={setBottomTextColor} setTopTextColor={setTopTextColor} pending={isPending}/>
                    <MemePreview imageUrl={imageUrl} textSize={textSize} topText={topText} topTextColor={topTextColor} bottomText={bottomText} bottomTextColor={bottomTextColor} />
                </>
            }
        </div>
    );
};
