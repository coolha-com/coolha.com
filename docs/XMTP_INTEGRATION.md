# XMTP 集成指南

## 概述

本项目已集成 XMTP (Extensible Message Transport Protocol) 去中心化消息协议，为用户提供端到端加密的消息传输功能。

## 功能特性

- ✅ **去中心化消息**: 基于区块链的消息传输
- ✅ **端到端加密**: 消息在传输过程中完全加密
- ✅ **钱包集成**: 与 Wagmi/Reown 钱包无缝集成
- ✅ **实时消息**: 支持实时消息推送
- ✅ **群组聊天**: 支持多人群组对话
- ✅ **跨链支持**: 支持多个区块链网络

## 安装依赖

要完全启用 XMTP 功能，需要安装以下依赖：

```bash
npm install @xmtp/browser-sdk
```

## 文件结构

```
├── hooks/
│   └── useXMTP.ts              # XMTP 客户端管理 Hook
├── components/
│   └── XMTPChat.tsx            # XMTP 聊天组件
├── config/
│   └── xmtp.ts                 # XMTP 配置文件
├── app/(Nav)/message/chat/
│   └── page.tsx                # 聊天页面（已集成 XMTP）
└── docs/
    └── XMTP_INTEGRATION.md     # 本文档
```

## 核心组件说明

### 1. useXMTP Hook

位置: `hooks/useXMTP.ts`

主要功能：
- XMTP 客户端初始化
- 钱包签名管理
- 对话列表管理
- 消息发送/接收
- 错误处理

使用示例：
```typescript
import useXMTP from '../hooks/useXMTP'

function ChatComponent() {
  const { 
    client, 
    isLoading, 
    error, 
    conversations, 
    sendMessage, 
    createConversation 
  } = useXMTP()
  
  // 使用 XMTP 功能...
}
```

### 2. XMTPChat 组件

位置: `components/XMTPChat.tsx`

主要功能：
- 消息界面展示
- 实时消息更新
- 消息发送界面
- 连接状态显示
- 错误提示

使用示例：
```tsx
import XMTPChat from '../components/XMTPChat'

function MessagePage() {
  return (
    <XMTPChat 
      conversationId="optional-conversation-id"
      participants={['0x...', '0x...']}
      className="h-full"
    />
  )
}
```

### 3. XMTP 配置

位置: `config/xmtp.ts`

包含：
- 环境配置
- 网络设置
- 功能开关
- 工具函数
- 错误类型定义

## 使用流程

### 1. 用户连接钱包

用户需要先通过 Reown AppKit 连接钱包：

```typescript
// 钱包连接后，XMTP 会自动初始化
const { isConnected } = useAccount()
```

### 2. XMTP 客户端初始化

```typescript
// useXMTP Hook 会自动处理初始化
const { client, isLoading } = useXMTP()

if (isLoading) {
  return <div>正在连接 XMTP...</div>
}
```

### 3. 发送消息

```typescript
const { sendMessage } = useXMTP()

const handleSend = async () => {
  try {
    await sendMessage('conversation-id', 'Hello XMTP!')
  } catch (error) {
    console.error('发送失败:', error)
  }
}
```

### 4. 创建对话

```typescript
const { createConversation } = useXMTP()

const handleCreateChat = async () => {
  try {
    const conversation = await createConversation([
      '0x1234...', // 参与者地址
      '0x5678...'  // 参与者地址
    ])
  } catch (error) {
    console.error('创建对话失败:', error)
  }
}
```

## 支持的网络

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism

## 安全特性

1. **端到端加密**: 所有消息都使用用户私钥加密
2. **去中心化存储**: 消息存储在 XMTP 网络中
3. **身份验证**: 基于钱包签名的身份验证
4. **权限控制**: 用户可以控制谁能发送消息

## 开发模式

当前实现包含模拟模式，用于在未安装 XMTP SDK 时进行开发和测试：

```typescript
// 检查是否为模拟模式
if (!client) {
  console.log('XMTP SDK 未安装，使用模拟模式')
}
```

## 生产部署

### 1. 安装完整依赖

```bash
npm install @xmtp/browser-sdk
```

### 2. 更新 useXMTP Hook

取消注释实际的 XMTP 客户端创建代码：

```typescript
// 取消注释这些行
const signer = await createSigner(walletClient)
const { Client } = await import('@xmtp/browser-sdk')
const xmtpClient = await Client.create(signer)
setClient(xmtpClient)
```

### 3. 环境变量配置

在 `.env.local` 中添加（如需要）：

```env
XMTP_ENV=production
XMTP_API_URL=https://production.xmtp.network
```

## 故障排除

### 常见问题

1. **"XMTP SDK not yet installed" 错误**
   - 解决方案: 运行 `npm install @xmtp/browser-sdk`

2. **钱包连接失败**
   - 检查 Reown AppKit 配置
   - 确保钱包已正确连接

3. **消息发送失败**
   - 检查网络连接
   - 验证接收方地址格式
   - 查看浏览器控制台错误信息

4. **签名失败**
   - 确保用户已授权签名
   - 检查钱包是否支持消息签名

### 调试模式

启用详细日志：

```typescript
// 在 useXMTP.ts 中添加
console.log('XMTP Debug:', { client, isLoading, error })
```

## 更新日志

### v1.0.0 (当前版本)
- ✅ 基础 XMTP 集成
- ✅ 钱包连接支持
- ✅ 消息发送/接收
- ✅ 模拟模式支持
- ✅ 错误处理
- ✅ UI 组件完成

### 计划功能
- 🔄 文件分享支持
- 🔄 消息反应功能
- 🔄 离线消息同步
- 🔄 消息搜索功能
- 🔄 群组管理界面

## 相关链接

- [XMTP 官方文档](https://docs.xmtp.org/)
- [XMTP Browser SDK](https://docs.xmtp.org/sdks/browser)
- [Wagmi 文档](https://wagmi.sh/)
- [Reown AppKit 文档](https://docs.reown.com/appkit)

## 技术支持

如有问题，请查看：
1. 浏览器控制台错误信息
2. 本文档的故障排除部分
3. XMTP 官方文档
4. 项目 GitHub Issues

---

**注意**: 当前版本为演示版本，包含模拟功能。要启用完整的 XMTP 功能，请按照上述说明安装完整依赖并更新配置。