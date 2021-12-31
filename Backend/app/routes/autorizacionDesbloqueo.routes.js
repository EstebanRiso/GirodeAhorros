module.exports = app => {
    
    const autorizaciondesbloqueo= require("../controllers/autorizacionDesbloqueo.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", autorizaciondesbloqueo.create);
    router.get("/", autorizaciondesbloqueo.findAll);
    router.delete("/:numero_autorizacion_desbloqueo",autorizaciondesbloqueo.delete);  
    router.put("/:numero_autorizacion_desbloqueo", autorizaciondesbloqueo.update);
    router.get("/consultaespecifica/1/:numero_autorizacion_giro",autorizaciondesbloqueo.ConsultaPorAuth)

    app.use("/api/autorizacionDesbloqueo", router);
  };
  