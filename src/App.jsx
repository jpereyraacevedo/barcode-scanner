import React, { useState } from "react";
import BarcodeScanner from "./components/BarcodeScanner/BarcodeScanner";

const App = () => {
  const [barcode, setBarcode] = useState(null);

  const handleCodeDetected = (code) => {
    setBarcode(code);
    console.log("Código capturado:", code);
  };

  return (
    <div>
      <h1>Escáner de Código de Barras</h1>
      {!barcode ? (
        <BarcodeScanner onCodeDetected={handleCodeDetected} />
      ) : (
        <div>
          <p>Código detectado: {barcode}</p>
          <button onClick={() => setBarcode(null)}>Escanear otro código</button>
        </div>
      )}
    </div>
  );
};

export default App;
