class WebSocketAdapter {

    constructor() {
        try {
            this.ws = new WebSocket("wss://random-peace.onrender.com")
        } catch (err) {
            this.ws = null;
        }
    }

    wasConnectionSuccesfull() {
        return this.ws != null;
    }

    getSocket() {
        return this.ws
    }

    sendMessage(body) {
        this.ws.send(body)
    }
}