import React from 'react';
import ReactDOM from 'react-dom';
import useUndo from './use-history';
import './styles.scss';

function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useUndo({});

  return (
    <div className='container'>
      <div className='controls'>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>

      <div className='grid'>
        {((blocks, i, len) => {
          while (++i <= len) {
            const index = i;
            blocks.push(
              <div
                className={'block' + (state[index] ? ' active' : '')}
                onClick={() => set({ ...state, [index]: !state[index] })}
                key={i}
              />
            );
          }
          console.log(blocks);
          return blocks;
        })([], 0, 625)}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
