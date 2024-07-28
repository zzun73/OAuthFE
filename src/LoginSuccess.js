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
        alert("Failed to refresh access token");
      });
  }, [navigate, setIsLoggedIn]);

  return (
    <div>
      <h1>Login Successful</h1>
      <button onClick={fetchSecureData}>Fetch Secure Data</button>
    </div>
  );
};

export default LoginSuccess;

// import React, { useEffect } from "react";
// import axios from "axios";

// const fetchSecureData = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   axios
//     .get("http://localhost:8080/my", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       withCredentials: true,
//     })
//     .then((res) => {
//       alert(JSON.stringify(res.data));
//     })
//     .catch((error) => {
//       alert(error);
//     });
// };

// const LoginSuccess = () => {
//   useEffect(() => {
//     axios
//       .post("http://localhost:8080/auth/refresh", {}, { withCredentials: true })
//       .then((res) => {
//         const accessToken = res.headers["authorization"].split(" ")[1];
//         localStorage.setItem("accessToken", accessToken);
//         alert("Access token stored in local storage");
//       })
//       .catch((error) => {
//         alert("Failed to refr esh access token");
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Login Successful</h1>
//       <button onClick={fetchSecureData}>Fetch Secure Data</button>
//     </div>
//   );
// };

// export default LoginSuccess;
