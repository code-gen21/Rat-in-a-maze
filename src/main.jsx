import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AvailablePaths from "./components/AvailablePaths";
import "./index.css";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/availablePaths",
    element: <AvailablePaths />,
    errorElement: <Error />,
  },
]);

const root = createRoot(document.querySelector("#root"));

// root.render(<App />)

root.render(<RouterProvider router={router} />);
