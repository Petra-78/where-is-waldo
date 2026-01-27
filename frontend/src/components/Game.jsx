import { useRef, useState } from "react";
import image from "/where-is-waldo.jpeg";
import Target from "./Target";

export default function Game() {
  const [coordinates, setCoordinates] = useState(null);
  const [showTargetBox, setShowTargetBox] = useState(false);
  const imageRef = useRef(null);

  function handleImageClick(e) {
    const rect = imageRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    console.log("Normalized coords:", x, y);
    setCoordinates({ x, y });
    setShowTargetBox(!showTargetBox);
  }

  return (
    <div
      className="main"
      onClick={() => {
        setShowTargetBox(!showTargetBox);
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: "90%",
        }}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Where is Waldo"
          onClick={handleImageClick}
          style={{
            width: "100%",
            display: "block",
            cursor: "crosshair",
            zIndex: "999",
          }}
        />
        {showTargetBox && coordinates && (
          <Target x={coordinates.x} y={coordinates.y} />
        )}
      </div>
    </div>
  );
}
