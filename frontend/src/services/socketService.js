import { v4 as uuidv4 } from 'uuid';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.clientId = uuidv4();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    console.log('🔌 Attempting to connect to FastAPI WebSocket on port 8000...');
    
    // Use the correct WebSocket URL for FastAPI
    this.socket = new WebSocket(`ws://localhost:8000/ws/${this.clientId}`);
    
    this.socket.onopen = () => {
      console.log('✅ Connected to FastAPI WebSocket');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    };

    this.socket.onclose = (event) => {
      console.log('❌ Disconnected from FastAPI WebSocket:', event.code, event.reason);
      this.isConnected = false;
      this.handleReconnection();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.isConnected = false;
    };

    this.socket.onmessage = (event) => {
      console.log('📨 WebSocket message received');
    };

    // Start heartbeat to keep connection alive
    this.startHeartbeat();

    return this.socket;
  }

  startHeartbeat() {
    setInterval(() => {
      if (this.socket && this.isConnected && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  }

  handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, 2000 * this.reconnectAttempts);
    } else {
      console.log('Max reconnection attempts reached. Please refresh the page.');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Client disconnected');
    }
  }

  onDataUpdate(callback) {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'data_update' || data.type === 'initial_data') {
            callback(data.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
  }

  onConnect(callback) {
    if (this.socket) {
      this.socket.onopen = callback;
    }
  }

  onDisconnect(callback) {
    if (this.socket) {
      this.socket.onclose = callback;
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.onopen = null;
      this.socket.onclose = null;
      this.socket.onmessage = null;
      this.socket.onerror = null;
    }
  }

  // Helper method to check connection status
  getConnectionStatus() {
    return this.isConnected;
  }
}

export default new SocketService();