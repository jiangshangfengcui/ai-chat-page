# AI Chat Page

一个基于 React + TypeScript + GraphQL 的现代化AI聊天应用。

## 🚀 特性

- **现代化技术栈**: React 18 + TypeScript + GraphQL + Apollo Client
- **响应式设计**: 适配桌面端和移动端
- **实时聊天**: 支持用户与AI助手的实时对话
- **美观界面**: 现代化的渐变设计和流畅的动画效果
- **类型安全**: 完整的TypeScript类型定义
- **GraphQL集成**: 使用Apollo Client进行数据管理

## 🛠️ 技术栈

- **前端**: React 18, TypeScript
- **状态管理**: Apollo Client
- **数据查询**: GraphQL
- **样式**: CSS3 with Gradient & Backdrop Filter
- **图标**: Lucide React
- **构建工具**: Create React App

## 📦 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/ai-chat-page.git
cd ai-chat-page

# 安装依赖
npm install

# 启动开发服务器
npm start
```

## 🔧 环境配置

创建 `.env` 文件并配置以下变量：

```env
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
REACT_APP_NAME=AI聊天助手
REACT_APP_VERSION=1.0.0
```

## 📁 项目结构

```
src/
├── components/          # React组件
│   ├── ChatWindow.tsx   # 聊天窗口
│   ├── MessageBubble.tsx # 消息气泡
│   └── MessageInput.tsx  # 消息输入框
├── graphql/            # GraphQL相关
│   └── schema.ts       # GraphQL查询和类型定义
├── apollo/             # Apollo Client配置
│   └── client.ts       # Apollo客户端设置
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口
├── App.css             # 应用样式
└── index.css           # 全局样式
```

## 🚦 可用脚本

```bash
# 开发模式
npm start

# 构建生产版本
npm run build

# 运行测试
npm test

# 弹出配置（不可逆）
npm run eject
```

## 📊 GraphQL Schema

应用使用以下GraphQL操作：

### 查询
```graphql
query GetMessages {
  messages {
    id
    content
    sender
    timestamp
  }
}
```

### 变更
```graphql
mutation SendMessage($content: String!, $sender: String!) {
  sendMessage(content: $content, sender: $sender) {
    id
    content
    sender
    timestamp
  }
}
```

### 订阅
```graphql
subscription OnMessageAdded {
  messageAdded {
    id
    content
    sender
    timestamp
  }
}
```

## 🎨 设计特色

- **渐变背景**: 现代化的紫色渐变设计
- **毛玻璃效果**: 使用backdrop-filter实现现代化的透明效果
- **响应式布局**: 适配各种屏幕尺寸
- **流畅动画**: 自然的过渡和悬停效果
- **输入状态指示**: 智能的输入和加载状态反馈

## 🔌 API集成

### 演示模式
如果GraphQL服务器不可用，应用会自动切换到演示模式，提供模拟的AI响应。

### 自定义AI响应
在 `src/App.tsx` 中的 `simulateAIResponse` 函数可以自定义AI响应逻辑：

```typescript
const simulateAIResponse = (userMessage: string): string => {
  // 在这里添加您的AI响应逻辑
  // 可以集成真实的AI API
  return "AI响应内容";
};
```

## 🚀 部署

### GitHub Pages
```bash
# 构建项目
npm run build

# 部署到GitHub Pages
# 需要先安装gh-pages: npm install --save-dev gh-pages
npm run deploy
```

### Vercel
1. 连接GitHub仓库到Vercel
2. 设置环境变量
3. 自动部署

### Netlify
1. 连接GitHub仓库到Netlify
2. 构建命令: `npm run build`
3. 发布目录: `build`

## 🤝 贡献

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系

如果您有任何问题或建议，请创建 Issue 或联系项目维护者。

## 🔄 更新日志

### v1.0.0
- ✨ 初始版本发布
- 🎨 现代化UI设计
- 📱 响应式布局支持
- 🔗 GraphQL集成
- 💬 实时聊天功能