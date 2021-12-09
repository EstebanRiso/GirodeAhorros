module.exports = app => {
    const estado = require("../controllers/estado.controller");
  
    var router = require("express").Router();
  
    
    router.post("/", estado.create);
    router.get("/", estado.findAll);
    router.delete("/:id",estado.delete)
    router.put("/:id", estado.update);
    
    app.use("/api/estado", router);
  };
  