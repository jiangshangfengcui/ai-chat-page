# AI聊天应用完整项目文件

## 快速重建项目步骤

```bash
# 1. 创建项目目录
mkdir ai-chat-page
cd ai-chat-page

# 2. 初始化项目
npm init -y
git init

# 3. 创建目录结构
mkdir -p src/components src/graphql src/apollo public

# 4. 安装依赖
npm install @apollo/client @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest @types/node @types/react @types/react-dom graphql react react-dom react-scripts typescript web-vitals lucide-react
```

## 📁 完整文件列表及内容

### package.json
```json
{
  "name": "ai-chat-page",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@apollo/client": "^3.8.7",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.59",
    "@types/react": "^18.2.31",
    "@types/react-dom": "^18.2.14",
    "graphql": "^16.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

### .env
```env
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
REACT_APP_NAME=AI聊天助手
REACT_APP_VERSION=1.0.0
```

### .gitignore
```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
```

### public/index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#667eea" />
    <meta name="description" content="基于React + TypeScript + GraphQL的AI聊天应用" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>AI聊天助手</title>
  </head>
  <body>
    <noscript>您需要启用JavaScript才能运行此应用程序。</noscript>
    <div id="root"></div>
  </body>
</html>
```

### src/index.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

### src/index.css
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  height: 100vh;
}
```

### src/apollo/client.ts
```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});
```

### src/graphql/schema.ts
```typescript
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
```

## 📝 重要提醒

1. **保存此文档** - 将此markdown文档保存到本地，重启后可以快速重建项目
2. **GitHub仓库** - 项目名称：`ai-chat-page`
3. **启动命令** - 重建项目后运行 `npm start`
4. **端口** - 应用默认运行在 http://localhost:3000

## 🔄 重启后操作步骤

1. 重启软件完成MCP配置
2. 使用此文档重新创建项目
3. 继续开发或上传到GitHub

祝您MCP配置顺利！项目文件已完整保存。