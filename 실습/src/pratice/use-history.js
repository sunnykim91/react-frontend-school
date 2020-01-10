import React, { useReducer, useCallback } from 'react';
const initialState = {
  past: [],
  present: null,
  future: []
};

const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'SET':
      return {
        past: [...past, present],
        present: action.newPresent,
        future: []
      };
    case 'CLEAR':
      return {
        ...initialState,
        present: action.initalPresent
      };
    case 'UNDO':
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future]
      };
    case 'REDO':
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1)
      };
  }
};

const useHistory = initalPresent => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initalPresent
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const set = useCallback(
    newPresent => {
      dispatch({ type: 'SET', newPresent });
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR', initalPresent });
  }, [dispatch]);

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);

  return { state: state.present, set, clear, undo, redo, canRedo, canUndo };
};

export default useHistory;
