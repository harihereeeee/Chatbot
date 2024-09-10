document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');

    const API_KEY = 'AIzaSyAyoEdqbfXz2iilTzNgR9CPEgBqUIE2q0k'; // Your API key

    function sendMessage(event) {
        if (event.key === 'Enter' || event.type === 'click') {
            const messageText = userInput.value.trim();

            if (messageText !== "") {
                appendUserMessage(messageText);
                userInput.value = ''; // Clear input

                // Send the message to the API
                fetch('AIzaSyAyoEdqbfXz2iilTzNgR9CPEgBqUIE2q0k', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}` // Include the API key in the request
                    },
                    body: JSON.stringify({ message: messageText }),
                })
                .then(response => response.json())
                .then(data => {
                    appendBotMessage(data.response); // Assuming the API returns a JSON object with a 'response' field
                })
                .catch(error => {
                    console.error('Error:', error);
                    appendBotMessage('Sorry, something went wrong.');
                });
            }
        }
    }

    function appendUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = message;
        chatWindow.appendChild(userMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
    }

    function appendBotMessage(message) {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = message;
        chatWindow.appendChild(botMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
    }

    document.getElementById('user-input').addEventListener('keypress', sendMessage);
    document.querySelector('.chat-input button').addEventListener('click', sendMessage);
});
