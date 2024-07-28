import React, { useState, useEffect } from "react";
import axios from "axios";

const onNaverLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/naver";
};

const onGoogleLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

const onKakaoLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
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
    .then(() => {
      // 로컬스토리지에서 액세스 토큰 삭제
      localStorage.removeItem("accessToken");

      // 쿠키에서 리프레시 토큰 삭제
      document.cookie =
        "RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      alert("로그아웃 성공");
      setIsLoggedIn(false);
    })
    .catch((error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    });
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        {!isLoggedIn ? (
          <>
            <button onClick={onNaverLogin}>Naver Login</button>
            <button onClick={onGoogleLogin}>Google Login</button>
            <button onClick={onKakaoLogin}>Kakao Login</button>
          </>
        ) : (
          <button onClick={() => onLogout(setIsLoggedIn)}>Logout</button>
        )}
      </header>
    </div>
  );
}

export default App;

// import React from "react";

// const onNaverLogin = () => {
//   window.location.href = "http://localhost:8080/oauth2/authorization/naver";
// };

// const onGoogleLogin = () => {
//   window.location.href = "http://localhost:8080/oauth2/authorization/google";
// };

// const onKakaoLogin = () => {
//   window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
// };

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Login</h1>
//         <button onClick={onNaverLogin}>Naver Login</button>
//         <button onClick={onGoogleLogin}>Google Login</button>
//         <button onClick={onKakaoLogin}>Kakao Login</button>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import axios from "axios";

// const onNaverLogin = () => {
//   window.location.href = "http://localhost:8080/oauth2/authorization/naver";
// };

// const onGoogleLogin = () => {
//   window.location.href = "http://localhost:8080/oauth2/authorization/google";
// };

// const onKakaoLogin = () => {
//   window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
// };

// const fetchSecureData = () => {
//   axios
//     .get("http://localhost:8080/", { withCredentials: true })
//     .then((res) => {
//       alert(JSON.stringify(res.data));
//     })
//     .catch((error) => {
//       alert(error);
//     });
// };

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Login</h1>
//         <button onClick={onNaverLogin}>Naver Login</button>
//         <button onClick={onGoogleLogin}>Google Login</button>
//         <button onClick={onKakaoLogin}>Kakao Login</button>
//         <button onClick={fetchSecureData}>Fetch Secure Data</button>
//       </header>
//     </div>
//   );
// }

// export default App;
