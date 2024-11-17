// src/services/websocketService.js
class WebSocketService {
    constructor() {
        this.ws = null;
        this.sessionId = null;
        this.userId = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.onMessageCallback = null;
        this.wsUrl = process.env.Web_Socket;  // WebSocket URL을 직접 설정
    }

    connect(userId, sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
        const wsUrl = `${this.wsUrl}?userId=${userId}&sessionId=${sessionId}`;

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log('WebSocket Connected');
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (this.onMessageCallback) {
                    this.onMessageCallback(data);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket Disconnected');
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => {
                this.connect(this.userId, this.sessionId);
            }, 3000 * this.reconnectAttempts);
        }
    }

    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const messageData = {
                sessionId: this.sessionId,
                userId: this.userId,
                message: message,
                timestamp: Date.now()
            };
            this.ws.send(JSON.stringify(messageData));
        } else {
            throw new Error('WebSocket is not connected');
        }
    }

    setOnMessageCallback(callback) {
        this.onMessageCallback = callback;
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default new WebSocketService();