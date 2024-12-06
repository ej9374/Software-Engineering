// public/firebase-messaging-sw.js

// Firebase SDK를 CDN에서 가져옴 (CDN은 ES6 모듈이 아닌 스크립트 형식으로 제공됨)
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js");

// Firebase 초기화
firebase.initializeApp({
  apiKey: "AIzaSyCPx0BkCl3LL5_39Tojp217Ol57cWfZzrg",
  authDomain: "irumorder-55e95.firebaseapp.com",
  projectId: "irumorder-55e95",
  storageBucket: "irumorder-55e95.firebasestorage.app",
  messagingSenderId: "392986347225",
  appId: "1:392986347225:web:a156ef96cbf7ffc2c0e0c8",
});

// Firebase Messaging 설정
const messaging = firebase.messaging();

// 백그라운드 메시지 수신 처리
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/firebase-logo.png",
  };

  // 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});
