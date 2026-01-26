import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <Link to={"/game"}>
        <button>Start game</button>
      </Link>
    </>
  );
}
