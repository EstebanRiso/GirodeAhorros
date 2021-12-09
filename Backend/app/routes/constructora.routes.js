module.exports = app => {
    const constructora = require("../controllers/constructora.controller");
  
    var router = require("express").Router();
  
    // Create a new constructora
    router.post("/", constructora.create);
    router.get("/", constructora.findAll);
    router.delete("/:rut_constructora", constructora.delete);
    router.put("/:rut_constructora", constructora.update);
    
    app.use("/api/constructora", router);
  };
  