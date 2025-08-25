import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { GET_MESSAGES, SEND_MESSAGE, Message, SendMessageVariables } from './graphql/schema';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      "我理解您的问题。让我来帮助您解决这个问题。",
      "这是一个很有趣的话题！我可以为您提供一些见解。",
      "根据我的分析，我认为这个问题可以从几个角度来看待。",
      "感谢您的提问！这让我想到了几个相关的要点。",
      "我很乐意帮助您！让我为您详细解释一下。"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 发送用户消息到GraphQL服务器
      await sendMessage({
        variables: {
          content,
          sender: 'user'
        } as SendMessageVariables
      });

      // 模拟AI响应延迟
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: simulateAIResponse(content),
          sender: 'ai',
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);

        // 发送AI响应到GraphQL服务器
        sendMessage({
          variables: {
            content: aiResponse.content,
            sender: 'ai'
          } as SendMessageVariables
        });
      }, 1000 + Math.random() * 2000);

    } catch (err) {
      console.error('发送消息失败:', err);
      setIsLoading(false);
      
      // 即使GraphQL失败，也显示本地响应
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: simulateAIResponse(content),
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    }
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (error && messages.length === 0) {
    // 如果GraphQL出错，显示演示消息
    const demoMessages: Message[] = [
      {
        id: '1',
        content: '您好！我是AI助手，很高兴为您服务！',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ];
    
    return (
      <div className="app">
        <header className="app-header">
          <h1>AI 聊天助手</h1>
          <p>演示模式 - GraphQL服务器连接失败</p>
        </header>
        <main className="chat-container">
          <ChatWindow messages={demoMessages} loading={isLoading} />
          <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI 聊天助手</h1>
        <p>基于 React + TypeScript + GraphQL</p>
      </header>
      <main className="chat-container">
        <ChatWindow messages={messages} loading={isLoading} />
        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </main>
    </div>
  );
}

export default App;