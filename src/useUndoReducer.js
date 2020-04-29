import { useReducer } from 'react';
export const UNDO = 'UNDO';
export const REDO = 'REDO';

const useUndoReducer = (reducer, initialState) => {
  const undoInitialState = {
    past: [],
    present: initialState,
    future: []
  };

  const undoReducer = (state, action) => {
    const newPresent = reducer(state.present, action);

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past;
      const newFuture = [state.present, ...state.future];
      return {
        past: newPast,
        present: newPresent,
        future: newFuture
      };
    }

    if (action.type === REDO) {
      const [newPresent, ...newFuture] = state.future;
      const newPast = [state.present, ...state.past];
      return {
        past: newPast,
        present: newPresent,
        future: newFuture
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [...state.future]
    };
  };

  return useReducer(undoReducer, undoInitialState);
};

export default useUndoReducer;
