import React, { createContext, useContext, useState, ReactNode } from 'react';

// 관리할 상태 타입 정의
interface ModeState {
  mode: string; // 예: '일반모드', '운동모드'
  exerciseType: string; // 예: '윗몸일으키기'
  exerciseCount: number; // 운동 횟수
  exerciseSet: number; // 운동 세트
}

// 기본 값
const defaultState: ModeState = {
  mode: '일반모드',
  exerciseType: '윗몸일으키기',
  exerciseCount: 30,
  exerciseSet: 5,
};

// Context 생성
const ModeContext = createContext<{
  state: ModeState;
  setState: React.Dispatch<React.SetStateAction<ModeState>>;
}>({
  state: defaultState,
  setState: () => {},
});

// Context Provider 컴포넌트
export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModeState>(defaultState);

  return (
    <ModeContext.Provider value={{ state, setState }}>
      {children}
    </ModeContext.Provider>
  );
};

// Custom Hook: 컴포넌트에서 쉽게 상태를 가져올 수 있도록
export const useMode = () => useContext(ModeContext);
