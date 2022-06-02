//Para leer variables de entorno
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const webpush = require("web-push");

//Morgan: ver las peticiones que llegan desde el servidor
const morgan = require("morgan");

//LLamamos al servicio Morgan
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const vapidKeys = {
  publicKey:
    "BFP5Qruu6idlU2_xlpxg93DuZmLN8qKIRSMbJuOPCXuY62shF_yaaOJa_lBAwQ_G4Fx-C_FcF7iDFEXbf9RaYH8",
  privateKey: "mFf7krNrTrUwISckryC-Bs8CYpOebckzlRxkaylmzQI",
};

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dHl3noLMVc4:APA91bFdr0xXtlkk3QXpray2znQcC1ohz7yn_igUqn9I2e361kVgQ4UkHD23sBoncKFEiwLfFw2dJEzSe3ddccbA57lhGDp55G3clEVlMl9kMypnQONQqP6sNLWZY1e7eJDirZ0zKQxl",
  expirationTime: null,
  keys: {
    p256dh:
      "BFxDpr95Pmb5NpWD0S-J_7h1acy4iDCJ7LggXEKj49t4CM5ApITyTi9EkY0wN4okPWHjAIhwQcdVLKKbKwr4X6o",
    auth: "0LFcGBIK-DSZcbbRoVvKhA",
  },
};

webpush.setVapidDetails(
  "mailto:example@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get("/", async (req, res) => {
  const payload = JSON.stringify({
    title: "Título de notificación",
    message: "Mensaje de la notificación",
  });
  try {
    await webpush.sendNotification(pushSubscription, payload);
    await res.send("Enviado");
  } catch (e) {
    console.log(e);
  }
});

app.post("/subscription", (req, res) => {
  console.log(req.body);
  res.sendStatus(200).json();
});

app.listen(4000, () => console.log("Server listening on port 4000"));
