import "./CameraPreview.css";

import { useEffect, useRef, useState } from "react";
import Countdown from "../Countdown/Countdown";

function CameraPreview({
    isCapturing,
    currentShot,
    onCapture
}) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [countdown, setCountdown] = useState(null);

    /* ---------------- Open Camera ---------------- */

    useEffect(() => {

        let stream;

        async function openCamera() {

            try {

                stream = await navigator.mediaDevices.getUserMedia({

                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 960 },
                        facingMode: "user"
                    },

                    audio: false

                });

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                }

            }

            catch (err) {

                console.error(err);

            }

        }

        openCamera();

        return () => {

            if (stream) {

                stream.getTracks().forEach(track => track.stop());

            }

        }

    }, []);

    /* ---------------- Countdown ---------------- */

    useEffect(() => {

        if (!isCapturing) return;

        let value = 3;

        setCountdown(value);

        const interval = setInterval(() => {

            value--;

            if (value > 0) {

                setCountdown(value);

            }

            else {

                clearInterval(interval);

                setCountdown(null);

                capturePhoto();

            }

        }, 1000);

        return () => clearInterval(interval);

    }, [currentShot, isCapturing]);

    /* ---------------- Capture ---------------- */

    function capturePhoto() {

        const video = videoRef.current;

        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

ctx.save();

ctx.translate(canvas.width, 0);

ctx.scale(-1, 1);

ctx.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
);

ctx.restore();

        const image = canvas.toDataURL("image/png");

        onCapture(image);

    }

    return (

        <div className="camera-preview">

            <video

                ref={videoRef}

                autoPlay

                playsInline

                muted

                className="camera-video"

            />

            {

                countdown !== null &&

                <Countdown number={countdown} />

            }

            <canvas

                ref={canvasRef}

                style={{ display: "none" }}

            />

        </div>

    );

}

export default CameraPreview;