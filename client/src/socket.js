import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Ensure this matches your backend URL

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
  // Handle reconnection if needed
});



socket.on('playerUpdate', (players) => {
  console.log('Current players:', players);
  // Update UI to reflect the current players
});

export default socket;
