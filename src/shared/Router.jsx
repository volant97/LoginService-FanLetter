import Layout from "components/Layout";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {auth ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </>
        ) : null}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
