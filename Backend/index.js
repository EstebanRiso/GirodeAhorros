const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded


const db = require("./app/models");
// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/banco.routes")(app);
require("./app/routes/beneficiario.routes")(app);
require("./app/routes/constructora.routes")(app);
require("./app/routes/estado.routes")(app);
require("./app/routes/giroahorro.routes")(app);
require("./app/routes/giroestado.routes")(app);
require("./app/routes/autorizacionDesbloqueo.routes")(app);
require("./app/routes/autorizacionPago.routes")(app);
require("./app/routes/certificado-proyecto.routes")(app);
require("./app/routes/certificado.routes")(app);
require("./app/routes/detallePago.routes")(app);
require("./app/routes/factoring.routes")(app);
require("./app/routes/proyecto.routes")(app);
require("./app/routes/desbloqueoEstado.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
