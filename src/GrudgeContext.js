import React, { createContext, useReducer, useCallback } from 'react';
import id from 'uuid/v4';
import initialState from './initialState';

export const GrudgeContextState = createContext();
export const GrudgeContextDispatch = createContext();

const ADD_GRUDGE = 'ADD_GRUDGE';
const TOOGLE_GRUDGE = 'TOOGLE_GRUDGE';

export function GrudeProvider({ children }) {
  const reducer = (state, action) => {
    if (action.type === ADD_GRUDGE) {
      return [action.payload, ...state];
    }
    if (action.type === TOOGLE_GRUDGE) {
      return state.map(grudge => {
        if (grudge.id !== action.id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      });
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
