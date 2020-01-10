import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useHistory from './use-history';
import './style.scss';

function App() {
  const { state, set, clear, undo, redo, canUndo, canRedo } = useHistory({});

  return (
    <div className='container'>
      <div className='controls'>
        <button onClick={undo} disabled={canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>
      <div className='grid'>
        {((blocks, i, len) => {
          while (i < len) {
            const index = i;
            blocks.push(
              <div
                key={i}
                className={'block' + (state[index] ? ' active' : '')}
                onClick={() => set({ ...state, [index]: !state[index] })}
              />
            );
            i++;
          }
          return blocks;
        })([], 0, 625)}
      </div>
    </div>
  );
}

export default App;
