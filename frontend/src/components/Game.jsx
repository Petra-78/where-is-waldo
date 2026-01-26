import { useRef, useState } from "react";
import image from "/where-is-waldo.jpeg";

export default function Game() {
  const [coordinates, setCoordinates] = useState([]);
  const imageRef = useRef(null);

  function handleImageClick(e) {
    const rect = imageRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    console.log("Normalized coords:", x, y);
    setCoordinates([x, y]);
  }

  return (
    <div>
      <img
        ref={imageRef}
        src={image}
        alt="Where is Waldo"
        onClick={handleImageClick}
        style={{ width: "100%", maxWidth: "900px", cursor: "crosshair" }}
      />
    </div>
  );
}
