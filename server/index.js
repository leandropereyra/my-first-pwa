const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

const app = express();

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
    "https://fcm.googleapis.com/fcm/send/d2EBr27fHdg:APA91bEI_hSRVBqanv1pfygo4cF61hvqVeeCyYmzI1_KxCZNjVTShAHfKMx5-6w16FjevSIkAZYZt4R0DV7fPpGddFxCi1RBFZgccu0qOjQf5qwGLsngNSxVNbyT5PmVM4UMDx4Csq80",
  expirationTime: null,
  keys: {
    p256dh:
      "BBTxJg842XxgtQmaAcJoT0Y3RL3rynVbIHoPuP5QWEZZf4SE9iW6UnXsoIXUyRDKfdnhEttPCp8jFctEftgzBs8",
    auth: "50HMqS9fy7Ube9qy2HnfKQ",
  },
};

webpush.setVapidDetails(
  "mailto:example@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get("/", async (req, res) => {
  res.sendStatus(200).json();
  const payload = JSON.stringify({
    title: "Título de notificación",
    message: "Mensaje de la notificación",
  });
  try {
    await webpush.sendNotification(pushSubscription, payload);
    // await res.send("Enviado");
  } catch (e) {
    console.log(e);
  }
});
app.post("/subscription", (req, res) => {
  console.log(req.body);
  res.sendStatus(200).json();
});

app.listen(4000, () => console.log("Server listening on port 4000"));
