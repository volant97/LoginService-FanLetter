import Layout from "components/Layout";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 라우트 설정, 블락

export default function Router() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          {auth ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : null}
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
