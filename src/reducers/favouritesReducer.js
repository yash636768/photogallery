export const initialState = JSON.parse(localStorage.getItem('favourites')) || [];

export const favouritesReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      if (state.includes(action.payload)) {
        newState = state.filter(id => id !== action.payload);
      } else {
        newState = [...state, action.payload];
      }
      break;
    default:
      return state;
  }
  
  localStorage.setItem('favourites', JSON.stringify(newState));
  return newState;
};
