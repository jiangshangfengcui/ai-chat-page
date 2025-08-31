import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  GraphQLRequest,
  GraphQLResponse,
  GetMessagesResponse,
  SendMessageResponse,
  SendMessageVariables,
  GET_MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION,
} from '../graphql/schema';

class GraphQLClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({
      baseURL: endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 100000000,
    });
  }

  private async request<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>> {
    try {
      const response: AxiosResponse<GraphQLResponse<T>> =
        await this.client.post('', {
          query,
          variables,
        } as GraphQLRequest);

      return response.data;
    } catch (error) {
      console.error('GraphQL request failed:', error);
      throw error;
    }
  }

  async getMessages(): Promise<GetMessagesResponse> {
    const response =
      await this.request<GetMessagesResponse>(GET_MESSAGES_QUERY);

    if (response.errors) {
      throw new Error(
        response.errors[0]?.message || 'Failed to fetch messages'
      );
    }

    return response.data!;
  }

  async sendMessage(
    variables: SendMessageVariables
  ): Promise<SendMessageResponse> {
    const response = await this.request<SendMessageResponse>(
      SEND_MESSAGE_MUTATION,
      variables
    );

    if (response.errors) {
      throw new Error(response.errors[0]?.message || 'Failed to send message');
    }

    return response.data!;
  }
}
console.log('路径', process.env.REACT_APP_GRAPHQL_ENDPOINT)
// Create GraphQL client instance
const GRAPHQL_ENDPOINT =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
