const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('New client connected');
    ws.on('message', message => {
        console.log('Received message from client:', message);
        // Пересылаем полученные сообщения всем подключенным клиентам
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log('Sent message to other client:', message);

            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket сервер запущен на порту 8080');
