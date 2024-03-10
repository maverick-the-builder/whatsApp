import React, { useState, useRef } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";

function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    // Handle click on option
    console.log("Clicked on:", option);
    // You can add more specific actions for each option here
  };

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const closeCamera = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.srcObject) {
      videoElement.srcObject.getVideoTracks().forEach((track) => track.stop());
    }
  };

  const toggleCamera = () => {
    if (showCamera) {
      setShowCamera(false);
      closeCamera();
    } else {
      setShowCamera(true);
      openCamera();
    }
  };

  const takePhoto = () => {
    const videoElement = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageSrc);
    setShowCamera(false); // Hide the camera preview after capturing
    closeCamera(); // Turn off the camera
  };

  return (
    <nav className="whatsapp-navbar">
      <div className="navbar-header">
        <span className="whatsapp-header">WhatsApp</span>
        <div className="navbar-icons">
          <FaCamera aria-label="camera" onClick={toggleCamera} />
          <FaSearch aria-label="Search" />
          <CiMenuKebab aria-label="Menu" onClick={toggleDropdown} />
          {showDropdown && (
            <div className="dropdown">
              <ul>
                <li onClick={() => handleOptionClick("New group")}>
                  New group
                </li>
                <li onClick={() => handleOptionClick("New broadcast")}>
                  New broadcast
                </li>
                <li onClick={() => handleOptionClick("Starred messages")}>
                  Starred messages
                </li>
                <li onClick={() => handleOptionClick("Select Chats")}>
                  Select Chats
                </li>
                <li onClick={() => handleOptionClick("Settings")}>Settings</li>
                <li onClick={() => handleOptionClick("Log out")}>Log out</li>
              </ul>
              <hr />
              <span>Get WhatsApp for Windows</span>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-secondary">
        <div className="navbar-secondary-icon">
          <ul className="navbar-links">
            <li>
              <a href="#chats">Chats</a>
            </li>
            <li>
              <a href="#status">Status</a>
            </li>
            <li>
              <a href="#calls">Calls</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="camera-preview-container">
        {showCamera ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="camera-preview"
          ></video>
        ) : capturedImage ? (
          <img src={capturedImage} alt="Captured" className="captured-image" />
        ) : (
          ""
        )}
        {showCamera && <button onClick={takePhoto}>Take Photo</button>}
      </div>
    </nav>
  );
}

export default App;
