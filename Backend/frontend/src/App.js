import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./routes/LogIn";
import MainPage from "./routes/MainPage";
import Home from "./routes/Home";
import DataView from "./routes/DataView";
import Stats from "./routes/Stats";
import Profile from "./routes/Profile";
import DataEdit from "./routes/DataEdit";
import UserManagement from "./routes/UserManagement";

function App() {
  const routes = [
    { path: "/", title: "LogIn | DeePlant", component: <LogIn /> },
    { path: "/MainPage", title: "Home | DeePlant", component: <MainPage /> },
    { path: "/home", title: "DataManage | DeePlant", component: <Home /> },
    {
      path: "/dataView/:id",
      title: "DataView | DeePlant",
      component: <DataView />,
    },
    { path: "/stats", title: "Statistics | DeePlant", component: <Stats /> },
    { path: "/profile", title: "Profile | DeePlant", component: <Profile /> },
    {
      path: "/dataEdit/:id",
      title: "DataEdit | DeePlant",
      component: <DataEdit />,
    },
    {
      path: "/UserManagement",
      title: "UserManage | DeePlant",
      component: <UserManagement />,
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                <Helmet>
                  <title>{route.title}</title>
                </Helmet>
                {route.component}
              </>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
