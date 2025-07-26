// XMTP Configuration
export const XMTP_CONFIG = {
  // XMTP Environment
  env: process.env.NODE_ENV === 'production' ? 'production' : 'dev',
  
  // API endpoints
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://production.xmtp.network' 
    : 'https://dev.xmtp.network',
    
  // Supported networks
  supportedNetworks: [
    'ethereum',
    'polygon',
    'arbitrum',
    'optimism'
  ],
  
  // Message types
  messageTypes: {
    TEXT: 'text',
    IMAGE: 'image', 
    FILE: 'file',
    REACTION: 'reaction'
  },
  
  // Consent states
  consentStates: {
    ALLOWED: 'allowed',
    DENIED: 'denied',
    UNKNOWN: 'unknown'
  },
  
  // Default settings
  defaults: {
    messageLimit: 100,
    syncInterval: 5000, // 5 seconds
    retryAttempts: 3,
    timeout: 30000 // 30 seconds
  },
  
  // Feature flags
  features: {
    groupChat: true,
    fileSharing: false, // Will be enabled after full implementation
    reactions: false,   // Will be enabled after full implementation
    encryption: true,
    offlineMessages: true
  }
}

// XMTP Error types
export enum XMTPErrorType {
  CONNECTION_FAILED = 'CONNECTION_FAILED',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED', 
  MESSAGE_SEND_FAILED = 'MESSAGE_SEND_FAILED',
  CONVERSATION_CREATE_FAILED = 'CONVERSATION_CREATE_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED'
}

// XMTP Error class
export class XMTPError extends Error {
  constructor(
    public type: XMTPErrorType,
    message: string,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'XMTPError'
  }
}

// Utility functions
export const xmtpUtils = {
  // Format address for display
  formatAddress: (address: string): string => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  },
  
  // Validate Ethereum address
  isValidAddress: (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  },
  
  // Generate conversation ID
  generateConversationId: (participants: string[]): string => {
    return participants.sort().join('-')
  },
  
  // Check if XMTP is supported in current environment
  isSupported: (): boolean => {
    return typeof window !== 'undefined' && 
           typeof window.crypto !== 'undefined' &&
           typeof window.crypto.subtle !== 'undefined'
  },
  
  // Get network name from chain ID
  getNetworkName: (chainId: number): string => {
    const networks: Record<number, string> = {
      1: 'ethereum',
      137: 'polygon',
      42161: 'arbitrum',
      10: 'optimism'
    }
    return networks[chainId] || 'unknown'
  }
}

export default XMTP_CONFIG