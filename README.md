# Chat-Website
Technologies: JavaScript, HTML, Node.js, Socket.IO

# Chat Application Documentation

## Overview
This chat application enables real-time communication between users. It uses **Node.js**, **Socket.IO**. Users can connect with a username, send public and private messages, and view messages in a styled chat interface.

---

## Installation Instructions

1. Open the project directory in a terminal:
   - Navigate to the directory containing the project files.
   - Type `cmd` in the file explorer's search bar to open a terminal in the folder.

To ensure that **Node.js** and **npm** are installed on your system before running the application, follow these steps:

### Check Node.js and npm Installation
1. Open a terminal or command prompt.
2. Run the following commands to check if **Node.js** and **npm** are installed:

   ```bash
   node -v
   ```
   This will display the version of Node.js installed on your system. If Node.js is not installed, it will return an error.

   ```bash
   npm -v
   ```
   This will display the version of npm installed on your system. If npm is not installed, it will return an error.

### Install Node.js and npm (if not installed)
1. Visit the [official Node.js website](https://nodejs.org/).
2. Download the **LTS** version for your operating system.
3. Run the installer and follow the setup instructions.
4. Verify the installation by running the `node -v` and `npm -v` commands again.


Once Node.js and npm are installed, you can proceed with the application setup.

3. Install dependencies:
   ```bash
   npm install
   ```

---

## Launch Instructions

1. Start the server:
   ```bash
   node server.js
   ```

2. Open a web browser and navigate to:
   ```
   http://localhost:3000/chatClient.html
   ```

---

## Testing Instructions

1. Open multiple browser windows or tabs.
2. In each browser, navigate to:
   ```
   http://localhost:3000/chatClient.html
   ```
3. Connect with a unique username in each browser.
4. Start sending messages:
   - Public messages: Type in the message box and press "Send."
   - Private messages: Use the format `@username: message` to send a message to a specific user.

---

## Features

- **Real-Time Messaging**: Users can send and receive messages instantly.
- **Private Messaging**: Direct messages can be sent to specific users using the format `@username: message`.
- **Message Styling**:
  - Messages sent by the user are styled differently from received messages.
  - Private messages are clearly marked for both sender and receiver.

---

## Notes

- The server listens on port `3000` by default. You can change the port by modifying the `PORT` variable in `server.js`.
- All messages are broadcasted in real-time using **Socket.IO**.
