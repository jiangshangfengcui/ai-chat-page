import { Message } from '../graphql/schema';
import { graphqlClient } from '../graphql-client/client';

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async fetchMessages(): Promise<Message[]> {
    try {
      const response = await graphqlClient.getMessages();
      return response.messages;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      // Return demo messages on error
      return this.getDemoMessages();
    }
  }

  async sendUserMessage(content: string): Promise<Message> {
    try {
      const response = await graphqlClient.sendMessage({
        content,
        sender: 'user',
      });
      return response.sendMessage;
    } catch (error) {
      console.error('Failed to send message:', error);
      // Return a local message on error
      return {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
    }
  }

  private getDemoMessages(): Message[] {
    return [
      {
        id: '1',
        content: '您好！我是AI助手，很高兴为您服务！',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      },
    ];
  }

  // Simulate AI response for demo purposes
  generateAIResponse(userMessage: string): Message {
    const responses = [
      '我理解您的问题。让我来帮助您解决这个问题。',
      '这是一个很有趣的话题！我可以为您提供一些见解。',
      '根据我的分析，我认为这个问题可以从几个角度来看待。',
      '感谢您的提问！这让我想到了几个相关的要点。',
      '我很乐意帮助您！让我为您详细解释一下。',
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return {
      id: (Date.now() + 1).toString(),
      content: randomResponse,
      sender: 'ai',
      timestamp: new Date().toISOString(),
    };
  }
}

export const chatService = ChatService.getInstance();
