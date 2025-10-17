import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [plainText, setPlainText] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [algorithm, setAlgorithm] = useState('caesar');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const algorithms = [
    { value: 'caesar', label: 'Caesar Cipher' },
    { value: 'aes', label: 'AES' },
    { value: 'base64', label: 'Base64' },
    { value: 'sha256', label: 'SHA-256 Hash' }
  ];

  const handleEncrypt = async () => {
    if (!plainText.trim()) {
      setError('Please enter text to encrypt');
      return;
    }
    if (!algorithm) {
      setError('Please select an encryption algorithm');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/encrypt`, {
        text: plainText,
        algorithm,
        key: key || undefined
      });
      setCipherText(response.data.encryptedText);
    } catch (err) {
      setError(err.response?.data?.error || 'Encryption failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!cipherText.trim()) {
      setError('Please enter cipher text to decrypt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/decrypt`, {
        text: cipherText,
        algorithm,
        key: key || undefined
      });
      setPlainText(response.data.decryptedText);
    } catch (err) {
      setError(err.response?.data?.error || 'Decryption failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cipherText);
    alert('Copied to clipboard!');
  };

  const clearAll = () => {
    setPlainText('');
    setCipherText('');
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🔐 Encryption Tool</h1>
        
        <div className="input-group">
          <label htmlFor="algorithm">Encryption Algorithm:</label>
          <select 
            id="algorithm"
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            {algorithms.map(algo => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
        </div>

        {(algorithm === 'caesar' || algorithm === 'aes') && (
          <div className="input-group">
            <label htmlFor="key">
              {algorithm === 'caesar' ? 'Shift Key (number):' : 'Encryption Key:'}
            </label>
            <input
              id="key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={algorithm === 'caesar' ? 'Enter shift number' : 'Enter encryption key'}
            />
          </div>
        )}

        <div className="input-group">
          <label htmlFor="plainText">Plain Text:</label>
          <textarea
            id="plainText"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder="Enter text to encrypt..."
            rows="4"
          />
        </div>

        <div className="button-group">
          <button 
            onClick={handleEncrypt} 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Encrypting...' : '🔒 Encrypt'}
          </button>
          <button 
            onClick={handleDecrypt} 
            disabled={loading || !cipherText}
            className="btn btn-secondary"
          >
            {loading ? 'Decrypting...' : '🔓 Decrypt'}
          </button>
          <button onClick={clearAll} className="btn btn-outline">
            🗑️ Clear
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="input-group">
          <label htmlFor="cipherText">
            {algorithm === 'sha256' ? 'Hash:' : 'Cipher Text:'}
            {cipherText && (
              <button onClick={copyToClipboard} className="copy-btn">
                📋 Copy
              </button>
            )}
          </label>
          <textarea
            id="cipherText"
            value={cipherText}
            readOnly
            placeholder="Encrypted text will appear here..."
            rows="4"
          />
        </div>

        <div className="info">
          <h3>Algorithm Information:</h3>
          <ul>
            <li><strong>Caesar Cipher:</strong> Simple substitution cipher with shift key</li>
            <li><strong>AES:</strong> Advanced Encryption Standard (symmetric)</li>
            <li><strong>Base64:</strong> Encoding scheme (not encryption)</li>
            <li><strong>SHA-256:</strong> Cryptographic hash function (one-way)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;