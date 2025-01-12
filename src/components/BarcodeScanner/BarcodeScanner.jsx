import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = ({ onCodeDetected }) => {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const scanner = new Html5Qrcode(scannerRef.current.id);

    // Iniciar el escaneo
    scanner
      .start(
        { facingMode: "environment" }, // Cámara trasera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          console.log("Código detectado:", decodedText);
          onCodeDetected(decodedText);
          stopScanner(scanner); // Detener el escáner si se detecta un código
        },
        (errorMessage) => {
          console.warn("Error escaneando:", errorMessage);
        }
      )
      .then(() => {
        setIsScanning(true); // Marcar como escaneando
      })
      .catch((err) => {
        console.error("Error inicializando el escáner:", err);
      });

    return () => {
      stopScanner(scanner);
    };
  }, [onCodeDetected]);

  const stopScanner = (scanner) => {
    if (isScanning) {
      scanner
        .stop()
        .then(() => setIsScanning(false)) // Actualizar estado
        .catch((err) => console.error("Error deteniendo el escáner:", err));
    }
  };

  return <div id="scanner-container" ref={scannerRef}></div>;
};

export default BarcodeScanner;
