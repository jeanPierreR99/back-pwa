const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    subject: "mailto:jeanpierrereyes19@gmail.com",
    publicKey: "BP88K4wlPtmGx8nrjUt3YK7PI1XCT2Em6nldUEWEHoxlYXMmAiHQSLXRLXnECATYB9PadeIsEgXmKEA_rQZh7_Q",
    privateKey: "cXXnmgQ8igENaB3Yuf0dJrdGEXFZ7japQ0RarfW8aWA"
}

webpush.setVapidDetails(
    apiKeys.subject,
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    console.log("suscribiendo")
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    const subscription = subDatabse[0];
    console.log("Subscription:", subscription);

    if (subscription) {
        webpush.sendNotification(subscription, "Hello world");
        res.json({ "status": "Success", "message": "Message sent to push service" });
    } else {
        res.status(400).json({ "status": "Error", "message": "No subscription found" });
    }
})


app.listen(port, () => {
    console.log("Server running on port 3000!");
})