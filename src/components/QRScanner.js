import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

const QRScanner = () => {
  const [latestResult, setLatestResult] = useState('');
  const [scannerActive, setScannerActive] = useState(true);

  const handleScan = (result) => {
    if (result) {
      setLatestResult(result.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const isUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  const previewStyle = {
    height: 240,
    width: 320,
    margin: 'auto',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scannerActive) {
        setScannerActive(false);
        setScannerActive(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [scannerActive]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>QR Scanner</h2>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Scanned Result:</p>
        {latestResult ? (
          isUrl(latestResult) ? (
            <a href={latestResult} target="_blank" rel="noopener noreferrer">
              {latestResult}
            </a>
          ) : (
            <strong>{latestResult}</strong>
          )
        ) : (
          <strong>No result yet</strong>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
