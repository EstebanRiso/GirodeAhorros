module.exports = app => {
    const giroahorro = require("../controllers/giroahorro.controller");
  
    var router = require("express").Router();
  
    
    router.post("/", giroahorro.create);
    router.get("/", giroahorro.findAll);
    router.delete("/:numero_autorizacion_giro",giroahorro.delete)
    router.put("/:numero_autorizacion_giro", giroahorro.update);
    
    app.use("/api/giroahorro", router);
  };