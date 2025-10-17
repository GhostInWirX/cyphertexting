const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Optional)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/encryption-app';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Encryption Algorithms
class EncryptionService {
  // Caesar Cipher
  static caesarCipher(text, shift, decrypt = false) {
    shift = parseInt(shift) || 3;
    if (decrypt) shift = -shift;

    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shift + 26) % 26) + base
      );
    });
  }

  // AES Encryption
  static aesEncrypt(text, key) {
    key = key || 'default-secret-key';
    return CryptoJS.AES.encrypt(text, key).toString();
  }

  static aesDecrypt(cipherText, key) {
    key = key || 'default-secret-key';
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Base64
  static base64Encode(text) {
    return Buffer.from(text).toString('base64');
  }

  static base64Decode(encodedText) {
    return Buffer.from(encodedText, 'base64').toString('utf8');
  }

  // SHA-256 Hash
  static sha256Hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
  }
}

// Routes
app.post('/api/encrypt', (req, res) => {
  try {
    const { text, algorithm, key } = req.body;

    if (!text || !algorithm) {
      return res.status(400).json({ error: 'Text and algorithm are required' });
    }

    let encryptedText;

    switch (algorithm) {
      case 'caesar':
        encryptedText = EncryptionService.caesarCipher(text, key);
        break;
      case 'aes':
        encryptedText = EncryptionService.aesEncrypt(text, key);
        break;
      case 'base64':
        encryptedText = EncryptionService.base64Encode(text);
        break;
      case 'sha256':
        encryptedText = EncryptionService.sha256Hash(text);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported algorithm' });
    }

    res.json({ encryptedText, algorithm });
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ error: 'Encryption failed' });
  }
});

app.post('/api/decrypt', (req, res) => {
  try {
    const { text, algorithm, key } = req.body;

    if (!text || !algorithm) {
      return res.status(400).json({ error: 'Text and algorithm are required' });
    }

    let decryptedText;

    switch (algorithm) {
      case 'caesar':
        decryptedText = EncryptionService.caesarCipher(text, key, true);
        break;
      case 'aes':
        decryptedText = EncryptionService.aesDecrypt(text, key);
        break;
      case 'base64':
        decryptedText = EncryptionService.base64Decode(text);
        break;
      case 'sha256':
        return res.status(400).json({ error: 'SHA-256 is a one-way hash and cannot be decrypted' });
      default:
        return res.status(400).json({ error: 'Unsupported algorithm' });
    }

    res.json({ decryptedText, algorithm });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ error: 'Decryption failed' });
  }
});

// Optional: User Authentication Routes
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
}));

const Message = mongoose.model('Message', new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  originalText: String,
  encryptedText: String,
  algorithm: String,
  createdAt: { type: Date, default: Date.now }
}));

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});