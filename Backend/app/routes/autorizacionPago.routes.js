module.exports = app => {
    
    const autorizacionpago= require("../controllers/autorizacionPago.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", autorizacionpago.create);
    router.get("/", autorizacionpago.findAll);
    router.delete("/:numero_autorizacion_pago",autorizacionpago.delete);  
    router.put("/:numero_autorizacion_pago", autorizacionpago.update);

    app.use("/api/autorizacionPago", router);
  };
  