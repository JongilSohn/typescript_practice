import React from 'react';

type GreetingsProps = {
  name: string,
  mark?: string,

};

const Greetings_Arrow: React.FC<GreetingsProps> = ({name, mark = '!'}) => {
return <div>Hello, {name} {mark}</div>
}

// Greetings.defaultProps = {
//   mark: '!',
// }

export default null;