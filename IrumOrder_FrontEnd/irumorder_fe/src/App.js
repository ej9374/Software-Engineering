import React, { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Signup from "./routes/user registration/Signup";
import SignupStart from "./routes/user registration/SignupStart";
import SignupComplete from "./routes/user registration/SignupComplete";
import Login from "./routes/user management/Login";
import Main from "./routes/Main";
import Order from "./routes/order received/Order";
import RoutineListWrapper from "./routes/routine/RoutineList";
import PastOrder from "./routes/order received/PastOrder";
import RoutineDetail from "./routes/routine/RoutineDetail";
import { RoutineProvider } from "./context/RoutineContext";
import requestPermission from "./firebase/requestPermission";

function App() {
  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        // 푸시 알림 권한 요청 및 FCM 토큰 가져오기
        const token = await requestPermission();
        if (token) {
          console.log("FCM Token:", token);
          // 서버에 FCM 토큰 전송
          await sendTokenToServer(token);
        }
      } catch (error) {
        console.error("FCM 처리 중 오류 발생:", error);
      }
    };

    fetchFCMToken();
  }, []);

  // FCM 토큰 서버 전송 함수
  const sendTokenToServer = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (response.ok) {
        console.log("FCM 토큰이 서버에 저장되었습니다.");
      } else {
        console.error("FCM 토큰 저장 실패:", response.statusText);
      }
    } catch (error) {
      console.error("FCM 토큰 전송 중 오류 발생:", error);
    }
  };
  

  return (
    <RoutineProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signupstart" element={<SignupStart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupcomplete" element={<SignupComplete />} />
          <Route path="/main" element={<Main />} />
          <Route path="/order" element={<Order />} />
          <Route path="/routinelist" element={<RoutineListWrapper userId={123} />} />
          <Route path="/past-order" element={<PastOrder />} />
          <Route path="/routine/:id" element={<RoutineDetail />} />
          <Route path="/routine/new" element={<RoutineDetail />} />
        </Routes>
      </HashRouter>
    </RoutineProvider>
  );
}

export default App;
