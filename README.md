# Real-Time Chat Application

[![GitHub stars](https://img.shields.io/github/stars/nandanaap/real-time-chat-application.svg?style=social&label=Star)](https://github.com/nandanaap/real-time-chat-application)
[![GitHub forks](https://img.shields.io/github/forks/nandanaap/real-time-chat-application.svg?style=social&label=Fork)](https://github.com/nandanaap/real-time-chat-application/fork)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)](https://nodejs.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Enabled-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

A modern, responsive real-time chat application built with WebSocket technology and JavaScript, enabling seamless instant messaging between users.



> 💬 Experience real-time communication with this lightweight, fast, and user-friendly chat application!

## 🚀 Features

- **Real-Time Messaging**: Instant message delivery using WebSocket technology
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **User-Friendly Interface**: Clean, intuitive design for enhanced user experience
- **Live Connection Status**: Real-time connection indicators
- **Message History**: Persistent message storage during session
- **Multiple User Support**: Support for multiple concurrent users
- **Auto-Reconnection**: Automatic reconnection on connection loss

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![WebSocket](https://img.shields.io/badge/-WebSocket-010101?style=flat-square&logo=socket.io&logoColor=white)

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, WebSocket
- **Real-Time Communication**: WebSocket API
- **Styling**: CSS3 with responsive design principles

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

- **Node.js** (version 12.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (Node Package Manager) - Comes with Node.js
- **Modern web browser** with WebSocket support

## ⚡ Quick Start

### Option 1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/realtime-chat-app.git

# Navigate to project directory
cd realtime-chat-app

# Install dependencies
npm install

# Start the application
npm start
```

### Option 2: Download ZIP
1. [Download ZIP](https://github.com/yourusername/realtime-chat-app/archive/main.zip)
2. Extract the files
3. Open terminal in project directory
4. Run `npm install` then `npm start`

### 🌐 Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

<details>
<summary>🔧 Custom Port Configuration</summary>

```javascript
// In server.js, modify:
const PORT = process.env.PORT || 3000; // Change 3000 to your preferred port
```
</details>

## 🏗️ Project Structure

```
realtime-chat-app/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/
│   ├── server.js
│   └── websocket.js
├── package.json
├── README.md
└── .gitignore
```

## 💻 Usage

<table>
<tr>
<td width="50%">

### 🚀 Getting Started
1. **Launch Application**: `npm start`
2. **Open Multiple Tabs**: Simulate different users
3. **Start Chatting**: Type and send messages
4. **Real-Time Magic**: Watch messages appear instantly!

</td>
<td width="50%">

### 📱 Features in Action
- ✅ **Instant Messaging**
- ✅ **Multi-User Support**
- ✅ **Responsive Design**
- ✅ **Auto-Reconnection**
- ✅ **Connection Status**

</td>
</tr>
</table>

### 🎯 Demo Instructions
```bash
# Terminal 1: Start the server
npm start

# Browser: Open multiple tabs
# Tab 1: http://localhost:3000
# Tab 2: http://localhost:3000 (simulate another user)
# Start sending messages between tabs!
```

## 🔧 Configuration

You can customize the application by modifying:

- **Port Configuration**: Change the port in `server.js`
- **Styling**: Modify `style.css` for custom themes
- **Features**: Extend functionality in `script.js` and `server.js`



> **Note**: WebSocket support is required for full functionality

## 🤝 Contributing

We welcome contributions! Here's how you can help:

<div align="center">

[![Contributors](https://img.shields.io/github/contributors/yourusername/realtime-chat-app.svg?style=for-the-badge)](https://github.com/yourusername/realtime-chat-app/graphs/contributors)
[![Pull Requests](https://img.shields.io/github/issues-pr/yourusername/realtime-chat-app.svg?style=for-the-badge)](https://github.com/yourusername/realtime-chat-app/pulls)
[![Issues](https://img.shields.io/github/issues/yourusername/realtime-chat-app.svg?style=for-the-badge)](https://github.com/yourusername/realtime-chat-app/issues)

</div>

### 🔄 Contribution Process
1. **Fork** the repository ([Fork Guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 🎯 Areas for Contribution
- 🐛 **Bug Fixes**
- ✨ **New Features**
- 📚 **Documentation**
- 🎨 **UI/UX Improvements**
- 🧪 **Testing**

## 🐛 Known Issues

- Connection may timeout after extended periods of inactivity
- File sharing not yet implemented
- Message history is not persistent across server restarts

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Private messaging
- [ ] File and image sharing
- [ ] Message encryption
- [ ] Chat rooms/channels
- [ ] Message persistence with database
- [ ] Emoji support
- [ ] Typing indicators

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/yourusername.png" width="100" height="100" style="border-radius: 50%;">

**Nandana Pramod**

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:your.email@example.com)
[![Portfolio](https://img.shields.io/badge/-Portfolio-000000?style=flat-square&logo=react)](https://yourportfolio.com)

</div>

## 🙏 Acknowledgments

- Thanks to the WebSocket API for enabling real-time communication
- Inspiration from modern chat applications
- Community feedback and contributions

## 📞 Support & Help

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/yourusername/realtime-chat-app.svg?style=for-the-badge&logo=github)](https://github.com/yourusername/realtime-chat-app/issues)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-purple?style=for-the-badge&logo=github)](https://github.com/yourusername/realtime-chat-app/discussions)





