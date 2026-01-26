import Home from "./pages/Home";
import App from "./App";
import Game from "./components/Game";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/game", element: <Game /> },
    ],
  },
];

export default routes;
