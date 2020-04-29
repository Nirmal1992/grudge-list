import React, { createContext, useReducer, useCallback } from 'react';
import id from 'uuid/v4';
import initialState from './initialState';

export const GrudgeContextState = createContext();
export const GrudgeContextDispatch = createContext();

const ADD_GRUDGE = 'ADD_GRUDGE';
const TOOGLE_GRUDGE = 'TOOGLE_GRUDGE';
const UNDO = 'UNDO';
const REDO = 'REDO';

export function GrudeProvider({ children }) {
  const reducer = (state, action) => {
    if (action.type === ADD_GRUDGE) {
      const newPresentState = [action.payload, ...state.present];

      return {
        past: [state.present, ...state.past],
        present: newPresentState,
        future: state.future
      };
    }
    if (action.type === TOOGLE_GRUDGE) {
      const newPresentState = state.present.map(grudge => {
        if (grudge.id !== action.id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      });

      return {
        past: [state.present, ...state.past],
        present: newPresentState,
        future: state.future
      };
    }

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
    return state;
  };

  const [grudges, dispatch] = useReducer(reducer, initialState);

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
