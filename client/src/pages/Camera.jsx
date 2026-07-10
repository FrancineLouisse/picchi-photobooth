import "../styles/Camera.css";

import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

import Button from "../components/Button";
import CameraPreview from "../components/CameraPreview/CameraPreview";
import PhotoThumbnail from "../components/PhotoThumbnail/PhotoThumbnail";

import bg from "../assets/images/picchi bg.png";

function Camera() {
const [photos, setPhotos] = useState([null, null, null, null]);

const [isCapturing, setIsCapturing] = useState(false);

const [currentShot, setCurrentShot] = useState(0);

const [captureComplete, setCaptureComplete] = useState(false);

  function startCapture() {

      if (isCapturing) return;

      setPhotos([null, null, null, null]);

      setCurrentShot(0);

      setCaptureComplete(false);

      setIsCapturing(true);

  }

  function handleCapture(image) {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[currentShot] = image;
      return updated;
    });

    // Last photo
    if (currentShot === 3) {

        setIsCapturing(false);

        setCaptureComplete(true);

    }
    else {

        setCurrentShot(prev => prev + 1);

    }
      }

  function redoCapture() {

      setPhotos([null, null, null, null]);

      setCurrentShot(0);

      setCaptureComplete(false);

      setIsCapturing(false);

  }
  return (
    <main
      className="camera-page"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h1 className="camera-title">
        <span>Say Cheese, </span>

        <span className="pink">Say PicChi!</span>
      </h1>

      <section className="camera-container">
        <CameraPreview
          isCapturing={isCapturing}
          currentShot={currentShot}
          onCapture={handleCapture}
        />
      </section>

      {/* <Button
        onClick={startCapture}
        disabled={isCapturing}
      >
        {isCapturing
          ? `Capturing ${currentShot + 1}/4`
          : "START"}
      </Button> */}
      {
      !captureComplete ? (

              <Button
                  onClick={startCapture}
                  disabled={isCapturing}
              >
                  {isCapturing
                      ? `Capturing ${currentShot + 1}/4`
                      : "START"}
              </Button>

          ) : (

              <div className="camera-actions">

                  <Button
                      onClick={() =>
                          navigate("/preview", {
                              state: { photos }
                          })
                      }
                  >
                      GO TO PREVIEW
                  </Button>

                  {/* <button
                      className="redo-btn"
                      onClick={redoCapture}
                      aria-label="Redo"
                  >
                      <FiRefreshCw />
                  </button> */}
                  <button
    className="redo-btn"
    onClick={redoCapture}
>
    ↻
</button>

              </div>

          )
      }

      <section className="thumbnail-container">
        {photos.map((photo, index) => (
          <PhotoThumbnail
            key={index}
            photo={photo}
          />
        ))}
      </section>
    </main>
  );
}

export default Camera;