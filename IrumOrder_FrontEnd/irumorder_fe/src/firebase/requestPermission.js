import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

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

const requestPermission = async () => {
  try {
    console.log("푸시 알림 권한 요청 중...");

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");

      const token = await getToken(messaging, {
        vapidKey: "BJBmmxpN8SblmPzO89aVwQEwSgvUXmfCzFbC17DLaUHKLzyfimDoopzSVejqLWDB-WLhJlp3S1SKwjl_DjB83vc",
      });

      if (token) {
        console.log("FCM Token:", token);
        // 서버로 FCM 토큰 전송
        await sendTokenToServer(token);
      } else {
        console.log("푸시 알림 토큰을 가져오지 못했습니다.");
      }
    } else {
      console.log("알림 권한이 거부되었습니다.");
    }
  } catch (error) {
    console.error("푸시 알림 권한 요청 중 오류 발생:", error);
  }
};

export default requestPermission;
