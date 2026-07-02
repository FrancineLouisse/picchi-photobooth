import "../styles/Camera.css";

import { useState } from "react";

import Button from "../components/Button";
import CameraPreview from "../components/CameraPreview/CameraPreview";
import Countdown from "../components/Countdown/Countdown";
import PhotoThumbnail from "../components/PhotoThumbnail/PhotoThumbnail";
import bg from "../assets/images/picchi bg.png"

function Camera() {

    const [photos] = useState([null, null, null, null]);

    return (

        <main
            className="camera-page"
            style={{
                backgroundImage: `url(${bg})`
            }}
        >

            <h1 className="camera-title">

                <span>Say Cheese, </span>

                <span className="pink">

                    Say PicChi!

                </span>

            </h1>

            <section className="camera-container">

                <CameraPreview />

            </section>

            <Button>

                START

            </Button>

            <section className="thumbnail-container">

                {

                    photos.map((photo,index)=>(

                        <PhotoThumbnail
                            key={index}
                            photo={photo}
                        />

                    ))

                }

            </section>

        </main>

    );

}

export default Camera;