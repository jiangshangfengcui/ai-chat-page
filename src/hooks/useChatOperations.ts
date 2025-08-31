import { useCallback } from 'react';
import { useChat } from '../contexts/ChatContext';
import { chatService } from '../services/chatService';
import { Message } from '../graphql/schema';

export const useChatOperations = () => {
  const { state, dispatch } = useChat();

  const loadMessages = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const messages = await chatService.fetchMessages();
      dispatch({ type: 'SET_MESSAGES', payload: messages });
      dispatch({ type: 'SET_CONNECTED', payload: true });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load messages' });
      dispatch({ type: 'SET_CONNECTED', payload: false });
    }
  }, [dispatch]);

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content.trim()) return;

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        // Add user message immediately
        const userMessage: Message = {
          id: Date.now().toString(),
          content: content.trim(),
          sender: 'user',
          timestamp: new Date().toISOString(),
        };

        dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

        // Send message to server (this might fail gracefully)
        await chatService.sendUserMessage(content.trim());

        // Simulate AI response with delay
        setTimeout(
          () => {
            const aiResponse = chatService.generateAIResponse(content);
            dispatch({ type: 'ADD_MESSAGE', payload: aiResponse });
          },
          1000 + Math.random() * 2000
        );
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, [dispatch]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    isConnected: state.isConnected,
    loadMessages,
    sendMessage,
    clearError,
  };
};
