import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import DayOne from "./pages/day-one/DayOne";
import DayTwo from "./pages/day-two/DayTwo";
import DayThree from "./pages/day-three/DayThree";

const routes = [
  { path: "/", element: <Home />, name: "Home" },
  { path: "/day-one", element: <DayOne />, name: "Day One" },
  { path: "/day-two", element: <DayTwo />, name: "Day Two" },
  { path: "/day-three", element: <DayThree />, name: "Day Three" },
];

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {routes
          .filter((route) => route.path !== "/")
          .map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
