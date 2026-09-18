import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import logo from "../assets/logo/logo.png";
import camera from "../assets/images/camera.png";
import smile from "../assets/images/smiley.png";
import stars from "../assets/images/star.png";
import polaroid from "../assets/images/polaroid.png";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">

      {/* Decorations */}
      <img src={camera} alt="" className="camera float" />
      <img src={smile} alt="" className="smile float" />
      <img src={stars} alt="" className="stars float" />
      <img src={polaroid} alt="" className="polaroid float" />

      <div className="home-content">

        <img
          src={logo}
          alt="PicChi Logo"
          className="logo"
        />

        <h2 className="tagline">
          PHOTOBOOTH
        </h2>
        <h3>by Chin</h3>

        <Button onClick={() => navigate("/camera")}>
          START
        </Button>

      </div>

    </main>
  );
}

export default Home;