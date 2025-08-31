import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message } from '../graphql/schema';

// State Types
interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

// Action Types
type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'ADD_USER_MESSAGE'; payload: Message }
  | { type: 'ADD_AI_MESSAGE'; payload: Message }
  | { type: 'SET_CONNECTED'; payload: boolean };

// Initial State
const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  isConnected: false,
};

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
        isLoading: false,
        error: null,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: false,
        error: null,
      };
    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };
    case 'ADD_AI_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: false,
        error: null,
      };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    default:
      return state;
  }
}

// Context
interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
