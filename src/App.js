import React, { useState } from "react";
import "./App.css";
import { withServiceWorkerUpdater } from "@3m1/service-worker-updater";

const initialState = [];

const App = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;

  const [compra, setCompra] = useState(initialState);
  const [newProducto, setNewProducto] = useState("");

  const inputNewProducto = (e) => {
    setNewProducto(e.target.value);
  };

  const addNewProducto = () => {
    setCompra([...compra, newProducto]);
    setNewProducto("");
  };

  const clearInput = (e) => {
    e.key === "Enter" && addNewProducto();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Lista de compra v5</h1>
        {newServiceWorkerDetected && (
          <div style={{ backgroundColor: "red", marginBottom: 20 }}>
            <h3>¡Nueva actualización! ¿Quieres actualizar?</h3>
            <button onClick={onLoadNewServiceWorkerAccept}>¡Actualizar!</button>
          </div>
        )}
        <input
          type={"text"}
          onKeyPress={clearInput}
          onChange={inputNewProducto}
          value={newProducto}
          autoFocus
        />
        <button onClick={addNewProducto}>Añadir</button>
        <ul>
          {compra.map((productos) => (
            <li key={productos}>{productos}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default withServiceWorkerUpdater(App);
