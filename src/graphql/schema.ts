// GraphQL Types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// GraphQL Request/Response Types
export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  extensions?: Record<string, any>;
}

// API Response Types
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

// GraphQL Queries and Mutations
export const GET_MESSAGES_QUERY = `
  query GetMessages {
    messages {
      id
      content
      sender
      timestamp
    }
  }
`;

export const SEND_MESSAGE_MUTATION = `
  mutation SendMessage($content: String!, $sender: String!) {
    sendMessage(content: $content, sender: $sender) {
      id
      content
      sender
      timestamp
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = `
  subscription OnMessageAdded {
    messageAdded {
      id
      content
      sender
      timestamp
    }
  }
`;
