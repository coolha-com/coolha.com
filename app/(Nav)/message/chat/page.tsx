'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import XMTPChat from '../../../../components/web3/XMTPChat'
import useXMTP from '../../../../hooks/useXMTP'

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newChatAddress, setNewChatAddress] = useState('')
  const [isCreatingChat, setIsCreatingChat] = useState(false)
  
  const { address, isConnected } = useAccount()
  const {
    client,
    isLoading,
    error,
    conversations,
    createConversation,
    isConnected: xmtpConnected
  } = useXMTP()

  const handleCreateConversation = async () => {
    if (!newChatAddress.trim() || !client) return
    
    setIsCreatingChat(true)
    try {
      const conversationId = await createConversation(newChatAddress)
      setSelectedConversation(conversationId)
      setNewChatAddress('')
    } catch (err) {
      console.error('Failed to create conversation:', err)
    } finally {
      setIsCreatingChat(false)
    }
  }

  const formatAddress = (addr: string) => {
    if (!addr) return 'Unknown'
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">聊天</h1>
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>请先连接钱包</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto ">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations Sidebar */}
          <div className="bg-base-100  shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">会话列表</h2>

            {/* New Chat Form */}
            <div className="mb-4">
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="输入钱包地址"
                    className="input input-bordered input-sm flex-1"
                    value={newChatAddress}
                    onChange={(e) => setNewChatAddress(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateConversation()}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleCreateConversation}
                    disabled={!newChatAddress.trim() || isCreatingChat || !xmtpConnected}
                  >
                    {isCreatingChat ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      '创建'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Conversations List */}
            <div className="space-y-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-8 text-base-content/50">
                  <p>暂无会话</p>
                  <p className="text-sm mt-1">创建新会话开始聊天</p>
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-200 hover:bg-base-300'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="font-medium">
                      {formatAddress(conversation.peerAddress || 'Unknown')}
                    </div>
                    <div className="text-sm opacity-70">
                      {conversation.lastMessage?.content || '开始对话...'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-base-100 shadow-lg overflow-hidden">
            {selectedConversation ? (
              <XMTPChat
                conversationId={selectedConversation}
                className="h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-bold mb-2">选择一个会话开始聊天</h3>
                  <p className="text-base-content/70">
                    从左侧选择会话或创建新会话
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}