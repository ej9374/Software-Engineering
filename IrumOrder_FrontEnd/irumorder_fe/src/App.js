import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CartView from "./features/cart/CartView";
import CheckView from "./features/check/CheckView";
import Menu from "./features/menu/MenuView";
import OptionView from "./features/option/OptionView";
import Pay from "./features/payment/PayView";
import StoreSelection from "./features/store/StoreSelection";
import { getMenuIn, getRoutineState, setMenuIn } from "./shared/context/OrderOrRoutine";
import { RoutineProvider } from "./shared/context/RoutineContext";
import { getUserId } from "./shared/context/userStorage";
import requestPermission from "./firebase/requestPermission";
import Main from "./shared/ui/Main";
import Paymentcomplete from "./features/payment/Paymentcomplete";
import PickupReserv from "./features/payment/PickupReserv";
import RoutineDetail from "./features/routine/RoutineDetail";
import RoutineListWrapper from "./features/routine/RoutineList";
import Login from "./features/user/management/Login";
import Signup from "./features/user/registration/Signup";
import SignupComplete from "./features/user/registration/SignupComplete";
import SignupStart from "./features/user/registration/SignupStart";

const App = () => {
  const nav = useNavigate();

  // `getUserId`에서 초기 값을 가져오고, 상태로 관리
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchedUserId = getUserId();
    setUserId(fetchedUserId);
    console.log("Fetched userId:", fetchedUserId);
  }, []);

  const [options, setOptions] = useState({
    userId: null, // 초기값 null로 변경
    Price: 0,
    menuId: null,
    name: "",
    quantity: 1,
    menuOptions: {
      useCup: "",
      addShot: false,
      addVanilla: false,
      addHazelnut: false,
      light: false,
    },
  });

  useEffect(() => {
    if (userId !== null) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        userId: userId, // `userId` 상태를 옵션에 반영
      }));
    }
  }, [userId]);

  const [selectedStore, setSelectedStore] = useState(null);

  const handleStartMenu = (store) => {
    if (!store) {
      console.error("Error: Store 값이 유효하지 않습니다.");
      return;
    }
    setMenuIn(0);
    setSelectedStore(store);
    nav(`/store/${store}`);
  };

  const handleOption = (menuId) => {
    if (!selectedStore) {
      console.error("Error: Store is not selected.");
      return;
    }

    if (!menuId) {
      console.error("Error: Menu ID is undefined.");
      return;
    }

    setOptions((prevOptions) => ({
      ...prevOptions,
      userId: userId,
      menuId: menuId,
    }));
    nav(`/store/${selectedStore}/option/${menuId}`);
  };

  const handleStartCart = (options) => {
    if (!selectedStore) {
      console.error("Error: Store is not selected.");
      return;
    }
    if (!options.menuOptions.useCup) {
      alert("컵을 선택해주세요.");
      return;
    }

    const menu_out = getMenuIn();

    if (menu_out === 1) {
      setTimeout(() => {
        nav(`${getRoutineState()}`, { state: { options } });
      }, 0);
    } else if (menu_out === 0) {
      nav(`/store/${selectedStore}/cart/${userId}`, {
        state: { options, fromOptionUnder: true },
        replace: true,
      });
    }

    setOptions({
      userId: userId,
      Price: 0,
      menuId: null,
      name: "",
      quantity: 1,
      menuOptions: {
        useCup: "",
        addShot: false,
        addVanilla: false,
        addHazelnut: false,
        light: false,
      },
    });
  };

  useEffect(() => {
    console.log("Updated userId in options:", options.userId);
  }, [options.userId]);

///
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

useEffect(() => {
  console.log("현재 선택된 Store:", selectedStore);
}, [selectedStore]);


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

////
  return (
    <RoutineProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signupstart" element={<SignupStart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupcomplete" element={<SignupComplete />} />
        <Route path="/main" element={<Main />} />
        <Route path="/routinelist" element={<RoutineListWrapper />} />
        <Route
          path="/routine/:id"
          element={<RoutineDetail setSelectedStore={setSelectedStore} />}
        />
        <Route
          path="/routine/new"
          element={<RoutineDetail setSelectedStore={setSelectedStore} />}
        />
        <Route
          path="/store"
          element={<StoreSelection onStartMenu={handleStartMenu} />}
        />
        <Route
          path="/store/:store"
          element={
            <Menu
              userId={options.userId}
              onSelectedStore={selectedStore}
              onStartOption={handleOption}
            />
          }
        />
        <Route
          path="/store/:store/option/:menuId"
          element={
            <OptionView
              onSelectedStore={selectedStore}
              options={options}
              setOptions={setOptions}
              onStartCart={handleStartCart}
            />
          }
        />
        <Route
          path="/store/:store/cart/:userId"
          element={<CartView onSelectedStore={selectedStore} options={options} />}
        />
        <Route path="/timeReservation" element={<PickupReserv />} />
        <Route path="/pay" element={<Pay onSelectedStore={selectedStore} />} />
        <Route
          path="/check"
          element={<CheckView userId={options.userId} />}
        />
        <Route path="/paymentcomplete" element={<Paymentcomplete />} />
      </Routes>
    </RoutineProvider>
  );
};

export default App;
