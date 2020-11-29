import React from 'react';

type GreetingsProps = {
  name: string,
  mark?: string,
  onClick: (name: string) => void,
};

//FC라는 것을 사용해서 children이 탑재되어 있다.
// Greetings. ~ 자동완성 이 되도록 사용할 수 있다.
// 하지만 치명적인 단점은 default props가 먹지 않는다.
// function Greetings_Func: 
function Greetings_Func({name, mark, onClick}: GreetingsProps) {
  const handleClick = () => onClick(name);
  
return (
  <div>Hello, {name} {mark}
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  </div>
  )
}

Greetings_Func.defaultProps = {
  mark: '!',
}

export default Greetings_Func;