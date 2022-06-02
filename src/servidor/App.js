import { useState } from "react";
import "./App.css";

const initialState = [];

function App() {
  const [newPushMessage, setNewPushMessage] = useState({
    titulo: "",
    mensaje: "",
  });
  const [pushMessage, setPushMessage] = useState(initialState);

  const handleNewPushMessage = (e) => {
    setNewPushMessage({
      ...newPushMessage,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {" "}
          <h1>Formulario para envío de Mensajes Push</h1>{" "}
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPushMessage([
                ...pushMessage,
                {
                  message: newPushMessage.mensaje,
                  title: newPushMessage.titulo
                }
              ]);
            }}
          >
            <div>
              <label>Título</label>
              <input
                type={"text"}
                onChange={handleNewPushMessage}
                name={"titulo"}
              />
            </div>
            <div>
              <label>Mensaje</label>
              <input
                type={"text"}
                onChange={handleNewPushMessage}
                name={"mensaje"}
              />
            </div>
            <div>
              <button type="subit">Enviar</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
