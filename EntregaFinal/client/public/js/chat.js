// Conexión con Socket.io
const socket = io();

// Escuchar eventos de Socket.io
socket.on('connect', () => {
	console.log('Conectado al servidor de Socket.io');
});

socket.on('disconnect', () => {
	console.log('Desconectado del servidor de Socket.io');
});

socket.on('message', (message) => {
	console.log('Nuevo mensaje recibido:', message);
	// Agregar mensaje al chat
	addMessageToChat(message);
});

// Manejar el envío de mensajes del formulario
const form = document.getElementById('chat-form');
form.addEventListener('submit', (event) => {
	event.preventDefault();
	const messageInput = document.querySelector('#message-input');
	const message = messageInput.value.trim();
	if (message) {
		// Enviar mensaje al servidor de Socket.io
		socket.emit('sendMessage', message);
		messageInput.value = '';
		messageInput.focus();
	}
});

// Función para agregar un mensaje al chat
const addMessageToChat = (message) => {
	const chatList = document.querySelector('#chat-list');
	const template = document.querySelector('#message-template').innerHTML;
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate({ message });
	chatList.insertAdjacentHTML('beforeend', html);
};