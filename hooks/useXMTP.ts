'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import type { WalletClient } from 'viem'

// XMTP types - compatible with @xmtp/browser-sdk
interface XMTPClient {
  conversations: {
    list: (options?: { consentStates?: string[] }) => Promise<any[]>
    listGroups: (options?: { consentStates?: string[] }) => Promise<any[]>
    listDms: (options?: { consentStates?: string[] }) => Promise<any[]>
    newGroup: (participants: string[], options?: any) => Promise<any>
    findOrCreateDm: (peerAddress: string) => Promise<any>
    streamAllMessages: (consentStates: string[]) => AsyncIterable<any>
    syncAll: (consentStates: string[]) => Promise<void>
  }
  address?: string
  inboxId?: string
}

interface XMTPSigner {
  type: 'EOA'
  getIdentifier: () => { identifier: string; identifierKind: string }
  signMessage: (message: string) => Promise<Uint8Array>
}

// XMTP Consent States
enum ConsentState {
  Allowed = 'allowed',
  Denied = 'denied',
  Unknown = 'unknown'
}

export function useXMTP() {
  const [client, setClient] = useState<XMTPClient | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()

  // Create XMTP signer from wallet client
  const createSigner = useCallback(async (walletClient: WalletClient): Promise<XMTPSigner> => {
    if (!address) throw new Error('No address available')
    
    return {
      type: 'EOA',
      getIdentifier: () => ({
        identifier: address,
        identifierKind: 'Ethereum'
      }),
      signMessage: async (message: string): Promise<Uint8Array> => {
        try {
          const signature = await walletClient.signMessage({
            message,
            account: address
          })
          // Convert hex string to Uint8Array
          return new Uint8Array(Buffer.from(signature.slice(2), 'hex'))
        } catch (error) {
          console.error('Error signing message:', error)
          throw error
        }
      }
    }
  }, [address])

  // Initialize XMTP client
  const initializeClient = useCallback(async () => {
    if (!walletClient || !address || !isConnected) {
      console.log('Wallet not connected or address not available')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create XMTP signer from wallet client
      const signer = await createSigner(walletClient)
      
      // Import and create XMTP client
      const { Client } = await import('@xmtp/browser-sdk')
      const xmtpClient = await Client.create(signer, {
        env: process.env.NODE_ENV === 'production' ? 'production' : 'dev'
      })
      
      setClient(xmtpClient as any)
      console.log('XMTP client initialized successfully')
      
    } catch (err) {
      console.error('Failed to initialize XMTP client:', err)
      
      // Fallback to mock client if XMTP SDK is not available
      if (err instanceof Error && err.message.includes('Cannot resolve module')) {
        console.log('XMTP SDK not installed, using mock client')
        
        const mockClient: XMTPClient = {
          conversations: {
            list: async () => [],
            newGroup: async (participants: string[], options?: any) => ({
              id: 'mock-group',
              participants,
              send: async (message: string) => console.log('Mock send:', message)
            }),
            findOrCreateDm: async (peerAddress: string) => ({
              id: `mock-dm-${peerAddress}`,
              peerAddress,
              send: async (message: string) => console.log('Mock DM send:', message)
            }),
            streamAllMessages: async function* (consentStates: string[]) {
              yield { content: 'Mock message', sender: address }
            },
            syncAll: async (consentStates: string[]) => {
              console.log('Mock sync all')
            }
          }
        }
        
        setClient(mockClient)
        setError('XMTP SDK not installed. Install with: npm install @xmtp/browser-sdk')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to initialize XMTP')
      }
    } finally {
      setIsLoading(false)
    }
  }, [walletClient, address, isConnected, createSigner])

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!client) return
    
    try {
      // Sync conversations first
      await client.conversations.syncAll([ConsentState.Allowed])
      
      // Load all conversations with allowed consent state
      const convos = await client.conversations.list({ 
        consentStates: [ConsentState.Allowed] 
      })
      
      setConversations(convos)
      console.log(`Loaded ${convos.length} conversations`)
    } catch (err) {
      console.error('Failed to load conversations:', err)
      setError('Failed to load conversations')
    }
  }, [client])

  // Send message
  const sendMessage = useCallback(async (conversationId: string, message: string) => {
    if (!client) {
      throw new Error('XMTP client not initialized')
    }
    
    try {
      // Find the conversation by ID
      const conversation = conversations.find(conv => conv.id === conversationId)
      
      if (!conversation) {
        throw new Error('Conversation not found')
      }
      
      // Send message using XMTP
      await conversation.send(message)
      console.log('Message sent successfully:', message)
      return true
    } catch (err) {
      console.error('Failed to send message:', err)
      throw err
    }
  }, [client, conversations])

  // Create new conversation
  const createConversation = useCallback(async (peerAddress: string) => {
    if (!client) {
      throw new Error('XMTP client not initialized')
    }
    
    try {
      // Check if conversation already exists
      const existingConversation = conversations.find(conv => 
        conv.peerAddress?.toLowerCase() === peerAddress.toLowerCase()
      )
      
      if (existingConversation) {
        console.log('Conversation already exists:', existingConversation.id)
        return existingConversation.id
      }
      
      // Create new DM conversation using XMTP V3 API
      const newConversation = await client.conversations.findOrCreateDm(peerAddress)
      console.log('New conversation created:', newConversation.id)
      
      // Refresh conversations list
      await loadConversations()
      
      return newConversation.id
    } catch (err) {
      console.error('Failed to create conversation:', err)
      throw err
    }
  }, [client, conversations, loadConversations])

  // Auto-initialize when wallet is connected
  useEffect(() => {
    if (isConnected && walletClient && address && !client) {
      initializeClient()
    }
  }, [isConnected, walletClient, address, client, initializeClient])

  // Load conversations when client is ready
  useEffect(() => {
    if (client) {
      loadConversations()
    }
  }, [client, loadConversations])

  return {
    client,
    isLoading,
    error,
    conversations,
    messages,
    isConnected: !!client,
    initializeClient,
    loadConversations,
    sendMessage,
    createConversation
  }
}

export default useXMTP