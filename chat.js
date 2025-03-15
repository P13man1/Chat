const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'chat') {
        const output = document.getElementById('chat-messages');
        const message = `<p><strong>${data.username}:</strong> ${data.message}</p>`;
        output.innerHTML += message;
    } else if (data.type === 'feedback') {
        const feedback = document.getElementById('feedback');
        feedback.innerHTML = `<p>${data.message}</p>`;
    }
};

function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    socket.send(JSON.stringify({ type: 'chat', username, message }));
    document.getElementById('message').value = '';
}