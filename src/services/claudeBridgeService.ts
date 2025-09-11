interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MCPStatus {
  [key: string]: boolean;
}

interface ClaudeContext {
  currentFile?: string;
  activeTab?: string;
  selectedData?: any;
}

class ClaudeBridgeService {
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private messageHandlers: Map<string, (data: any) => void> = new Map();
  private sessionId: string | null = null;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private bridgeUrl: string;

  constructor() {
    this.bridgeUrl = process.env.REACT_APP_CLAUDE_BRIDGE_URL || 'ws://localhost:3456';
  }

  async connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.bridgeUrl);

        this.ws.onopen = () => {
          console.log('✅ Connected to Claude Bridge');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Failed to parse message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('❌ Disconnected from Claude Bridge');
          this.isConnected = false;
          this.sessionId = null;
          
          // Attempt reconnection
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => this.connect(), 2000 * this.reconnectAttempts);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        // Set timeout for connection
        setTimeout(() => {
          if (!this.isConnected) {
            reject(new Error('Connection timeout'));
          }
        }, 5000);

      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
      this.sessionId = null;
    }
  }

  isConnectedToBridge(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN;
  }

  async sendChatMessage(content: string): Promise<void> {
    if (!this.isConnectedToBridge()) {
      throw new Error('Not connected to Claude Bridge');
    }

    this.send({
      type: 'chat',
      content
    });
  }

  async executeCommand(command: string, args?: any): Promise<void> {
    if (!this.isConnectedToBridge()) {
      throw new Error('Not connected to Claude Bridge');
    }

    this.send({
      type: 'command',
      command,
      args
    });
  }

  async updateContext(context: ClaudeContext): Promise<void> {
    if (!this.isConnectedToBridge()) {
      throw new Error('Not connected to Claude Bridge');
    }

    this.send({
      type: 'context',
      context
    });
  }

  async getMCPStatus(): Promise<MCPStatus> {
    try {
      const response = await fetch('http://localhost:3456/mcp-status');
      return await response.json();
    } catch (error) {
      console.error('Failed to get MCP status:', error);
      return {};
    }
  }

  onMessage(type: string, handler: (data: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  private send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      throw new Error('WebSocket is not connected');
    }
  }

  private handleMessage(message: any) {
    switch (message.type) {
      case 'connected':
        this.sessionId = message.sessionId;
        console.log(`Session ID: ${this.sessionId}`);
        break;

      case 'response':
      case 'error':
      case 'mcp-status':
        const handler = this.messageHandlers.get(message.type);
        if (handler) {
          handler(message);
        }
        break;

      default:
        console.warn('Unknown message type:', message.type);
    }
  }
}

// Create singleton instance
const claudeBridge = new ClaudeBridgeService();

export default claudeBridge;
export type { ChatMessage, MCPStatus, ClaudeContext };