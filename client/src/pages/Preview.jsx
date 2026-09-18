import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Preview.css";

import bg from "../assets/images/picchi bg.png";
import picchiLogo from "../assets/logo/sub-logo.png";
import DownloadButton from "../components/Download";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();

  const photos = location.state?.photos || [];

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

        {/* PHOTO STRIP */}
        <div className="photobooth-strip">

          {/* FOUR PHOTOS */}
          <div className="photos-container">
            {photos.map((photo, index) => (
              <div className="strip-photo" key={index}>
                {photo && (
                  <img
                    src={photo}
                    alt={`Captured photo ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* BOTTOM LOGO AREA */}
          <div className="strip-footer">
            <img
              src={picchiLogo}
              alt="PicChi"
              className="picchi-logo"
            />
          </div>

        </div>

        {/* ACTION BUTTONS */}
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
          />
        </div>

      </div>
    </main>
  );
}

export default Preview;