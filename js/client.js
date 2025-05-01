// Connect to the Socket.IO server
const socket = io('http://localhost:8000');

// Get DOM elements
const form = document.getElementById('sendMessageForm');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");
const userList = document.getElementById('userList');
const userInfo = document.getElementById('userInfo');
const logoutButton = document.getElementById('logoutButton');

// Global variables
let username = '';
const activeUsers = {};

// Function to format timestamps
const formatTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Append message to container with better formatting
const appendMessage = (data) => {
    const { message, user, position, isNotification = false } = data;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add(position);
    
    // Add timestamp
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = formatTime();
    
    // Add message content
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    if (isNotification) {
        // Style notification differently
        messageElement.classList.add('notification');
        messageContent.innerText = message;
    } else {
        // For regular messages
        const sender = document.createElement('strong');
        sender.innerText = user;
        
        const messageText = document.createElement('p');
        messageText.innerText = message;
        
        messageContent.appendChild(sender);
        messageContent.appendChild(messageText);
    }
    
    // Assemble the message
    messageElement.appendChild(messageContent);
    messageElement.appendChild(timestamp);
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

// Update user list in the sidebar
const updateUserList = () => {
    userList.innerHTML = '';
    Object.entries(activeUsers).forEach(([id, name]) => {
        const userItem = document.createElement('li');
        
        // Add online status indicator
        const statusDot = document.createElement('span');
        statusDot.classList.add('status-dot');
        userItem.appendChild(statusDot);
        
        // Add username
        const userName = document.createElement('span');
        userName.innerText = name;
        if (id === socket.id) {
            userName.innerText += ' (You)';
            userName.classList.add('current-user');
        }
        userItem.appendChild(userName);
        
        userList.appendChild(userItem);
    });
};

// Update user information
const updateUserInfo = () => {
    userInfo.innerHTML = `
        <div class="user-avatar">${username.charAt(0).toUpperCase()}</div>
        <div class="user-details">
            <h3>${username}</h3>
            <p>Online</p>
        </div>
        <button id="logoutButton">Logout</button>
    `;
    
    // Re-add logout event listener
    document.getElementById('logoutButton').addEventListener('click', () => {
        if (confirm('Are you sure you want to leave the chat?')) {
            window.location.reload();
        }
    });
};

// Handle typing indicators
const typingTimeout = {};
const showTypingIndicator = (user) => {
    const typingElement = document.getElementById(`typing-${user}`);
    
    if (!typingElement) {
        const element = document.createElement('div');
        element.id = `typing-${user}`;
        element.classList.add('typing-indicator', 'left');
        element.innerHTML = `<em>${user} is typing...</em>`;
        messageContainer.appendChild(element);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    
    // Clear any existing timeout
    if (typingTimeout[user]) {
        clearTimeout(typingTimeout[user]);
    }
    
    // Set new timeout
    typingTimeout[user] = setTimeout(() => {
        const typingElement = document.getElementById(`typing-${user}`);
        if (typingElement) {
            typingElement.remove();
        }
    }, 2000);
};

// Function to display welcome message
const showWelcomeMessage = () => {
    appendMessage({
        message: `Welcome to ChatMe, ${username}! Start chatting with others.`,
        user: 'System',
        position: 'notification',
        isNotification: true
    });
};

// Initialize application
const initializeApp = async () => {
    // Get username
    let attemptCount = 0;
    
    while (!username && attemptCount < 3) {
        username = prompt("Enter your name to join the chat");
        attemptCount++;
        
        if (username && username.trim() !== "") {
            break;
        } else if (attemptCount < 3) {
            alert("Name is required to join the chat! Please try again.");
        }
    }
    
    if (!username || username.trim() === "") {
        alert("You must provide a name to join the chat. Please refresh to try again.");
        throw new Error("Name required to join chat");
    }
    
    // Store username in session storage for persistence
    sessionStorage.setItem('chatmeUsername', username);
    
    // Update UI with user info
    activeUsers[socket.id] = username;
    updateUserList();
    updateUserInfo();
    
    // Connect to server
    socket.emit('new-user-joined', username);
    
    // Show welcome message
    showWelcomeMessage();
};

// Check if user has a saved session
const savedUsername = sessionStorage.getItem('chatmeUsername');
if (savedUsername) {
    username = savedUsername;
    initializeApp();
} else {
    initializeApp();
}

// Socket event handlers
socket.on('user-joined', (data) => {
    const { name, users } = data;
    console.log(`${name} joined the chat`);
    
    // Update active users
    Object.assign(activeUsers, users);
    updateUserList();
    
    // Show join notification
    appendMessage({
        message: `${name} joined the chat`,
        user: 'System',
        position: 'notification',
        isNotification: true
    });
});

socket.on('receive', data => {
    console.log(`Message received from ${data.user}: ${data.message}`);
    
    // Remove typing indicator if present
    const typingElement = document.getElementById(`typing-${data.user}`);
    if (typingElement) {
        typingElement.remove();
    }
    
    if (data.id === socket.id) {
        // This is our own message
        appendMessage({
            message: data.message,
            user: 'You',
            position: 'right'
        });
    } else {
        // This is a message from someone else
        appendMessage({
            message: data.message,
            user: data.user,
            position: 'left'
        });
        
        // Play notification sound for messages from others
        playNotificationSound();
    }
});

socket.on('user-list', (users) => {
    // Update our local list of users
    Object.assign(activeUsers, users);
    updateUserList();
});

socket.on('leave', (data) => {
    const { name, id } = data;
    if (name) {
        console.log(`${name} left the chat`);
        
        // Remove user from active users list
        delete activeUsers[id];
        updateUserList();
        
        // Show leave notification
        appendMessage({
            message: `${name} left the chat`,
            user: 'System',
            position: 'notification',
            isNotification: true
        });
    }
});

socket.on('typing', (user) => {
    if (user !== username) {
        showTypingIndicator(user);
    }
});

// Message input event handlers
messageInput.addEventListener('input', () => {
    socket.emit('typing', username);
});

// Send message event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        console.log(`Sending message: ${message}`);
        socket.emit('send', message);
        messageInput.value = '';
        messageInput.focus();
    }
});

// Handle emoji button click
document.getElementById('emojiButton').addEventListener('click', () => {
    const emojiPicker = document.getElementById('emojiPicker');
    emojiPicker.classList.toggle('show');
});

// Add emojis to the picker
const populateEmojiPicker = () => {
    const commonEmojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '😎', '🤔', '😢', '😍'];
    const emojiPicker = document.getElementById('emojiPicker');
    
    commonEmojis.forEach(emoji => {
        const emojiButton = document.createElement('button');
        emojiButton.innerText = emoji;
        emojiButton.addEventListener('click', () => {
            messageInput.value += emoji;
            emojiPicker.classList.remove('show');
            messageInput.focus();
        });
        emojiPicker.appendChild(emojiButton);
    });
};

// Sound notification function
const playNotificationSound = () => {
    const audio = new Audio('notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));
};

// Call emoji picker setup
populateEmojiPicker();

// Handle file upload
document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // For demonstration, we'll just show the filename
        // In a real app, you'd upload this file to a server
        socket.emit('send', `[Shared a file: ${file.name}]`);
        e.target.value = '';
    }
});

// Handle attachment button click
document.getElementById('attachButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

// Handle logout
logoutButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave the chat?')) {
        sessionStorage.removeItem('chatmeUsername');
        window.location.reload();
    }
});

// Cleanup on window close
window.addEventListener('beforeunload', () => {
    socket.emit('disconnect');
});