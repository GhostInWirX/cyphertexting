# 🔐 Encryption Tool

A full-stack web application for encrypting, decrypting, and hashing text using various cryptographic algorithms. Built with React frontend and Node.js backend.

![Encryption Tool](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

## ✨ Features

### 🔒 Encryption Algorithms
- **Caesar Cipher** - Classic substitution cipher
- **AES Encryption** - Industry-standard symmetric encryption
- **Base64 Encoding** - Data encoding scheme
- **SHA-256 Hashing** - Cryptographic hash function

### 👤 User Features
- User registration and authentication
- Save encrypted messages to personal history
- Load previous encrypted messages
- Persistent login sessions

### 🎯 UI/UX Features
- Clean, modern responsive design
- Real-time encryption/decryption
- Copy to clipboard functionality
- Input validation and error handling
- Algorithm information and guidance

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/encryption-tool.git
cd encryption-tool
```

2. **Backend Setup**
```bash
cd encryption-backend
npm install
```

Create `.env` file:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/encryption-app
JWT_SECRET=your-super-secure-jwt-secret-key
```

3. **Frontend Setup**
```bash
cd ../encryption-app
npm install
```

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

4. **Run the Application**

Start backend:
```bash
cd encryption-backend
npm run dev
```

Start frontend (in new terminal):
```bash
cd encryption-app
npm run dev
```

5. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **CryptoJS** - Encryption library
- **bcryptjs** - Password hashing

## 📋 API Endpoints

### Encryption
- `POST /api/encrypt` - Encrypt text
- `POST /api/decrypt` - Decrypt text

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Messages
- `POST /api/messages/save` - Save encrypted message
- `GET /api/messages` - Get user's saved messages

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS protection
- Secure encryption key handling

## 🎨 Usage Guide

1. **Select Algorithm**: Choose from Caesar, AES, Base64, or SHA-256
2. **Enter Text**: Type or paste your text to encrypt
3. **Provide Key**: For Caesar/AES, enter encryption key
4. **Encrypt/Decrypt**: Click respective buttons
5. **Save Messages**: Login to save encrypted messages
6. **Copy Results**: Use copy button for quick sharing

## 📱 Screenshots

*(Add your screenshots here)*
- Main encryption interface
- User authentication modals
- Saved messages view
- Mobile responsive design

## 🏗️ Project Structure

```
encryption-tool/
├── encryption-app/          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── encryption-backend/      # Node.js backend
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/encryption-app
JWT_SECRET=your-jwt-secret-key-here
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Encryption Tool
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Connection refused error**
   - Ensure backend is running on port 3001
   - Check MongoDB connection

2. **CORS errors**
   - Verify frontend URL is in CORS allowed origins

3. **JWT errors**
   - Check JWT secret in environment variables

### Getting Help
- Create an issue on GitHub
- Check existing issues for solutions
- Ensure all dependencies are properly installed

## 🙏 Acknowledgments

- CryptoJS library for encryption functions
- React and Node.js communities
- Vite team for excellent build tooling

---

**⭐ Star this repo if you found it helpful!**

**🔗 Connect with me:** [Your GitHub Profile](https://github.com/yourusername)

**🐛 Report bugs:** [Create Issue](https://github.com/yourusername/encryption-tool/issues)

---

*Built with ❤️ using React and Node.js*
