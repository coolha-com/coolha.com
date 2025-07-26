'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import useXMTP from '../../hooks/useXMTP'
import { motion } from 'framer-motion'

interface Message {
  id: string
  content: string
  sender: string
  timestamp: Date
  type: 'text' | 'image' | 'file'
}

interface XMTPChatProps {
  conversationId?: string
  participants?: string[]
  className?: string
}

export default function XMTPChat({ conversationId, participants = [], className = '' }: XMTPChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { address } = useAccount()
  const {
    client,
    isLoading,
    error,
    conversations,
    sendMessage,
    createConversation,
    isConnected
  } = useXMTP()

  // Load messages from XMTP conversation
  useEffect(() => {
    if (!client || !conversationId) {
      // Show welcome messages for demo
      const welcomeMessages: Message[] = [
        {
          id: '1',
          content: 'Welcome to XMTP messaging on Coolha! 🎉',
          sender: 'system',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: '2', 
          content: 'This is a decentralized messaging system powered by XMTP protocol.',
          sender: 'system',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        },
        {
          id: '3',
          content: 'Connect your wallet and start a conversation to experience real XMTP messaging!',
          sender: 'system',
          timestamp: new Date(Date.now() - 900000),
          type: 'text'
        }
      ]
      setMessages(welcomeMessages)
      return
    }

    // Load real messages from XMTP conversation
    const loadMessages = async () => {
      try {
        const conversation = conversations.find(conv => conv.id === conversationId)
        if (conversation && conversation.messages) {
          const msgs = await conversation.messages()
          const formattedMessages: Message[] = msgs.map((msg: any, index: number) => ({
            id: msg.id || index.toString(),
            content: msg.content || msg.text || '',
            sender: msg.senderAddress || msg.sender || 'unknown',
            timestamp: msg.sentAt ? new Date(msg.sentAt) : new Date(),
            type: 'text'
          }))
          setMessages(formattedMessages)
        }
      } catch (err) {
        console.error('Failed to load messages:', err)
      }
    }

    loadMessages()
  }, [client, conversationId, conversations])

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return

    setIsTyping(true)

    try {
      // Add message to local state immediately for better UX
      const tempMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: address || 'unknown',
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, tempMessage])
      setNewMessage('')

      // Send via XMTP (mock for now)
      if (conversationId) {
        await sendMessage(conversationId, newMessage)
      } else {
        console.log('Mock send message:', newMessage)
      }

    } catch (err) {
      console.error('Failed to send message:', err)
      // Remove the temporary message on error
      setMessages(prev => prev.filter(msg => msg.id !== Date.now().toString()))
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isMyMessage = (sender: string) => {
    return sender === address
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="loading loading-spinner loading-lg"></div>
        <span className="ml-2">正在连接 XMTP...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`alert alert-error ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>XMTP 连接错误: {error}</span>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className={`alert alert-warning ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span>请先连接钱包以使用 XMTP 消息功能</span>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Chat Header */}
      <div className="bg-base-200 p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">XMTP 聊天</h3>
            <p className="text-sm text-base-content/70">
              {participants.length > 0 ? `${participants.length} 参与者` : '去中心化消息'}
            </p>
          </div>
          <div className="badge badge-success badge-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            已连接
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isMyMessage(message.sender) ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isMyMessage(message.sender)
                ? 'bg-primary text-primary-content'
                : 'bg-base-200 text-base-content'
              }`}>
              <p className="text-sm">{message.content}</p>
              <div className={`text-xs mt-1 ${isMyMessage(message.sender) ? 'text-primary-content/70' : 'text-base-content/70'
                }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-base-200 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-base-content/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-base-content/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-base-content/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-base-200 p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息... (按 Enter 发送)"
            className="textarea textarea-bordered flex-1 resize-none"
            rows={1}
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isConnected || isTyping}
            className="btn btn-primary"
          >
            {isTyping ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-xs text-base-content/50 mt-2">
          💡 这是 XMTP 去中心化消息演示。消息通过区块链网络加密传输。
        </div>
      </div>
    </div>
  )
}

export { XMTPChat }