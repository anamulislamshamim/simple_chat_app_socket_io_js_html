const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

// () $

const name = prompt("What is your name? ");
appendMessage("You joined");
socket.emit('new-user', name);

// to receive response from socket
socket.on('chat-message', data => {
    console.log(data);
});

socket.on('user-connected', data => {
    appendMessage(data);
});

socket.on('user-disconnected', data => {
    appendMessage(data);
});


messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message  = messageInput.value; 
    messageInput.value = "";
    // send the message to the server 
    socket.emit('send-chat-message', message);
});


function appendMessage (message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
};