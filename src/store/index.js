import { createStore } from 'redux';

// State variables
const initialState = {
  index: 1,
  messageList: [],
};

// State Actions
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'NEW_MESSAGE':
      if(action.value) {
        return { 
          messageList: [...state.messageList, { id: state.index++, value: action.value }] 
        };
      }
    default:
      return state;
  }
};

const store = createStore(reducer);

export { store };
