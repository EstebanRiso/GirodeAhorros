module.exports = app => {
    const giroestado = require("../controllers/giroestado.controller");
  
    var router = require("express").Router();
  
    //CRUD
    router.post("/", giroestado.create);
    router.get("/", giroestado.findAll);
    router.delete("/:id",giroestado.delete)
    router.put("/:id", giroestado.update);
    
    app.use("/api/giroestado", router);
  };
  