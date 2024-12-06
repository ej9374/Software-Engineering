import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <RoutineProvider>
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
    </RoutineProvider>
  );
}

export default App;