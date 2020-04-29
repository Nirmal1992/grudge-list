export const ADD_GRUDGE = 'ADD_GRUDGE';
export const TOOGLE_GRUDGE = 'TOOGLE_GRUDGE';

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

export default reducer;
