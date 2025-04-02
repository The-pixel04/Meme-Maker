export default function saveMeme(meme, errorHandler) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    if (!meme.imageUrl) {
        return;
    }
    img.src = meme.imageUrl;

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        ctx.font = `${meme.textSize}px Arial`;
        ctx.textAlign = 'center';

        // Draw top text
        ctx.fillStyle = meme.topTextColor;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillText(meme.topText, img.width / 2, meme.textSize + 10);
        ctx.strokeText(meme.topText, img.width / 2, meme.textSize + 10);

        // Draw bottom text
        ctx.fillStyle = meme.bottomTextColor;
        ctx.fillText(meme.bottomText, img.width / 2, img.height - 10);
        ctx.strokeText(meme.bottomText, img.width / 2, img.height - 10);

        // Create a download link
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    img.onerror = (error) => {
       errorHandler('The picture can not be saved, because is protected by the author!')
        return error;
    }
}