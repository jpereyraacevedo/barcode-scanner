import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Button from '@mui/material/Button';
import './CodeScanner.css';

const CodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scannerKey, setScannerKey] = useState(0); // Estado para forzar el re-renderizado

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear(); // Limpiar el escáner al desmontar
    };
  }, [scannerKey]); // Dependencia en scannerKey

  const handleScanAnotherCode = () => {
    setScanResult(null); // Reiniciar el estado del código
    setScannerKey((prevKey) => prevKey + 1); // Cambiar la clave del escáner para forzar el re-renderizado
  };

  return (
    <div>
      <h1 className='main-title'>Escanear un código</h1>
      {
        scanResult 
        ? (
          <div>
            Código ingresado: <span className='code-text'>{scanResult}</span>
            <Button 
              variant="outlined" 
              sx={{ backgroundColor: 'var(--main-blue-color)', color: 'white' }} 
              onClick={handleScanAnotherCode} // Llamar a la función al hacer clic
            >
              Escanear otro código
            </Button>
          </div>
        )
        : <div id="reader" key={scannerKey}></div> // Usar scannerKey aquí
      }
    </div>
  );
}

export default CodeScanner;
