import { createStore } from 'redux';

// State variables
const initialState = {

  // Temporary state variables, needs to be refactored
  index: 1,
  messageList: [],

  // State Variables for accessing content
  authenticationKey: "asdfabporijioajvdf94325-u2h8guo54p",
  selectedGroup: {
    groupId: 1,
    chatId: 2, 
  },
  user: {
    userId: 1,
    first_name: "name",
    last_name: "lastName",
    username: "firstUser",
    email: "me@email.com",

    // Groups the user belongs to.
    groups: [
      {
        group: "Group name 1",
        groupId: 1,

        // All chats the group contains
        chats: [
          {
            chat: "Chat one",
            chatId: 1,
          },
          {
            chat: "Chat two",
            chatId: 2,
          },
        ],
      },
      {
        group: "Group name 2",
        groupId: 2,
        chats: [
          {
            chat: "Chat one",
            chatId: 3,
          },
          {
            chat: "Chat two",
            chatId: 4,
          },
        ],
      },
    ],
  },
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
