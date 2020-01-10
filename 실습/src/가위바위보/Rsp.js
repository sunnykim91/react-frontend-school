import React, { useState, useEffect, useRef, useReducer } from 'react';

const reducer = (state, action) => {
  const data = state.history;

  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        history: !data ? [action.newGame] : [...data, action.newGame]
      };
    case 'RESULT':
      let _comWin, _youWin;
      console.log(action.whoWins);
      console.log(state.comWin);
      if (action.whoWins === 'computer') {
        _comWin = state.comWin ? parseInt(state.comWin) + 1 : 1;
        _youWin = state.youWin;
      }
      if (action.whoWins === 'you') {
        _comWin = state.comWin;
        _youWin = state.youWin ? parseInt(state.youWin) + 1 : 1;
      }
      if (action.whoWins === 'draw') {
        _comWin = state.comWin;
        _youWin = state.youWin;
      }
      return {
        ...state,
        comWin: _comWin,
        youWin: _youWin
      };
    case 'RESET':
      return {};
  }
};

const Rsp = () => {
  const [pick, setPick] = useState(null);
  const [mypick, setMypick] = useState(null);
  const [who, setWho] = useState(null);

  const myPickRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, {});

  const runGame = val => {
    const items = ['가위', '바위', '보'];
    const ranIdx = Math.floor(Math.random() * items.length);
    setPick(items[ranIdx]);
    setMypick(val);
  };

  useEffect(() => {
    // pick 컴터 , mypick 내가 누른거
    let whoWins = '';
    if (pick === '가위') {
      if (mypick === '가위') {
        whoWins = 'draw';
      }
      if (mypick === '바위') {
        whoWins = 'you';
      }
      if (mypick === '보') {
        whoWins = 'computer';
      }
    } else if (pick === '바위') {
      if (mypick === '가위') {
        whoWins = 'computer';
      }
      if (mypick === '바위') {
        whoWins = 'draw';
      }
      if (mypick === '보') {
        whoWins = 'you';
      }
    } else {
      if (mypick === '가위') {
        whoWins = 'you';
      }
      if (mypick === '바위') {
        whoWins = 'computer';
      }
      if (mypick === '보') {
        whoWins = 'draw';
      }
    }

    if (whoWins) {
      setWho(whoWins);
      dispatch({
        type: 'ADD',
        newGame: `${whoWins}, 컴 : ${pick}, 나 : ${mypick}`
      });
      dispatch({ type: 'RESULT', whoWins });
    }
  }, [pick, mypick]);

  useEffect(() => {
    console.log(who);
  }, [who]);

  const handleSelectChange = () => {
    const val = myPickRef.current.value;
    runGame(val);
  };

  const { history, comWin, youWin } = state;

  return (
    <div>
      {comWin || 0} : {youWin || 0}
      <select ref={myPickRef} onChange={handleSelectChange}>
        <option value='가위'>가위</option>
        <option value='바위'>바위</option>
        <option value='보'>보</option>
      </select>
      <button onClick={() => dispatch({ type: 'RESET' })}>초기화</button>
      {history && history.map((h, index) => <h2 key={index}>{h}</h2>)}
    </div>
  );
};

export default Rsp;
