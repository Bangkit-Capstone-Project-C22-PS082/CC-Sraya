const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const authMiddleware = require('./authMiddleware');

const app = express();
app.use(authMiddleware);

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("Users").get();

  let Users = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    Users.push({ id, ...data });
  });

  res.status(200).send(JSON.stringify(Users));
});

app.get("/:id", async (req, res) => {
    const snapshot = await admin.firestore().collection('Users').doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

app.post("/", async (req, res) => {
  const User = req.body;

  await admin.firestore().collection("Users").add(user);

  res.status(201).send();
});

app.put("/:id", async (req, res) => {
    const body = req.body;

    await admin.firestore().collection('Users').doc(req.params.id).update(body);

    res.status(200).send()
});

app.delete("/:id", async (req, res) => {
    await admin.firestore().collection("Users").doc(req.params.id).delete();

    res.status(200).send();
})

exports.user = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
