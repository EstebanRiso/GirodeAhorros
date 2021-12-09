module.exports = app => {
    
    const banco= require("../controllers/banco.controller");
    var router = require("express").Router();
   
    router.post("/", banco.create);
    router.get("/", banco.findAll);
    router.delete("/:id",banco.delete);  
    router.put("/:id", banco.update);

    app.use("/api/banco", router);
  };
  