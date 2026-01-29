import placeholder from "/placeholder.png";
import { toast, Slide } from "react-toastify";
import { validateCharacter } from "../api.js";
import { useContext } from "react";
import { GameContext } from "../context/gameContext.jsx";

export default function Dropdown({ coordinates, characters, setCharacters }) {
  const { gameId } = useContext(GameContext);

  async function handleChoice(character) {
    const validate = await validateCharacter(
      gameId,
      character.name,
      coordinates.x,
      coordinates.y,
    );

    if (validate.correct) {
      setCharacters((prev) => prev.filter((c) => c.name !== character.name));
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
