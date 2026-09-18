import { useRef } from "react";

function DownloadButton({ photos, logo }) {
  const canvasRef = useRef(null);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 2 x 6 photobooth ratio
    canvas.width = 1200;
    canvas.height = 3600;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = 40;
    const gap = 20;
    const footerHeight = 220;

    const photoWidth = canvas.width - padding * 2;
    const photoAreaHeight =
      canvas.height - padding * 2 - footerHeight;

    const photoHeight =
      (photoAreaHeight - gap * 3) / 4;

    // Load image helper
    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = reject;

        img.src = src;
      });

    // Draw photos
    for (let i = 0; i < 4; i++) {
      if (!photos[i]) continue;

      const img = await loadImage(photos[i]);

      const x = padding;
      const y =
        padding + i * (photoHeight + gap);

      const imageRatio = img.width / img.height;
      const containerRatio = photoWidth / photoHeight;

      let sourceWidth;
      let sourceHeight;
      let sourceX;
      let sourceY;

      if (imageRatio > containerRatio) {
        sourceHeight = img.height;
        sourceWidth = img.height * containerRatio;

        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
      } else {
        sourceWidth = img.width;
        sourceHeight = img.width / containerRatio;

        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
      }

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        photoWidth,
        photoHeight
      );
    }

    // Draw logo
    if (logo) {
      const logoImg = await loadImage(logo);

      const logoWidth = 150;
      const logoHeight =
        (logoImg.height / logoImg.width) *
        logoWidth;

      const logoX =
        canvas.width -
        padding -
        logoWidth;

      const logoY =
        canvas.height -
        padding -
        logoHeight;

      ctx.drawImage(
        logoImg,
        logoX,
        logoY,
        logoWidth,
        logoHeight
      );
    }

    // Download as JPEG
    const jpeg = canvas.toDataURL(
      "image/jpeg",
      0.95
    );

    const link = document.createElement("a");

    link.href = jpeg;
    link.download = "picchi-photobooth-strip.jpg";

    link.click();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      <button
        className="download-btn"
        onClick={handleDownload}
      >
        DOWNLOAD
      </button>
    </>
  );
}

export default DownloadButton;