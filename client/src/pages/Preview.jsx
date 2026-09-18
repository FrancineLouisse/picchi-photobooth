import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/Preview.css";

import bg from "../assets/images/picchi bg.png";
import picchiLogo from "../assets/logo/sub-logo.png";

import Editor from "../components/Editor/Editor";
import DownloadButton from "../components/Download";

import flowers from "../assets/stickers/flowers.png";
import heart from "../assets/stickers/heart.png";
import retro from "../assets/stickers/retro.png";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();

  const photos = location.state?.photos || [];

  const [selectedColor, setSelectedColor] =
    useState("#FFFFFF");

  const [selectedFilter, setSelectedFilter] =
    useState("none");

  const [selectedSticker, setSelectedSticker] =
    useState("none");

  const stickerImages = {
    none: null,
    flowers,
    heart,
    retro,
  };

  return (
    <main
      className="preview-page"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="preview-content">

        <h1 className="preview-title">
          Your <span>PicChi</span> Strip!
        </h1>

        <div className="preview-editor-layout">

          {/* PHOTO STRIP */}
          <div
            className="photobooth-strip"
            style={{
              backgroundColor: selectedColor,
            }}
          >

            <div className="photos-container">

              {photos.map((photo, index) => (
                <div
                  className={`strip-photo filter-${selectedFilter}`}
                  key={index}
                >
                  {photo && (
                    <img
                      src={photo}
                      alt={`Captured photo ${index + 1}`}
                    />
                  )}
                </div>
              ))}

            </div>

            {/* STICKER OVERLAY */}
            {stickerImages[selectedSticker] && (
              <img
                src={stickerImages[selectedSticker]}
                alt=""
                className="strip-sticker"
              />
            )}

            {/* LOGO */}
            <div className="strip-footer">

              <img
                src={picchiLogo}
                alt="PicChi"
                className="picchi-logo"
              />

            </div>

          </div>

          {/* EDITOR */}
          <Editor
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedSticker={selectedSticker}
            setSelectedSticker={setSelectedSticker}
          />

        </div>

        {/* ACTIONS */}
        <div className="preview-actions">

          <button
            className="back-btn"
            onClick={() => navigate("/camera")}
          >
            RETAKE
          </button>

          <DownloadButton
            photos={photos}
            logo={picchiLogo}
            selectedColor={selectedColor}
            selectedFilter={selectedFilter}
            selectedSticker={stickerImages[selectedSticker]}
          />

        </div>

      </div>
    </main>
  );
}

export default Preview;