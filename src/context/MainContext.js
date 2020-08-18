import createDataContext from './createDataContext';
import {
  ADD_PARTY,
  SET_DATA,
  PARTIES_KEY,
  DELETE_PARTY,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER,
  MEMBERS_KEY,
  DELETE_MEMBERS_BY_PARTY,
} from './constants';

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

const mainReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        parties: action.payload.parties,
        members: action.payload.members,
      };
    case ADD_PARTY:
      newState = {
        ...state,
        parties: [...state.parties, action.payload],
        // members: [...state.members, action.payload.members],
      };
      saveToStorage(PARTIES_KEY, JSON.stringify(newState.parties));
      return newState;
    case DELETE_PARTY:
      newState = {
        ...state,
        parties: state.parties.filter((item) => item !== action.payload),
      };
      saveToStorage(PARTIES_KEY, JSON.stringify(newState.parties));
      return newState;
    case ADD_MEMBER:
      newState = { ...state, members: [...state.members, action.payload] };
      saveToStorage(MEMBERS_KEY, JSON.stringify(newState.members));
      return newState;
    case DELETE_MEMBER:
      newState = {
        ...state,
        members: state.members.filter((item) => {
          return !(
            item.name === action.payload.name &&
            item.partyName === action.payload.partyName
          );
        }),
      };
      saveToStorage(MEMBERS_KEY, JSON.stringify(newState.members));
      return newState;
    case DELETE_MEMBERS_BY_PARTY:
      newState = {
        ...state,
        members: state.members.filter(
          (item) => item.partyName !== action.payload
        ),
      };
      saveToStorage(MEMBERS_KEY, JSON.stringify(newState.members));
      return newState;
    case UPDATE_MEMBER:
      newState = {
        ...state,
        members: [
          ...state.members.filter((item) => {
            return !(
              item.name === action.payload.name &&
              item.partyName === action.payload.partyName
            );
          }),
          action.payload,
        ],
      };
      saveToStorage(MEMBERS_KEY, JSON.stringify(newState.members));
      return newState;
    default:
      return state;
  }
};

const addParty = (dispatch) => (partyName) => {
  console.log('ADD PARTY ACTION Reducer');
  dispatch({ type: ADD_PARTY, payload: partyName });
};

const preloadData = (dispatch) => () => {
  console.log('PRELOAD PARTIES Reducer');
  const preloadedParties = JSON.parse(loadFromStorage(PARTIES_KEY));
  const preloadedPartyMembers = JSON.parse(loadFromStorage(MEMBERS_KEY));
  dispatch({
    type: SET_DATA,
    payload: { parties: preloadedParties, members: preloadedPartyMembers },
  });
};

const deleteParty = (dispatch) => (name) => {
  console.log('DELETE PARTY Reducer');
  dispatch({ type: DELETE_MEMBERS_BY_PARTY, payload: name });
  dispatch({ type: DELETE_PARTY, payload: name });
};

const addMember = (dispatch) => (partyMemberObject) => {
  console.log('ADD PARTY MEMBER Reducer');
  dispatch({ type: ADD_MEMBER, payload: partyMemberObject });
};

const deleteMember = (dispatch) => (member) => {
  console.log('DELETE PARTY MEMBER Reducer');
  dispatch({ type: DELETE_MEMBER, payload: member });
};

const deleteMembersByParty = (dispatch) => (partyName) => {
  console.log('DELETE PARTY MEMBERS BY PARTY Reducer');
  dispatch({ type: DELETE_MEMBERS_BY_PARTY, payload: partyName });
};

const updateMember = (dispatch) => (partyMemberObject) => {
  console.log('UPDATE PARTY MEMBER Reducer');
  dispatch({ type: UPDATE_MEMBER, payload: partyMemberObject });
};

export const { Provider, Context } = createDataContext(
  mainReducer,
  {
    addParty,
    preloadData,
    deleteParty,
    addMember,
    deleteMember,
    updateMember,
    deleteMembersByParty,
  },
  { lang: {}, parties: [], members: [] }
);
