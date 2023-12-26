/**
 * EXAMPLE!!
 * 
 *  <script>
        ...
        var ws = new WebSocket("ws://localhost:8000/ws");
        ws.onmessage = function(event) {
            var messages = document.getElementById('messages')
            var message = document.createElement('li')
            var content = document.createTextNode(event.data)
            message.appendChild(content)
            messages.appendChild(message)
        };
        function sendMessage(event) {
            var input = document.getElementById("messageText")
            ws.send(input.value)
            input.value = ''
            event.preventDefault()
        }
    </script>
    <form action="" onsubmit="sendMessage(event)">
        <input type="text" id="messageText" autocomplete="off"/>
        <button>Send</button>
    </form>

 */

class WebSocketAdapter {

    constructor() {
        this.ws = new WebSocket("ws://127.0.0.1:8000/")
    }

    getSocket() {
        return this.ws
    }

    sendMessage(body) {
        this.ws.send(body)
    }
}