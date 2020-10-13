import { createStore } from "redux";

// State variables
const initialState = {
  // Temporary state variables, needs to be refactored
  index: 1,
  messageList: [],

  // State Variables for accessing content
  authenticationKey: "asdfabporijioajvdf94325-u2h8guo54p",
  isSignedIn: false,

  // Selected chat
  selectedGroup: {
    groupId: 1,
    chatId: 2,
  },

  // Current user
  user: {
    userId: 1,
    first_name: "name",
    last_name: "lastName",
    username: "firstUser",
    email: "me@email.com",

    // This wont be like this in production
    password: "Password1",

    // Groups the user belongs to.
    groups: [
      {
        name: "Group name 1",
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
        name: "Group name 2",
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
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Logging in
    case "SET_SIGNED_IN":
      if (action.value) {
        return {
          ...state,
          isSignedIn: action.value,
        };
      }

    // Settings
    case "SET_USERNAME":
      if (action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            username: action.value,
          },
        };
      }
    case "SET_FIRSTNAME":
      if (action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            first_name: action.value,
          },
        };
      }
    case "SET_LASTNAME":
      if (action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            last_name: action.value,
          },
        };
      }
    case "SET_PASSWORD":
      if (action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            password: action.value,
          },
        };
      }
    case "ADD_GROUP":
      if (action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            groups: [
              ...state.user.groups,
              {
                name: action.value,
                groupId: 0,
                chats: [],
              },
            ],
          },
        };
      }

    // TESTING
    case "PING":
      console.log("Pong!");
      return state;

    // Messaging
    case "NEW_MESSAGE":
      if (action.value) {
        return {
          ...state,
          messageList: [
            ...state.messageList,
            { id: state.index++, value: action.value },
          ],
        };
      }
    default:
      return state;
  }
};

const store = createStore(reducer);

export { store };
