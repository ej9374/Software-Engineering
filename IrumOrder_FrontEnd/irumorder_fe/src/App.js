import React, { useState, useEffect} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CheckView from './components/CheckView/CheckView';
import PayView from './components/PayView/PayView';
import CartView from './components/CartView/CartView';
import MenuView from "./components/MenuView/MenuView";
import OptionView from "./components/OptionView/OptionView";
import StoreSelection from "./components/StoreSelection/StoreSelection";
import { RoutineProvider } from "./context/RoutineContext";
import Main from "./routes/Main";
import PastOrder from "./routes/order received/PastOrder";
import RoutineDetail from "./routes/routine/RoutineDetail";
import RoutineListWrapper from "./routes/routine/RoutineList";
import Login from "./routes/user management/Login";
import Signup from "./routes/user registration/Signup";
import SignupComplete from "./routes/user registration/SignupComplete";
import SignupStart from "./routes/user registration/SignupStart";
import PickupReserv from "./routes/payment/PickupReserv";
import Paymentcomplete from './routes/Paymentcomplete';
import { setUserId } from "./context/userStorage";

const App = () => {
  const [options, setOptions] = useState({
    userId : 1, //그냥 고정값으로 함
    Price : 0,//프라이스 장바구니 페이지에서 수정, 샷추가도 넣어야함 

    menuId : null, //이거 구조수정해야함
    name : "",
    quantity : 1,
    menuOptions: {
        useCup : "",
        addShot: false, 
        addVanilla: false,
        addHazelnut: false,
        light: false,
    }    
});
useEffect(() => {
  console.log("App.js - Current userId:", options.userId); // 로그로 확인
}, [options.userId]);

  const [selectedStore, setSelectedStore] = useState(null);
  const nav = useNavigate(); // 페이지 이동을 위해 useNavigate 사용

  // 메뉴 화면으로 이동
  const handleStartMenu = (store) => {
    if (!store) {
      console.error("Error: Store 값이 유효하지 않습니다.");
      return;
  }
    setSelectedStore(store);
    nav(`/store/${store}`);
  };

  const handleOption = (menuId) => {
    const userId = options.userId;
    console.log("handleOption called with userId:", userId, "and menuId:", menuId); // 로그 추가
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
      userId :prevOptions.userId,
      menuId: menuId, // 선택한 menuId를 options에 저장
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


    const userId = options.userId;

    // URL에 userId 포함하여 이동
    nav(`/store/${selectedStore}/cart/${userId}`, { 
      state: { options, fromOptionUnder: true }, replace: true 
  });

  // 옵션 초기화
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
useEffect(() => {
  console.log("현재 선택된 Store:", selectedStore);
}, [selectedStore]);


  return (
    <RoutineProvider>
      <Routes>
        {/* 기존 라우트 */}
        <Route path="/" element={<Login />} />
        <Route path="/signupstart" element={<SignupStart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupcomplete" element={<SignupComplete />} />
        <Route path="/main" element={<Main />} />
        <Route path="/routinelist" element={<RoutineListWrapper/>} />
        <Route path="/past-order" element={<PastOrder />} />
        <Route path="/routine/:id" element={<RoutineDetail />} />
        <Route path="/routine/new" element={<RoutineDetail />} />

        {/* 추가 라우트 */}
        <Route path="/store" element={<StoreSelection onStartMenu={handleStartMenu} />} />
        <Route path="/store/:store" element={<MenuView userId={options.userId} onSelectedStore={selectedStore} onStartOption={handleOption} />} />
        <Route path="/store/:store/option/:menuId" element={<OptionView onSelectedStore={selectedStore} options={options} setOptions={setOptions} onStartCart = {handleStartCart}/>} />
        <Route path="/store/:store/cart/:userId" element={<CartView onSelectedStore={selectedStore} options={options} />}/>
        <Route path="/timeReservation" element={<PickupReserv/>}/>
        <Route path="/pay" element={<PayView onSelectedStore={selectedStore} />}/>
        <Route path="/check" element={<CheckView userId={options.userId}/>}/>
        <Route path="/paymentcomplete" element={<Paymentcomplete/>}/>
      </Routes>
    </RoutineProvider>
  );
};

export default App;

