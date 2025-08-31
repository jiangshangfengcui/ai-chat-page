import React, { useEffect } from 'react';
import { ChatProvider } from './contexts/ChatContext';
import { useChatOperations } from './hooks/useChatOperations';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { ErrorBanner } from './components/ErrorBanner';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Wifi, WifiOff } from 'lucide-react';
import './App.css';

// Main Chat Component (wrapped with ChatProvider)
const ChatApp: React.FC = () => {
  const {
    messages,
    isLoading,
    error,
    isConnected,
    loadMessages,
    sendMessage,
    clearError,
  } = useChatOperations();

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI 聊天助手</h1>
        <p>
          基于 React + TypeScript + GraphQL + Axios
          <span
            className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}
          >
            {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isConnected ? '已连接' : '演示模式'}
          </span>
        </p>
      </header>

      <main className="chat-container">
        {error && <ErrorBanner message={error} onClose={clearError} />}

        {messages.length === 0 && isLoading ? (
          <LoadingSpinner message="正在加载聊天记录..." />
        ) : (
          <>
            <ChatWindow messages={messages} loading={isLoading} />
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
            />
          </>
        )}
      </main>
    </div>
  );
};

// App component with Context Provider
function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}

export default App;
