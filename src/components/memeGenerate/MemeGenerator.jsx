import { useState, useContext } from 'react';
import MemeForm from '../memeForm/MemeForm.jsx';
import MemePreview from '../memePreview/MemePreview.jsx';
import { useCreateMeme } from '../../api/memeApi.js';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext.js';

export default function MemeGenerator() {
  const [imageUrl, setImageUrl] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [textSize, setTextSize] = useState(30);
  const [topTextColor, setTopTextColor] = useState('#000000');
  const [bottomTextColor, setBottomTextColor] = useState('#000000');
  const { objectId } = useContext(UserContext);
  const { create } = useCreateMeme();
  const navigate = useNavigate();

  const handleAction = async (formData) => {
    const memeData = Object.fromEntries(formData);

    const result =  await create({ ...memeData, textSize }, objectId);

    if (!result) {
      return null;
    }

    navigate('/catalog');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "imageUrl") {
      setImageUrl(value)
    };

    if (name === "topText") {
      setTopText(value)
    };

    if (name === "bottomText") {
      setBottomText(value)
    };
  };

  return (
    <div className="meme-generator-container">
      {/* imageUrl, memeRef, textSize, topText, topTextColor, bottomText, bottomTextColor */}
      <MemeForm handleAction={handleAction} toptext={topText} handleInputChange={handleInputChange} imageUrl={imageUrl} topTextColor={topTextColor} bottomText={bottomText} bottomTextColor={bottomTextColor} textSize={textSize} setTextSize={setTextSize} setBottomTextColor={setBottomTextColor} setTopTextColor={setTopTextColor} />
      <MemePreview imageUrl={imageUrl} textSize={textSize} topText={topText} topTextColor={topTextColor} bottomText={bottomText} bottomTextColor={bottomTextColor} />
    </div>
  );
};



