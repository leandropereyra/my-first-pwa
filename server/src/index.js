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

app.post("/subscription", async (req, res) => {
  try {
    await res.sendStatus(200).json();
  } catch (e) {
    console.log(e);
  }
});

app.post("/new-message", async (req, res) => {
  const { message, title } = req.body;
  const payload = JSON.stringify({
    title: title,
    message: message,
    icon: 'https://toppng.com/uploads/preview/pikachu-logo-115510579622mch5qulg6.png'
  });
  try {
    await webpush.sendNotification(pushSubscription, payload);
  } catch (e) {
    console.log(e);
  }
});

const path = require("path");

//Static Content (HTML formulario para que se vea en el servidor)
app.use(express.static(path.join(__dirname, "public")));

app.listen(4000, () => console.log("Server listening on port 4000"));
