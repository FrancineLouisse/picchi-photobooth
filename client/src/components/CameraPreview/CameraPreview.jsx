import "./CameraPreview.css";

import { useEffect,useRef,useState } from "react";

function CameraPreview({capture,onCapture}){

    const videoRef=useRef();

    const canvasRef=useRef();

    const [countdown,setCountdown]=useState(null);

    useEffect(()=>{

        async function openCamera(){

            const stream=await navigator.mediaDevices.getUserMedia({

                video:{
                    width:{ideal:1280},
                    height:{ideal:960}
                },

                audio:false

            });

            videoRef.current.srcObject=stream;

        }

        openCamera();

    },[]);

    useEffect(()=>{

        if(!capture) return;

        let value=3;

        setCountdown(value);

        const interval=setInterval(()=>{

            value--;

            if(value>0){

                setCountdown(value);

            }

            else{

                clearInterval(interval);

                setCountdown(null);

                capturePhoto();

            }

        },1000);

    },[capture]);

    function capturePhoto(){

        const canvas=canvasRef.current;

        const video=videoRef.current;

        const ctx=canvas.getContext("2d");

        canvas.width=video.videoWidth;

        canvas.height=video.videoHeight;

        ctx.drawImage(

            video,

            0,

            0,

            canvas.width,

            canvas.height

        );

        const image=canvas.toDataURL("image/png");

        onCapture(image);

    }

    return(

        <div className="camera-preview">

            <video

                ref={videoRef}

                autoPlay

                playsInline

                muted

                className="camera-video"

            />

            {

                countdown &&

                <div className="countdown">

                    {countdown}

                </div>

            }

            <canvas

                ref={canvasRef}

                style={{display:"none"}}

            />

        </div>

    )

}

export default CameraPreview;