import { createStore } from "redux";

// IPv4 server address goes here
const SERVER_ADDRESS = '192.168.0.107';

// State variables
const initialState = {

  // SERVER
  serverName: `http://${SERVER_ADDRESS}:8000`,
  websocketServerName: `ws://${SERVER_ADDRESS}:8000/ws`,

  // USER
  user: undefined,
  selectedChatId: 2,
  messageList: [],

  // AUTHENTICATION
  authenticationKey: String,
  isSignedIn: false,
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
      break;

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
      break;
    case 'SET_FIRSTNAME':
      if(action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            first_name: action.value,
          },
        };
      }
      break;
    case 'SET_LASTNAME':
      if(action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            last_name: action.value,
          },
        };
      }
      break;
    case 'SET_PASSWORD':
      if(action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            password: action.value,
          },
        };
      }
      break;
    case 'ADD_GROUP':
      if(action.value) {
        return {
          ...state,
          user: {
            ...state.user,
            group_list: [
              ...state.user.group_list,
              {
                name: action.value,
                groupId: 0,
                chats: [],
              },
            ],
          },
        };
      }
      break;

    // TESTING
    case 'PING':
      console.log('Pong!');
      console.log(state);
      return state;

    // Messaging
    case 'SET_MESSAGES':
      if(action.value) {
        return {
          ...state,
          messageList: action.value,
        };
      }
      break;
    
      case 'SET_SELECTED_CHAT':
        if(action.value) {
          return {
            ...state,
            selectedChatId: action.value,
          };
        }
    case 'NEW_MESSAGE':
      if(action.value) {
        return {
          ...state,
          messageList: [
            ...state.messageList,
            action.value,
          ], 
        };
      }
      break;
    case 'SET_AUTH_TOKEN':
      if(action.value) {
        return {
          ...state,
          authenticationKey: action.value,
        };
      }
      break;
    case 'SET_USER_STATE':
      if(action.value) {
        return {
          ...state,
          user: action.value,
        };
      }
      break;
  }
  return state;
};

const store = createStore(reducer);

export { store };
