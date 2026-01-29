import placeholder from "/placeholder.png";
import { toast, Slide } from "react-toastify";
import { validateCharacter } from "../api.js";
import { useContext } from "react";
import { GameContext } from "../context/gameContext.jsx";

export default function Dropdown({ coordinates }) {
  const { gameId } = useContext(GameContext);
  const characters = [
    {
      name: "Mary",
      coordinates: { xMin: 0.24, xMax: 0.27, yMin: 0.05, yMax: 0.08 },
    },
    {
      name: "Bob",
      coordinates: { xMin: 0.36, xMax: 0.39, yMin: 0.04, yMax: 0.07 },
    },
    {
      name: "Stewart",
      coordinates: { xMin: 0.35, xMax: 0.38, yMin: 0.14, yMax: 0.18 },
    },
  ];

  async function handleChoice(character) {
    const validate = await validateCharacter(
      gameId,
      character.name,
      coordinates.x,
      coordinates.y,
    );
    debugger;
    if (validate.correct) {
      console.log("yay");
      toast.success("Yay you got it!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } else {
      toast.error("Nope, try again!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      console.log("nay");
    }
  }

  return (
    <>
      <ul
        className="dropdown"
        style={{ padding: "0", margin: "0", transform: "translate(-10%, -0%)" }}
      >
        {characters.map((character, index) => (
          <li key={index}>
            <button onClick={() => handleChoice(character)}>
              <img
                src={`/characters/${character.name}.png`}
                onError={(e) => {
                  e.currentTarget.src = placeholder;
                }}
                alt={character.name}
              />
              {character.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
