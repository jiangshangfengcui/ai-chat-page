import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      sender
      timestamp
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $sender: String!) {
    sendMessage(content: $content, sender: $sender) {
      id
      content
      sender
      timestamp
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      id
      content
      sender
      timestamp
    }
  }
`;

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface GetMessagesResponse {
  messages: Message[];
}

export interface SendMessageResponse {
  sendMessage: Message;
}

export interface SendMessageVariables {
  content: string;
  sender: string;
}