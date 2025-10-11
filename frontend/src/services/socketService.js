import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    this.socket = io('http://localhost:5000');
    
    this.socket.on('connect', () => {
      console.log('Connected to backend');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from backend');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  startStreaming(keyword) {
    if (this.socket && this.isConnected) {
      this.socket.emit('start_streaming', keyword);
    }
  }

  onDataUpdate(callback) {
    if (this.socket) {
      this.socket.on('data_update', callback);
    }
  }

  onConnect(callback) {
    if (this.socket) {
      this.socket.on('connect', callback);
    }
  }

  onDisconnect(callback) {
    if (this.socket) {
      this.socket.on('disconnect', callback);
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners('data_update');
      this.socket.removeAllListeners('connect');
      this.socket.removeAllListeners('disconnect');
    }
  }
}

export default new SocketService();