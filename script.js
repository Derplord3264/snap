const CLIENT_ID = 'MTtVySuZ98b8nbXY';
const drone = new Scaledrone(CLIENT_ID, {
    data: { name: 'Anonymous' }
});

const chatContainer = document.getElementById('chat-container');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

drone.on('open', error => {
    if (error) {
        return console.error(error);
    }
    const room = drone.subscribe('observable-room');
    room.on('data', (data, member) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.classList.add(member.id === drone.clientId ? 'sent' : 'received');
        messageElement.textContent = data;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    });
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        drone.publish({
            room: 'observable-room',
            message
        });
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
