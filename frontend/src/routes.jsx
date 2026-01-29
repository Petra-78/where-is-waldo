import Home from "./pages/Home";
import App from "./App";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/game", element: <Game /> },
      { path: "/leaderboard", element: <Leaderboard /> },
    ],
  },
];

export default routes;
