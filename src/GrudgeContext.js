import React, {
  createContext,
  useReducer,
  useCallback,
  useContext
} from 'react';
import id from 'uuid/v4';
import initialState from './initialState';

export const GrudgeContext = createContext();

export const GrudeProvider = ({ children }) => {
  const ADD_GRUDGE = 'ADD_GRUDGE';
  const TOOGLE_GRUDGE = 'TOOGLE_GRUDGE';

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

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: ADD_GRUDGE,
        payload: {
          person,
          reason,
          id: id(),
          forgiven: false
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    id => {
      dispatch({
        type: TOOGLE_GRUDGE,
        id
      });
    },
    [dispatch]
  );

  const values = {
    addGrudge,
    toggleForgiveness,
    grudges
  };

  return (
    <GrudgeContext.Provider value={values}>{children}</GrudgeContext.Provider>
  );
};
