import React, { createContext, useState, useEffect } from "react";
import { getUserId } from "./userStorage";

// RoutineContext 생성
const RoutineContext = createContext();

// RoutineProvider 컴포넌트
export const RoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);
  const user_id = getUserId();

  useEffect(() => {
    if (!user_id) {
      console.error("userId가 제공되지 않았습니다.");
      return;
    }

    // API 호출로 루틴 데이터를 가져옵니다.
    const fetchRoutines = async () => {
      try {
        // 사용자별 루틴 데이터 가져오기
        const response = await fetch(`http://localhost:8080/api/users/${user_id}/routines`);
        if (!response.ok) {
          throw new Error(`HTTP 오류: ${response.status}`);
        }
        const data = await response.json();
        setRoutines(data);
      } catch (error) {
        console.error("루틴을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchRoutines();
  }, [user_id]);

  return (
    <RoutineContext.Provider value={{ routines, setRoutines }}>
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineContext;