export default function saveMeme(meme, errorHandler) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    if (!meme.imageUrl) {
        return;
    }

    img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        if (document.fonts && document.fonts.ready) {
            try {
                await document.fonts.ready;
            } catch (e) {
                
            }
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";

        const centerX = img.width / 2;
        const padding = 10;
        const maxWidth = img.width - padding * 2;
        const fontSize = Number(meme.textSize) || 40;
        ctx.font = `${fontSize}px Arial`;

        const drawMultiline = (text, startY, align = "top", fillStyle = "white") => {
            if (!text) return 0;
            const words = text.split(/\s+/);
            const lines = [];
            let line = "";
            words.forEach((word) => {
                const test = line ? `${line} ${word}` : word;
                const measure = ctx.measureText(test).width;
                if (measure > maxWidth && line) {
                    lines.push(line);
                    line = word;
                } else {
                    line = test;
                }
            });
            if (line) lines.push(line);

            const lineHeight = fontSize * 1.1;
            let y = startY;
            if (align === "bottom") {
                y = startY - lines.length * lineHeight;
            }

            ctx.fillStyle = fillStyle;
            lines.forEach((l) => {
                ctx.strokeText(l, centerX, y);
                ctx.fillText(l, centerX, y);
                y += lineHeight;
            });

            return lines.length * lineHeight;
        };

        drawMultiline(meme.topText, padding, "top", meme.topTextColor || "white");


        drawMultiline(meme.bottomText, img.height - padding, "bottom", meme.bottomTextColor || "white");

        const link = document.createElement("a");
        link.download = "meme.png";
        try {
            link.href = canvas.toDataURL("image/png");
        } catch (err) {
            if (typeof errorHandler === "function") {
                errorHandler("The picture can not be saved, because it is protected by the author or blocked by CORS.");
            }
            return;
        }
        link.click();
    };

    img.src = meme.imageUrl;

    img.onerror = (error) => {
        errorHandler("The picture can not be saved, because is protected by the author!");
        return error;
    };
}
