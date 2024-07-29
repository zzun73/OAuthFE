import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchSecureData = () => {
  const accessToken = localStorage.getItem("accessToken");
  axios
    .get("http://localhost:8080/my", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      alert(JSON.stringify(res.data));
    })
    .catch((error) => {
      alert(error);
    });
};

const onLogout = (setIsLoggedIn) => {
  const accessToken = localStorage.getItem("accessToken");

  axios
    .post(
      "http://localhost:8080/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("Logout response status:", response.status);

      if (response.status === 200) {
        // 로컬스토리지에서 액세스 토큰 삭제
        localStorage.removeItem("accessToken");

        alert("로그아웃 성공");
        // setIsLoggedIn(false);

        console.log("Redirecting to home page...");
        window.location.replace("/");
      } else {
        console.error("Unexpected response status:", response.status);
        alert("로그아웃 실패");
      }
    })
    .catch((error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    });
};

const LoginSuccess = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:8080/auth/refresh", {}, { withCredentials: true })
      .then((res) => {
        const accessToken = res.headers["authorization"].split(" ")[1];
        localStorage.setItem("accessToken", accessToken);
        alert("Access token stored in local storage");
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to refresh access token");
      });
  }, [navigate, setIsLoggedIn]);

  return (
    <div>
      <h1>Login Successful</h1>
      <button onClick={fetchSecureData}>Fetch Secure Data</button>
      <button onClick={() => onLogout(setIsLoggedIn)}>Logout</button>
    </div>
  );
};

export default LoginSuccess;
