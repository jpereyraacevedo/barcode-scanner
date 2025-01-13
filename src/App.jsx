import React, { useState } from "react";
import BarcodeScanner from "./components/BarcodeScanner/BarcodeScanner";

const App = () => {
  const [barcode, setBarcode] = useState(null);
  const [scannerKey, setScannerKey] = useState(0); // Clave dinámica para reiniciar el escáner

  const handleCodeDetected = (code) => {
    setBarcode(code);
    console.log("Código capturado:", code);
  };

  const handleResetScanner = () => {
    setBarcode(null); // Reiniciar el estado del código
    setScannerKey((prevKey) => prevKey + 1); // Cambiar la clave del escáner para reiniciarlo
  };

  return (
    <div>
      <h1>Escáner de Código de Barras</h1>
      {!barcode ? (
        <BarcodeScanner key={scannerKey} onCodeDetected={handleCodeDetected} />
      ) : (
        <div>
          <p>Código detectado: {barcode}</p>
          <button onClick={handleResetScanner}>Escanear otro código</button>
        </div>
      )}
    </div>
  );
};

export default App;
