import React, { createContext, Dispatch, useReducer, useContext } from "react";

type FooValue = {
  foo: number;
};

// 인자 즉, defaultValue를 넣지 않으면 에러가 나는데
// defaultValue에 null을 넣게되면 Generics안에 | null을 넣어주면된다.
const FooContext = createContext<FooValue | null>(null);

type Color = "red" | "orange" | "yellow";

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

type Action =
  | { type: "SET_COUNT"; count: number }
  | { type: "SET_TEXT"; text: string }
  | { type: "SET_COLOR"; color: Color }
  | { type: "TOGGLE_GOOD" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COUNT":
      return {
        ...state,
        count: action.count,
      };

    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };

    case "SET_COLOR":
      return {
        ...state,
        color: action.color,
      };

    case "TOGGLE_GOOD":
      return {
        ...state,
        isGood: !state.isGood,
      };
    default:
      throw new Error("Unhandled action type");
  }
}

//context를 만들껀데 context를 더 편하게 사용하기위해
// 상태를 관리하는 context와
// dispatch를 사용하는 context를 만들도록 하겠습니다.

type SampleDispatch = Dispatch<Action>;

// context를 만들때는 제네릭을 설정해주어야 한다.
const SampleStateContext = createContext<State | null>(null);
// const SampleDispatchContext = createContext<SampleDispatch<Action> | null>(null);
const SampleDispatchContext = createContext<Dispatch<Action> | null>(null);

type SampleProviderProps = {
  children: React.ReactNode;
};
export function SampleProvider({ children }: SampleProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: "hello",
    color: "red",
    isGood: true,
  });

  return (
    <SampleStateContext.Provider value={state}>
      <SampleDispatchContext.Provider value={dispatch}>
        {children}
      </SampleDispatchContext.Provider>
    </SampleStateContext.Provider>
  );
}

// state, disaptch를 편하게 사용하기 위해 커스텀 훅 제작
export function useSampleState() {
  const state = useContext(SampleStateContext);
  // 이 코드를 작성한다면 해당 함수가 state or null이 아니라
  // state만 출력되도록 사용할 수 있다.
  // null 을 빼주지 않으면 해당 값이 null 일 수도 있다는 오류가 출력된다.
  if (!state) throw new Error("Cannot find SampleProvier");
  return state;
}

export function useSampleDispatch() {
  const dispatch = useContext(SampleDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvier");
  return dispatch;
}
