module.exports = app => {
    const giroahorro = require("../controllers/giroahorro.controller");
  
    var router = require("express").Router();
  
    //CRUD
    router.post("/", giroahorro.create);
    router.get("/", giroahorro.findAll);
    router.delete("/:numero_autorizacion_giro",giroahorro.delete)
    router.put("/:numero_autorizacion_giro", giroahorro.update)

    //ESPECIFICOS
    router.get("/consultaespecifica/1/:numero_autorizacion_giro",giroahorro.ConsultaPorAuth)
    router.get("/consultaespecifica/2/:rut_constructora",giroahorro.ConsultaPorRutConstr)

    
    app.use("/api/giroahorro", router);
  };