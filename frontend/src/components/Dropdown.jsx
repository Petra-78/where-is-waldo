import { useLayoutEffect, useRef, useState, useContext } from "react";
import placeholder from "/placeholder.png";
import { toast, Slide } from "react-toastify";
import { validateCharacter } from "../api.js";
import { GameContext } from "../context/gameContext.jsx";
import "./Dropdown.css";

export default function Dropdown({
  coordinates,
  characters,
  setCharacters,
  setMarkers,
}) {
  const { gameId } = useContext(GameContext);

  const dropdownRef = useRef(null);
  const [style, setStyle] = useState({});

  useLayoutEffect(() => {
    const dropdown = dropdownRef.current;
    const wrapper = dropdown.parentElement;

    if (!dropdown || !wrapper) return;

    const dropdownRect = dropdown.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const margin = 12; // distance between target and dropdown
    const nextStyle = {};

    const spaceRight = window.innerWidth - wrapperRect.right;
    const spaceLeft = wrapperRect.left;
    const spaceBottom = window.innerHeight - wrapperRect.bottom;
    const spaceTop = wrapperRect.top;

    // Horizontal placement
    if (spaceRight >= dropdownRect.width + margin) {
      nextStyle.left = `${wrapperRect.width + margin}px`; // always offset by target width
      nextStyle.right = "auto";
    } else if (spaceLeft >= dropdownRect.width + margin) {
      nextStyle.right = `${wrapperRect.width + margin}px`;
      nextStyle.left = "auto";
    } else {
      // center if not enough space
      nextStyle.left = "50%";
      nextStyle.transform = "translateX(-50%)";
    }

    // Vertical placement
    if (spaceBottom >= dropdownRect.height + margin) {
      nextStyle.top = "100%";
      nextStyle.bottom = "auto";
    } else if (spaceTop >= dropdownRect.height + margin) {
      nextStyle.bottom = "100%";
      nextStyle.top = "auto";
    } else {
      nextStyle.top = `${margin}px`;
      nextStyle.bottom = "auto";
    }

    setStyle(nextStyle);
  }, []);

  async function handleChoice(character) {
    const validate = await validateCharacter(
      gameId,
      character.name,
      coordinates.x,
      coordinates.y,
    );

    if (validate.correct) {
      setCharacters((prev) => prev.filter((c) => c.name !== character.name));
      setMarkers((prev) => [
        ...prev,
        { x: coordinates.x, y: coordinates.y, name: character.name },
      ]);

      toast.success("Yay you got it!", {
        position: "top-center",
        transition: Slide,
      });
    } else {
      toast.error("Nope, try again!", {
        position: "top-center",
        transition: Slide,
      });
    }
  }

  return (
    <ul ref={dropdownRef} className="dropdown" style={style}>
      {characters.map((character, index) => (
        <li key={index}>
          <button onClick={() => handleChoice(character)}>
            <img
              src={`/characters/${character.name}.png`}
              onError={(e) => (e.currentTarget.src = placeholder)}
              alt={character.name}
            />
            {character.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
