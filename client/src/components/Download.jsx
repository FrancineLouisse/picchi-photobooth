import { useRef } from "react";

function DownloadButton({
  photos,
  logo,
  selectedColor = "#FFFFFF",
  selectedFilter = "none",
  selectedSticker = null,
}) {
  const canvasRef = useRef(null);

  // Load an image before drawing it onto the canvas
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject(
          new Error(`Could not load image: ${src}`)
        );
      };

      img.src = src;
    });
  };

  // Apply the same filter used in the Preview
  const getFilter = () => {
    switch (selectedFilter) {
      case "mono":
        return "grayscale(1)";

      case "retro":
        return "sepia(0.35) saturate(1.4) contrast(1.05)";

      case "vintage":
        return "sepia(0.25) saturate(0.8) contrast(0.9) brightness(1.05)";

      case "warm":
        return "sepia(0.15) saturate(1.3) brightness(1.05)";

      default:
        return "none";
    }
  };

  // Draw an image using object-fit: cover behavior
  const drawCoverImage = (
    ctx,
    img,
    x,
    y,
    width,
    height
  ) => {
    const imageRatio =
      img.width / img.height;

    const containerRatio =
      width / height;

    let sourceWidth;
    let sourceHeight;
    let sourceX;
    let sourceY;

    if (imageRatio > containerRatio) {
      // Image is wider than the container
      sourceHeight = img.height;
      sourceWidth =
        img.height * containerRatio;

      sourceX =
        (img.width - sourceWidth) / 2;

      sourceY = 0;
    } else {
      // Image is taller than the container
      sourceWidth = img.width;

      sourceHeight =
        img.width / containerRatio;

      sourceX = 0;

      sourceY =
        (img.height - sourceHeight) / 2;
    }

    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x,
      y,
      width,
      height
    );
  };

  const handleDownload = async () => {
    try {
      const canvas = canvasRef.current;

      const ctx =
        canvas.getContext("2d");

      /*
       * ============================
       * CANVAS SIZE
       * ============================
       *
       * 2 x 6 photobooth strip
       *
       * 600 x 1800 pixels
       */

      canvas.width = 600;
      canvas.height = 1800;

      /*
       * ============================
       * STRIP BACKGROUND
       * ============================
       */

      ctx.fillStyle = selectedColor;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /*
       * ============================
       * STRIP DIMENSIONS
       * ============================
       */

      const padding = 20;

      const photoGap = 10;

      const footerHeight = 100;

      const photoWidth =
        canvas.width - padding * 2;

      const photoAreaHeight =
        canvas.height -
        padding * 2 -
        footerHeight;

      const photoHeight =
        (photoAreaHeight -
          photoGap * 3) /
        4;

      /*
       * ============================
       * DRAW FOUR PHOTOS
       * ============================
       */

      for (let i = 0; i < 4; i++) {
        if (!photos || !photos[i]) {
          continue;
        }

        const img =
          await loadImage(photos[i]);

        const x = padding;

        const y =
          padding +
          i *
            (photoHeight + photoGap);

        ctx.save();

        // Apply selected filter
        ctx.filter = getFilter();

        drawCoverImage(
          ctx,
          img,
          x,
          y,
          photoWidth,
          photoHeight
        );

        ctx.restore();
      }

      /*
       * ============================
       * DRAW STICKER
       * ============================
       *
       * Sticker should be a transparent
       * PNG covering the entire strip.
       */

      if (selectedSticker) {
        const sticker =
          await loadImage(
            selectedSticker
          );

        ctx.drawImage(
          sticker,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      /*
       * ============================
       * DRAW PICCHI LOGO
       * ============================
       */

      if (logo) {
        const logoImg =
          await loadImage(logo);

        const logoWidth = 75;

        const logoHeight =
          (logoImg.height /
            logoImg.width) *
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

      /*
       * ============================
       * CONVERT TO JPEG
       * ============================
       */

      const jpeg =
        canvas.toDataURL(
          "image/jpeg",
          0.95
        );

      /*
       * ============================
       * DOWNLOAD
       * ============================
       */

      const link =
        document.createElement("a");

      link.href = jpeg;

      link.download =
        "picchi-photobooth-strip.jpg";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

    } catch (error) {
      console.error(
        "Photobooth download failed:",
        error
      );

      alert(
        "Unable to download the photo strip. Please try again."
      );
    }
  };

  return (
    <>
      {/* Hidden canvas used to create the JPEG */}
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
        }}
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