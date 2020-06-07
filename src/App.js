import React from 'react';
import './App.css';
const App = () => {
  const matrix = [
    ['0 0', '0 1', '0 2'],
    ['1 0', '1 1', '1 2'],
    ['2 0', '2 1', '2 2'],
  ];
  const [answers, setAnswers] = React.useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [winner, setWinner] = React.useState('');

  let players = ['X', 'O'];
  const checkEqual = (a, b, c) => a === b && b === c && a !== '';
  const checkAnswer = () => {
    //Horizontal Checking
    for (let i = 0; i < 3; i++) {
      if (checkEqual(answers[i][0], answers[i][1], answers[i][2])) {
        setWinner(answers[i][0]);
        console.log('Horizontal');
      }
    }
    //Vertical Checking
    for (let i = 0; i < 3; i++) {
      if (checkEqual(answers[0][i], answers[1][i], answers[2][i])) {
        setWinner(answers[0][i]);
        //console.log('Vertical');
      }
    }
    //Diagonal Checking
    if (checkEqual(answers[0][0], answers[1][1], answers[2][2])) {
      setWinner(answers[0][0]);
      //console.log('Diagonal Left');
    }

    if (checkEqual(answers[0][2], answers[1][1], answers[2][0])) {
      setWinner(answers[0][2]);
      //console.log('Diagonal Right');
    }
  };

  const nextTurn = () => {
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  const checked = (event, ins) => {
    const index = ins.split(' ');
    let mutate = [...answers];
    mutate[parseInt(index[0])][parseInt(index[1])] = players[currentPlayer];
    setAnswers(mutate);
    event.target.setAttribute('style', 'pointer-events: none;');
    event.target.innerHTML = players[currentPlayer];
    checkAnswer();
    nextTurn();
  };
  const outp = matrix.map((rows, index) => {
    return (
      <tr>
        {[0, 1, 2].map((columns, index) => (
          <td
            onClick={(event, ins = rows[index]) =>
              checked(event, (ins = rows[index]))
            }
          >
            &nbsp;
          </td>
        ))}
      </tr>
    );
  });

  return (
    <div className='mainBox'>
      <table>
        <tbody>{outp}</tbody>
      </table>
      <h1>{players[currentPlayer]} Turns</h1>
      {winner !== '' ? <h2>Winner Is {winner}</h2> : ''}
      {winner === '' && [...answers].flat().every((elem) => elem !== '') ? (
        <h1>Its a tie</h1>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
