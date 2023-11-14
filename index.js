const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")
const PushNotifications = require('@pusher/push-notifications-server');

const port = 3000;
const beamsClient = new PushNotifications({
    instanceId: 'b17646f6-89ff-4959-83cd-ec8e141b6afc',
    secretKey: 'F6E7DFE46F336E194DBE5E858908BEF05A04C5795E85C65619BF52404D7A0224',
  });
  

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("GOOD");
})

app.get("/send-notification", (req, res) => {
    const { body, message } = req.query

    console.log("body: "+body+" message: "+message)

    beamsClient.publishToInterests(['hello'], {
        web: {
          notification: {
            title: body,
            body: message,
          },
        },
      })
      .then((publishResponse) => {
        console.log('Notificación enviada:', publishResponse);
        res.json({response: "success"})
      })
      .catch((error) => {
        console.error('Error al enviar la notificación:', error);
        res.json({response: "error"})
      });
})


app.listen(port, () => {
    console.log("Server running on port 3000!");
})
