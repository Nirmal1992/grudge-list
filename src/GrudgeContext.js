import React, { createContext, useCallback } from 'react';
import id from 'uuid/v4';
import initialState from './initialState';
import useUndoReducer, { UNDO, REDO } from './useUndoReducer';
import grudgeReducer, { ADD_GRUDGE, TOOGLE_GRUDGE } from './reducer';

export const GrudgeContextState = createContext();
export const GrudgeContextDispatch = createContext();

export function GrudeProvider({ children }) {
  const [grudges, dispatch] = useUndoReducer(grudgeReducer, initialState);

  return (
    <GrudgeContextState.Provider value={grudges}>
      <GrudgeContextDispatch.Provider value={dispatch}>
        {children}
      </GrudgeContextDispatch.Provider>
    </GrudgeContextState.Provider>
  );
}

export function useAddGrudge() {
  const dispatch = React.useContext(GrudgeContextDispatch);
  return useCallback(
    ({ person, reason }) =>
      dispatch({
        type: ADD_GRUDGE,
        payload: {
          person,
          reason,
          id: id(),
          forgiven: false
        }
      }),
    [dispatch]
  );
}

export function useToggleForgiveness() {
  const dispatch = React.useContext(GrudgeContextDispatch);
  return id => {
    dispatch({
      type: 'TOOGLE_GRUDGE',
      id
    });
  };
}

export function useGrudges() {
  const context = React.useContext(GrudgeContextState);
  if (context === undefined) {
    throw new Error('empty context');
  }
  return context;
}

export function useUndo() {
  const dispatch = React.useContext(GrudgeContextDispatch);
  return useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);
}

export function useRedo() {
  const dispatch = React.useContext(GrudgeContextDispatch);
  return useCallback(() => {
    dispatch({ type: REDO });
  }, [dispatch]);
}
