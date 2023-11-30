import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth === false) {
      navigate("/login");
    }
  }, []);

  return <div>Profile</div>;
}

export default Profile;
