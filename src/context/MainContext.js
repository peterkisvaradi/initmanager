import createDataContext from './createDataContext';
import { ADD_PARTY, SET_PARTIES, PARTIES_KEY, DELETE_PARTY } from './constants';

const localStorage = window.localStorage;

const saveToStorage = (key, item) => {
  if (localStorage) {
    localStorage.setItem(key, item);
  }
};

const loadFromStorage = (key) => {
  if (localStorage) {
    return localStorage.getItem(key) || '[]';
  }
};

const authReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case SET_PARTIES:
      return { ...state, parties: action.payload };
    case ADD_PARTY:
      newState = {
        ...state,
        parties: [...state.parties, action.payload],
      };
      saveToStorage(PARTIES_KEY, JSON.stringify(newState.parties));
      return newState;
    case DELETE_PARTY:
      console.log('dfsf');
      newState = {
        ...state,
        parties: state.parties.filter((item) => item !== action.payload),
      };
      saveToStorage(PARTIES_KEY, JSON.stringify(newState.parties));
      return newState;
    default:
      return state;
  }
};

const addParty = (dispatch) => (party) => {
  console.log('ADD PARTY ACTION Reducer');
  dispatch({ type: ADD_PARTY, payload: party });
};

const preloadParties = (dispatch) => () => {
  console.log('PRELOAD PARTIES Reducer');
  const preloadedParties = JSON.parse(loadFromStorage(PARTIES_KEY));
  dispatch({ type: SET_PARTIES, payload: preloadedParties });
};

const deleteParty = (dispatch) => (name) => {
  console.log('DELETE PARTY Reducer');
  dispatch({ type: DELETE_PARTY, payload: name });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { addParty, preloadParties, deleteParty },
  { lang: {}, parties: [] }
);
