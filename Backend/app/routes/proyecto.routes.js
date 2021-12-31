module.exports = app => {
    
    const proyecto= require("../controllers/proyecto.controller");
    var router = require("express").Router();
   

    //CRUD
    router.post("/", proyecto.create);
    router.get("/", proyecto.findAll);
    router.delete("/:id_proyecto",proyecto.delete);  
    router.put("/:id_proyecto", proyecto.update);
    
    router.get("/consultaespecifica/1/:numero_autorizacion",proyecto.ConsultaPorAuth)

    app.use("/api/proyecto", router);
  };
  